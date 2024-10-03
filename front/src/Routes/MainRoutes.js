import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../Pages/Main/HomePage';
import ProductListingPage from '../Pages/Main/ProductListingPage';
import SingleProductDisplay from '../Pages/Main/SingleProduct';
import CartPage from '../Pages/Main/CartPage';
import OrdersPage from '../Pages/Main/OrdersPage';
import CheckoutPage from '../Pages/Main/CheckoutPage';
import AuthPage from '../Pages/Main/AuthPage';
import UserDetailsPage from '../Pages/Main/UserDetailsPage';
import ProtectedRoute from './ProtectedRoute';
import { SearchContext } from '../Context/ContextProvider';

const MainRoutes = () => {
  const { isAuthenticated } = useContext(SearchContext);


  return (
    <Routes>
      {/* Redirect if logged in */}
      <Route
        path="/auth"
        element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
      />
      <Route
        path="/auth/userDetails"
        element={isAuthenticated ? <Navigate to="/" /> : <UserDetailsPage />}
      />

      {/* Public Route */}
      <Route path="/" element={<HomePage />} />

      {/* Protected Routes */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductListingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <SingleProductDisplay />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
