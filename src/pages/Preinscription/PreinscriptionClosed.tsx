import React from 'react';
import { CalendarX2, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GlassPanel } from './ui/primitives';

const PreinscriptionClosed: React.FC = () => {
  const { t } = useTranslation("admission");

  return (
    <div className="ps-page ps-scope relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-12">
      <GlassPanel className="relative z-10 w-full max-w-2xl p-8 text-center sm:p-12">
        <div className="mb-7 flex justify-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-ps-gold-100">
            <CalendarX2 className="size-10 text-ps-gold-700" strokeWidth={1.75} />
          </span>
        </div>

        <h1 className="font-display text-3xl font-semibold tracking-tight text-ps-ink sm:text-4xl">
          {t("preinscription.closed.title", "Préinscription terminée")}
        </h1>
        <p className="mx-auto mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed text-ps-muted">
          {t(
            "preinscription.closed.message",
            "La période de préinscription est actuellement fermée."
          )}
        </p>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-ps-gold-200 bg-ps-gold-50 p-5 text-left">
          <Info
            className="mt-0.5 size-5 shrink-0 text-ps-gold-700"
            strokeWidth={1.9}
          />
          <div>
            <h3 className="font-semibold text-ps-gold-800">
              {t("preinscription.closed.info.title", "Informations importantes")}
            </h3>
            <p className="mt-1 text-sm text-ps-gold-800">
              {t(
                "preinscription.closed.info.description",
                "Les préinscriptions pour cette année académique sont terminées. Veuillez consulter notre site pour les prochaines périodes d'inscription."
              )}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            to="/admission/modalite"
            className="inline-flex items-center justify-center rounded-full bg-ps-violet-600 px-8 py-3 text-[0.95rem] font-semibold text-white shadow-[0_16px_32px_-14px_rgba(120,3,118,0.75)] transition hover:bg-ps-violet-700 active:translate-y-px"
          >
            {t(
              "preinscription.closed.backToAdmission",
              "Retour aux modalités d'admission"
            )}
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-ps-violet-700 underline decoration-ps-violet-300 underline-offset-4"
          >
            {t("preinscription.closed.backToHome", "Retour à l'accueil")}
          </Link>
        </div>
      </GlassPanel>
    </div>
  );
};

export default PreinscriptionClosed;
