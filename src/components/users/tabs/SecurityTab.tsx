
import { PasswordCard } from "./security/PasswordCard";
import { TwoFactorCard } from "./security/TwoFactorCard";
import { LoginHistoryCard } from "./security/LoginHistoryCard";
import { SecurityActionsCard } from "./security/SecurityActionsCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { useState } from "react";

type SecurityTabProps = {
  userId: string;
};

export function SecurityTab({ userId }: SecurityTabProps) {
  const [showComplianceAlert] = useState(true);

  return (
    <div className="space-y-4">
      {showComplianceAlert && (
        <Alert variant="warning" className="mb-4">
          <Shield className="h-4 w-4" />
          <AlertTitle>Security Policy Compliance</AlertTitle>
          <AlertDescription>
            This user's account needs to comply with updated security policies. Please verify the password complexity and multi-factor authentication settings.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="p-4 border rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PasswordCard />
          <TwoFactorCard />
          <LoginHistoryCard />
          <SecurityActionsCard />
        </div>
      </div>
    </div>
  );
}
