
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Smartphone } from "lucide-react";
import { MobileAppConfiguration } from "./mobile/MobileAppConfiguration";
import { MobileAppInstallation } from "./mobile/MobileAppInstallation";
import { MobileAppWarning } from "./mobile/MobileAppWarning";

export function MobileAppFeatures() {
  const { toast } = useToast();
  const [qrGenerated, setQrGenerated] = useState(false);

  const handleGenerateQR = () => {
    setQrGenerated(true);
    toast({
      title: "QR Code Generated",
      description: "The QR code for mobile app installation has been generated.",
    });
  };

  const handleDownloadApp = () => {
    toast({
      title: "Mobile App Download",
      description: "Android APK file download started.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          <span>Android Mobile App</span>
        </CardTitle>
        <CardDescription>
          Configure and deploy the Android monitoring app.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <MobileAppConfiguration onGenerateQR={handleGenerateQR} />
          <MobileAppInstallation 
            qrGenerated={qrGenerated} 
            onDownloadApp={handleDownloadApp} 
          />
        </div>
        
        <MobileAppWarning />
      </CardContent>
    </Card>
  );
}
