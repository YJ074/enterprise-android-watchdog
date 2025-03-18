
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";
import {
  AuthenticationCard,
  PasswordPolicyCard,
  SecurityMonitoringCard,
  UserSyncCard
} from "./security";

export function SecuritySettings() {
  const { toast } = useToast();
  const [mfa, setMfa] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [passwordExpiry, setPasswordExpiry] = useState("90days");
  const [syncTab, setSyncTab] = useState(false);
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <AuthenticationCard 
        mfa={mfa}
        setMfa={setMfa}
        sessionTimeout={sessionTimeout}
        setSessionTimeout={setSessionTimeout}
      />
      
      <PasswordPolicyCard 
        passwordExpiry={passwordExpiry}
        setPasswordExpiry={setPasswordExpiry}
      />
      
      <SecurityMonitoringCard />
      
      <UserSyncCard 
        syncTab={syncTab}
        setSyncTab={setSyncTab}
      />
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSecurity} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
