import { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import type { ForeignPersonalInfo, ForeignDocuments, ForeignBankInfo, Program } from '../../types';
import StepThree from './StepThree';
import { submitForeignPreinscription } from '../../api/api';

interface StepStrangerProps {
  /** Étape courante, pilotée par le parent pour synchroniser l'indicateur. */
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function StepStranger({ currentStep, onStepChange }: StepStrangerProps) {
  const [personalInfo, setPersonalInfoState] = useState<ForeignPersonalInfo>({
    firstName: '', lastName: '', email: '', telephone: '', bacNationality: '', personalNationality: ''
  });
  const [bankInfo, setBankInfoState] = useState<ForeignBankInfo>({ reference: '' });
  const [documents, setDocumentsState] = useState<ForeignDocuments>({ diploma: null });
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setPersonalInfo = (field: keyof ForeignPersonalInfo, value: string) =>
    setPersonalInfoState(prev => ({ ...prev, [field]: value }));
  const setBankInfo = (field: keyof ForeignBankInfo, value: string) =>
    setBankInfoState(prev => ({ ...prev, [field]: value }));
  const setDocuments = (field: keyof ForeignDocuments, file: File | null) =>
    setDocumentsState(prev => ({ ...prev, [field]: file }));

  // const handleSubmit = async () => {
  //   setIsSubmitting(true);
  //   // Ici tu peux envoyer FormData ou JSON selon ton API
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     setIsSubmitted(true);
  //   }, 1000);
  // };

  const handleSubmit = async () => {
      console.log('Début de la soumission');
      console.log('ApplicationData:', personalInfo);
      
      setIsSubmitting(true);
  
      try {
        console.log('Appel de submitPreinscription...');
        const result = await submitForeignPreinscription(
          {
            personalInfo: personalInfo,
            documents: documents,
            bankInfo: bankInfo, 
            selectedProgram: selectedProgram
          }
        );
        console.log('Résultat:', result);
        
        if (result.success) {
          setIsSubmitted(true);
        } else {
          console.log(errors || 'Erreur lors de la soumission');
        }
      } catch (err) {
        console.error('Erreur capturée:', err);
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="space-y-6">
      {currentStep === 1 && (
        <StepOne
          personalInfo={personalInfo}
          bankInfo={bankInfo}
          errors={errors}
          setPersonalInfo={setPersonalInfo}
          setBankInfo={setBankInfo}
          setErrors={setErrors}
          onNext={() => onStepChange(2)}
        />
      )}

      {currentStep === 2 && (
        <StepTwo
          documents={documents}
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          setDocuments={setDocuments}
          onNext={() => onStepChange(3)}
          onBack={() => onStepChange(1)}
        />
      )}

      {currentStep === 3 && (
        <StepThree
          personalInfo={personalInfo}
          bankInfo={bankInfo}
          documents={documents}
          selectedProgram={selectedProgram}
          onBack={() => onStepChange(2)}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
        />
      )}
    </div>
  );
}
