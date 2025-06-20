import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, texts } = useLanguage();

  return (
    <div className="d-flex justify-content-end align-items-center mb-3">
      <span className="me-2">{texts.language_selector_label}</span>
      <button
        className={`btn btn-sm me-2 ${language === 'fr' ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={() => setLanguage('fr')}
      >
        FR
      </button>
      <button
        className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;