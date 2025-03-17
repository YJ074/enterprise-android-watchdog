
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

export function TwoFactorCard() {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  
  const handleToggleTwoFactor = () => {
    if (isEnabled) {
      // Handle disabling
      setIsEnabled(false);
      toast({
        title: "Two-factor authentication disabled",
        description: "Your account is now less secure.",
        variant: "destructive",
      });
    } else {
      // Open setup flow
      setIsSetupOpen(true);
    }
  };
  
  const handleSetupComplete = () => {
    setIsEnabled(true);
    setIsSetupOpen(false);
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Two-Factor Authentication
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSetupOpen ? (
          <div className="space-y-4">
            <div className="border rounded-md p-4 text-center">
              <p className="text-muted-foreground mb-2">Scan this QR code with your authenticator app</p>
              <div className="inline-block bg-gray-200 w-32 h-32 mx-auto mb-2"></div>
              <p className="text-xs text-muted-foreground">
                Or enter code: ABCD-EFGH-IJKL-MNOP
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsSetupOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSetupComplete}>
                Complete Setup
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">
                {isEnabled ? "Enabled" : "Disabled"}
              </div>
              <p className="text-sm text-muted-foreground">
                {isEnabled 
                  ? "Your account is protected by two-factor authentication." 
                  : "Your account is not using two-factor authentication."}
              </p>
            </div>
            <Switch checked={isEnabled} onCheckedChange={handleToggleTwoFactor} />
          </div>
        )}
      </CardContent>
      {!isSetupOpen && !isEnabled && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => setIsSetupOpen(true)}>
            Setup Two-Factor Authentication
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
