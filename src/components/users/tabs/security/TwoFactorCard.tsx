
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

export function TwoFactorCard() {
  const { toast } = useToast();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  
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
  
  return (
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
  );
}
