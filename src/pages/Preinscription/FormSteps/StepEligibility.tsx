import { BadgeCheck, ChevronDown, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchCandidateInfo } from "../api/api";
import type { CandidateInfo } from "../types";
import { mapResDataToCandidateInfo } from "../utils/candidate";
import { Button, Field, GlassPanel, InlineError } from "../ui/primitives";

interface StepEligibilityProps {
  onVerified: (candidate: CandidateInfo) => void;
}

const MIN_YEAR = 2022;

/**
 * Étape 1 : l'étudiant saisit son numéro de baccalauréat et l'année
 * d'obtention. Le web service renvoie son nom, son prénom et sa série :
 * ces informations seront affichées à l'étape suivante (choix du portail).
 */

export function StepEligibility({ onVerified }: StepEligibilityProps) {
  const { t } = useTranslation("admission");

  const [bacNumber, setBacNumber] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - MIN_YEAR + 1 },
      (_, index) => currentYear - index
    );
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isVerifying) return;
    setError("");

    if (!bacNumber.trim() || !year) {
      setError(t("formulaire.stepOne.errors.requiredFields"));
      return;
    }

    setIsVerifying(true);
    try {
      const resData = await fetchCandidateInfo(bacNumber.trim(), Number(year));
      const candidate = mapResDataToCandidateInfo(
        resData,
        bacNumber.trim(),
        Number(year)
      );

      if (!candidate.isEligible) {
        setError(t("formulaire.stepOne.errors.notEligible"));
        return;
      }

      onVerified(candidate);
    } catch {
      setError(t("formulaire.stepOne.errors.candidateNotFound"));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="ps-rise space-y-5 sm:space-y-8">
      <header className="space-y-2 sm:space-y-3">
        <p className="hidden items-center gap-2 rounded-full bg-ps-gold-100 px-3.5 py-1.5 text-xs font-semibold text-ps-gold-800 sm:inline-flex">
          <BadgeCheck className="size-4" strokeWidth={2} />
          {t("formulaire.stepEligibility.badge")}
        </p>
        <h2 className="font-display text-xl font-semibold tracking-tight text-ps-ink sm:text-3xl">
          {t("formulaire.stepOne.title")}
        </h2>
        <p className="max-w-[60ch] text-sm leading-relaxed text-ps-muted sm:text-[0.98rem]">
          {t("formulaire.stepOne.subtitle")}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <GlassPanel soft className="grid gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6">
          <Field
            id="bacNumber"
            label={t("formulaire.stepOne.bacNumberLabel")}
            required
          >
            <input
              id="bacNumber"
              name="bacNumber"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              autoFocus
              pattern="[0-9]*"
              placeholder="3280151"
              value={bacNumber}
              disabled={isVerifying}
              aria-invalid={Boolean(error) || undefined}
              onChange={(event) => {
                const digitsOnly = event.target.value.replace(/\D/g, "");
                setBacNumber(digitsOnly.slice(0, 10));
              }}
              className="ps-input font-medium tracking-wide tabular-nums"
            />
          </Field>

          <Field
            id="graduationYear"
            label={t("formulaire.stepOne.gradYearLabel")}
            required
          >
            <div className="relative">
              <select
                id="graduationYear"
                name="graduationYear"
                value={year}
                disabled={isVerifying}
                aria-invalid={Boolean(error) || undefined}
                onChange={(event) => setYear(event.target.value)}
                className="ps-input appearance-none pr-11"
              >
                <option value="" disabled>
                  {t("formulaire.stepEligibility.yearPlaceholder")}
                </option>
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ps-muted"
                strokeWidth={1.75}
              />
            </div>
          </Field>
        </GlassPanel>

        {error && <InlineError message={error} />}

        <div className="flex flex-wrap items-center justify-end gap-3 sm:justify-between">
          <p className="hidden text-sm text-ps-muted sm:block">
            {t("formulaire.stepEligibility.privacyNote")}
          </p>
          <Button
            type="submit"
            disabled={isVerifying || !bacNumber || !year}
            className="w-full sm:w-auto"
            icon={
              isVerifying ? (
                <Loader2 className="size-5 animate-spin" strokeWidth={2} />
              ) : (
                <Search className="size-5" strokeWidth={2} />
              )
            }
          >
            {isVerifying
              ? t("formulaire.stepOne.buttons.verifying")
              : t("formulaire.stepOne.buttons.verify")}
          </Button>
        </div>
      </form>
    </div>
  );
}
