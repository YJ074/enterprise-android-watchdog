
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn, KeyRound, UserPlus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const redirectPath = location.state?.from || "/";

  const handleLogin = async (username: string, password: string, rememberMe: boolean) => {
    // This is a demo login - in a real app, you would validate against a backend
    if (username === "admin" && password === "admin123") {
      // Login using the auth context
      login({ username, role: "admin" });
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      });
      
      // Redirect to the page they were trying to access, or dashboard
      navigate(redirectPath);
      return true;
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again",
      });
      return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-4">
      <Helmet>
        <title>Admin Login | Enterprise Dashboard</title>
      </Helmet>
      
      <Card className="w-full max-w-md shadow-lg animate-fade-in">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center font-bold">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onLogin={handleLogin} />
        </CardContent>
        <CardFooter className="flex-col space-y-4 border-t p-4">
          <div className="flex justify-between w-full">
            <Link 
              to="/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <KeyRound className="h-4 w-4" /> Forgot Password
            </Link>
            <Link 
              to="/create-admin" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <UserPlus className="h-4 w-4" /> Create Admin Account
            </Link>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Secure login for authorized personnel only
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
