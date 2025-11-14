import React, { useEffect, useState } from 'react';
import Formulaire from './Formulaire';
import PreinscriptionClosed from './PreinscriptionClosed';
import { checkPreinscriptionStatus } from './api/api';

const PreinscriptionWrapper: React.FC = () => {
  const [isClosed, setIsClosed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await checkPreinscriptionStatus();
        setIsClosed(status.isClosed);
      } catch (error) {
        console.error('Erreur lors de la vérification du statut:', error);
        setIsClosed(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-faculty-purple-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (isClosed) {
    return <PreinscriptionClosed />;
  }

  return <Formulaire />;
};

export default PreinscriptionWrapper;

