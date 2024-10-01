import React, { createContext, useState, useEffect } from 'react';

// Create a context for Search and Auth
export const SearchContext = createContext();

export const ContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token in localStorage once when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, isAuthenticated, setIsAuthenticated }}>
      {children}
    </SearchContext.Provider>
  );
};

export default ContextProvider;
