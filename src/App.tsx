
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/auth/ProtectedRoute';

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";

// Pages
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DevicesPage from "./pages/DevicesPage";
import DeviceDetailPage from "./pages/DeviceDetailPage";
import MdmProfilesPage from "./pages/MdmProfilesPage";
import ComputerMdmPage from "./pages/ComputerMdmPage"; // New MDM page
import NotFound from "./pages/NotFound";
import "./App.css";
import Index from "./pages/Index";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import ActivityPage from "./pages/ActivityPage";
import SecurityDashboardPage from "./pages/SecurityDashboardPage";
import SettingsPage from "./pages/SettingsPage";
import AlertsPage from "./pages/AlertsPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import MobileSetupPage from "./pages/MobileSetupPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/create-admin" element={<CreateAdminPage />} />
              <Route path="/mobile-setup" element={<MobileSetupPage />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/devices" element={<ProtectedRoute><DevicesPage /></ProtectedRoute>} />
              <Route path="/device/:id" element={<ProtectedRoute><DeviceDetailPage /></ProtectedRoute>} />
              <Route path="/mdm-profiles" element={<ProtectedRoute><MdmProfilesPage /></ProtectedRoute>} />
              <Route path="/computer-mdm" element={<ProtectedRoute><ComputerMdmPage /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
              <Route path="/user/:id" element={<ProtectedRoute><UserDetailPage /></ProtectedRoute>} />
              <Route path="/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} />
              <Route path="/security" element={<ProtectedRoute><SecurityDashboardPage /></ProtectedRoute>} />
              <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
              <Route path="/settings/*" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
