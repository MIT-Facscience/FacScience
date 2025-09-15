import React from 'react';
import { CheckCircle, Ticket, MapPin, HandCoins, Loader2, AlertCircle, Download } from 'lucide-react';
import type { ForeignPersonalInfo, ForeignBankInfo, ForeignDocuments, Program } from '../../types';

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

  // Vue avant soumission
  if (!isSubmitted) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Récapitulatif avant soumission</h2>

        {/* Informations personnelles */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Informations personnelles</h3>
          <p><strong>Nom complet :</strong> {personalInfo.firstName} {personalInfo.lastName}</p>
          <p><strong>Email :</strong> {personalInfo.email}</p>
          <p><strong>Téléphone :</strong> {personalInfo.telephone}</p>
          <p><strong>Nationalité :</strong> {personalInfo.personalNationality}</p>
          <p><strong>Établissement d'origine :</strong> {personalInfo.bacNationality}</p>
        </div>

        {/* Programme choisi */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Programme choisi</h3>
          <p>{selectedProgram?.nomMention || 'Non sélectionné'}</p>
        </div>

        {/* Informations bancaires */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Informations bancaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex items-center"><Ticket className="w-4 h-4 mr-1" />{bankInfo.reference}</div>
            <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{bankInfo.agenceRef}</div>
            <div className="flex items-center"><HandCoins className="w-4 h-4 mr-1" />{bankInfo.dateRef}</div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Documents</h3>
          {documents.diploma ? (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" /> {documents.diploma.name}
            </div>
          ) : (
            <div className="flex items-center text-red-500">
              <AlertCircle className="w-4 h-4 mr-1" /> Diplôme non fourni
            </div>
          )}
        </div>

        {/* Boutons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="px-6 py-3 border rounded-lg"
          >
            Retour
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting || !documents.diploma}
            className="px-6 py-3 bg-faculty-purple-600 text-white rounded-lg flex items-center space-x-2"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : <span>Soumettre</span>}
          </button>
        </div>
      </div>
    );
  }

  // Vue après soumission
  return (
    <div className="text-center space-y-6">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto"/>
      <h2 className="text-2xl font-bold">Soumission réussie !</h2>
      <p>Votre demande a été soumise avec succès.</p>
      <button onClick={() => window.print()} className="px-6 py-3 border rounded-lg mt-4 flex items-center justify-center">
        <Download className="w-4 h-4 mr-2"/> Imprimer le récépissé
      </button>
    </div>
  );
};

export default StepThree;
