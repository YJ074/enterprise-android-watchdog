
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../login-schema";

type LoginFormValues = z.infer<typeof loginSchema>;

interface UsernameFieldProps {
  control: Control<LoginFormValues>;
  isLoading: boolean;
}

export const UsernameField = ({ control, isLoading }: UsernameFieldProps) => {
  return (
    <FormField
      control={control}
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
  );
};
