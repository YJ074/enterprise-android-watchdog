
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Pages
import ActivityPage from "@/pages/ActivityPage";
import AlertsPage from "@/pages/AlertsPage";
import DeviceDetailPage from "@/pages/DeviceDetailPage";
import DevicesPage from "@/pages/DevicesPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import Index from "@/pages/Index";
import LoginPage from "@/pages/LoginPage";
import MobileSetupPage from "@/pages/MobileSetupPage";
import NotFound from "@/pages/NotFound";
import SecurityDashboardPage from "@/pages/SecurityDashboardPage";
import SettingsPage from "@/pages/SettingsPage";
import SupabaseSetupPage from "@/pages/SupabaseSetupPage";
import UserDetailPage from "@/pages/UserDetailPage";
import UsersPage from "@/pages/UsersPage";

// Providers
import { AuthProvider } from "@/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/setup/supabase" element={<SupabaseSetupPage />} />
          
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/devices" element={<ProtectedRoute><DevicesPage /></ProtectedRoute>} />
          <Route path="/device/:id" element={<ProtectedRoute><DeviceDetailPage /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute><UserDetailPage /></ProtectedRoute>} />
          <Route path="/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
          <Route path="/mobile-setup" element={<ProtectedRoute><MobileSetupPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/security" element={<ProtectedRoute><SecurityDashboardPage /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
};

export default App;
