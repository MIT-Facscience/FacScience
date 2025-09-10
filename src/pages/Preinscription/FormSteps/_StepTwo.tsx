import React, { useEffect, useState } from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { CandidateInfo, Program } from '../types';
import { AVAILABLE_PROGRAMS, getProgram } from '../api/programs';

interface StepTwoProps {
  candidateInfo: CandidateInfo;
  onNext: (program: Program) => void;
  onBack: () => void;
}

export const StepTwo: React.FC<StepTwoProps> = ({ candidateInfo, onNext, onBack }) => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [eligiblePrograms, seteligiblePrograms] = useState<Program[]>([])
  
  useEffect(() => {
    const fetchProg = async () => {
      const data = await getProgram() || AVAILABLE_PROGRAMS.filter(program => 
        program.eligibleSeries.includes(candidateInfo.series)
      );
      seteligiblePrograms(data)
    }
    
    fetchProg();
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProgram) {
      onNext(selectedProgram);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choisissez votre programme
        </h2>
        <p className="text-gray-600">
          Bonjour {candidateInfo.firstName} {candidateInfo.lastName}, 
          voici les programmes disponibles pour la série {candidateInfo.series}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4">
          {eligiblePrograms.map((program) => (
            <label
              key={program.id}
              className={`relative flex items-start space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedProgram?.id === program.id
                  ? 'border-faculty-purple-500 bg-faculty-purple-50'
                  : 'border-gray-200 hover:border-faculty-purple-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="program"
                value={program.id}
                checked={selectedProgram?.id === program.id}
                onChange={() => setSelectedProgram(program)}
                className="sr-only"
              />
              <div className="flex-shrink-0">
                <BookOpen className={`w-6 h-6 ${
                  selectedProgram?.id === program.id ? 'text-faculty-purple-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">{program.name}</h3>
                </div>
              </div>
              {selectedProgram?.id === program.id && (
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-faculty-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              )}
            </label>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Précédent
          </button>
          <button
            type="submit"
            disabled={!selectedProgram}
            className="flex-1 bg-faculty-purple-700 hover:bg-faculty-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Continuer</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};