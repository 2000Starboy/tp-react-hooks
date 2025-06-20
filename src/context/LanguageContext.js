import React, { createContext, useState, useContext } from 'react';
import fr from '../translations/fr.json';
import en from '../translations/en.json';

const LanguageContext = createContext();

const translations = { fr, en };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');
  const texts = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};