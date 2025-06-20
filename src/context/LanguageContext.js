import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // 1. Import our new hook
import fr from '../translations/fr.json';
import en from '../translations/en.json';

const LanguageContext = createContext();

const translations = { fr, en };

export const LanguageProvider = ({ children }) => {
  // 2. Replace useState with useLocalStorage!
  // It will now automatically save the language to localStorage under the key 'language'
  const [language, setLanguage] = useLocalStorage('language', 'fr');

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