
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Phone,
  MapPin,
  Image,
  Globe,
  Smartphone,
  Clock,
  Shield,
  FileText,
  BatteryMedium,
  Wifi,
  Upload,
  Lock
} from "lucide-react";

export function MobileAppFeatures() {
  const features = [
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: "Call Monitoring",
      description: "Record calls and track call history with contact details"
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-green-500" />,
      title: "Message Tracking",
      description: "Monitor SMS, WhatsApp, Messenger, and other messaging apps"
    },
    {
      icon: <MapPin className="h-5 w-5 text-red-500" />,
      title: "Location Tracking",
      description: "Real-time GPS location with history and geofencing"
    },
    {
      icon: <Globe className="h-5 w-5 text-purple-500" />,
      title: "Browser History",
      description: "Track web browsing including incognito mode"
    },
    {
      icon: <Smartphone className="h-5 w-5 text-gray-500" />,
      title: "App Monitoring",
      description: "Track installed apps and app usage statistics"
    },
    {
      icon: <Image className="h-5 w-5 text-pink-500" />,
      title: "Media Files",
      description: "Access photos, videos, and documents stored on device"
    },
    {
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      title: "Screen Time",
      description: "Monitor device usage time and patterns"
    },
    {
      icon: <Shield className="h-5 w-5 text-emerald-500" />,
      title: "Stealth Mode",
      description: "Runs invisibly in the background without detection"
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      title: "Keylogger",
      description: "Capture typed text across applications"
    },
    {
      icon: <BatteryMedium className="h-5 w-5 text-green-600" />,
      title: "Battery Efficient",
      description: "Optimized to minimize battery consumption"
    },
    {
      icon: <Wifi className="h-5 w-5 text-cyan-500" />,
      title: "Flexible Sync",
      description: "Configure to sync only on Wi-Fi to save data"
    },
    {
      icon: <Upload className="h-5 w-5 text-indigo-500" />,
      title: "Remote Upload",
      description: "Remotely retrieve data from the target device"
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          <span>Android Monitoring Features</span>
        </CardTitle>
        <CardDescription>
          Our Android app collects the following data from monitored devices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="border rounded-md p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{feature.icon}</div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-5 w-5 text-amber-600" />
            <h3 className="font-medium">Privacy & Legal Compliance</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            This monitoring software is designed for legitimate use cases such as parental control and company-owned device management.
            Always ensure you have proper authorization to monitor a device and comply with applicable local laws.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
