
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function InvestigationComplianceAlert() {
  return (
    <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
      <AlertCircle className="h-4 w-4 text-blue-800" />
      <AlertDescription>
        All investigation activities are logged and subject to compliance review
      </AlertDescription>
    </Alert>
  );
}
