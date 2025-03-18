
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle, Key } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { SecuritySettingsFormValues } from "./security-schema";

interface PasswordPolicyCardProps {
  form: UseFormReturn<SecuritySettingsFormValues>;
}

export function PasswordPolicyCard({ form }: PasswordPolicyCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          <span>Password Policy</span>
        </CardTitle>
        <CardDescription>
          Configure password requirements and expiration policy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="passwordExpiry"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <Label htmlFor="password-expiry">Password Expiration</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger id="password-expiry">
                    <SelectValue placeholder="Select expiration policy" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="never">Never expires</SelectItem>
                  <SelectItem value="30days">30 days</SelectItem>
                  <SelectItem value="60days">60 days</SelectItem>
                  <SelectItem value="90days">90 days</SelectItem>
                  <SelectItem value="180days">180 days</SelectItem>
                  <SelectItem value="365days">365 days</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <div className="space-y-2 pt-2">
          <Label>Password Requirements</Label>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="requirements.minLength"
              render={({ field }) => (
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Minimum 8 characters</span>
                  </div>
                  <FormControl>
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="requirements.uppercase"
              render={({ field }) => (
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>At least one uppercase letter</span>
                  </div>
                  <FormControl>
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="requirements.numbers"
              render={({ field }) => (
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>At least one number</span>
                  </div>
                  <FormControl>
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              )}
            />
            
            <FormField
              control={form.control}
              name="requirements.special"
              render={({ field }) => (
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>At least one special character</span>
                  </div>
                  <FormControl>
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
