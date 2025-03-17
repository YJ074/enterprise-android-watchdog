
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { PasswordStrengthIndicator } from "../PasswordStrengthIndicator";
import { calculatePasswordStrength } from "@/utils/authUtils";
import { loginSchema } from "../login-schema";

type LoginFormValues = z.infer<typeof loginSchema>;

interface PasswordFieldProps {
  control: Control<LoginFormValues>;
  isLoading: boolean;
}

export const PasswordField = ({ control, isLoading }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const subscription = control._formState.touchedFields.password ? 
      control._formValues.password && 
      setPasswordStrength(calculatePasswordStrength(control._formValues.password as string)) : 
      undefined;
    
    return () => {
      if (typeof subscription === 'function') {
        subscription();
      }
    };
  }, [control._formState.touchedFields.password, control._formValues.password]);

  return (
    <FormField
      control={control}
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
                onChange={(e) => {
                  field.onChange(e);
                  setPasswordStrength(calculatePasswordStrength(e.target.value));
                }}
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
            <PasswordStrengthIndicator strength={passwordStrength} />
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
