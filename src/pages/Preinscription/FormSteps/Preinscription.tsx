import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const Preinscription: React.FC = () => {
  const requirements = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: 'Documents requis',
      items: ['Relevé de notes du baccalauréat', 'Reçu de paiement des frais de dossier']
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: 'Délais',
      items: ['Période d\'inscription ouverte', 'Traitement sous 24-48h']
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: 'Séries éligibles',
      items: ['Série S, C, D pour tous les programmes', 'Série S, C uniquement pour MIT']
    }
  ];

  const steps = [
    'Vérification d\'éligibilité',
    'Sélection du programme',
    'Information personnelle et réferance bancaire',
    'Confirmation et soumission'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pré-inscription en ligne
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Simplifiez votre inscription à la Faculté des Sciences d'Antananarivo 
            avec notre système de pré-inscription en ligne sécurisé.
          </p>
        </div>

        {/* Process Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Processus d'inscription en 4 étapes
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-faculty-purple-700 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {requirements.map((req, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <div className="flex items-center space-x-3 mb-4">
                {req.icon}
                <h3 className="text-lg font-semibold text-gray-900">{req.title}</h3>
              </div>
              <ul className="space-y-2">
                {req.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-faculty-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-12">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">Informations importantes</h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Assurez-vous d'avoir tous les documents requis avant de commencer</li>
                <li>• Les fichiers doivent être au format image (PNG, JPG) et ne pas dépasser 5 MB</li>
                <li>• Une fois soumise, votre candidature ne peut plus être modifiée</li>
                <li>• Vous recevrez une confirmation par email dans les 24-48 heures</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/formulaire"
            className="inline-flex items-center bg-faculty-purple-700 hover:bg-faculty-purple-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 space-x-3"
          >
            <span>Commencer ma pré-inscription</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Processus sécurisé • Données protégées • Support technique disponible
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preinscription;