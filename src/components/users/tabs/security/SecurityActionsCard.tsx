
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ShieldAlert, LockKeyhole, AlertCircle } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

export function SecurityActionsCard() {
  const { toast } = useToast();
  
  const handleLockAccount = () => {
    toast({
      title: "Account Locked",
      description: "User account has been temporarily locked.",
      duration: 3000,
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
  );
}
