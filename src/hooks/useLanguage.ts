import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  // Retourne la langue actuelle (fr, en, mg)
  return i18n.language || 'fr';
};