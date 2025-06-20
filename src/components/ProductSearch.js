// src/components/ProductSearch.js
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// This component now receives the searchTerm and the function to change it
const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  const { texts } = useLanguage();
  
  // There are no more hooks or logic inside this component!
  // It only displays the input and reports changes.
  return (
    <div className="w-100">
      <input
        type="text"
        className="form-control"
        placeholder={texts.search_placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;