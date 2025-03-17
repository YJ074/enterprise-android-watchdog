
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../login-schema";

type LoginFormValues = z.infer<typeof loginSchema>;

interface RememberMeFieldProps {
  control: Control<LoginFormValues>;
}

export const RememberMeField = ({ control }: RememberMeFieldProps) => {
  return (
    <FormField
      control={control}
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
  );
};
