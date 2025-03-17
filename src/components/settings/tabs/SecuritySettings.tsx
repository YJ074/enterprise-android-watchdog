
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  CheckCircle, 
  Key, 
  LockKeyhole, 
  Save, 
  ShieldAlert, 
  ShieldCheck, 
  Timer 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function SecuritySettings() {
  const { toast } = useToast();
  const [mfa, setMfa] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [passwordExpiry, setPasswordExpiry] = useState("90days");
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
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
          <div className="space-y-2">
            <Label htmlFor="password-expiry">Password Expiration</Label>
            <Select value={passwordExpiry} onValueChange={setPasswordExpiry}>
              <SelectTrigger id="password-expiry">
                <SelectValue placeholder="Select expiration policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never expires</SelectItem>
                <SelectItem value="30days">30 days</SelectItem>
                <SelectItem value="60days">60 days</SelectItem>
                <SelectItem value="90days">90 days</SelectItem>
                <SelectItem value="180days">180 days</SelectItem>
                <SelectItem value="365days">365 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 pt-2">
            <Label>Password Requirements</Label>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Minimum 8 characters</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>At least one uppercase letter</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>At least one number</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>At least one special character</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            <span>Security Monitoring</span>
          </CardTitle>
          <CardDescription>
            Configure security monitoring and alert preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="failed-login-alerts">Failed Login Attempts</Label>
              <p className="text-sm text-muted-foreground">
                Send alerts for suspicious login attempts.
              </p>
            </div>
            <Switch id="failed-login-alerts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="new-device-alerts">New Device Logins</Label>
              <p className="text-sm text-muted-foreground">
                Send alerts when logging in from a new device.
              </p>
            </div>
            <Switch id="new-device-alerts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="location-alerts">Unusual Locations</Label>
              <p className="text-sm text-muted-foreground">
                Alert on logins from unusual geographic locations.
              </p>
            </div>
            <Switch id="location-alerts" defaultChecked />
          </div>
          
          <div className="space-y-2 pt-2">
            <Label htmlFor="max-failed-attempts">Maximum Failed Login Attempts</Label>
            <Input 
              id="max-failed-attempts" 
              type="number" 
              defaultValue={5} 
              min={1} 
              max={10} 
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSecurity} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
