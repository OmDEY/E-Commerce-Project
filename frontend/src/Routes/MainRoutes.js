import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/Main/HomePage';
import ProductListingPage from '../Pages/Main/ProductListingPage';
import SingleProductDisplay from '../Pages/Main/SingleProduct';
import CartPage from '../Pages/Main/CartPage';
import OrdersPage from '../Pages/Main/OrdersPage';
import CheckoutPage from '../Pages/Main/CheckoutPage';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductListingPage />} />
      <Route path="/product/:id" element={<SingleProductDisplay />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default MainRoutes;