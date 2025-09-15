// src/contexts/LanguageContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import fr from "@/utils/langue/francais.json";
import mg from "@/utils/langue/malagasy.json";

// ✅ Ajoute ici toutes les langues dispo
const translations = { fr, mg };

type Langue = keyof typeof translations; // "fr" | "mg"

interface LanguageContextType {
  lang: Langue;
  setLang: (lang: Langue) => void;
  t: (typeof translations)[Langue]; // ✅ typage dynamique
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Charger depuis localStorage ou par défaut "fr"
  const [lang, setLang] = useState<Langue>(() => {
    return (localStorage.getItem("lang") as Langue) || "fr";
  });

  // ✅ Sauvegarder quand la langue change
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value: LanguageContextType = {
    lang,
    setLang,
    t: translations[lang],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage doit être utilisé dans un LanguageProvider");
  return context;
};
