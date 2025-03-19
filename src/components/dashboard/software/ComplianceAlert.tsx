
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function ComplianceAlert() {
  return (
    <Alert className="bg-amber-50 border-amber-200 shadow-md">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800">Software Compliance Notice</AlertTitle>
      <AlertDescription className="text-amber-700">
        Some devices may be running outdated or non-compliant software. Review the inventory to ensure all devices meet your organization's requirements.
      </AlertDescription>
    </Alert>
  );
}
