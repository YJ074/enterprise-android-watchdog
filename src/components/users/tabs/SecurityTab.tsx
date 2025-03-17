
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Clock, Key, LockKeyhole, Shield, ShieldAlert, AlertCircle } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

type SecurityTabProps = {
  userId: string;
};

export function SecurityTab({ userId }: SecurityTabProps) {
  const { toast } = useToast();
  const [isPasswordResetSent, setIsPasswordResetSent] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  
  const handlePasswordReset = () => {
    setIsPasswordResetSent(true);
    toast({
      title: "Password Reset Email Sent",
      description: "A password reset link has been sent to the user's email address.",
      duration: 3000,
    });
  };
  
  const handle2FAToggle = () => {
    setIs2FAEnabled(!is2FAEnabled);
    toast({
      title: is2FAEnabled ? "2FA Disabled" : "2FA Enabled",
      description: is2FAEnabled 
        ? "Two-factor authentication has been disabled for this account." 
        : "Two-factor authentication has been enabled for this account.",
      duration: 3000,
    });
  };
  
  const handleLockAccount = () => {
    toast({
      title: "Account Locked",
      description: "User account has been temporarily locked.",
      duration: 3000,
    });
  };
  
  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Password Management
            </CardTitle>
            <CardDescription>
              Manage the user's password and recovery options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Last password change:</span>
                <span className="text-sm font-medium">30 days ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Password strength:</span>
                <span className="text-sm font-medium">Strong</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={handlePasswordReset}
              disabled={isPasswordResetSent}
            >
              {isPasswordResetSent ? "Reset Link Sent" : "Reset Password"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Enable additional security for the user's account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Status:</span>
                <span className={`text-sm font-medium ${is2FAEnabled ? "text-green-600" : "text-red-600"}`}>
                  {is2FAEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Method:</span>
                <span className="text-sm font-medium">
                  {is2FAEnabled ? "Authenticator App" : "Not configured"}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant={is2FAEnabled ? "outline" : "default"} 
              className="w-full"
              onClick={handle2FAToggle}
            >
              {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Login History
            </CardTitle>
            <CardDescription>
              Recent account login activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm border-b pb-2">
                <div className="font-medium">Yesterday, 15:42</div>
                <div className="text-muted-foreground">IP: 192.168.1.1 • Chrome, Windows</div>
              </div>
              <div className="text-sm border-b pb-2">
                <div className="font-medium">3 days ago, 09:15</div>
                <div className="text-muted-foreground">IP: 192.168.1.1 • Safari, iOS</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">1 week ago, 18:30</div>
                <div className="text-muted-foreground">IP: 192.168.1.1 • Chrome, macOS</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="w-full">View Full History</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Security Actions
            </CardTitle>
            <CardDescription>
              Additional account security measures.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Security questions:</span>
                <span className="text-sm font-medium">Set (3)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Recovery email:</span>
                <span className="text-sm font-medium">Verified</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Trusted devices:</span>
                <span className="text-sm font-medium">3 devices</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 flex-col">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLockAccount}
            >
              <LockKeyhole className="h-4 w-4 mr-2" />
              Lock Account
            </Button>
            <Button variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4 mr-2" />
              Security Audit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
