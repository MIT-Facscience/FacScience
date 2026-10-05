import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Plus,
  Printer,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitApplication } from "../api/api";
import type {
  ApplicationData,
  PreinscriptionReturn,
  ProblemDetails,
} from "../types";
import { Button, GlassPanel, InlineError } from "../ui/primitives";

interface StepReviewProps {
  applicationData: ApplicationData;
  /** Renvoie vers une étape pour corriger une information. */
  onEdit: (step: number) => void;
  onBack: () => void;
  onComplete: () => void;
  /** Appelé après un envoi réussi (permet d'effacer le brouillon). */
  onSubmitted: () => void;
  /** Relance le parcours pour un autre portail. */
  onNewPortal: () => void;
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 sm:py-2.5">
      <dt className="text-sm text-ps-muted">{label}</dt>
      <dd className="text-sm font-semibold text-ps-ink sm:text-right">
        {value}
      </dd>
    </div>
  );
}

/** Titre de section du récapitulatif, avec un accès direct à l'étape. */
function SectionHeader({
  title,
  step,
  onEdit,
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
}) {
  const { t } = useTranslation("admission");
  return (
    <div className="mb-1 flex items-center justify-between gap-3">
      <h3 className="font-semibold text-ps-ink">{title}</h3>
      <button
        type="button"
        onClick={() => onEdit(step)}
        className="rounded-full px-2.5 py-1 text-sm font-semibold text-ps-violet-700 transition hover:bg-ps-violet-50"
      >
        {t("formulaire.currentFormation.modify")}
      </button>
    </div>
  );
}

/**
 * Étape 5 : récapitulatif, envoi de la demande puis écran de succès avec le
 * numéro de pré-inscription.
 */
