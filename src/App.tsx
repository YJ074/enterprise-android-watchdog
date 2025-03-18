
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import DevicesPage from "./pages/DevicesPage";
import DeviceDetailPage from "./pages/DeviceDetailPage";
import AlertsPage from "./pages/AlertsPage";
import ActivityPage from "./pages/ActivityPage";
import UserDetailPage from "./pages/UserDetailPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import MobileSetupPage from "./pages/MobileSetupPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import SupabaseSetupPage from "./pages/SupabaseSetupPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/create-admin" element={<CreateAdminPage />} />
              <Route path="/supabase-setup" element={<SupabaseSetupPage />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/devices" element={
                <ProtectedRoute requiredDataAccess="device-data">
                  <DevicesPage />
                </ProtectedRoute>
              } />
              <Route path="/device/:id" element={
                <ProtectedRoute requiredDataAccess="device-data">
                  <DeviceDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/alerts" element={
                <ProtectedRoute requiredDataAccess="security-alerts">
                  <AlertsPage />
                </ProtectedRoute>
              } />
              <Route path="/activity" element={
                <ProtectedRoute requiredDataAccess="activity-logs">
                  <ActivityPage />
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute requiredDataAccess="user-data">
                  <UsersPage />
                </ProtectedRoute>
              } />
              <Route path="/user/:id" element={
                <ProtectedRoute requiredDataAccess="user-data">
                  <UserDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/mobile-setup" element={
                <ProtectedRoute>
                  <MobileSetupPage />
                </ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
