import { Briefcase, GraduationCap, LifeBuoy } from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import StepStranger from "./FormSteps/FormStepsStranger/StepStranger";
import { StepBank } from "./FormSteps/StepBank";
import { StepContact } from "./FormSteps/StepContact";
import { StepEligibility } from "./FormSteps/StepEligibility";
import { StepPortal } from "./FormSteps/StepPortal";
import { StepProgress } from "./FormSteps/StepProgress";
import { StepReview } from "./FormSteps/StepReview";
import { fetchRegisteredPortals } from "./api/api";
import { getProgramsBySeries } from "./api/programs";
import type { ApplicationData, CandidateInfo } from "./types/index";
import { GlassPanel } from "./ui/primitives";
import type { BacType, FormationType } from "./wizard/state";
import {
  clearWizardDraft,
  loadWizardDraft,
  saveWizardDraft,
  wizardReducer,
} from "./wizard/state";

/* ------------------------------------------------------------------ */
/* Fragments d'interface (déclarés hors du composant principal pour   */
/* éviter de recréer des composants à chaque rendu).                   */
/* ------------------------------------------------------------------ */

const FormationBanner = memo(function FormationBanner({
  formationType,
  onModify,
}: {
  formationType: FormationType;
  onModify: () => void;
}) {
  const { t } = useTranslation("admission");
  const isAcademic = formationType === "academique";
  const Icon = isAcademic ? GraduationCap : Briefcase;

  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-11 sm:rounded-2xl",
          isAcademic
            ? "bg-ps-violet-100 text-ps-violet-700"
            : "bg-ps-gold-100 text-ps-gold-700"
        )}
      >
        <Icon className="size-4 sm:size-5" strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <p className="hidden text-xs text-ps-muted sm:block">
          {t("formulaire.currentFormation.title")}
        </p>
        <p className="truncate text-sm font-semibold text-ps-ink sm:text-base">
          {isAcademic
            ? t("formulaire.formationChoice.academic.title")
            : t("formulaire.formationChoice.professional.title")}
        </p>
      </div>
      <button
        type="button"
        onClick={onModify}
        className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-ps-violet-700 transition hover:bg-ps-violet-50 sm:ml-1 sm:px-3 sm:py-1.5 sm:text-sm"
      >
        {t("formulaire.currentFormation.modify")}
      </button>
    </div>
  );
});

