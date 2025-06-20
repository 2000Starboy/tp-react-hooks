// src/hooks/useProductSearch.js
import { useState, useEffect, useCallback } from 'react';

// This hook will manage all product-related logic
export function useProductSearch() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New states for async management and pagination
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // We'll show 6 products per page

  // --- DATA FETCHING ---
  // useCallback ensures this function doesn't get recreated on every render
  const fetchProducts = useCallback(async () => {
    setLoading(true); // Set loading before the fetch
    setError(null); // Clear previous errors
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Sorry, something went wrong with the request.');
      }
      const data = await response.json();
      setAllProducts(data);
      setFilteredProducts(data); // Initially, show all products
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false after fetch (success or fail)
      setCurrentPage(1); // Reset to first page on new fetch
    }
  }, []); // Empty dependency array means this function is created only once

  // Initial fetch on component mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- SEARCH FILTERING ---
  useEffect(() => {
    const filtered = allProducts.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchTerm, allProducts]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Return everything the UI will need
  return {
    // Data
    paginatedProducts,
    // Search
    searchTerm, 
    setSearchTerm,
    // Async State
    loading,
    error,
    fetchProducts, // This is our "reload" function
    // Pagination State
    currentPage,
    setCurrentPage,
    totalPages,
  };
}