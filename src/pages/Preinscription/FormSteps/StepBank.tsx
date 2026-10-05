import { ArrowLeft, ArrowRight, Landmark, Ticket } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Field, GlassPanel } from "../ui/primitives";

interface StepBankProps {
  initialReference: string;
  onBack: () => void;
  onNext: (reference: string) => void;
}

const MAX_LENGTH = 12;

/**
 * Étape 3 : référence du reçu bancaire. Les champs "agence" et "date" ont été
 * retirés, ils n'étaient pas exploitables pour le traitement du dossier.
 */
export function StepBank({ initialReference, onBack, onNext }: StepBankProps) {
  const { t } = useTranslation("admission");
  const [reference, setReference] = useState(initialReference);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = reference.trim();

    if (!value) {
      setError(t("formulaire.stepBank.errors.required"));
      return;
    }
    if (value.length < 4) {
      setError(t("formulaire.stepBank.errors.tooShort"));
      return;
    }

    setError("");
    onNext(value);
  };

  return (
    <div className="ps-rise space-y-5 sm:space-y-8">
      <header className="space-y-2 sm:space-y-3">
        <p className="hidden items-center gap-2 rounded-full bg-ps-violet-100 px-3.5 py-1.5 text-xs font-semibold text-ps-violet-700 sm:inline-flex">
          <Landmark className="size-4" strokeWidth={2} />
          {t("formulaire.stepBank.badge")}
        </p>
        <h2 className="font-display text-xl font-semibold tracking-tight text-ps-ink sm:text-3xl">
          {t("formulaire.stepTwoThree.bankInfo.title")}
        </h2>
        <p className="max-w-[60ch] text-sm leading-relaxed text-ps-muted sm:text-[0.98rem]">
          {t("formulaire.stepBank.subtitle")}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <GlassPanel soft className="space-y-3 p-4 sm:space-y-4 sm:p-6">
          <Field
            id="bankReference"
            label={t("formulaire.stepTwoThree.bankInfo.reference.label")}
            required
            hint={t("formulaire.stepBank.hint")}
            error={error || undefined}
          >
            <div className="relative">
              <Ticket
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ps-violet-400"
                strokeWidth={1.75}
              />
              <input
                id="bankReference"
                name="bankReference"
                type="text"
                autoComplete="off"
                autoFocus
                spellCheck={false}
                placeholder={t(
                  "formulaire.stepTwoThree.bankInfo.reference.placeholder"
                )}
                value={reference}
                maxLength={MAX_LENGTH}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby={error ? "bankReference-error" : undefined}
                onChange={(event) => {
                  setReference(event.target.value.toUpperCase());
                  if (error) setError("");
                }}
                className="ps-input pl-12 font-semibold tracking-wide uppercase"
              />
            </div>
          </Field>

          <p className="hidden text-xs text-ps-muted tabular-nums sm:block">
            {t("formulaire.stepBank.counter", {
              length: reference.trim().length,
              max: MAX_LENGTH,
            })}
          </p>
        </GlassPanel>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={onBack}
            icon={<ArrowLeft className="size-4" strokeWidth={2} />}
          >
            {t("formulaire.stepTwoThree.buttons.back")}
          </Button>
          <Button
            type="submit"
            disabled={!reference.trim()}
            className="grow justify-center sm:grow-0"
            icon={<ArrowRight className="size-4" strokeWidth={2} />}
          >
            {t("formulaire.stepTwoThree.buttons.continue")}
          </Button>
        </div>
      </form>
    </div>
  );
}