const BacTypeToggle = memo(function BacTypeToggle({
  value,
  onChange,
}: {
  value: BacType;
  onChange: (value: BacType) => void;
}) {
  const { t } = useTranslation("admission");
  const options: { id: BacType; label: string }[] = [
    { id: "mg", label: t("formulaire.bacType.malagasy") },
    { id: "etg", label: t("formulaire.bacType.foreign") },
  ];

  return (
    <div
      role="radiogroup"
      aria-label={t("formulaire.bacType.label")}
      className="inline-flex shrink-0 rounded-full border border-ps-violet-200/70 bg-white/70 p-0.5 backdrop-blur sm:p-1"
    >
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm",
            value === option.id
              ? "bg-ps-violet-600 text-white shadow-[0_10px_22px_-12px_rgba(120,3,118,0.9)]"
              : "text-ps-muted hover:text-ps-violet-700"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
});

const ACADEMIC_MENTIONS = [
  "PSVT",
  "PHYSIQUE",
  "CHIMIE",
  "MATHEMATIQUE",
  "INFORMATIQUE ET TECHNOLOGIE",
];

const PROFESSIONAL_GROUPS: { label: string; items: string }[] = [
  { label: "physics", items: "LIPSS, LIER, TND, LIGCRR" },
  { label: "chemistry", items: "LISTE, ACP" },
  { label: "svt", items: "FPST, GEODE, PSEG, ENTOAP" },
];

const FormationChoice = memo(function FormationChoice({
  onSelect,
}: {
  onSelect: (type: FormationType) => void;
}) {
  const { t } = useTranslation("admission");

  return (
    <section className="ps-rise">
      <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-2.5 sm:space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-ps-violet-200/70 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-ps-violet-700 backdrop-blur">
            {t("formulaire.hero.badge")}
          </p>
          <h1 className="font-display text-2xl leading-tight font-semibold tracking-tight text-ps-ink sm:text-4xl">
            {t("formulaire.formationChoice.title")}
          </h1>
          <p className="max-w-[52ch] text-[0.98rem] leading-relaxed text-ps-muted">
            {t("formulaire.formationChoice.subtitle")}
          </p>
        </div>

        <div className="ps-glass hidden overflow-hidden rounded-3xl p-2 sm:block">
          <img
            src="/preinscription/campus.webp"
            alt={t("formulaire.formationChoice.imageAlt")}
            width={1280}
            height={960}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-32 w-full rounded-[1.35rem] object-cover sm:h-56"
          />
        </div>
      </div>

      <div className="mt-6 grid items-start gap-3.5 sm:mt-9 sm:gap-5 md:grid-cols-2">
        {/* Formation académique */}
        <button
          type="button"
          onClick={() => onSelect("academique")}
          className="group ps-glass flex flex-col rounded-3xl p-4 text-left transition duration-200 hover:-translate-y-0.5 sm:p-6"
        >
          <div className="flex items-start gap-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-ps-violet-100 text-ps-violet-700 transition group-hover:bg-ps-violet-600 group-hover:text-white">
              <GraduationCap className="size-5" strokeWidth={1.9} />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-ps-ink">
                {t("formulaire.formationChoice.academic.title")}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ps-muted">
                {t("formulaire.formationChoice.academic.description")}
              </p>
            </div>
          </div>

          <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
            {ACADEMIC_MENTIONS.map((mention) => (
              <li
                key={mention}
                className="rounded-full bg-ps-violet-50 px-2.5 py-1 text-[11px] font-medium text-ps-violet-700"
              >
                {mention}
              </li>
            ))}
          </ul>

          <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ps-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-ps-violet-700 sm:mt-5">
            {t("formulaire.formationChoice.academic.chooseButton")}
          </span>
        </button>

        {/* Formation professionnalisante */}
        <button
          type="button"
          onClick={() => onSelect("professionnalisante")}
          className="group ps-glass flex flex-col rounded-3xl p-4 text-left transition duration-200 hover:-translate-y-0.5 sm:p-6"
        >
          <div className="flex items-start gap-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-ps-gold-100 text-ps-gold-700 transition group-hover:bg-ps-gold-500 group-hover:text-ps-ink">
              <Briefcase className="size-5" strokeWidth={1.9} />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-ps-ink">
                {t("formulaire.formationChoice.professional.title")}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ps-muted">
                {t("formulaire.formationChoice.professional.description")}
              </p>
            </div>
          </div>

          <dl className="mt-3 space-y-1 text-[13px] sm:mt-4">
            {PROFESSIONAL_GROUPS.map((group) => (
              <div key={group.label} className="flex gap-1.5">
                <dt className="shrink-0 font-medium text-ps-ink">
                  {t(`formulaire.formationChoice.professional.${group.label}`)} :
                </dt>
                <dd className="text-ps-muted">{group.items}</dd>
              </div>
            ))}
          </dl>

          <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ps-gold-500 px-5 py-2.5 text-sm font-semibold text-ps-ink transition group-hover:bg-ps-gold-400 sm:mt-5">
            {t("formulaire.formationChoice.professional.chooseButton")}
          </span>
        </button>
      </div>
    </section>
  );
});

const SupportNote = memo(function SupportNote() {
  const { t } = useTranslation("admission");
  return (
    <p className="ps-no-print mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[13px] text-ps-muted sm:mt-8 sm:text-sm">
      <LifeBuoy className="size-4 text-ps-violet-500" strokeWidth={1.75} />
      {t("formulaire.support.help")}
      <a
        className="font-semibold text-ps-violet-700 underline decoration-ps-violet-300 underline-offset-4"
        href="mailto:sciencesfaculte@univ-antananarivo.mg"
      >
        sciencesfaculte@univ-antananarivo.mg
      </a>
    </p>
  );
});

/* ------------------------------------------------------------------ */
/* Page principale                                                     */
/* ------------------------------------------------------------------ */

const Formulaire: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("admission");

  // Brouillon de l'onglet : un rafraîchissement accidentel ne fait plus perdre
  // la saisie en cours.
  const initialDraft = useRef(loadWizardDraft()).current;

  const [formationType, setFormationType] = useState<FormationType | null>(
    initialDraft.formationType
  );
  const [showFormationChoice, setShowFormationChoice] = useState(
    !initialDraft.formationType
  );
  const [bacType, setBacType] = useState<BacType>(initialDraft.bacType);
  const [strangerStep, setStrangerStep] = useState(1);
  // Miroir du type de bac pour les gestionnaires stables (useCallback).
  const bacTypeRef = useRef(bacType);
  bacTypeRef.current = bacType;

  const [wizard, dispatch] = useReducer(wizardReducer, initialDraft.wizard);
  // Identifiant de la dernière requête de portails : permet d'ignorer une
  // réponse obsolète quand l'utilisateur relance la vérification.
  const programsRequestId = useRef(0);
  // Étape active (parcours malgache ou étranger).
  const activeStep = bacType === "mg" ? wizard.step : strangerStep;
  const previousStep = useRef(activeStep);

  useEffect(() => {
    if (previousStep.current === activeStep) return;
    previousStep.current = activeStep;
    // La page est centrée avec beaucoup de marge sur grand écran : on remonte
    // simplement en haut du document, à chaque changement d'étape.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  // Sauvegarde du brouillon à chaque avancée (les étapes ne remontent l'état
  // qu'au clic sur "Continuer", donc les écritures restent rares).
  useEffect(() => {
    saveWizardDraft({ formationType, bacType, wizard });
  }, [formationType, bacType, wizard]);

  const malagasyTitles = useMemo(() => {
    const titles = t("formulaire.steps.malagasy", { returnObjects: true });
    return Array.isArray(titles) ? (titles as string[]) : [];
  }, [t]);

  const strangerTitles = useMemo(() => {
    const titles = t("formulaire.steps.stranger", { returnObjects: true });
    return Array.isArray(titles) ? (titles as string[]) : [];
  }, [t]);

  // Identifiant de la requête de portails en cours (évite les réponses obsolètes).
  const loadPrograms = useCallback(
    async (series: string, requestedFormation: FormationType) => {
      const requestId = ++programsRequestId.current;
      try {
        const programs = await getProgramsBySeries(
          series,
          requestedFormation === "academique"
        );
        if (requestId !== programsRequestId.current) return;
        dispatch({ type: "programsLoaded", programs });
      } catch {
        if (requestId !== programsRequestId.current) return;
        dispatch({ type: "programsFailed" });
      }
    },
    []
  );

  const handleFormationChange = useCallback((type: FormationType) => {
    setFormationType(type);
    setShowFormationChoice(false);
    dispatch({ type: "restart" });
    // Les portails sont chargés dès le choix du type de formation, pour que la
    // liste soit prête à l'arrivée sur l'étape 2.
    if (bacTypeRef.current === "mg") void loadPrograms("", type);
  }, [loadPrograms]);

  // Brouillon restauré sur une étape qui a besoin des portails : on les recharge.
  const didRestoreRef = useRef(false);
  useEffect(() => {
    if (didRestoreRef.current) return;
    didRestoreRef.current = true;
    const draft = initialDraft.wizard;
    if (initialDraft.formationType && draft.candidate) {
      if (draft.programsStatus === "loading") {
        void loadPrograms(draft.candidate.series, initialDraft.formationType);
      }
      void loadRegisteredPortals(
        draft.candidate.baccalaureateNumber,
        draft.candidate.graduationYear
      );
    }
    // Exécution unique au montage : le brouillon initial ne change pas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Portails déjà préinscrits cette année universitaire, pour les marquer. */
  const loadRegisteredPortals = useCallback(
    async (numBacc: string, anneeBacc: number) => {
      try {
        const rows = await fetchRegisteredPortals(numBacc, anneeBacc);
        dispatch({
          type: "registeredPortalsLoaded",
          portals: rows.map((row) => String(row.idPortail)),
        });
      } catch {
        // En cas d'échec on n'empêche pas la saisie : la liste reste vide.
        dispatch({ type: "registeredPortalsLoaded", portals: [] });
      }
    },
    []
  );

  const handleEligibilityVerified = useCallback(
    (candidate: CandidateInfo) => {
      dispatch({ type: "eligibilitySucceeded", candidate });
      dispatch({ type: "goToStep", step: 2 });
      // Rechargement avec la série réelle du candidat (la requête lancée dès le
      // choix de la formation ne pouvait pas la connaître).
      if (formationType) void loadPrograms(candidate.series, formationType);
      void loadRegisteredPortals(
        candidate.baccalaureateNumber,
        candidate.graduationYear
      );
    },
    [formationType, loadPrograms, loadRegisteredPortals]
  );

  /** Après un envoi : on rafraîchit la liste des portails déjà traités. */
  const handleNewPortal = useCallback(() => {
    if (wizard.candidate) {
      void loadRegisteredPortals(
        wizard.candidate.baccalaureateNumber,
        wizard.candidate.graduationYear
      );
    }
    dispatch({ type: "newPortalRequested" });
  }, [wizard.candidate, loadRegisteredPortals]);

  const handleRetryPrograms = useCallback(() => {
    if (wizard.candidate && formationType) {
      void loadPrograms(wizard.candidate.series, formationType);
    }
  }, [loadPrograms, wizard.candidate, formationType]);

  const handleModifyFormation = useCallback(() => {
    setShowFormationChoice(true);
    dispatch({ type: "restart" });
  }, []);

  const handleBacTypeChange = useCallback((type: BacType) => {
    setBacType(type);
    setStrangerStep(1);
    dispatch({ type: "restart" });
  }, []);

  const handleStepClick = useCallback((step: number) => {
    dispatch({ type: "goToStep", step });
  }, []);

  /**
   * Dossier envoyé : on efface le brouillon (l'écran de succès reste affiché),
   * pour qu'un rafraîchissement ultérieur reparte d'une page vierge.
   */
  const handleSubmitted = useCallback(() => {
    clearWizardDraft();
  }, []);

  const handleComplete = useCallback(() => {
    clearWizardDraft();
    dispatch({ type: "restart" });
    navigate("/admission/modalite");
  }, [navigate]);

  const applicationData: ApplicationData | null = useMemo(() => {
    if (!wizard.candidate || !wizard.selectedProgram) return null;
    return {
      candidateInfo: wizard.candidate,
      selectedProgram: wizard.selectedProgram,
      personalInfo: {
        firstName: wizard.candidate.firstName,
        lastName: wizard.candidate.lastName,
        email: wizard.email,
        telephone: wizard.telephone,
      },
      bankInfo: { reference: wizard.bankReference },
    };
  }, [wizard.candidate, wizard.selectedProgram, wizard.email, wizard.telephone, wizard.bankReference]);

  return (
    <div className="ps-page ps-scope relative min-h-[100dvh] overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {!formationType || showFormationChoice ? (
          <div className="lg:pt-12">
            <FormationChoice onSelect={handleFormationChange} />
          </div>
        ) : (
          <div>
            <GlassPanel className="p-4 sm:p-7 lg:p-9">
              <div className="ps-no-print flex flex-col gap-3 border-b border-ps-line pb-4 sm:gap-4 sm:pb-6 lg:flex-row lg:items-center lg:justify-between">
                <FormationBanner
                  formationType={formationType}
                  onModify={handleModifyFormation}
                />
                <BacTypeToggle value={bacType} onChange={handleBacTypeChange} />
              </div>

              <div className="ps-no-print pt-4 sm:pt-7">
                <StepProgress
                  currentStep={activeStep}
                  stepTitles={
                    bacType === "mg" ? malagasyTitles : strangerTitles
                  }
                  onStepClick={bacType === "mg" ? handleStepClick : undefined}
                />
              </div>

              <div className="pt-6 sm:pt-9">
                {bacType === "mg" ? (
                  <>
                    {wizard.step === 1 && (
                      <StepEligibility onVerified={handleEligibilityVerified} />
                    )}

                    {wizard.step === 2 && wizard.candidate && (
                      <StepPortal
                        candidate={wizard.candidate}
                        programs={wizard.programs}
                        registeredPortals={wizard.registeredPortals}
                        programsStatus={wizard.programsStatus}
                        selectedProgram={wizard.selectedProgram}
                        onBack={() => dispatch({ type: "goToStep", step: 1 })}
                        onRetry={handleRetryPrograms}
                        onNext={(program) => {
                          dispatch({ type: "programSelected", program });
                          dispatch({ type: "goToStep", step: 3 });
                        }}
                      />
                    )}

                    {wizard.step === 3 && (
                      <StepBank
                        initialReference={wizard.bankReference}
                        onBack={() => dispatch({ type: "goToStep", step: 2 })}
                        onNext={(reference) => {
                          dispatch({ type: "bankReferenceChanged", reference });
                          dispatch({ type: "goToStep", step: 4 });
                        }}
                      />
                    )}

                    {wizard.step === 4 && (
                      <StepContact
                        initialEmail={wizard.email}
                        initialTelephone={wizard.telephone}
                        onBack={() => dispatch({ type: "goToStep", step: 3 })}
                        onNext={(email, telephone) => {
                          dispatch({
                            type: "contactChanged",
                            email,
                            telephone,
                          });
                          dispatch({ type: "goToStep", step: 5 });
                        }}
                      />
                    )}

                    {wizard.step === 5 && applicationData && (
                      <StepReview
                        applicationData={applicationData}
                        onEdit={handleStepClick}
                        onBack={() => dispatch({ type: "goToStep", step: 4 })}
                        onComplete={handleComplete}
                        onSubmitted={handleSubmitted}
                        onNewPortal={handleNewPortal}
                      />
                    )}
                  </>
                ) : (
                  <StepStranger
                    currentStep={strangerStep}
                    onStepChange={setStrangerStep}
                  />
                )}
              </div>
            </GlassPanel>
          </div>
        )}

        <SupportNote />
      </div>
    </div>
  );
};

export default Formulaire;
