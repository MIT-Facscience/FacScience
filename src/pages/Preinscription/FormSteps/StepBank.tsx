import {
  ArrowLeft,
  ArrowRight,
  Info,
  Landmark,
  Plus,
  Star,
  Ticket,
  Trash2,
} from "lucide-react";
import { useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Field, GlassPanel, InlineError } from "../ui/primitives";

interface StepBankProps {
  initialReferences: string[];
  onBack: () => void;
  onNext: (references: string[]) => void;
}

const MAX_LENGTH = 12;
const MIN_LENGTH = 4;
const MAX_REFERENCES = 8;

/** Forme canonique d'une référence : sans espaces autour, en majuscules. */
const normalize = (value: string) => value.trim().toUpperCase();

/**
 * Étape 3 : références du reçu bancaire.
 *
 * Un candidat qui règle ses frais en plusieurs fois possède plusieurs reçus ;
 * le dossier admet donc une ou plusieurs références. La première saisie reste
 * la référence principale du dossier côté backend.
 */
export function StepBank({
  initialReferences,
  onBack,
  onNext,
}: StepBankProps) {
  const { t } = useTranslation("admission");
  const fieldId = useId();

  // Une ligne vide au minimum, même si le brouillon est vide : le candidat doit
  // toujours voir un champ prêt à recevoir sa première référence.
  const [references, setReferences] = useState<string[]>(() =>
    initialReferences.length > 0 ? initialReferences : [""]
  );
  const [error, setError] = useState("");
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const filled = references.map(normalize).filter(Boolean);
  const duplicate = findDuplicate(filled);

  const updateReference = (index: number, value: string) => {
    setReferences((current) =>
      current.map((reference, position) =>
        position === index ? value.toUpperCase() : reference
      )
    );
    if (error) setError("");
  };

  const addReference = () => {
    if (references.length >= MAX_REFERENCES) return;
    setReferences((current) => [...current, ""]);
    // Le nouveau champ est monté au prochain rendu : on demande le focus
    // après, sinon la référence à `references.length` n'existe pas encore.
    setFocusIndex(references.length);
  };

  const removeReference = (index: number) => {
    setReferences((current) => {
      const next = current.filter((_, position) => position !== index);
      return next.length > 0 ? next : [""];
    });
    setError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (filled.length === 0) {
      setError(t("formulaire.stepBank.errors.required"));
      return;
    }
    if (filled.some((reference) => reference.length < MIN_LENGTH)) {
      setError(t("formulaire.stepBank.errors.tooShort"));
      return;
    }
    // Le doublon s'affiche sous les champs fautifs (voir `duplicated` plus
    // bas) : inutile de le répéter dans le bandeau global.
    if (duplicate) {
      setError("");
      return;
    }

    setError("");
    onNext(filled);
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
        <GlassPanel soft className="space-y-4 p-4 sm:space-y-5 sm:p-6">
          <ul className="space-y-4">
            {references.map((reference, index) => {
              const inputId = `${fieldId}-${index}`;
              const isPrincipal = index === firstFilledIndex(references);
              const duplicated =
                normalize(reference).length > 0 &&
                duplicate === normalize(reference);

              return (
                <li key={index}>
                  <Field
                    id={inputId}
                    label={
                      index === 0
                        ? t("formulaire.stepTwoThree.bankInfo.reference.label")
                        : t("formulaire.stepBank.referenceN", { n: index + 1 })
                    }
                    required={index === 0}
                    error={
                      duplicated
                        ? t("formulaire.stepBank.errors.duplicate", {
                            reference: normalize(reference),
                          })
                        : undefined
                    }
                  >
                    <div className="flex items-start gap-2">
                      <div className="relative flex-1">
                        <Ticket
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ps-violet-400"
                          strokeWidth={1.75}
                        />
                        <input
                          id={inputId}
                          name={`bankReference-${index}`}
                          ref={(element) => {
                            inputsRef.current[index] = element;
                            if (focusIndex === index && element) {
                              element.focus();
                              setFocusIndex(null);
                            }
                          }}
                          type="text"
                          autoComplete="off"
                          autoFocus={index === 0}
                          spellCheck={false}
                          placeholder={t(
                            "formulaire.stepTwoThree.bankInfo.reference.placeholder"
                          )}
                          value={reference}
                          maxLength={MAX_LENGTH}
                          aria-invalid={duplicated || undefined}
                          aria-describedby={
                            duplicated ? `${inputId}-error` : undefined
                          }
                          onChange={(event) =>
                            updateReference(index, event.target.value)
                          }
                          className="ps-input pl-12 font-semibold tracking-wide uppercase"
                        />
                      </div>

                      {references.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          aria-label={t("formulaire.stepBank.remove", {
                            n: index + 1,
                          })}
                          className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-[0.875rem] text-ps-muted transition-colors hover:bg-[#fff5f7] hover:text-[#9d1b3e] focus-visible:ring-2 focus-visible:ring-ps-violet-400 focus-visible:outline-none"
                        >
                          <Trash2 className="size-4" strokeWidth={1.75} />
                        </button>
                      )}
                    </div>

                    {isPrincipal && references.length > 1 && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ps-violet-100 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-ps-violet-700 uppercase">
                        <Star className="size-3" strokeWidth={2.5} aria-hidden="true" />
                        {t("formulaire.stepBank.principal")}
                      </span>
                    )}
                  </Field>
                </li>
              );
            })}
          </ul>

          <p className="flex items-start gap-2 text-sm leading-relaxed text-ps-muted">
            <Info className="mt-0.5 size-4 shrink-0 text-ps-violet-400" strokeWidth={1.75} aria-hidden="true" />
            {t("formulaire.stepBank.hint")}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ps-violet-100 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={addReference}
              disabled={references.length >= MAX_REFERENCES}
              icon={<Plus className="size-4" strokeWidth={2} />}
              className="text-sm"
            >
              {t("formulaire.stepBank.add")}
            </Button>
            <p className="text-xs text-ps-muted tabular-nums">
              {t("formulaire.stepBank.count", {
                count: filled.length,
                max: MAX_REFERENCES,
              })}
            </p>
          </div>

          {error && <InlineError message={error} />}
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
            disabled={filled.length === 0}
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

/** Première référence réellement saisie : c'est elle qui devient principale. */
function firstFilledIndex(references: string[]) {
  const index = references.findIndex((reference) => normalize(reference));
  return index === -1 ? -1 : index;
}

/** Première valeur saisie deux fois, ou null. */
function findDuplicate(references: string[]): string | null {
  const seen = new Set<string>();
  for (const reference of references) {
    if (seen.has(reference)) return reference;
    seen.add(reference);
  }
  return null;
}
