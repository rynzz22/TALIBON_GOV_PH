import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ceb';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About Us',
    tourism: 'Tourism',
    transparency: 'Transparency',
    services: 'Services',
    contact: 'Contact',
  },
  ceb: {
    home: 'Panid',
    about: 'Mahitungod Kanamo',
    tourism: 'Turismo',
    transparency: 'Transparency',
    services: 'Serbisyo',
    contact: 'Kontak',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
