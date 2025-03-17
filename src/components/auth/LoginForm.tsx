
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { loginSchema, LoginFormValues } from "./login-schema";
import { UsernameField } from "./form-fields/UsernameField";
import { PasswordField } from "./form-fields/PasswordField";
import { RememberMeField } from "./form-fields/RememberMeField";
import { LoginError } from "./LoginError";

interface LoginFormProps {
  onLogin: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

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
      
      const success = await onLogin(data.username, data.password, data.rememberMe);
      if (!success) {
        setLoginError("Invalid username or password");
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginError message={loginError} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <UsernameField control={form.control} isLoading={isLoading} />
          <PasswordField control={form.control} isLoading={isLoading} />
          <RememberMeField control={form.control} />
          
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
    </>
  );
};
