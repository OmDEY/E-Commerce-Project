import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SearchContext } from '../Context/ContextProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(SearchContext);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Set authentication if token exists
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after checking token
  }, [setIsAuthenticated]);

  if (loading) {
    // Optional: Render a loading spinner or placeholder until the token is checked
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;
