import {
  AlertCircle,
  CheckCircle,
  Download,
  HandCoins,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Ticket,
} from "lucide-react";
import React, { useState } from "react";
import { submitApplication as submitPreinscription } from "../api/api";
import type { ApplicationData, PreinscriptionReturn, ProblemDetails } from "../types";
import { useTranslation } from "react-i18next";

interface StepFourProps {
  applicationData: ApplicationData;
  onBack: () => void;
  onComplete: () => void;
}

export const StepFour: React.FC<StepFourProps> = ({
  applicationData,
  onBack,
  onComplete,
}) => {
  const { t } = useTranslation("admission");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [preinscriptionData, setPreinscriptionData] = useState<PreinscriptionReturn | null>(null);
  const [error, setError] = useState<ProblemDetails | null>(null);

  const handleSubmit = async () => {
    console.log("Début de la soumission");

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitPreinscription(applicationData);

      if (result.success && result.data) {
        setPreinscriptionData(result.data);
        setIsSubmitted(true);
      } else {
        setError(result.error || {
          title: t("formulaire.stepFour.errors.unknownError"),
          detail: t("formulaire.stepFour.errors.unknownErrorDetail")
        });
      }
    } catch (err) {
      setError({
        title: t("formulaire.stepFour.errors.connectionError"),
        detail: err instanceof Error ? err.message : t("formulaire.stepFour.errors.unknownErrorDetail")
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Vue de confirmation avant soumission
  if (!isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("formulaire.stepFour.confirmation.title")}
          </h2>
          <p className="text-gray-600">
            {t("formulaire.stepFour.confirmation.subtitle")}
          </p>
        </div>

        {/* Récapitulatif des données */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 text-lg mb-4">
            {t("formulaire.stepFour.confirmation.summaryTitle")}
          </h3>

          <div className="grid gap-4">
            {/* Informations du candidat */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">
                {t("formulaire.stepFour.confirmation.candidateInfo")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">{t("formulaire.stepFour.confirmation.fullName")}</span>
                  <span className="font-medium ml-2">
                    {applicationData.personalInfo.firstName}{" "}
                    {applicationData.personalInfo.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">{t("formulaire.stepFour.confirmation.bacNumber")}</span>
                  <span className="font-medium ml-2">
                    {applicationData.candidateInfo?.baccalaureateNumber}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">{t("formulaire.stepFour.confirmation.bacYear")}</span>
                  <span className="font-medium ml-2">
                    {applicationData.candidateInfo?.graduationYear}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">{t("formulaire.stepFour.confirmation.series")}</span>
                  <span className="font-medium ml-2">
                    {applicationData.candidateInfo?.series}
                  </span>
                </div>
              </div>
            </div>

            {/* Programme choisi */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">
                {t("formulaire.stepFour.confirmation.program")}
              </h4>
              <div className="text-sm">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {applicationData.selectedProgram?.nomPortail}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {applicationData.selectedProgram?.nomPortail}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">
                {t("formulaire.stepFour.confirmation.contactInfo")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{applicationData.personalInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{applicationData.personalInfo.telephone}</span>
                </div>
              </div>
            </div>

            {/* Banque */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">
                {t("formulaire.stepFour.confirmation.bankInfo")}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center">
                  <Ticket className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{applicationData.bankInfo.reference}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{applicationData.bankInfo.agenceRef}</span>
                </div>
                <div className="flex items-center">
                  <HandCoins className="w-4 h-4 text-gray-400 mr-2" />
                  <span>
                    {new Date(
                      applicationData.bankInfo.dateRef
                    ).toLocaleDateString("FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avertissement */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">
                {t("formulaire.stepFour.confirmation.warning.title")}
              </p>
              <p className="text-yellow-700">
                {t("formulaire.stepFour.confirmation.warning.message")}
              </p>
            </div>
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start text-red-600">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-800 mb-1">{error.title || "Erreur"}</p>
                <p className="text-red-700">{error.detail || t("formulaire.stepFour.errors.unknownErrorDetail")}</p>
                {error.status && (
                  <p className="text-xs text-red-500 mt-1">Code d'erreur: {error.status}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Boutons d'action */}
        <div className="flex justify-between pt-6">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
          >
            {t("formulaire.stepFour.buttons.back")}
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-faculty-purple-600 text-white rounded-sm hover:bg-faculty-purple-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t("formulaire.stepFour.submission.submitting")}</span>
              </>
            ) : (
              <span>{t("formulaire.stepFour.submission.submit")}</span>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Vue de succès après soumission
  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {t("formulaire.stepFour.success.title")}
        </h2>
        <p className="text-lg text-gray-600">
          {t("formulaire.stepFour.success.message")}
        </p>
        <div className="bg-faculty-purple-50 border border-faculty-purple-200 rounded-lg p-4">
          <p className="text-faculty-purple-800">
            <span className="font-semibold">
              {t("formulaire.stepFour.success.preinscriptionNumber")}
            </span>
            <span className="font-mono text-lg ml-2">
              {preinscriptionData?.id || "N/A"}
            </span>
          </p>
        </div>
      </div>

      {/* Application Summary */}
      <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
        <h3 className="font-semibold text-gray-800 text-lg mb-4 text-center">
          {t("formulaire.stepFour.success.finalSummary")}
        </h3>

        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">{t("formulaire.stepFour.success.candidate")}</span>
            <span className="font-semibold">
              {applicationData.personalInfo.firstName}{" "}
              {applicationData.personalInfo.lastName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">{t("formulaire.stepFour.success.program")}</span>
            <span className="font-semibold">
              {applicationData.selectedProgram?.nomPortail}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">{t("formulaire.stepFour.success.email")}</span>
            <span className="font-semibold">
              {applicationData.personalInfo.email}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">{t("formulaire.stepFour.success.phone")}</span>
            <span className="font-semibold">
              {applicationData.personalInfo.telephone}
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
        <h4 className="font-semibold text-blue-800 mb-3">
          {t("formulaire.stepFour.nextSteps.title")}
        </h4>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t("formulaire.stepFour.nextSteps.emailConfirmation", { 
              email: applicationData.personalInfo.email 
            })}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t("formulaire.stepFour.nextSteps.documentVerification")}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t("formulaire.stepFour.nextSteps.resultsPublication")}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            {t("formulaire.stepFour.nextSteps.keepNumber", { 
              number: preinscriptionData?.id || "N/A" 
            })}
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          {t("formulaire.stepFour.help.title")}
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-faculty-purple-600" />
            {t("formulaire.stepFour.help.email")}
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-faculty-purple-600" />
            {t("formulaire.stepFour.help.phone")}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center px-6 py-3 border border-faculty-purple-600 text-faculty-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          {t("formulaire.stepFour.buttons.printReceipt")}
        </button>

        <button
          onClick={onComplete}
          className="px-6 py-3 bg-faculty-purple-600 text-white rounded-lg hover:bg-faculty-purple-700 transition-colors duration-200"
        >
          {t("formulaire.stepFour.buttons.returnHome")}
        </button>
      </div>
    </div>
  );
};