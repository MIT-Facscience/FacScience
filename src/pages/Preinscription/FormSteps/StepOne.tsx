import React, { useState } from "react";
import { Loader2, Search, AlertCircle } from "lucide-react";
import { fetchCandidateInfo as fetchCand } from "../api/api";
import type { CandidateInfo } from "../types";
import type { ResData } from "../types/models";

interface StepOneProps {
  onNext: (candidateInfo: CandidateInfo) => void;
}

// Fonction pour convertir ResData en CandidateInfo
const mapResDataToCandidateInfo = (
  resData: ResData,
  numBacc: string,
  anneeBacc: number
): CandidateInfo => {
  // Séparer nom et prénom
  const nameParts = resData.nom_prenom.trim().split(" ");
  const firstName = nameParts.slice(0, -1).join(" ") || "";
  const lastName = nameParts[nameParts.length - 1] || "";

  // Mapper l'option/série vers le format attendu
  // const seriesMapping: Record<string, 'S' | 'C' | 'D' | 'A1' | 'A2' | 'L' | 'OSE'> = {
  //   'Scientifique': 'S',
  //   'Technique': 'C',
  //   'Sciences de la Nature': 'D',
  //   'Littéraire A1': 'A1',
  //   'Littéraire A2': 'A2',
  //   'Littéraire': 'L',
  //   'OSE': 'OSE'
  // };

  const series = resData.option as
    | "S"
    | "C"
    | "D"
    | "A1"
    | "A2"
    | "L"
    | "OSE"
    | "OM"
    | "TAMB"
    | "CCBTP-PCBTP"
    | "TGI"
    | "EN"
    | "TPFM"
    | "TMEL"
    | "TFFI"
    | "TMA"
    | "TA";

  // Vérifier l'éligibilité (séries scientifiques uniquement)
  const noteligibleSeries = ["L", "OSE", "A1", "A2"];
  const isEligible = !noteligibleSeries.includes(series);

  return {
    id: `${numBacc}-${anneeBacc}`,
    firstName,
    lastName,
    baccalaureateNumber: numBacc,
    graduationYear: anneeBacc,
    series,
    isEligible,
  };
};

export const StepOne: React.FC<StepOneProps> = ({ onNext }) => {
  const [baccalaureateNumber, setBaccalaureateNumber] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCandidateInfo = async (
    numBacc: string,
    anneeBacc: number
  ): Promise<CandidateInfo | null> => {
    try {
      // Votre appel API existant qui retourne ResData
      const resData = await fetchCand(numBacc, anneeBacc);
      return mapResDataToCandidateInfo(resData, numBacc, anneeBacc);
    } catch (error) {
      console.log(error);
      throw new Error("Données introuvable");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!baccalaureateNumber.trim() || !graduationYear) {
      setError("Veuillez remplir tous les champs requis");
      return;
    }

    const year = parseInt(graduationYear);
    if (year < 2020 || year > new Date().getFullYear()) {
      setError("Année de graduation invalide");
      return;
    }

    setIsLoading(true);

    try {
      const candidateInfo = await fetchCandidateInfo(baccalaureateNumber, year);
      
      if (!candidateInfo) {
        setError("Candidat introuvable avec ces informations");
        return;
      }

      if (!candidateInfo.isEligible) {
        setError(
          "Votre série de baccalauréat ne vous permet pas de postuler aux programmes scientifiques"
        );
        return;
      }
      onNext(candidateInfo);

      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 mb-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Vérification d'éligibilité
        </h2>
        <p className="text-gray-600">
          Veuillez saisir vos informations de baccalauréat
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="bacNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Numéro de baccalauréat <strong>(Ex:3280151) *</strong>
          </label>
          <input
            type="text"
            id="bacNumber"
            value={baccalaureateNumber}
            onChange={(e) => {
              const value = e.target.value;
              // Accepter seulement les chiffres (pas de limite de longueur)
              if (/^\d*$/.test(value)) {
                setBaccalaureateNumber(value);
              }
            }}
            className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 transition-all duration-200"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="gradYear"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Année de graduation <strong>(Ex:2025) * </strong>
          </label>
          <input
            type="number"
            id="gradYear"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            min="2020"
            max={new Date().getFullYear()}
            className="w-full px-4 py-3 border border-gray-300 focus:border-gray-400 transition-all duration-200"
            // placeholder={new Date().getFullYear().toString()}
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#bb40b9] hover:bg-primary text-white font-semibold py-3 px-6 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Vérification en cours...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Vérifier</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
