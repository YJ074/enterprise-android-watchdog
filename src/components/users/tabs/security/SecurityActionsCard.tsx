
import { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function SecurityActionsCard() {
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleSignOutAllDevices = () => {
    setIsSigningOut(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSigningOut(false);
      toast({
        title: "Signed out from all devices",
        description: "You have been signed out from all other devices.",
      });
    }, 1000);
  };
  
  const handleResetSecurity = () => {
    setIsResetting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResetting(false);
      toast({
        title: "Security settings reset",
        description: "Your security settings have been reset to default.",
      });
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      toast({
        title: "Account deletion requested",
        description: "Check your email for confirmation instructions.",
        variant: "destructive",
      });
    }, 1000);
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOutAllDevices}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing out..." : "Sign Out Devices"}
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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleResetSecurity}
            disabled={isResetting}
          >
            {isResetting ? "Resetting..." : "Reset Settings"}
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
