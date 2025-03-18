
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SecurityMonitoringCard() {
  return (
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
  );
}
