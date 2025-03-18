
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { PlatformType } from "../MobileAppFeatures";
import { Badge } from "@/components/ui/badge";

interface MobileAppInstallationProps {
  qrGenerated: boolean;
  onDownloadApp: () => void;
  platform: PlatformType;
}

export function MobileAppInstallation({ qrGenerated, onDownloadApp, platform }: MobileAppInstallationProps) {
  return (
    <div className="border rounded-md p-4 space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <Download className="h-5 w-5 text-primary" />
        <h4 className="font-medium">Installation</h4>
      </div>
      
      {qrGenerated ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center border">
            <div className="text-xs text-center p-2">
              [QR Code]<br />
              Scan with {platform === "android" ? "Android" : "iOS"} device
            </div>
          </div>
          
          <div className="flex flex-col gap-2 w-full">
            <Button variant="outline" className="gap-2 w-full" onClick={onDownloadApp}>
              <Download className="h-4 w-4" />
              Download {platform === "android" ? "APK" : "IPA"}
            </Button>
            
            {platform === "ios" && (
              <div className="text-xs text-muted-foreground text-center">
                <Badge variant="outline" className="mb-1">Enterprise Deployment</Badge>
                <p>iOS app requires device registration and enterprise certificate approval.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
          <p>Generate a QR code first to install the app.</p>
          {platform === "ios" && (
            <p className="text-xs mt-2">iOS devices require MDM enrollment or enterprise certificate.</p>
          )}
        </div>
      )}
    </div>
  );
}
