import { ArrowLeft, ArrowRight, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isValidEmail, isValidTel } from "../api/api";
import { Button, Field, GlassPanel } from "../ui/primitives";

interface StepContactProps {
  initialEmail: string;
  initialTelephone: string;
  onBack: () => void;
  onNext: (email: string, telephone: string) => void;
}

/**
 * Étape 4 : coordonnées du candidat. Le numéro de téléphone est normalisé à la
 * saisie (chiffres, "+" et espaces uniquement) puis validé au format malgache.
 */
export function StepContact({
  initialEmail,
  initialTelephone,
  onBack,
  onNext,
}: StepContactProps) {
  const { t } = useTranslation("admission");
  const [email, setEmail] = useState(initialEmail);
  const [telephone, setTelephone] = useState(initialTelephone);

  const emailValid = isValidEmail(email);
  const phoneValid = isValidTel(telephone);
  const canContinue = emailValid && phoneValid;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canContinue) return;
    onNext(email.trim(), telephone.trim());
  };

  return (
    <div className="ps-rise space-y-5 sm:space-y-8">
      <header className="space-y-2 sm:space-y-3">
        <p className="hidden items-center gap-2 rounded-full bg-ps-violet-100 px-3.5 py-1.5 text-xs font-semibold text-ps-violet-700 sm:inline-flex">
          <Send className="size-4" strokeWidth={2} />
          {t("formulaire.stepContact.badge")}
        </p>
        <h2 className="font-display text-xl font-semibold tracking-tight text-ps-ink sm:text-3xl">
          {t("formulaire.stepTwoThree.contactInfo.title")}
        </h2>
        <p className="max-w-[60ch] text-sm leading-relaxed text-ps-muted sm:text-[0.98rem]">
          {t("formulaire.stepContact.subtitle")}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <GlassPanel soft className="grid gap-4 p-4 sm:grid-cols-2 sm:gap-5 sm:p-6">
          <Field
            id="email"
            label={t("formulaire.stepTwoThree.contactInfo.email.label")}
            required
            hint={t("formulaire.stepContact.emailHint")}
            error={
              email && !emailValid
                ? t("formulaire.stepContact.emailInvalid")
                : undefined
            }
          >
            <div className="relative">
              <Mail
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ps-violet-400"
                strokeWidth={1.75}
              />
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoFocus
                placeholder={t(
                  "formulaire.stepTwoThree.contactInfo.email.placeholder"
                )}
                value={email}
                aria-invalid={Boolean(email) && !emailValid}
                onChange={(event) => setEmail(event.target.value)}
                className="ps-input pl-12"
              />
            </div>
          </Field>

          <Field
            id="telephone"
            label={t("formulaire.stepTwoThree.contactInfo.phone.label")}
            required
            hint={t("formulaire.stepTwoThree.contactInfo.phone.placeholder")}
            error={
              telephone && !phoneValid
                ? t("formulaire.stepTwoThree.contactInfo.phone.invalid")
                : undefined
            }
          >
            <div className="relative">
              <Phone
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ps-violet-400"
                strokeWidth={1.75}
              />
              <input
                id="telephone"
                name="telephone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="033XXXXXXX"
                value={telephone}
                aria-invalid={Boolean(telephone) && !phoneValid}
                onChange={(event) => {
                  let value = event.target.value.replace(/[^0-9+\s]/g, "");
                  if (value.indexOf("+") > 0) value = value.replace(/\+/g, "");
                  value = value.startsWith("+261")
                    ? value.slice(0, 13)
                    : value.slice(0, 10);
                  setTelephone(value);
                }}
                className="ps-input pl-12 tabular-nums"
              />
            </div>
          </Field>
        </GlassPanel>

        <p className="text-xs text-ps-muted sm:text-sm">
          {t("formulaire.stepContact.privacy")}
        </p>

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
            disabled={!canContinue}
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
