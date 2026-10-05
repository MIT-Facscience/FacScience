import { ArrowLeft, ArrowRight, RefreshCw, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { CandidateInfo, Program } from "../types";
import type { ProgramsStatus } from "../wizard/state";
import { cn } from "@/lib/utils";
import { Button, GlassPanel, InlineError } from "../ui/primitives";

interface StepPortalProps {
  candidate: CandidateInfo;
  programs: Program[];
  programsStatus: ProgramsStatus;
  selectedProgram: Program | null;
  /** Portails déjà préinscrits cette année universitaire (id en chaîne). */
  registeredPortals: string[];
  onBack: () => void;
  onRetry: () => void;
  onNext: (program: Program) => void;
}

/**
 * Étape 2 : le candidat est déjà identifié (nom, prénom et série issus du
 * web service). Il choisit ici le portail qu'il souhaite rejoindre.
 */
export function StepPortal({
  candidate,
  programs,
  programsStatus,
  selectedProgram,
  registeredPortals,
  onBack,
  onRetry,
  onNext,
}: StepPortalProps) {
  const { t } = useTranslation("admission");

  const isRegistered = (program: Program) =>
    registeredPortals.includes(String(program.idPortail));

  // Un portail déjà préinscrit n'est pas sélectionnable : on ne le présélectionne
  // donc jamais (cas du retour après une première inscription).
  const [choice, setChoice] = useState<Program | null>(() =>
    selectedProgram && !registeredPortals.includes(String(selectedProgram.idPortail))
      ? selectedProgram
      : null
  );

  const remaining = programs.filter((program) => !isRegistered(program));

  const initials = useMemo(() => {
    const first = candidate.firstName.charAt(0);
    const last = candidate.lastName.charAt(0);
    return `${first}${last}`.toUpperCase() || "?";
  }, [candidate.firstName, candidate.lastName]);

  const fullName = [candidate.firstName, candidate.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="ps-rise space-y-5 sm:space-y-8">
      <header className="space-y-2 sm:space-y-3">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ps-ink sm:text-3xl">
          {t("formulaire.stepPortal.title")}
        </h2>
        <p className="max-w-[60ch] text-sm leading-relaxed text-ps-muted sm:text-[0.98rem]">
          {t("formulaire.stepPortal.subtitle")}
        </p>
      </header>

      {/* Identité confirmée par la vérification d'éligibilité */}
      <GlassPanel className="flex items-center gap-3 p-3.5 sm:justify-between sm:gap-5 sm:p-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ps-violet-600 text-sm font-semibold text-white sm:size-14 sm:rounded-2xl sm:text-lg"
          >
            {initials}
          </span>
          <div className="min-w-0">
            <p className="hidden text-xs font-medium tracking-wide text-ps-muted uppercase sm:block">
              {t("formulaire.identity.verifiedCandidate")}
            </p>
            <p className="break-words font-display text-[0.95rem] font-semibold text-ps-ink sm:text-xl">
              {fullName || t("formulaire.identity.unknownName")}
            </p>
            {/* Sur mobile, les métadonnées tiennent sur une seule ligne. */}
            <p className="mt-0.5 text-xs text-ps-muted tabular-nums sm:hidden">
              {t("formulaire.identity.series")} {candidate.series} ·{" "}
              {t("formulaire.identity.bacNumber")} {candidate.baccalaureateNumber}{" "}
              · {candidate.graduationYear}
            </p>
          </div>
        </div>

        <dl className="hidden gap-3 sm:grid sm:grid-cols-3">
          <div className="rounded-2xl bg-white/70 px-3.5 py-2.5">
            <dt className="text-xs font-medium text-ps-muted">
              {t("formulaire.identity.series")}
            </dt>
            <dd className="font-semibold text-ps-violet-700">
              {candidate.series}
            </dd>
          </div>
          <div className="rounded-2xl bg-white/70 px-3.5 py-2.5">
            <dt className="text-xs font-medium text-ps-muted">
              {t("formulaire.identity.bacNumber")}
            </dt>
            <dd className="font-semibold text-ps-ink tabular-nums">
              {candidate.baccalaureateNumber}
            </dd>
          </div>
          <div className="rounded-2xl bg-white/70 px-3.5 py-2.5">
            <dt className="text-xs font-medium text-ps-muted">
              {t("formulaire.identity.bacYear")}
            </dt>
            <dd className="font-semibold text-ps-ink tabular-nums">
              {candidate.graduationYear}
            </dd>
          </div>
        </dl>
      </GlassPanel>

      <section className="space-y-3 sm:space-y-4">
        {programsStatus === "loading" && (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2].map((row) => (
              <div key={row} className="ps-skeleton h-16 w-full sm:h-[4.5rem]" />
            ))}
            <p className="text-sm text-ps-muted">
              {t("formulaire.stepTwoThree.loadingPortals")}
            </p>
          </div>
        )}

        {programsStatus === "error" && (
          <div className="space-y-3">
            <InlineError message={t("formulaire.stepPortal.loadError")} />
            <Button
              variant="secondary"
              onClick={onRetry}
              icon={<RefreshCw className="size-4" strokeWidth={2} />}
            >
              {t("formulaire.stepPortal.retry")}
            </Button>
          </div>
        )}

        {programsStatus === "ready" && programs.length === 0 && (
          <p className="rounded-2xl border border-ps-line bg-white/70 px-4 py-6 text-center text-sm text-ps-muted">
            {t("formulaire.stepPortal.empty")}
          </p>
        )}

        {programsStatus === "ready" && programs.length > 0 && (
          <div
            role="radiogroup"
            aria-label={t("formulaire.stepTwoThree.choosePortal")}
            className="grid gap-2.5 sm:gap-3"
          >
            {programs.map((program) => {
              const isSelected = choice?.idPortail === program.idPortail;
              const done = isRegistered(program);
              return (
                <label
                  key={program.idPortail}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition sm:gap-4 sm:px-4 sm:py-4",
                    done
                      ? "cursor-not-allowed border-ps-line bg-white/40"
                      : "cursor-pointer bg-white/70 hover:border-ps-violet-300 hover:bg-white",
                    isSelected
                      ? "border-ps-violet-600 bg-white ring-2 ring-ps-violet-600/15"
                      : !done && "border-ps-line"
                  )}
                >
                  <input
                    type="radio"
                    name="portail"
                    value={program.idPortail}
                    checked={isSelected}
                    disabled={done}
                    onChange={() => setChoice(program)}
                    className="size-5 shrink-0 accent-ps-violet-600 disabled:opacity-40"
                  />
                  <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2">
                    <span
                      className={cn(
                        "font-semibold",
                        done ? "text-ps-muted" : "text-ps-ink"
                      )}
                    >
                      {program.nomPortail}
                    </span>
                    {program.abbreviation && (
                      <span className="text-xs text-ps-muted sm:text-sm">
                        {program.abbreviation}
                      </span>
                    )}
                  </span>
                  {done && (
                    <span className="shrink-0 rounded-full bg-ps-gold-100 px-2.5 py-1 text-[11px] font-semibold text-ps-gold-800 sm:px-3 sm:text-xs">
                      {t("formulaire.stepPortal.alreadyRegistered")}
                    </span>
                  )}
                  {!done && isSelected && (
                    <span className="hidden rounded-full bg-ps-gold-100 px-3 py-1 text-xs font-semibold text-ps-gold-800 sm:inline-block">
                      {t("formulaire.stepPortal.selected")}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        )}
      </section>

      {(registeredPortals.length > 0 || remaining.length === 0) &&
        programsStatus === "ready" &&
        programs.length > 0 && (
          <p className="rounded-2xl border border-ps-gold-200 bg-ps-gold-50 px-3.5 py-3 text-xs text-ps-gold-800 sm:text-sm">
            {remaining.length === 0
              ? t("formulaire.stepPortal.allRegistered")
              : t("formulaire.stepPortal.registeredHint")}
          </p>
        )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          icon={<ArrowLeft className="size-4" strokeWidth={2} />}
        >
          {t("formulaire.stepTwoThree.buttons.back")}
        </Button>
        <Button
          onClick={() => choice && onNext(choice)}
          disabled={!choice}
          className="grow justify-center sm:grow-0"
          icon={<ArrowRight className="size-4" strokeWidth={2} />}
        >
          {t("formulaire.stepTwoThree.buttons.continue")}
        </Button>
      </div>

      <p className="hidden items-center gap-2 text-xs text-ps-muted sm:flex">
        <UserRound className="size-3.5" strokeWidth={1.75} />
        {t("formulaire.identity.hint")}
      </p>
    </div>
  );
}
