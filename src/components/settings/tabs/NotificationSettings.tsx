
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Mail, MessageSquare, Save, Smartphone, Volume2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function NotificationSettings() {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState("immediate");
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span>Notification Channels</span>
          </CardTitle>
          <CardDescription>
            Choose how you want to receive notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email.
              </p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailNotifications} 
              onCheckedChange={setEmailNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Push Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications in your browser.
              </p>
            </div>
            <Switch 
              id="push-notifications" 
              checked={pushNotifications} 
              onCheckedChange={setPushNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                SMS Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via SMS.
              </p>
            </div>
            <Switch 
              id="sms-notifications" 
              checked={smsNotifications} 
              onCheckedChange={setSmsNotifications} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sound-alerts" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Sound Alerts
              </Label>
              <p className="text-sm text-muted-foreground">
                Play sounds for important notifications.
              </p>
            </div>
            <Switch 
              id="sound-alerts" 
              checked={soundAlerts} 
              onCheckedChange={setSoundAlerts} 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span>Notification Preferences</span>
          </CardTitle>
          <CardDescription>
            Customize what notifications you receive and how often.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notification-frequency">Notification Frequency</Label>
            <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
              <SelectTrigger id="notification-frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-2 space-y-3">
            <Label>Notification Types</Label>
            
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Security Alerts</div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Device Status Changes</div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">User Activity</div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Policy Violations</div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">System Updates</div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">Maintenance Notices</div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveNotifications} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
