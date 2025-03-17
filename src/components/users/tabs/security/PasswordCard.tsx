
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Key } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

export function PasswordCard() {
  const { toast } = useToast();
  const [isPasswordResetSent, setIsPasswordResetSent] = useState(false);
  
  const handlePasswordReset = () => {
    setIsPasswordResetSent(true);
    toast({
      title: "Password Reset Email Sent",
      description: "A password reset link has been sent to the user's email address.",
      duration: 3000,
    });
  };
  
  return (
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
  );
}
