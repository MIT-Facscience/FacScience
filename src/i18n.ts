import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Interface récursive (pas d’erreur circulaire)
interface TranslationJSON {
  [key: string]: string | TranslationJSON;
}

type LanguageResources = Record<string, Record<string, TranslationJSON>>;

// Chargement dynamique de tous les fichiers JSON
const modules = import.meta.glob("./assets/i18n/**/*.json", { eager: true });

const resources: LanguageResources = {};

for (const path in modules) {
  const match = path.match(/\/i18n\/([^/]+)\/([a-z]{2})\.json$/);
  if (!match) continue;

  const [, namespace, lang] = match;
  if (!resources[lang]) resources[lang] = {};

  const mod = modules[path] as { default: TranslationJSON };
  resources[lang][namespace] = mod.default;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
  });

export default i18n;
