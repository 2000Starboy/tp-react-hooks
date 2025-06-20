import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import useDebounce from '../hooks/useDebounce'; // 1. Import our new hook

const ProductSearch = ({ allProducts, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { texts } = useLanguage();
  
  // 2. Use the hook to get a debounced version of the search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 3. This useEffect is now MUCH simpler!
  // It runs only when the *debounced* search term changes.
  useEffect(() => {
    if (debouncedSearchTerm === '') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [debouncedSearchTerm, allProducts, setFilteredProducts]); // Depend on the debounced value

  return (
    <div className="mb-3">
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