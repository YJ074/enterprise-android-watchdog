
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { LockKeyhole, ShieldCheck, Timer } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AuthenticationCardProps {
  mfa: boolean;
  setMfa: (value: boolean) => void;
  sessionTimeout: number;
  setSessionTimeout: (value: number) => void;
}

export function AuthenticationCard({ 
  mfa, 
  setMfa, 
  sessionTimeout, 
  setSessionTimeout 
}: AuthenticationCardProps) {
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
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="mfa" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Multi-Factor Authentication
            </Label>
            <p className="text-sm text-muted-foreground">
              Require a second form of authentication when logging in.
            </p>
          </div>
          <Switch 
            id="mfa" 
            checked={mfa} 
            onCheckedChange={setMfa} 
          />
        </div>
        
        {mfa && (
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
        
        <div className="pt-2 space-y-2">
          <Label htmlFor="session-timeout" className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Session Timeout (minutes)
          </Label>
          <div className="space-y-4">
            <Slider 
              id="session-timeout"
              min={5}
              max={120}
              step={5}
              value={[sessionTimeout]}
              onValueChange={(value) => setSessionTimeout(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 min</span>
              <span>Current: {sessionTimeout} min</span>
              <span>120 min</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
