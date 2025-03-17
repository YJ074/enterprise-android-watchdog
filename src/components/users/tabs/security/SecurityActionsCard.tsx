
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  ShieldAlert, 
  Trash2, 
  AlertTriangle 
} from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export function SecurityActionsCard() {
  const { toast } = useToast();
  
  const handleSignOutAllDevices = () => {
    toast({
      title: "Signed out from all devices",
      description: "You have been signed out from all other devices.",
    });
  };
  
  const handleResetSecurity = () => {
    toast({
      title: "Security settings reset",
      description: "Your security settings have been reset to default.",
    });
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "Check your email for confirmation instructions.",
      variant: "destructive",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Security Actions
        </CardTitle>
        <CardDescription>
          Manage security settings and account access.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="font-medium mb-1 flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign out all devices
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Sign out from all devices except your current one.
          </p>
          <Button variant="outline" size="sm" onClick={handleSignOutAllDevices}>
            Sign Out Devices
          </Button>
        </div>
        
        <div>
          <div className="font-medium mb-1 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Reset security settings
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Reset all security settings to their default values.
          </p>
          <Button variant="outline" size="sm" onClick={handleResetSecurity}>
            Reset Settings
          </Button>
        </div>
        
        <div>
          <div className="font-medium mb-1 flex items-center gap-2 text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete account
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Permanently delete your account and all associated data.
          </p>
          <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
