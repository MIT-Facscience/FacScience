import type { CandidateInfo } from "../types";
import type { ResData } from "../types/models";

/**
 * Séries de baccalauréat qui ne donnent pas accès aux filières scientifiques
 * de la faculté. Toutes les autres séries sont considérées comme éligibles.
 */
const NOT_ELIGIBLE_SERIES = new Set(["L", "OSE", "A1", "A2"]);

export type BacSeries = CandidateInfo["series"];

/**
 * `nom_prenom` arrive sous la forme "NOM Prénom1 Prénom2" : le dernier segment
 * est le nom de famille, tout ce qui précède constitue le prénom.
 */
export function splitFullName(nomPrenom: string): {
  firstName: string;
  lastName: string;
} {
  const parts = (nomPrenom ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts.slice(0, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
}

export function isEligibleSeries(series: string): boolean {
  return !NOT_ELIGIBLE_SERIES.has(series);
}

/**
 * Transforme la réponse brute du web service en modèle exploitable par le
 * parcours de pré-inscription.
 */
export function mapResDataToCandidateInfo(
  resData: ResData,
  numBacc: string,
  anneeBacc: number
): CandidateInfo {
  const { firstName, lastName } = splitFullName(resData.nom_prenom);
  const series = (resData.option ?? "OSE") as BacSeries;

  return {
    id: `${numBacc}-${anneeBacc}`,
    firstName,
    lastName,
    baccalaureateNumber: numBacc,
    graduationYear: anneeBacc,
    series,
    isEligible: isEligibleSeries(series),
  };
}
