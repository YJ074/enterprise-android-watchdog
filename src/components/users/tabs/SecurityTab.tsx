
import { PasswordCard } from "./security/PasswordCard";
import { TwoFactorCard } from "./security/TwoFactorCard";
import { LoginHistoryCard } from "./security/LoginHistoryCard";
import { SecurityActionsCard } from "./security/SecurityActionsCard";

type SecurityTabProps = {
  userId: string;
};

export function SecurityTab({ userId }: SecurityTabProps) {
  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PasswordCard />
        <TwoFactorCard />
        <LoginHistoryCard />
        <SecurityActionsCard />
      </div>
    </div>
  );
}
