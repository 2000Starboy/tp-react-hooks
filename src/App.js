import React, { useState, useEffect } from 'react';
import ProductSearch from './components/ProductSearch';

function App() {
  
  const [allProducts, setAllProducts] = useState([]);
  
  const [filteredProducts, setFilteredProducts] = useState([]);

  
  useEffect(() => {
    
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data); 
        setFilteredProducts(data); 
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []); 

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Liste des Produits</h1>
      
      {}
      <ProductSearch 
        allProducts={allProducts} 
        setFilteredProducts={setFilteredProducts} 
      />
      
      <hr />
      
      {}
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card h-100">
               {}
              <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'contain', padding: '10px' }}/>
              <div className="card-body">
                <h5 className="card-title" style={{fontSize: '0.9rem'}}>{product.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;