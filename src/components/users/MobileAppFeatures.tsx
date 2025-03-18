
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Smartphone, TabletSmartphone } from "lucide-react";
import { MobileAppConfiguration } from "./mobile/MobileAppConfiguration";
import { MobileAppInstallation } from "./mobile/MobileAppInstallation";
import { MobileAppWarning } from "./mobile/MobileAppWarning";
import { MobileDataAccess } from "./mobile/MobileDataAccess";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type PlatformType = "android" | "ios";

export function MobileAppFeatures() {
  const { toast } = useToast();
  const [qrGenerated, setQrGenerated] = useState(false);
  const [platform, setPlatform] = useState<PlatformType>("android");

  const handleGenerateQR = () => {
    setQrGenerated(true);
    toast({
      title: "QR Code Generated",
      description: `The QR code for ${platform === "android" ? "Android" : "iOS"} app installation has been generated.`,
    });
  };

  const handleDownloadApp = () => {
    toast({
      title: "Mobile App Download",
      description: `${platform === "android" ? "Android APK" : "iOS IPA"} file download started.`,
    });
  };

  const handlePlatformChange = (value: PlatformType) => {
    setPlatform(value);
    setQrGenerated(false); // Reset QR when platform changes
  };

  const renderPlatformContent = (currentPlatform: PlatformType) => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <MobileAppConfiguration 
          onGenerateQR={handleGenerateQR} 
          platform={currentPlatform} 
        />
        <MobileAppInstallation 
          qrGenerated={qrGenerated} 
          onDownloadApp={handleDownloadApp} 
          platform={currentPlatform}
        />
      </div>
      <MobileDataAccess platform={currentPlatform} />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TabletSmartphone className="h-5 w-5" />
          <span>Mobile Monitoring App</span>
        </CardTitle>
        <CardDescription>
          Configure and deploy the mobile monitoring app for Android and iOS devices.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="android" onValueChange={(v) => handlePlatformChange(v as PlatformType)}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="android" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Android
            </TabsTrigger>
            <TabsTrigger value="ios" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              iOS
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="android" className="space-y-6">
            {renderPlatformContent("android")}
          </TabsContent>
          
          <TabsContent value="ios" className="space-y-6">
            {renderPlatformContent("ios")}
          </TabsContent>
        </Tabs>
        
        <MobileAppWarning platform={platform} />
      </CardContent>
    </Card>
  );
}
