import React, { useState, useEffect } from 'react';

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// أو استخدم BrowserRouter مع basename
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import ChefsManagement from './components/admin/ChefsManagement';
import DriversManagement from './components/admin/DriversManagement';
import CustomersManagement from './components/admin/CustomersManagement';
import OrdersManagement from './components/admin/OrdersManagement';
import Reports from './components/admin/Reports';
import Settings from './components/admin/Settings';
import ProtectedRoute from './components/common/ProtectedRoute';
import RequestsManagement from './components/admin/RequestsManagement';
import ChefProfile from './components/admin/ChefProfile';
import DriverProfile from './components/admin/DriverProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!token || !loggedIn) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (status) {
      localStorage.setItem('isLoggedIn', 'true');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin onLoginSuccess={handleLogin} />} />
        
        < Route path="/admin" element={
          <ProtectedRoute isLoggedIn={isLoggedIn} redirectTo="/admin/login">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="chefs" element={<ChefsManagement />} />
          <Route path="drivers" element={<DriversManagement />} />
          <Route path="customers" element={<CustomersManagement />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="requests" element={<RequestsManagement />} />
          <Route path="requests/chef/:id" element={<ChefProfile />} />
          <Route path="requests/driver/:id" element={<DriverProfile />} /> 
        </Route>
        
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;