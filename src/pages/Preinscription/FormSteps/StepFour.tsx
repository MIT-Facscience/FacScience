import React, { useState } from 'react';
import { CheckCircle, Download, Mail, Phone, Loader2, AlertCircle, Ticket, MapPin, HandCoins } from 'lucide-react';
import { ApplicationData } from '../types';
import { submitApplication as submitPreinscription } from '../api/api';

interface StepFourProps {
  applicationData: ApplicationData;
  onBack: () => void;
  onComplete: () => void;
}

export const StepFour: React.FC<StepFourProps> = ({ applicationData, onBack, onComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    console.log('Début de la soumission');
    console.log('ApplicationData:', applicationData);
    
    setIsSubmitting(true);
    setError('');

    try {
      console.log('Appel de submitPreinscription...');
      const result = await submitPreinscription(applicationData);
      console.log('Résultat:', result);
      
      if (result.success) {
        setApplicationNumber("");
        setIsSubmitted(true);
      } else {
        setError(error || 'Erreur lors de la soumission');
      }
    } catch (err) {
      console.error('Erreur capturée:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inattendue est survenue');
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
            Confirmation de votre demande
          </h2>
          <p className="text-gray-600">
            Vérifiez vos informations avant de soumettre votre demande de pré-inscription
          </p>
        </div>

        {/* Récapitulatif des données */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 text-lg mb-4">
            Récapitulatif de votre demande :
          </h3>
          
          <div className="grid gap-4">
            {/* Informations du candidat */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Informations du candidat</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Nom complet :</span>
                  <span className="font-medium ml-2">
                    {applicationData.personalInfo.firstName} {applicationData.personalInfo.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Numéro BAC :</span>
                  <span className="font-medium ml-2">{applicationData.candidateInfo?.baccalaureateNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Année BAC :</span>
                  <span className="font-medium ml-2">{applicationData.candidateInfo?.graduationYear}</span>
                </div>
                <div>
                  <span className="text-gray-600">Série :</span>
                  <span className="font-medium ml-2">{applicationData.candidateInfo?.series}</span>
                </div>
              </div>
            </div>

            {/* Programme choisi */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Programme choisi</h4>
              <div className="text-sm">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{applicationData.selectedProgram?.name}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {applicationData.selectedProgram?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Informations de contact</h4>
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

            {/** Banque */}
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Reférance bancaire</h4>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-2 text-sm'>
                <div className="flex items-center">
                  <Ticket className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{applicationData.bankInfo.reference}</span>
                </div>
                <div  className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{applicationData.bankInfo.agenceRef}</span>
                </div>
                <div  className="flex items-center">
                  <HandCoins className="w-4 h-4 text-gray-400 mr-2" />
                  <span>{(new Date(applicationData.bankInfo.dateRef)).toLocaleDateString("FR", {day: "numeric", month: "long",year: "numeric",})}</span>
                </div>
              </div>
              
            </div>
            {/* Documents
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Documents joints</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    applicationData.documents.transcript ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>Relevé de notes : </span>
                  <span className="font-medium ml-1">
                    {applicationData.documents.transcript?.name || 'Non fourni'}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    applicationData.documents.receipt ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span>Reçu bancaire : </span>
                  <span className="font-medium ml-1">
                    {applicationData.documents.receipt?.name || 'Non fourni'}
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Avertissement */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 mb-1">Attention :</p>
              <p className="text-yellow-700">
                Une fois soumise, votre demande ne pourra plus être modifiée. 
                Assurez-vous que toutes les informations sont correctes.
              </p>
            </div>
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
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
            Retour
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-faculty-purple-600 text-white rounded-sm hover:bg-faculty-purple-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Soumission en cours...</span>
              </>
            ) : (
              <span>Soumettre la demande</span>
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
          Félicitations !
        </h2>
        <p className="text-lg text-gray-600">
          Votre demande de pré-inscription a été soumise avec succès
        </p>
        <div className="bg-faculty-purple-50 border border-faculty-purple-200 rounded-lg p-4">
          <p className="text-faculty-purple-800">
            <span className="font-semibold">Numéro de demande :</span> 
            <span className="font-mono text-lg ml-2">{applicationNumber}</span>
          </p>
        </div>
      </div>

      {/* Application Summary */}
      <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
        <h3 className="font-semibold text-gray-800 text-lg mb-4 text-center">
          Récapitulatif final
        </h3>
        
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Candidat :</span>
            <span className="font-semibold">
              {applicationData.personalInfo.firstName} {applicationData.personalInfo.lastName}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Programme :</span>
            <span className="font-semibold">{applicationData.selectedProgram?.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Email :</span>
            <span className="font-semibold">{applicationData.personalInfo.email}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Téléphone :</span>
            <span className="font-semibold">{applicationData.personalInfo.telephone}</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
        <h4 className="font-semibold text-blue-800 mb-3">Prochaines étapes :</h4>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Vous recevrez un email de confirmation à {applicationData.personalInfo.email}
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Vos documents seront vérifiés par notre équipe administrative
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Les résultats de pré-sélection seront publiés le 15 septembre 2025
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Conservez votre numéro de demande pour le suivi : {applicationNumber}
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-800 mb-3">Besoin d'aide ?</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-faculty-purple-600" />
            scolarite@sciences.univ-antananarivo.mg
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-faculty-purple-600" />
            +261 20 22 279 95
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
          Imprimer le récépissé
        </button>
        
        <button
          onClick={onComplete}
          className="px-6 py-3 bg-faculty-purple-600 text-white rounded-lg hover:bg-faculty-purple-700 transition-colors duration-200"
        >
          Retourner à l'accueil
        </button>
      </div>
    </div>
  );
};