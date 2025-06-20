import React, { useState, useEffect } from 'react';

const ProductSearch = ({ allProducts, setFilteredProducts }) => {
  
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    
    const debounceTimer = setTimeout(() => {
      if (searchTerm === '') {
        
        setFilteredProducts(allProducts);
      } else {
        
        const filtered = allProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      }
    }, 500); 

    return () => {
      clearTimeout(debounceTimer);
    };

  }, [searchTerm, allProducts, setFilteredProducts]);

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Rechercher un produit..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;