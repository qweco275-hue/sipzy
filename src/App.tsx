import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { MerchantDetail } from './pages/MerchantDetail';
import { Wallet } from './pages/Wallet';
import { Rewards } from './pages/Rewards';
import { Promotions } from './pages/Promotions';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { About } from './pages/About';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Layout Routes (Accessible to everyone) */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/merchant/:id" element={<MerchantDetail />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            {/* Auth Standalone Split-Layout Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer Application (Protected Dashboard Layout) */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/history" element={<History />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
