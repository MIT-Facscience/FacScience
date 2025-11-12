import { TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { isValidEmail, isValidTel } from "../api/api";
import type { CandidateInfo, Program } from "../types";
import { useTranslation } from "react-i18next";

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

export const StepTwoThree: React.FC<StepTwoThreeProps> = ({
  candidateInfo,
  programs,
  onNext,
  onBack,
}) => {
  const { t } = useTranslation("admission");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [bankReference, setBankReference] = useState<string | null>(null);
  const [bankAgence, setBankAgence] = useState<string | null>(null);
  const [bankDate, setBankDate] = useState<Date | null>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    if (!bankAgence || !bankReference || !bankDate) return;

    onNext({
      program: selectedProgram,
      personalInfo: { email, telephone },
      bankInfo: {
        reference: bankReference,
        agenceRef: bankAgence,
        dateRef: bankDate.toISOString().split("T")[0],
      },
    });

    console.log(candidateInfo);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Programmes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {t("formulaire.stepTwoThree.choosePortal")}
        </h3>
        {!programs ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 border-4 border-faculty-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm">
                {t("formulaire.stepTwoThree.loadingPortals")}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {programs.map((program) => (
              <label
                key={program.idPortail}
                className={`flex items-center space-x-3 p-3 border  hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
                  program.idPortail === selectedProgram?.idPortail
                    ? "border-1 border-faculty-purple-600 border-l-4"
                    : "hover:border-l-4 hover:border-l-orange-400"
                }`}
              >
                <input
                  type="radio"
                  name="program"
                  value={program.idPortail}
                  checked={selectedProgram?.idPortail === program.idPortail}
                  onChange={() => setSelectedProgram(program)}
                  className={`h-4 w-4 text-faculty-purple-600 }`}
                />
                <span className="text-gray-800">
                  {program.nomPortail}
                </span>
                <span className="p-1 rounded border border-gray-300 text-sm text-gray-400">
                  {program.abbreviation}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Informations bancaires */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {t("formulaire.stepTwoThree.bankInfo.title")}
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("formulaire.stepTwoThree.bankInfo.reference.label")}
            </label>
            <input
              type="text"
              placeholder={t("formulaire.stepTwoThree.bankInfo.reference.placeholder")}
              value={bankReference ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 12) {
                  setBankReference(value);
                }
              }}
              maxLength={12}
              className="border px-4 py-2 border-gray-200 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("formulaire.stepTwoThree.bankInfo.agency.label")}
            </label>
            <input
              type="text"
              placeholder={t("formulaire.stepTwoThree.bankInfo.agency.placeholder")}
              value={(bankAgence ?? "").trim()}
              onChange={(e) => setBankAgence(e.target.value)}
              className="border px-4 py-2 border-gray-200 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("formulaire.stepTwoThree.bankInfo.date.label")}
            </label>
            <input
              type="date"
              value={bankDate?.toISOString().split("T")[0]}
              onChange={(e) => setBankDate(new Date(e.target.value))}
              className="border px-4 py-2 border-gray-200 w-full"
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {t("formulaire.stepTwoThree.contactInfo.title")}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("formulaire.stepTwoThree.contactInfo.email.label")}
            </label>
            <input
              type="email"
              placeholder={t("formulaire.stepTwoThree.contactInfo.email.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`border px-4 py-2 border-gray-200 w-full ${
                !isValidEmail(email) && email ? "border-red-500" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("formulaire.stepTwoThree.contactInfo.phone.label")}
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder={t("formulaire.stepTwoThree.contactInfo.phone.placeholder")}
                value={telephone}
                onChange={(e) => {
                  let val = e.target.value.replace(/[^0-9+\s]/g, "");
                  if (val.indexOf("+") > 0) {
                    val = val.replace(/\+/g, "");
                  }
                  if (val.startsWith("+261")) {
                    val = val.slice(0, 13);
                  } else {
                    val = val.slice(0, 10);
                  }
                  setTelephone(val);
                }}
                className={`border px-4 py-2 border-gray-200 w-full ${
                  telephone && !isValidTel(telephone) ? "border-red-500" : ""
                }`}
              />
              {telephone && !isValidTel(telephone) && (
                <div className="absolute right-1 top-1.5 flex items-center">
                  <TriangleAlert 
                    className="text-red-400 bg-red-100 p-1 rounded w-8 h-8" 
                  />
                </div>
              )}
            </div>
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
          {t("formulaire.stepTwoThree.buttons.back")}
        </button>
        <button
          type="submit"
          disabled={!selectedProgram || !email || !telephone || !bankAgence || !bankReference || !bankDate || !isValidEmail(email) || !isValidTel(telephone.replace(" ", ""))}
          className="px-6 py-2 bg-faculty-purple-600 text-white rounded-sm hover:bg-faculty-purple-700 disabled:opacity-50"
        >
          {t("formulaire.stepTwoThree.buttons.continue")}
        </button>
      </div>
    </form>
  );
};