import React, { useEffect, useState } from 'react';
import type { CandidateInfo, Program } from '../types';
import { isValidEmail, isValidTel } from '../api/api';

interface StepTwoThreeProps {
  candidateInfo: CandidateInfo;
  programs: Program[];
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
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [bankReference, setBankReference] = useState('');
  const [bankAgence, setBankAgence] = useState('');
  const [bankDate, setBankDate] = useState(new Date());

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
          {programs.map((program) => (
            <label
              key={program.id}
              className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 ${program.id===selectedProgram?.id ? "border-1 border-faculty-purple-600 border-l-4":"border-gray-300 hover:border-l-4 hover:border-l-orange-400"}`}
            >
              <input
                type="radio"
                name="program"
                value={program.id}
                checked={selectedProgram?.id === program.id}
                onChange={() => setSelectedProgram(program)}
                className={`h-4 w-4 text-faculty-purple-600 }`}
              />
              <span className="text-gray-800">{program.name}</span>
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
            className="border px-4 py-2 border-gray-200"
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="border px-4 py-2 border-gray-200"
          />
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
