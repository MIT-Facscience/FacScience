import React, { useEffect, useState } from 'react';
import type { CandidateInfo, Program } from '../types';
import { isValidEmail, isValidTel } from '../api/api';
import { TriangleAlert } from 'lucide-react';

interface StepTwoThreeProps {
  candidateInfo: CandidateInfo;
  programs: Program[] | null;
  onNext: (data: {
    program: Program;
    personalInfo: { email: string; telephone: string };
    bankInfo: { reference: string; agenceRef: string; dateRef: string };
  }) => void;
  onBack: () => void;
}

const mapProgram: Record<string, string[] > = {
  CHI: ["C", "S", "D"],
  MI: ["C", "S"],
  IT: ["C", "S"],
  PAP: ["C", "S", "D"],
  STE: ["C", "S", "D"],
}

export const StepTwoThree: React.FC<StepTwoThreeProps> = ({
  candidateInfo,
  programs,
  onNext,
  onBack,
}) => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [bankReference, setBankReference] = useState('');
  const [bankAgence, setBankAgence] = useState('');
  const [bankDate, setBankDate] = useState(new Date());
  const [filteredProg, setfilteredProg] = useState<Program[] | undefined>()

  useEffect(() => {
    if (!programs || !candidateInfo?.series) return;

    const filtered = programs.filter((p) => {
      const types = mapProgram[p.abbreviation ?? ""];
      return types?.includes(candidateInfo.series);
    });

    setfilteredProg(filtered);
  }, [programs, candidateInfo]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    onNext({
      program: selectedProgram,
      personalInfo: { email, telephone },
      bankInfo: { reference: bankReference, agenceRef: bankAgence, dateRef: bankDate.toISOString().split("T")[0] },
    });
  };
  useEffect(() => {
    console.log(candidateInfo);
  }, [candidateInfo]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Programmes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Choisissez votre programme</h3>
        <div className="space-y-2">
          {filteredProg && filteredProg.map((program) => (
            <label
              key={program.idMention}
              className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 ${program.idMention===selectedProgram?.idMention ? "border-1 border-faculty-purple-600 border-l-4":"hover:border-l-4 hover:border-l-orange-400"}`}
            >
              <input
                type="radio"
                name="program"
                value={program.idMention}
                checked={selectedProgram?.idMention === program.idMention}
                onChange={() => setSelectedProgram(program)}
                className={`h-4 w-4 text-faculty-purple-600 }`}
              />
              <span className="text-gray-800">{program.nomMention.charAt(0).toUpperCase()+ program.nomMention.slice(1).toLowerCase()}</span>
              <span className='p-1 rounded border border-gray-300 text-sm text-gray-400'>{program.abbreviation}</span>
              
              <p className='text-gray-600 text-sm'>{program.descriptionMention}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Informations bancaires */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Informations bancaires</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Référence"
            value={bankReference}
            onChange={(e) => setBankReference(e.target.value)}
            className="border px-4 py-2 border-gray-200"
          />
          <input
            type="text"
            placeholder="Agence"
            value={bankAgence}
            onChange={(e) => setBankAgence(e.target.value)}
            className="border px-4 py-2 border-gray-200"
          />
          <input
            type="date"
            placeholder="Date"
            value={bankDate?.toISOString().split("T")[0]}
            onChange={(e) => setBankDate(new Date(e.target.value))}
            className="border px-4 py-2 border-gray-200"
          />
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Informations de contact</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border px-4 py-2 border-gray-200 ${!isValidEmail(email) && email ? "border-red-500" : ""}`}
          />
          <div className="relative">
            <input
              type="tel"
              placeholder=""
              value={telephone}
              onChange={(e) => {
                let val = e.target.value.replace(/[^0-9+\s]/g, ""); // garde seulement + et chiffres

                // + seulement en première position
                if (val.indexOf("+") > 0) {
                  val = val.replace(/\+/g, "");
                }

                // si ça commence par +261 → max 13 caractères
                if (val.startsWith("+261")) {
                  val = val.slice(0, 13);
                }
                // sinon format national → max 10 caractères
                else {
                  val = val.slice(0, 10);
                }

                setTelephone(val);
              }}
              className={`border px-4 py-2 border-gray-200 w-full ${
                telephone && !isValidTel(telephone) ? "border-red-500" : ""
              }`}
            />
            {telephone && !isValidTel(telephone) && (
              // <span className="absolute right-2 top-2 text-red-500 text-sm">
              //   Format invalide
              // </span>
              <TriangleAlert className='absolute right-1 top-1.5 text-red-400 bg-red-100 p-1 rounded w-8 h-8'/>
            )}
          </div>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50"
        >
          Retour
        </button>
        <button
          type="submit"
          disabled={!selectedProgram || !email || !telephone || !bankAgence || !bankReference || !bankDate || !isValidEmail(email) || !isValidTel(telephone.replace(" ", ""))}
          className="px-6 py-2 bg-faculty-purple-600 text-white rounded-sm hover:bg-faculty-purple-700 disabled:opacity-50"
        >
          Continuer
        </button>
      </div>
    </form>
  );
};
