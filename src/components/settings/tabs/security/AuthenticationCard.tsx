
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LockKeyhole, ShieldCheck, Timer } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { SecuritySettingsFormValues } from "./security-schema";

interface AuthenticationCardProps {
  form: UseFormReturn<SecuritySettingsFormValues>;
}

export function AuthenticationCard({ form }: AuthenticationCardProps) {
  const { watch } = form;
  const mfaEnabled = watch("mfa");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LockKeyhole className="h-5 w-5" />
          <span>Authentication</span>
        </CardTitle>
        <CardDescription>
          Manage your authentication and security preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="mfa"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mfa" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Multi-Factor Authentication
                </Label>
                <p className="text-sm text-muted-foreground">
                  Require a second form of authentication when logging in.
                </p>
              </div>
              <FormControl>
                <Switch 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="mfa"
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {mfaEnabled && (
          <div className="ml-6 pl-2 border-l-2 border-muted space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Email Authentication</div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Authenticator App</div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">SMS Authentication</div>
              <Switch />
            </div>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="sessionTimeout"
          render={({ field }) => (
            <FormItem className="pt-2 space-y-2">
              <Label htmlFor="session-timeout" className="flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Session Timeout (minutes)
              </Label>
              <div className="space-y-4">
                <FormControl>
                  <Slider
                    id="session-timeout"
                    min={5}
                    max={120}
                    step={5}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 min</span>
                  <span>Current: {field.value} min</span>
                  <span>120 min</span>
                </div>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
