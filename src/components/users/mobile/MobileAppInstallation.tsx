
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface MobileAppInstallationProps {
  qrGenerated: boolean;
  onDownloadApp: () => void;
}

export function MobileAppInstallation({ qrGenerated, onDownloadApp }: MobileAppInstallationProps) {
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
              Scan with Android device
            </div>
          </div>
          <Button variant="outline" className="gap-2" onClick={onDownloadApp}>
            <Download className="h-4 w-4" />
            Download APK
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
          <p>Generate a QR code first to install the app.</p>
        </div>
      )}
    </div>
  );
}
