import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { SearchContext } from '../Context/ContextProvider';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(SearchContext);
  const [loading, setLoading] = useState(true); // Add a loading state

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
