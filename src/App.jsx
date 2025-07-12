// src/App.jsx

import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PublicationListPage from './components/PublicationListPage';
import AddPublicationPage from './components/AddPublicationPage';
import EditPublicationPage from './components/EditPublicationPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Cek token login setiap kali route berubah
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set true jika token ada
  }, [location.pathname]);

  // Sembunyikan navbar saat berada di halaman login/register
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldShowNavbar = isLoggedIn && !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {shouldShowNavbar && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes (sudah disaring melalui isLoggedIn & Navbar) */}
          <Route path="/publications" element={<PublicationListPage />} />
          <Route path="/publications/add" element={<AddPublicationPage />} />
          <Route path="/publications/edit/:id" element={<EditPublicationPage />} />

          {/* Redirect Routes */}
          <Route path="/" element={<Navigate to="/publications" replace />} />
          <Route path="*" element={<Navigate to="/publications" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
