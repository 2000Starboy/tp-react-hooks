// Current content of src/components/ProductSearch.js
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext'; // <-- ADD THIS LINE

const ProductSearch = ({ allProducts, setFilteredProducts }) => { //
  const [searchTerm, setSearchTerm] = useState(''); //
  const { texts } = useLanguage(); // <-- ADD THIS LINE

  useEffect(() => {
    const debounceTimer = setTimeout(() => { //
      if (searchTerm === '') {
        setFilteredProducts(allProducts); //
      } else {
        const filtered = allProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered); //
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer); //
    };
  }, [searchTerm, allProducts, setFilteredProducts]);

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={texts.search_placeholder} // <-- UPDATE THIS LINE
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;