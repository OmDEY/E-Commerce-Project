import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminProducts from '../Pages/Admin/AdminProducts';
import AdminCustomers from '../Pages/Admin/AdminCustomers';
import AdminOrders from '../Pages/Admin/AdminOrders';
import AdminCategoryProductsPage from '../Pages/Admin/AdminCategoryProductsPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="/adminProducts" element={<AdminProducts />} />
      <Route path="/adminCustomers" element={<AdminCustomers />} />
      <Route path="/adminOrders" element={<AdminOrders />} />
      <Route path="/adminCategoryProducts" element={<AdminCategoryProductsPage />} />
    </Routes>
  );
}

export default AdminRoutes;