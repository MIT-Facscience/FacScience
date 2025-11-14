import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const PreinscriptionClosed: React.FC = () => {
  const { t } = useTranslation("admission");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-orange-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("preinscription.closed.title", "Préinscription terminée")}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {t("preinscription.closed.message", "La période de préinscription est actuellement fermée.")}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {t("preinscription.closed.info.title", "Informations importantes")}
                  </h3>
                  <p className="text-sm text-blue-800">
                    {t("preinscription.closed.info.description", "Les préinscriptions pour cette année académique sont terminées. Veuillez consulter notre site pour les prochaines périodes d'inscription.")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                to="/admission/modalite"
                className="inline-block w-full md:w-auto bg-faculty-purple-700 hover:bg-faculty-purple-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t("preinscription.closed.backToAdmission", "Retour aux modalités d'admission")}
              </Link>
              <div className="text-sm text-gray-500">
                <Link to="/" className="text-faculty-purple-700 hover:underline">
                  {t("preinscription.closed.backToHome", "Retour à l'accueil")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreinscriptionClosed;

