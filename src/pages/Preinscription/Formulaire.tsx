import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StepProgress } from './FormSteps/StepProgress';
import { StepOne } from './FormSteps/StepOne';
import { StepTwoThree } from './FormSteps/StepTwoThree';
import { StepFour } from './FormSteps/StepFour';
import type { ApplicationData, CandidateInfo, Program } from './types/index';
import StepStranger from './FormSteps/FormStepsStranger/StepStranger';
import { getProgram } from './api/programs';

interface PersonalInfo {
  email: string;
  telephone: string;
}

const Formulaire: React.FC = () => {
  const navigate = useNavigate();

  // Seulement 2 steps visibles pour l'utilisateur
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // États internes pour StepOne/TwoThree
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);

  const [bactype, setBactype] = useState<"mg" | "etg">("mg");
  const [strangerStep, setstrangerStep] = useState(1);

  const [program, setProgram] = useState<Program[] | null>(null);

  // Les titres visibles dans la barre
  const stepTitles = ['Informations', 'Confirmation'];
  const stepStranger = ["Information Personnelle", "Documents et parcours", "Confirmation"];

  useEffect(() => {
    const fetchGetProg = async () => {
      const prog = await getProgram();
      setProgram(prog??null);
    }

    fetchGetProg();
  });
  // Handlers
  const handleStepOneComplete = (info: CandidateInfo) => {
    setCandidateInfo(info);
  };

  const handleStepTwoThreeComplete = (data: {
    program: Program;
    personalInfo: PersonalInfo;
    bankInfo: { reference: string; agenceRef: string; dateRef: string };
  }) => {
    setApplicationData({
      candidateInfo: candidateInfo!,
      selectedProgram: data.program,
      personalInfo: {
        firstName: candidateInfo!.firstName,
        lastName: candidateInfo!.lastName,
        email: data.personalInfo.email,
        telephone: data.personalInfo.telephone,
      },
      bankInfo: data.bankInfo,
    });
    setCurrentStep(2); // Passe directement à la confirmation
  };

  const handleComplete = () => {
    navigate('/');
  };

  // Flow malagasy
  const renderMalagasyFlow = () => {
    return (
      <>
        <StepProgress
          currentStep={currentStep}
          totalSteps={2} // Seulement 2 étapes visibles
          stepTitles={stepTitles}
        />

        <div className="mt-8">
          {currentStep === 1 && (
            <>
              <StepOne onNext={handleStepOneComplete} />

              {candidateInfo && (
                <StepTwoThree
                  candidateInfo={candidateInfo}
                  programs={program}
                  onNext={handleStepTwoThreeComplete}
                  onBack={() => setCandidateInfo(null)}
                />
              )}
            </>
          )}

          {currentStep === 2 && applicationData && (
            <StepFour
              applicationData={applicationData}
              onBack={() => setCurrentStep(1)}
              onComplete={handleComplete}
            />
          )}
        </div>
      </>
    );
  };

  const renderStrangerFlow = () => {
    return (
      <>
        <StepProgress 
          currentStep={strangerStep}
          totalSteps={stepStranger.length}
          stepTitles={stepStranger}
        />
        <StepStranger setstrangerStep={setstrangerStep}/>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 ">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/preinscription"
            className="flex items-center space-x-2 text-faculty-purple-600 hover:text-faculty-purple-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Formulaire de pré-inscription
          </h1>
          <div className="w-20"></div>
        </div>

        {/* Main Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 space-y-3">
            {/* Choix type de bac */}
            <div className='flex space-x-6 my-3 w-full justify-around p-3 rounded-lg'>
              <button 
                className={`bg-white shadow p-2 px-6 w-full rounded border border-transparent active:shadow-sm hover:shadow-lg hover:border-faculty-purple-200 active:bg-gray-50 ${bactype === "mg" ? "font-semibold text-purple-900" : "text-zinc-800"}`} 
                onClick={() => setBactype("mg")}
              >
                Bacc Malagasy
              </button>
              <button 
                className={`bg-white shadow p-2 px-6 w-full rounded border border-transparent active:shadow-sm hover:shadow-lg hover:border-faculty-purple-200 active:bg-gray-50 ${bactype === "etg" ? "font-semibold text-purple-900" : "text-zinc-800"}`} 
                onClick={() => setBactype("etg")}
              >
                Bacc Étranger
              </button>
            </div>

            {/* Affichage des étapes */}
            {bactype === "mg" ? renderMalagasyFlow() : renderStrangerFlow()}
          </div>
        </div>

        {/* Support Information */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="text-center text-sm text-gray-500">
            <p>
              Besoin d'aide ? Contactez le service des inscriptions : 
              <span className="font-medium text-faculty-purple-600 ml-1">
                inscription@sciences.mg
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulaire;
