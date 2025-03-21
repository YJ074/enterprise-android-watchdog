
import { AlertTriangle } from "lucide-react";
import { PlatformType } from "../MobileAppFeatures";
import { PlatformSpecificWarning } from "./PlatformSpecificWarning";

interface MobileAppWarningProps {
  platform: PlatformType;
}

export function MobileAppWarning({ platform }: MobileAppWarningProps) {
  return (
    <div className="rounded-lg bg-amber-50 p-4 text-amber-800 border border-amber-200">
      <div className="flex items-start space-x-2">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium">Important Notice</h4>
          {platform === "android" ? (
            <PlatformSpecificWarning title="The Android monitoring app requires special permissions to function properly. Make sure to follow all installation instructions carefully.">
              <p>
                Some Android devices may require disabling battery optimization for the app.
                This application should only be used in compliance with all applicable laws.
              </p>
            </PlatformSpecificWarning>
          ) : (
            <PlatformSpecificWarning title="iOS monitoring capabilities are more limited due to platform restrictions. MDM enrollment or enterprise certificate is required for full functionality.">
              <p>
                For complete user data access and monitoring capabilities, devices must be enrolled in your MDM solution.
                This application should only be used in compliance with all applicable laws and Apple's guidelines.
              </p>
            </PlatformSpecificWarning>
          )}
        </div>
      </div>
    </div>
  );
}
