import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface StepProgressProps {
  currentStep: number;
  stepTitles: string[];
  /** Permet de revenir sur une étape déjà validée. */
  onStepClick?: (step: number) => void;
}

/**
 * Indicateur d'avancement du parcours. Version complète (pastilles reliées)
 * à partir de `md`, version compacte (barre segmentée) en dessous.
 * Les étapes déjà validées sont cliquables : on peut corriger une réponse sans
 * enchaîner les "Retour".
 */
export function StepProgress({
  currentStep,
  stepTitles,
  onStepClick,
}: StepProgressProps) {
  const { t } = useTranslation("admission");
  const totalSteps = stepTitles.length;
  const currentTitle = stepTitles[currentStep - 1] ?? "";

  return (
    <nav aria-label={t("formulaire.progress.ariaLabel")} className="w-full">
      {/* Mobile */}
      <div className="md:hidden">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <p className="text-xs font-semibold text-ps-ink sm:text-sm">
            <span className="text-ps-violet-600">
              {t("formulaire.progress.stepCounter", {
                current: currentStep,
                total: totalSteps,
              })}
            </span>{" "}
            <span className="font-medium text-ps-muted">{currentTitle}</span>
          </p>
          <span className="text-[11px] font-medium text-ps-muted sm:text-xs">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          {stepTitles.map((title, index) => (
            <span
              key={title}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                index + 1 < currentStep
                  ? "bg-ps-gold-500"
                  : index + 1 === currentStep
                  ? "bg-ps-violet-600"
                  : "bg-ps-line"
              )}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <ol className="hidden items-center md:flex">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          const canGoBack = isCompleted && Boolean(onStepClick);
          const badge = (
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                isCompleted &&
                  "bg-ps-gold-500 text-ps-ink shadow-[0_8px_18px_-8px_rgba(148,113,12,0.8)]",
                isCurrent &&
                  "bg-ps-violet-600 text-white ring-4 ring-ps-violet-600/15",
                !isCompleted &&
                  !isCurrent &&
                  "border border-ps-line bg-white/70 text-ps-muted"
              )}
            >
              {isCompleted ? (
                <Check className="size-5" strokeWidth={2.25} />
              ) : (
                stepNumber
              )}
            </span>
          );
          const label = (
            <span
              className={cn(
                "text-sm leading-tight",
                isCurrent
                  ? "font-semibold text-ps-ink"
                  : "font-medium text-ps-muted"
              )}
            >
              {title}
            </span>
          );

          return (
            <li
              key={title}
              className={cn(
                "flex items-center",
                index < totalSteps - 1 && "flex-1"
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {canGoBack ? (
                <button
                  type="button"
                  onClick={() => onStepClick?.(stepNumber)}
                  aria-label={t("formulaire.progress.goToStep", {
                    step: stepNumber,
                    title,
                  })}
                  className="flex items-center gap-3 rounded-full py-1 pr-2 text-left transition-opacity hover:opacity-80"
                >
                  {badge}
                  {label}
                </button>
              ) : (
                <div className="flex items-center gap-3 py-1">
                  {badge}
                  {label}
                </div>
              )}
              {index < totalSteps - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-4 h-px flex-1 rounded-full transition-colors duration-300",
                    isCompleted ? "bg-ps-gold-400" : "bg-ps-line"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
