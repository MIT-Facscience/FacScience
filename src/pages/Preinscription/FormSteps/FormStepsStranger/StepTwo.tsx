import { useEffect, useState } from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import type { ForeignDocuments, Program } from '../../types'
import { getProgram } from '../../api/programs';

interface StepTwoProps {
  documents: ForeignDocuments;
  selectedProgram: Program | null;
  setSelectedProgram: (program: Program) => void;
  setDocuments: (field: keyof ForeignDocuments, file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwo({ selectedProgram, setSelectedProgram, documents, setDocuments, onNext, onBack }: StepTwoProps) {
  const [localProgram, setLocalProgram] = useState(selectedProgram);
  const [programs, setPrograms] = useState<Program[]>([])

    useEffect(() => {
      const fetchGetProg = async () => {
        const prog = await getProgram();
        setPrograms(prog ?? []);
      }
  
      fetchGetProg();
    });

  const handleNext = () => {
    if (!documents.diploma) return;
    if (!localProgram) return;
    onNext();
  };

  const handleSelectProgram = (program: Program) => {
    setLocalProgram(program);
    setSelectedProgram(program);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Documents & Programme</h2>

      <div className="border-2 border-dashed rounded-lg p-6">
        <h3 className="mb-2">Attestation de diplôme</h3>
        <input type="file" id="diploma-upload" className="hidden" onChange={e => setDocuments('diploma', e.target.files?.[0] || null)}/>
        <label htmlFor="diploma-upload" className="px-4 py-2 border rounded cursor-pointer flex items-center">
          <FileText className="w-4 h-4 text-gray-400 mr-2"/>Choisir un fichier
        </label>
        {documents.diploma && <p className="text-green-600 mt-2">✓ {documents.diploma.name}</p>}
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2">Choisissez votre programme</h3>
        <div className="grid gap-4">
          {programs.map(program => (
            <label key={program.id} className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer ${localProgram?.id === program.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
              <input 
                type="radio" 
                name="program" 
                className="h-4 w-4 text-faculty-purple-600"
                checked={localProgram?.id === program.id} 
                onChange={() => handleSelectProgram(program)} 
              />
              <div className="flex items-center">
                <span>{program.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button onClick={onBack} className="px-6 py-3 border rounded">Précédent</button>
        <button onClick={handleNext} className="px-6 py-3 bg-faculty-purple-600 text-white rounded-lg flex items-center" disabled={!documents.diploma || !localProgram}>
          Continuer <ChevronRight className="ml-2 w-5 h-5"/>
        </button>
      </div>
    </div>
  );
}
