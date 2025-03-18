
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredDataAccess?: string;
};

export const ProtectedRoute = ({ children, requiredDataAccess }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Data access check for admins when a specific data access is required
    if (isAuthenticated && !isLoading && requiredDataAccess && user?.role === "admin") {
      try {
        const adminAccess = JSON.parse(localStorage.getItem("adminDataAccess") || "[]");
        if (!adminAccess.includes(requiredDataAccess)) {
          toast({
            title: "Access Restricted",
            description: `You don't have access to ${requiredDataAccess.replace('-', ' ')} in your admin settings.`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error checking admin data access:", error);
      }
    }
  }, [isAuthenticated, isLoading, requiredDataAccess, user, toast]);

  // Show a loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading your session...</p>
          <p className="text-xs text-muted-foreground/70 mt-2">Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  // Redirect to login page while saving the attempted URL
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};
