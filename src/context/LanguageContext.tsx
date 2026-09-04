import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../i18n/en';
import { bn } from '../i18n/bn';
import { hi } from '../i18n/hi';

type Language = 'en' | 'bn' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
}

const translations = {
  en,
  bn,
  hi
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('khet_setu_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('khet_setu_lang', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language] || en
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
