
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Copy, KeyRound, QrCode, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TwoFactorAuthSetupProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export function TwoFactorAuthSetup({ onComplete, onCancel }: TwoFactorAuthSetupProps) {
  const { toast } = useToast();
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<"scan" | "verify">("scan");
  
  // Simulate a secret key
  const secretKey = "ABCD-EFGH-IJKL-MNOP";
  
  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    toast({
      title: "Secret copied",
      description: "The secret key has been copied to your clipboard",
    });
  };
  
  const handleVerify = () => {
    // In a real app, validate the code against the secret
    if (verificationCode.length === 6) {
      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now more secure.",
      });
      onComplete?.();
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit code from your authenticator app.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Two-Factor Authentication Setup
        </CardTitle>
        <CardDescription>
          Enhance your account security with two-factor authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "scan" ? (
          <>
            <Alert className="bg-amber-50 border-amber-200 text-amber-800">
              <AlertCircle className="h-4 w-4 text-amber-800" />
              <AlertDescription>
                You'll need an authenticator app like Google Authenticator, Microsoft Authenticator, or Authy to complete this setup.
              </AlertDescription>
            </Alert>
            
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex justify-center">
                <div className="relative p-2 bg-white border border-gray-200 rounded-md w-48 h-48 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-primary/20" />
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-center p-4 bg-white/80">
                    QR Code for your authenticator app<br/>(Simulated for demo)
                  </div>
                </div>
              </div>
              
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="secret-key" className="flex items-center gap-1">
                    <KeyRound className="h-4 w-4" />
                    Secret Key
                  </Label>
                  <Button size="sm" variant="ghost" onClick={handleCopySecret} className="h-8 px-2">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="flex">
                  <Input
                    id="secret-key"
                    value={secretKey}
                    className="font-mono text-center"
                    readOnly
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  If you can't scan the QR code, enter this secret key manually in your authenticator app.
                </p>
              </div>
            </div>
            
            <div className="pt-2">
              <Button onClick={() => setStep("verify")} className="w-full">
                I've scanned the QR code
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">
              Enter the 6-digit verification code from your authenticator app to verify the setup.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="verification-code">Verification Code</Label>
              <Input
                id="verification-code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                className="text-center text-lg tracking-widest font-mono"
                maxLength={6}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className={`flex ${step === "verify" ? "justify-between" : "justify-end"}`}>
        {step === "verify" && (
          <>
            <Button variant="outline" onClick={() => setStep("scan")}>
              Back
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleVerify} disabled={verificationCode.length !== 6}>
                Verify & Enable
              </Button>
            </div>
          </>
        )}
        {step === "scan" && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