export function StepReview({
  applicationData,
  onEdit,
  onBack,
  onComplete,
  onSubmitted,
  onNewPortal,
}: StepReviewProps) {
  const { t } = useTranslation("admission");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<PreinscriptionReturn | null>(null);
  const [error, setError] = useState<ProblemDetails | null>(null);

  const { candidateInfo, personalInfo, selectedProgram, bankInfo } =
    applicationData;
  const fullName = [personalInfo.firstName, personalInfo.lastName]
    .filter(Boolean)
    .join(" ");

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const response = await submitApplication(applicationData);

    if (response.success && response.data) {
      setResult(response.data);
      setIsSubmitted(true);
      onSubmitted();
    } else {
      setError(
        response.error ?? {
          title: t("formulaire.stepFour.errors.unknownError"),
          detail: t("formulaire.stepFour.errors.unknownErrorDetail"),
        }
      );
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="ps-receipt ps-rise space-y-5 text-center sm:space-y-8 print:space-y-3">
        <p className="hidden text-center font-display text-base font-semibold text-ps-ink print:block">
          {t("formulaire.stepFour.buttons.receiptTitle")}
        </p>

        <div className="flex justify-center print:hidden">
          <span className="flex size-16 items-center justify-center rounded-full bg-ps-gold-100 sm:size-20">
            <CheckCircle2
              className="size-9 text-ps-gold-600 sm:size-11"
              strokeWidth={1.75}
            />
          </span>
        </div>

        <div className="space-y-3 print:space-y-1">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ps-ink sm:text-3xl print:text-lg">
            {t("formulaire.stepFour.success.title")}
          </h2>
          <p className="mx-auto max-w-[55ch] text-[0.98rem] leading-relaxed text-ps-muted print:text-[11px]">
            {t("formulaire.stepFour.success.message")}
          </p>
        </div>

        <GlassPanel className="mx-auto max-w-md space-y-1 px-6 py-5 print:break-inside-avoid print:py-2.5">
          <p className="text-xs font-medium tracking-wide text-ps-muted uppercase">
            {t("formulaire.stepFour.success.preinscriptionNumber")}
          </p>
          <p className="font-mono text-3xl font-semibold text-ps-violet-700 tabular-nums print:text-2xl">
            {result?.id ?? "-"}
          </p>
        </GlassPanel>

        <GlassPanel soft className="mx-auto max-w-xl p-5 text-left sm:p-6 print:break-inside-avoid print:p-3">
          <h3 className="mb-2 font-semibold text-ps-ink">
            {t("formulaire.stepFour.success.finalSummary")}
          </h3>
          <dl className="divide-y divide-ps-line">
            <SummaryRow
              label={t("formulaire.stepFour.success.candidate")}
              value={fullName}
            />
            <SummaryRow
              label={t("formulaire.stepFour.success.program")}
              value={selectedProgram?.nomPortail ?? "-"}
            />
            <SummaryRow
              label={t("formulaire.stepFour.success.email")}
              value={personalInfo.email}
            />
            <SummaryRow
              label={t("formulaire.stepFour.success.phone")}
              value={personalInfo.telephone}
            />
          </dl>
        </GlassPanel>

        <div className="mx-auto max-w-xl rounded-3xl border border-ps-gold-200 bg-ps-gold-50 p-5 text-left sm:p-6 print:break-inside-avoid print:p-3">
          <h3 className="mb-3 font-semibold text-ps-gold-800">
            {t("formulaire.stepFour.nextSteps.title")}
          </h3>
          <ol className="space-y-3 text-sm text-ps-gold-800 print:space-y-1.5 print:text-[11px]">
            <li className="flex gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ps-gold-500 text-xs font-semibold text-ps-ink print:size-4 print:text-[10px]">
                1
              </span>
              {t("formulaire.stepFour.nextSteps.documentVerification")}
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ps-gold-500 text-xs font-semibold text-ps-ink print:size-4 print:text-[10px]">
                2
              </span>
              {t("formulaire.stepFour.nextSteps.selectionDate")}
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ps-gold-500 text-xs font-semibold text-ps-ink print:size-4 print:text-[10px]">
                3
              </span>
              {t("formulaire.stepFour.nextSteps.keepNumber", {
                number: result?.id ?? "-",
              })}
            </li>
          </ol>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row print:hidden">
          <Button
            variant="secondary"
            onClick={() => window.print()}
            icon={<Printer className="size-4" strokeWidth={2} />}
          >
            {t("formulaire.stepFour.buttons.printReceipt")}
          </Button>
          <Button
            variant="accent"
            onClick={onNewPortal}
            icon={<Plus className="size-4" strokeWidth={2} />}
          >
            {t("formulaire.stepFour.buttons.newPortal")}
          </Button>
          <Button onClick={onComplete}>
            {t("formulaire.stepFour.buttons.returnHome")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-rise space-y-5 sm:space-y-8">
      <header className="space-y-2 sm:space-y-3">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ps-ink sm:text-3xl">
          {t("formulaire.stepFour.confirmation.title")}
        </h2>
        <p className="max-w-[60ch] text-sm leading-relaxed text-ps-muted sm:text-[0.98rem]">
          {t("formulaire.stepFour.confirmation.subtitle")}
        </p>
      </header>

      <GlassPanel className="divide-y divide-ps-line px-5 py-2 sm:px-6">
        <section className="py-4">
          <h3 className="mb-1 font-semibold text-ps-ink">
            {t("formulaire.stepFour.confirmation.candidateInfo")}
          </h3>
          <dl className="divide-y divide-ps-line/70">
            <SummaryRow
              label={t("formulaire.stepFour.confirmation.fullName")}
              value={fullName}
            />
            <SummaryRow
              label={t("formulaire.stepFour.confirmation.series")}
              value={candidateInfo?.series ?? "-"}
            />
            <SummaryRow
              label={t("formulaire.stepFour.confirmation.bacNumber")}
              value={candidateInfo?.baccalaureateNumber ?? "-"}
            />
            <SummaryRow
              label={t("formulaire.stepFour.confirmation.bacYear")}
              value={String(candidateInfo?.graduationYear ?? "-")}
            />
          </dl>
        </section>

        <section className="py-4">
          <SectionHeader
            title={t("formulaire.stepFour.confirmation.program")}
            step={2}
            onEdit={onEdit}
          />
          <p className="text-sm font-semibold text-ps-violet-700">
            {selectedProgram?.nomPortail ?? "-"}
          </p>
          {selectedProgram?.abbreviation && (
            <p className="text-sm text-ps-muted">
              {selectedProgram.abbreviation}
            </p>
          )}
        </section>

        <section className="py-4">
          <SectionHeader
            title={t("formulaire.stepFour.confirmation.bankInfo")}
            step={3}
            onEdit={onEdit}
          />
          <p className="flex items-center gap-2 text-sm font-semibold text-ps-ink">
            <Ticket className="size-4 text-ps-violet-500" strokeWidth={1.75} />
            <span className="tabular-nums">{bankInfo.reference}</span>
          </p>
        </section>

        <section className="py-4">
          <SectionHeader
            title={t("formulaire.stepFour.confirmation.contactInfo")}
            step={4}
            onEdit={onEdit}
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <p className="flex items-center gap-2 text-sm text-ps-ink">
              <Mail className="size-4 text-ps-violet-500" strokeWidth={1.75} />
              {personalInfo.email}
            </p>
            <p className="flex items-center gap-2 text-sm text-ps-ink">
              <Phone className="size-4 text-ps-violet-500" strokeWidth={1.75} />
              {personalInfo.telephone}
            </p>
          </div>
        </section>
      </GlassPanel>

      <div className="flex items-start gap-3 rounded-2xl border border-ps-gold-200 bg-ps-gold-50 px-3.5 py-3 sm:px-4 sm:py-3.5">
        <AlertCircle
          className="mt-0.5 size-5 shrink-0 text-ps-gold-700"
          strokeWidth={1.9}
        />
        <p className="text-sm text-ps-gold-800">
          <span className="font-semibold">
            {t("formulaire.stepFour.confirmation.warning.title")}{" "}
          </span>
          {t("formulaire.stepFour.confirmation.warning.message")}
        </p>
      </div>

      {error && (
        <InlineError
          message={`${error.title ?? t("formulaire.stepFour.errors.unknownError")}. ${
            error.detail ?? t("formulaire.stepFour.errors.unknownErrorDetail")
          }`}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={isSubmitting}
          icon={<ArrowLeft className="size-4" strokeWidth={2} />}
        >
          {t("formulaire.stepFour.buttons.back")}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="grow justify-center sm:grow-0"
          icon={
            isSubmitting ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={2} />
            ) : (
              <ShieldCheck className="size-4" strokeWidth={2} />
            )
          }
        >
          {isSubmitting ? (
            t("formulaire.stepFour.submission.submitting")
          ) : (
            <>
              {/* Libellé court sur mobile : évite tout débordement du bouton. */}
              <span className="sm:hidden">
                {t("formulaire.stepFour.submission.submitShort")}
              </span>
              <span className="hidden sm:inline">
                {t("formulaire.stepFour.submission.submit")}
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
