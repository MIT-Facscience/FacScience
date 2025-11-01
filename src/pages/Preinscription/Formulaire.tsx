import { Briefcase, GraduationCap } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepStranger from "./FormSteps/FormStepsStranger/StepStranger";
import { StepFour } from "./FormSteps/StepFour";
import { StepOne } from "./FormSteps/StepOne";
import { StepProgress } from "./FormSteps/StepProgress";
import { StepTwoThree } from "./FormSteps/StepTwoThree";
import { getProgram } from "./api/programs";
import type { ApplicationData, CandidateInfo, Program } from "./types/index";
import { useTranslation } from "react-i18next";

interface PersonalInfo {
  email: string;
  telephone: string;
}

const Formulaire: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("admission");

  // États principaux
  const [formationType, setFormationType] = useState<
    "academique" | "professionnalisante" | null
  >(null);

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [bactype, setBactype] = useState<"mg" | "etg">("mg");
  const [strangerStep, setstrangerStep] = useState(1);
  const [program, setProgram] = useState<Program[] | null>(null);

  // État pour gérer si on affiche le choix de formation
  const [showFormationChoice, setShowFormationChoice] = useState(false);

  const stepTitles = t("formulaire.steps.malagasy", { returnObjects: true }) as string[];
  const stepStranger = t("formulaire.steps.stranger", { returnObjects: true }) as string[];

  const handleStepOneComplete = (info: CandidateInfo) => {
    setCandidateInfo(info);
    const fetchGetProg = async () => {
      const prog = await getProgram(
        info.series,
        formationType === "academique"
      );
      setProgram(prog ?? null);
    };
    fetchGetProg();
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
    setCurrentStep(2);
  };

  const handleComplete = () => {
    navigate("/admission/modalite");
  };

  // Fonction pour modifier le type de formation
  const handleModifyFormationType = () => {
    // Réinitialiser complètement le formulaire
    setCandidateInfo(null);
    setApplicationData(null);
    setCurrentStep(1);
    setProgram(null);
    setstrangerStep(1);
    setBactype("mg");
    setShowFormationChoice(true);
  };

  // Fonction pour confirmer le changement de formation
  const handleConfirmFormationChange = (
    newFormationType: "academique" | "professionnalisante"
  ) => {
    setFormationType(newFormationType);
    setShowFormationChoice(false);
  };

  const renderMalagasyFlow = () => {
    return (
      <>
        <StepProgress
          currentStep={currentStep}
          totalSteps={2}
          stepTitles={stepTitles}
        />

        <div className="mt-8">
          {currentStep === 1 && (
            <>
              <StepOne onNext={handleStepOneComplete} />

              {candidateInfo && candidateInfo !== null && (
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
        <StepStranger setstrangerStep={setstrangerStep} />
      </>
    );
  };

  const renderFormationChoice = () => {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("formulaire.formationChoice.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("formulaire.formationChoice.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Option Académique */}
          <button
            onClick={() => handleConfirmFormationChange("academique")}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-primary group"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-[#bb40b9] transition-colors duration-300">
                <GraduationCap className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-300" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {t("formulaire.formationChoice.academic.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("formulaire.formationChoice.academic.description")}
                </p>
              </div>

              <ul className="text-sm text-gray-500 space-y-2 text-left w-full">
                <li>• PSVT</li>
                <li>• PHYSIQUE</li>
                <li>• CHIMIE</li>
                <li>• MATHEMATIQUE</li>
                <li>• INFORMATIQUE ET TECHNOLOGIE</li>
              </ul>

              <div className="mt-4 px-6 py-2 bg-[#bb40b9] text-white rounded-full group-hover:bg-[#bb40b9] transition-colors duration-300">
                {t("formulaire.formationChoice.academic.chooseButton")}
              </div>
            </div>
          </button>

          {/* Option Professionnalisante */}
          <button
            onClick={() => handleConfirmFormationChange("professionnalisante")}
            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-secondary group"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-[#e2c562] transition-colors duration-300">
                <Briefcase className="w-10 h-10 text-secondary group-hover:text-white transition-colors duration-300" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {t("formulaire.formationChoice.professional.title")}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {t("formulaire.formationChoice.professional.description")}
                </p>
              </div>

              <div className="text-sm text-gray-500 space-y-2 text-left w-full mb-8">
                <div>
                  <span className="font-medium text-gray-700">
                    {t("formulaire.formationChoice.professional.physics")}:
                  </span>{" "}
                  LIPSS, LIER, TND, LIGCRR
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    {t("formulaire.formationChoice.professional.chemistry")}:
                  </span>{" "}
                  LISTE, ACP
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    {t("formulaire.formationChoice.professional.svt")}:
                  </span>{" "}
                  FPST, GEODE, PSEG, ENTOAP
                </div>
              </div>

              <div className="mt-4 px-6 py-2 bg-[#e2c562] text-white rounded-full group-hover:bg-secondary transition-colors duration-300">
                {t("formulaire.formationChoice.professional.chooseButton")}
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  };

  // Si aucun type de formation n'est choisi ou si on affiche le choix
  if (!formationType || showFormationChoice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-6 py-8">
          {renderFormationChoice()}
        </div>
      </div>
    );
  }

  // Sinon, afficher le formulaire avec un indicateur du type choisi
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-6 py-8">
        {/* Main Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 space-y-3">
            {/* Indicateur du type de formation choisi */}
            <div
              className={`flex items-center justify-between p-4 rounded-lg mb-6 ${
                formationType === "academique"
                  ? "bg-purple-50 border border-purple-200"
                  : "bg-amber-50 border border-amber-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                {formationType === "academique" ? (
                  <GraduationCap className="w-6 h-6 text-primary" />
                ) : (
                  <Briefcase className="w-6 h-6 text-secondary" />
                )}
                <div>
                  <p className="text-sm text-gray-600">
                    {t("formulaire.currentFormation.title")}
                  </p>
                  <p
                    className={`font-semibold ${
                      formationType === "academique"
                        ? "text-primary"
                        : "text-secondary"
                    }`}
                  >
                    Formation{" "}
                    {formationType === "academique"
                      ? t("formulaire.formationChoice.academic.title")
                      : t("formulaire.formationChoice.professional.title")}
                  </p>
                </div>
              </div>
              <button
                onClick={handleModifyFormationType}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                {t("formulaire.currentFormation.modify")}
              </button>
            </div>

            {/* Choix type de bac */}
            <div className="flex space-x-6 my-3 w-full justify-around p-3 rounded-lg">
              <button
                className={`bg-white shadow p-2 px-6 w-full rounded border border-transparent active:shadow-sm hover:shadow-lg hover:border-faculty-purple-200 active:bg-gray-50 transition-all duration-300 ${
                  bactype === "mg"
                    ? "font-semibold text-primary"
                    : "text-zinc-800"
                }`}
                onClick={() => setBactype("mg")}
              >
                {t("formulaire.bacType.malagasy")}
              </button>
              <button
                className={`bg-white shadow p-2 px-6 w-full rounded border border-transparent active:shadow-sm hover:shadow-lg hover:border-faculty-purple-200 active:bg-gray-50 transition-all duration-300 ${
                  bactype === "etg"
                    ? "font-semibold text-primary"
                    : "text-zinc-800"
                }`}
                onClick={() => setBactype("etg")}
              >
                {t("formulaire.bacType.foreign")}
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
              {t("formulaire.support.help")}
              <a
                className="font-medium text-primary ml-1"
                href="mailto:sciencesfaculte@univ-antananarivo.mg"
              >
                sciencesfaculte@univ-antananarivo.mg
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulaire;