import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, specialtiesTranslations } from '../i18n/translations';

type Language = 'ar' | 'fr' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: 'rtl' | 'ltr';
  t: (key: string) => string;
  tSpec: (key: string) => string;
  tObj: (obj: { ar: string; fr: string; en: string } | undefined) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial language from localStorage or default to Arabic
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('acconet_lang');
    if (stored === 'ar' || stored === 'fr' || stored === 'en') {
      return stored as Language;
    }
    return 'ar'; // Default to Arabic to showcase native RTL first!
  });

  const [direction, setDirection] = useState<'rtl' | 'ltr'>('rtl');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('acconet_lang', lang);
  };

  useEffect(() => {
    const isRtl = language === 'ar';
    setDirection(isRtl ? 'rtl' : 'ltr');
    
    // Apply dir attribute to root elements
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Translate regular UI strings
  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  // Translate specific specialty keys
  const tSpec = (key: string): string => {
    const specKey = key as keyof typeof specialtiesTranslations;
    const entry = specialtiesTranslations[specKey];
    if (!entry) return key;
    return entry[language] || entry.en || key;
  };

  // Translate custom objects returned from database
  const tObj = (obj: { ar: string; fr: string; en: string } | undefined): string => {
    if (!obj) return '';
    return obj[language] || obj.en || obj.fr || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, t, tSpec, tObj }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
