import { useEffect, useState } from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import type { ForeignDocuments, Program } from '../../types'
import { getPrograms } from '../../api/programs';
import { useTranslation } from 'react-i18next';

interface StepTwoProps {
  documents: ForeignDocuments;
  selectedProgram: Program | null;
  setSelectedProgram: (program: Program) => void;
  setDocuments: (field: keyof ForeignDocuments, file: File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwo({ selectedProgram, setSelectedProgram, documents, setDocuments, onNext, onBack }: StepTwoProps) {
  const { t } = useTranslation("admission");
  const [localProgram, setLocalProgram] = useState(selectedProgram);
  const [programs, setPrograms] = useState<Program[]>([])

  useEffect(() => {
    const fetchGetProg = async () => {
      const prog = await getPrograms();
      setPrograms(prog ?? []);
    }

    fetchGetProg();
  }, []);

  const handleNext = () => {
    if (!documents.diploma) return;
    if (!localProgram) return;
    onNext();
  };

  const handleSelectProgram = (program: Program) => {
    setLocalProgram(program);
    setSelectedProgram(program);
  };

  const isContinueDisabled = !documents.diploma || !localProgram;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {t('formulaire.stepTwoStranger.title')}
      </h2>

      {/* Section Documents */}
      <div className="border-2 border-dashed  p-6">
        <h3 className="mb-2 font-medium">
          {t('formulaire.stepTwoStranger.documents.diploma.title')}
        </h3>
        <input 
          type="file" 
          id="diploma-upload" 
          className="hidden" 
          onChange={e => setDocuments('diploma', e.target.files?.[0] || null)}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <label 
          htmlFor="diploma-upload" 
          className="px-4 py-2 border rounded cursor-pointer flex items-center w-fit hover:bg-gray-50 transition-colors duration-200"
        >
          <FileText className="w-4 h-4 text-gray-400 mr-2"/>
          {t('formulaire.stepTwoStranger.documents.diploma.chooseFile')}
        </label>
        {documents.diploma && (
          <p className="text-green-600 mt-2 flex items-center">
            <span className="mr-1">✓</span>
            {documents.diploma.name}
          </p>
        )}
      </div>

      {/* Section Programme */}
      <div>
        <h3 className="text-xl font-bold mb-4">
          {t('formulaire.stepTwoStranger.program.title')}
        </h3>
        <div className="grid gap-4">
          {programs.map(program => (
            <label 
              key={program.idPortail} 
              className={`flex items-center space-x-4 p-4 border  cursor-pointer transition-all duration-200 ${
                localProgram?.idPortail === program.idPortail 
                  ? 'border-purple-500 bg-purple-50 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input 
                type="radio" 
                name="program" 
                className="h-4 w-4 text-faculty-purple-600 focus:ring-faculty-purple-500"
                checked={localProgram?.idPortail === program.idPortail} 
                onChange={() => handleSelectProgram(program)} 
              />
              <div className="flex-1">
                <span className="font-medium text-gray-800">
                  {program.nomPortail}
                </span>
                {program.abbreviation && (
                  <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {program.abbreviation}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between pt-6">
        <button 
          onClick={onBack} 
          className="px-6 py-3 border border-gray-300  text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          {t('formulaire.stepTwoStranger.buttons.previous')}
        </button>
        
        <button 
          onClick={handleNext} 
          disabled={isContinueDisabled}
          className={`px-6 py-3  flex items-center transition-colors duration-200 ${
            isContinueDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-faculty-purple-600 text-white hover:bg-faculty-purple-700'
          }`}
          title={isContinueDisabled ? t('formulaire.stepTwoStranger.buttons.disabledTooltip') : ''}
        >
          {t('formulaire.stepTwoStranger.buttons.continue')}
          <ChevronRight className="ml-2 w-5 h-5"/>
        </button>
      </div>
    </div>
  );
}