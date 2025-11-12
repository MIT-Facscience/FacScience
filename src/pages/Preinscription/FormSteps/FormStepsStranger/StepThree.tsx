import React from 'react';
import { CheckCircle, Ticket, MapPin, HandCoins, Loader2, AlertCircle, Download } from 'lucide-react';
import type { ForeignPersonalInfo, ForeignBankInfo, ForeignDocuments, Program } from '../../types';
import { useTranslation } from 'react-i18next';

interface StepThreeProps {
  personalInfo: ForeignPersonalInfo;
  bankInfo: ForeignBankInfo;
  documents: ForeignDocuments;
  selectedProgram: Program | null;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

const StepThree: React.FC<StepThreeProps> = ({
  personalInfo,
  bankInfo,
  documents,
  selectedProgram,
  onBack,
  onSubmit,
  isSubmitting,
  isSubmitted
}) => {
  const { t } = useTranslation("admission");

  // Vue avant soumission
  if (!isSubmitted) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {t('formulaire.stepThreeStranger.beforeSubmission.title')}
        </h2>

        {/* Informations personnelles */}
        <div className="bg-gray-50 p-6  border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            {t('formulaire.stepThreeStranger.beforeSubmission.sections.personalInfo.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <strong>{t('formulaire.stepThreeStranger.beforeSubmission.sections.personalInfo.fields.fullName')} :</strong>{' '}
              {personalInfo.firstName} {personalInfo.lastName}
            </div>
            <div>
              <strong>{t('formulaire.stepThreeStranger.beforeSubmission.sections.personalInfo.fields.email')} :</strong>{' '}
              {personalInfo.email}
            </div>
            <div>
              <strong>{t('formulaire.stepThreeStranger.beforeSubmission.sections.personalInfo.fields.phone')} :</strong>{' '}
              {personalInfo.telephone}
            </div>
            <div>
              <strong>{t('formulaire.stepThreeStranger.beforeSubmission.sections.personalInfo.fields.nationality')} :</strong>{' '}
              {personalInfo.personalNationality}
            </div>
            <div className="md:col-span-2">
              <strong>{t('formulaire.stepThreeStranger.beforeSubmission.sections.personalInfo.fields.institution')} :</strong>{' '}
              {personalInfo.bacNationality}
            </div>
          </div>
        </div>

        {/* Programme choisi */}
        <div className="bg-gray-50 p-6  border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2 text-lg">
            {t('formulaire.stepThreeStranger.beforeSubmission.sections.program.title')}
          </h3>
          <p className={`text-sm ${selectedProgram ? 'text-gray-800' : 'text-gray-500 italic'}`}>
            {selectedProgram?.nomPortail || t('formulaire.stepThreeStranger.beforeSubmission.sections.program.notSelected')}
          </p>
        </div>

        {/* Informations bancaires */}
        <div className="bg-gray-50 p-6  border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            {t('formulaire.stepThreeStranger.beforeSubmission.sections.bankInfo.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Ticket className="w-4 h-4 text-gray-600 flex-shrink-0" />
              <span className="font-medium">{bankInfo.reference}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
              <span className="font-medium">{bankInfo.agenceRef}</span>
            </div>
            <div className="flex items-center space-x-2">
              <HandCoins className="w-4 h-4 text-gray-600 flex-shrink-0" />
              <span className="font-medium">{bankInfo.dateRef}</span>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-gray-50 p-6  border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            {t('formulaire.stepThreeStranger.beforeSubmission.sections.documents.title')}
          </h3>
          {documents.diploma ? (
            <div className="flex items-center text-green-600 space-x-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <span className="font-medium">
                  {t('formulaire.stepThreeStranger.beforeSubmission.sections.documents.diploma.provided')}:
                </span>
                <span className="ml-2 text-gray-700">{documents.diploma.name}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center text-red-500 space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">
                {t('formulaire.stepThreeStranger.beforeSubmission.sections.documents.diploma.notProvided')}
              </span>
            </div>
          )}
        </div>

        {/* Boutons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="px-6 py-3 border border-gray-300  text-gray-700 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
          >
            {t('formulaire.stepThreeStranger.beforeSubmission.buttons.back')}
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting || !documents.diploma}
            className="px-6 py-3 bg-faculty-purple-600 text-white  flex items-center space-x-2 hover:bg-faculty-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('formulaire.stepThreeStranger.beforeSubmission.buttons.submitting')}</span>
              </>
            ) : (
              <span>{t('formulaire.stepThreeStranger.beforeSubmission.buttons.submit')}</span>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Vue après soumission
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          {t('formulaire.stepThreeStranger.afterSubmission.title')}
        </h2>
        <p className="text-lg text-gray-600">
          {t('formulaire.stepThreeStranger.afterSubmission.message')}
        </p>
      </div>
      
      <button 
        onClick={() => window.print()} 
        className="px-6 py-3 border border-faculty-purple-600 text-faculty-purple-600  mt-4 flex items-center justify-center mx-auto hover:bg-purple-50 transition-colors duration-200"
      >
        <Download className="w-4 h-4 mr-2" />
        {t('formulaire.stepThreeStranger.afterSubmission.buttons.printReceipt')}
      </button>
    </div>
  );
};

export default StepThree;