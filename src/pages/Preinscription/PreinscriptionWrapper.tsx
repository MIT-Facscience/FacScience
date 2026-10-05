import React, { useEffect, useState } from 'react';
import Formulaire from './Formulaire';
import PreinscriptionClosed from './PreinscriptionClosed';
import { checkPreinscriptionStatus } from './api/api';

/**
 * Le statut d'ouverture est vérifié en arrière-plan : le formulaire s'affiche
 * immédiatement (plus d'écran d'attente au démarrage). Si le serveur indique
 * que les inscriptions sont fermées, l'écran dédié prend le relais.
 */
const PreinscriptionWrapper: React.FC = () => {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    checkPreinscriptionStatus(controller.signal)
      .then((status) => {
        if (!controller.signal.aborted) setIsClosed(status.isClosed);
      })
      .catch(() => {
        // En cas d'erreur réseau on laisse le formulaire accessible.
      });

    return () => controller.abort();
  }, []);

  if (isClosed) {
    return <PreinscriptionClosed />;
  }

  return <Formulaire />;
};

export default PreinscriptionWrapper;
