import { BACKEND_PREINSCRIPTION_URL } from "@/lib/api";
import type { Program } from "../types";

/**
 * Récupère les portails ouverts à une série de baccalauréat donnée.
 * Lève une erreur si le serveur répond autre chose que 200, afin que l'étape
 * "choix du portail" puisse afficher un vrai état d'erreur (et non un vide).
 */
export const getProgramsBySeries = async (
  series: string,
  academic: boolean,
  signal?: AbortSignal
): Promise<Program[]> => {
  const res = await fetch(
    `${BACKEND_PREINSCRIPTION_URL}/api/Register/portail/${encodeURIComponent(
      series
    )}/${academic}`,
    { method: "GET", signal }
  );

  if (!res.ok) {
    throw new Error(`Impossible de charger les portails (${res.status})`);
  }

  const data = (await res.json()) as Program[];
  return Array.isArray(data) ? data : [];
};

export const getPrograms = async (signal?: AbortSignal): Promise<Program[]> => {
  const res = await fetch(
    `${BACKEND_PREINSCRIPTION_URL}/api/Register/getallportails`,
    { method: "GET", signal }
  );

  if (!res.ok) {
    throw new Error(`Impossible de charger les portails (${res.status})`);
  }

  const data = (await res.json()) as Program[];
  return Array.isArray(data) ? data : [];
};
