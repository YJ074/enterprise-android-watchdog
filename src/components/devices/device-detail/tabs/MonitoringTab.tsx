
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, MessageSquare, Mail, Camera, Clock, FileImage, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function MonitoringTab() {
  const [callMonitoring, setCallMonitoring] = useState(false);
  const [whatsappTracking, setWhatsappTracking] = useState(false);
  const [emailMonitoring, setEmailMonitoring] = useState(false);
  const [screenshotInterval, setScreenshotInterval] = useState("30");
  const [mediaTracking, setMediaTracking] = useState(false);
  const [socialMediaTracking, setSocialMediaTracking] = useState(false);
  
  const handleEnableAll = () => {
    setCallMonitoring(true);
    setWhatsappTracking(true);
    setEmailMonitoring(true);
    setMediaTracking(true);
    setSocialMediaTracking(true);
    
    toast.success("All monitoring features enabled", {
      description: "Device monitoring is now fully active"
    });
  };
  
  const handleScreenshotIntervalChange = (value: string) => {
    setScreenshotInterval(value);
    toast.success("Screenshot interval updated", {
      description: `Screenshots will be taken every ${value} seconds`
    });
  };
  
  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="text-sm font-medium mb-4 flex items-center gap-2">
        <Monitor className="h-5 w-5 text-muted-foreground" />
        Monitoring Controls
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Communication Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="call-tracking">Call Tracking</Label>
                </div>
                <Switch 
                  id="call-tracking"
                  checked={callMonitoring}
                  onCheckedChange={setCallMonitoring}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="whatsapp-tracking">WhatsApp Tracking</Label>
                </div>
                <Switch 
                  id="whatsapp-tracking"
                  checked={whatsappTracking}
                  onCheckedChange={setWhatsappTracking}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="email-tracking">Email Monitoring</Label>
                </div>
                <Switch 
                  id="email-tracking"
                  checked={emailMonitoring}
                  onCheckedChange={setEmailMonitoring}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="social-media-tracking">Social Media Tracking</Label>
                </div>
                <Switch 
                  id="social-media-tracking"
                  checked={socialMediaTracking}
                  onCheckedChange={setSocialMediaTracking}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Screen Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="screenshot-interval">Screenshot Interval</Label>
                <Select 
                  value={screenshotInterval}
                  onValueChange={handleScreenshotIntervalChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Every 15 seconds</SelectItem>
                    <SelectItem value="30">Every 30 seconds</SelectItem>
                    <SelectItem value="60">Every minute</SelectItem>
                    <SelectItem value="300">Every 5 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="keylogger">Keylogger</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="browsing-tracking">Browsing History</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Media Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="media-tracking">Media File Tracking</Label>
                </div>
                <Switch
                  id="media-tracking"
                  checked={mediaTracking}
                  onCheckedChange={setMediaTracking}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="photo-tracking">Photos & Videos</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="audio-tracking">Audio Recordings</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Schedule & Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="schedule">Monitoring Schedule</Label>
                </div>
                <Button variant="outline" size="sm">Set Hours</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="data-retention">Data Retention</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="export">Export Options</Label>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <Button className="w-full" onClick={handleEnableAll}>Enable All Monitoring</Button>
      </div>
    </div>
  );
}
