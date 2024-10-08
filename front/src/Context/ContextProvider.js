import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for Search and Auth
export const SearchContext = createContext();

export const ContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Check for token in localStorage once when the app loads
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          // Send the token to the server for verification
          const response = await axios.get('http://localhost:4000/api/users/auth/verify-token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // If the token is valid, mark the user as authenticated
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Token verification failed', error);
          setIsAuthenticated(false); // Set authentication to false if token verification fails
        }
      } else {
        setIsAuthenticated(false); // No token, set as not authenticated
      }

      setLoading(false); // Set loading to false after checking the token
    };

    verifyToken();
  }, []);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </SearchContext.Provider>
  );
};

export default ContextProvider;
