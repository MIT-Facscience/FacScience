import type { CandidateInfo, Program } from "../types";

/**
 * Machine à états du parcours de pré-inscription "Bacc Malagasy".
 *
 * 1. Éligibilité   -> candidat identifié à partir du numéro + année de bac
 * 2. Portail       -> choix du portail (nom, prénom et série affichés)
 * 3. Banque        -> référence du reçu bancaire
 * 4. Contact       -> e-mail et téléphone
 * 5. Confirmation  -> récapitulatif, envoi et écran de succès
 */
export const TOTAL_STEPS = 5;

export type ProgramsStatus = "idle" | "loading" | "ready" | "error";

export interface WizardState {
  step: number;
  candidate: CandidateInfo | null;
  programs: Program[];
  programsStatus: ProgramsStatus;
  selectedProgram: Program | null;
  /**
   * Références bancaires du dossier. Une préinscription peut en porter
   * plusieurs (paiement en plusieurs fois) ; la première est la référence
   * principale, seule retenue par le modèle backend `preinscription.ref_bancaire`.
   */
  bankReferences: string[];
  email: string;
  telephone: string;
  /** idPortail (normalisés en chaîne) déjà préinscrits cette année universitaire. */
  registeredPortals: string[];
}

export const initialWizardState: WizardState = {
  step: 1,
  candidate: null,
  programs: [],
  programsStatus: "idle",
  selectedProgram: null,
  bankReferences: [],
  email: "",
  telephone: "",
  registeredPortals: [],
};

export type WizardAction =
  | { type: "restart" }
  | { type: "eligibilitySucceeded"; candidate: CandidateInfo }
  | { type: "programsLoaded"; programs: Program[] }
  | { type: "programsFailed" }
  | { type: "programSelected"; program: Program }
  | { type: "bankReferencesChanged"; references: string[] }
  | { type: "contactChanged"; email: string; telephone: string }
  | { type: "registeredPortalsLoaded"; portals: string[] }
  | { type: "newPortalRequested" }
  | { type: "goToStep"; step: number };

export function wizardReducer(
  state: WizardState,
  action: WizardAction
): WizardState {
  switch (action.type) {
    case "restart":
      return initialWizardState;

    case "eligibilitySucceeded":
      return {
        ...state,
        candidate: action.candidate,
        // Les portails sont rechargés pour cette série : on repart d'une liste vide.
        programs: [],
        programsStatus: "loading",
        selectedProgram: null,
      };

    case "programsLoaded":
      return { ...state, programs: action.programs, programsStatus: "ready" };

    case "programsFailed":
      return { ...state, programs: [], programsStatus: "error" };

    case "programSelected":
      return { ...state, selectedProgram: action.program };

    case "bankReferencesChanged":
      return { ...state, bankReferences: action.references };

    case "contactChanged":
      return { ...state, email: action.email, telephone: action.telephone };

    case "registeredPortalsLoaded":
      return { ...state, registeredPortals: action.portals };

    // Inscription dans un autre portail : on revient au choix du portail en
    // oubliant le portail et le reçu précédents (la référence bancaire doit
    // être unique), mais en conservant l'identité et les coordonnées.
    case "newPortalRequested":
      return {
        ...state,
        step: 2,
        selectedProgram: null,
        bankReferences: [],
      };

    case "goToStep":
      return { ...state, step: Math.min(Math.max(action.step, 1), TOTAL_STEPS) };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Brouillon de session                                                */
/* ------------------------------------------------------------------ */

export type FormationType = "academique" | "professionnalisante";
export type BacType = "mg" | "etg";

export interface WizardDraft {
  formationType: FormationType | null;
  bacType: BacType;
  /**
   * `bankReference` (chaîne unique) n'est présent que dans les brouillons
   * enregistrés avant le passage au multi-référence ; il est lu en secours.
   */
  wizard: WizardState & { bankReference?: string };
}

const STORAGE_KEY = "ps-preinscription-draft-v1";

export const emptyDraft: WizardDraft = {
  formationType: null,
  bacType: "mg",
  wizard: initialWizardState,
};

/**
 * Dernière étape atteignable compte tenu des données déjà saisies. Évite de
 * restaurer un brouillon sur une étape dont les données auraient disparu.
 */
function lastReachableStep(state: WizardState): number {
  if (!state.candidate) return 1;
  if (!state.selectedProgram) return 2;
  if (state.bankReferences.length === 0) return 3;
  if (!state.email || !state.telephone) return 4;
  return TOTAL_STEPS;
}

/** Recharge le brouillon de l'onglet courant (sessionStorage), si valide. */
export function loadWizardDraft(): WizardDraft {
  if (typeof window === "undefined") return emptyDraft;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyDraft;

    const parsed = JSON.parse(raw) as Partial<WizardDraft>;
    const candidate = parsed.wizard?.candidate ?? null;
    if (!candidate?.baccalaureateNumber) return emptyDraft;

    const restored: WizardState = {
      ...initialWizardState,
      candidate,
      selectedProgram: parsed.wizard?.selectedProgram ?? null,
      // Les brouillons enregistrés avant le multi-référence ne portent qu'une
      // chaîne unique : on les relit sans perdre la saisie du candidat.
      bankReferences:
        parsed.wizard?.bankReferences ??
        (parsed.wizard?.bankReference ? [parsed.wizard.bankReference] : []),
      email: parsed.wizard?.email ?? "",
      telephone: parsed.wizard?.telephone ?? "",
      registeredPortals: parsed.wizard?.registeredPortals ?? [],
    };
    const step = Math.min(
      Math.max(parsed.wizard?.step ?? 1, 1),
      lastReachableStep(restored)
    );

    return {
      formationType: parsed.formationType ?? null,
      bacType: parsed.bacType === "etg" ? "etg" : "mg",
      wizard: {
        ...restored,
        step,
        // Les portails ne sont pas persistés : ils seront rechargés au montage.
        programsStatus: step >= 2 ? "loading" : "idle",
      },
    };
  } catch {
    return emptyDraft;
  }
}

export function saveWizardDraft(draft: WizardDraft): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // sessionStorage indisponible (navigation privée) : on continue sans brouillon.
  }
}

export function clearWizardDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignoré
  }
}
