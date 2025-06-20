// src/App.js
import React from 'react';
import ProductSearch from './components/ProductSearch';
import LanguageSelector from './components/LanguageSelector';
import { useLanguage } from './context/LanguageContext';
import { useProductSearch } from './hooks/useProductSearch'; // 1. Import the master hook

function App() {
  const { texts } = useLanguage();
  
  // 2. Get EVERYTHING from our custom hook
  const {
    paginatedProducts,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    fetchProducts, // The reload function
    currentPage,
    setCurrentPage,
    totalPages,
  } = useProductSearch();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-4">{texts.product_list_title}</h1>
        <LanguageSelector />
      </div>

      <div className="d-flex justify-content-between gap-3 mb-3">
        <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {/* 3. Add the reload button */}
        <button className="btn btn-outline-primary" onClick={fetchProducts} disabled={loading}>
          {loading ? 'Chargement...' : 'Recharger'}
        </button>
      </div>
      
      <hr />
      
      {/* 4. Display Loading and Error states */}
      {loading && <div className="text-center"><p>Loading products...</p></div>}
      {error && <div className="alert alert-danger"><p>{error}</p></div>}
      
      {/* 5. Display the product grid (only if not loading and no errors) */}
      {!loading && !error && (
        <div className="row">
          {paginatedProducts.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'contain', padding: '10px' }}/>
                <div className="card-body">
                  <h5 className="card-title" style={{fontSize: '0.9rem'}}>{product.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Add Pagination Controls */}
      {!loading && !error && totalPages > 1 && (
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Précédent
              </button>
            </li>
            {/* You can add page numbers here if you want */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Suivant
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default App;