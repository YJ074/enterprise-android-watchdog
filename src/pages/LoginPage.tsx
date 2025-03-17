
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, LogIn, User, UserPlus, KeyRound, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const redirectPath = location.state?.from || "/";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      form.setValue("username", savedUsername);
      form.setValue("rememberMe", true);
    }
  }, [form]);

  // Calculate password strength
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25; // Uppercase
    if (/[0-9]/.test(password)) strength += 25; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 25; // Special chars
    
    return strength;
  };

  // Update password strength when password changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "password") {
        setPasswordStrength(calculatePasswordStrength(value.password as string));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const getStrengthColor = (strength: number): string => {
    if (strength <= 25) return "bg-red-500";
    if (strength <= 50) return "bg-orange-500";
    if (strength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number): string => {
    if (strength <= 25) return "Weak";
    if (strength <= 50) return "Fair";
    if (strength <= 75) return "Good";
    return "Strong";
  };

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError("");
    
    try {
      // Handle "Remember me" functionality
      if (data.rememberMe) {
        localStorage.setItem("rememberedUsername", data.username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
      
      // This is a demo login - in a real app, you would validate against a backend
      if (data.username === "admin" && data.password === "admin123") {
        // Login using the auth context
        login({ username: data.username, role: "admin" });
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Redirect to the page they were trying to access, or dashboard
        navigate(redirectPath);
      } else {
        setLoginError("Invalid username or password");
        
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again",
        });
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error(error);
      
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
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
          {loginError && (
            <Alert variant="destructive" className="mb-4 animate-fade-in">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          placeholder="Enter your username"
                          className="pl-10"
                          disabled={isLoading}
                          autoComplete="username"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10"
                          disabled={isLoading}
                          autoComplete="current-password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-muted-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    
                    {field.value && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Password strength:</span>
                          <span className={passwordStrength > 50 ? "text-green-600" : "text-orange-600"}>{getStrengthText(passwordStrength)}</span>
                        </div>
                        <Progress 
                          value={passwordStrength} 
                          className="h-1" 
                          indicatorClassName={getStrengthColor(passwordStrength)}
                        />
                      </div>
                    )}
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        Remember me
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Save your username for next time
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full transition-all" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </span>
                )}
              </Button>
            </form>
          </Form>
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
