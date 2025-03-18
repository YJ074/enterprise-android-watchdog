
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Database, Key, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { PlatformType } from "../MobileAppFeatures";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MobileDataAccessProps {
  platform: PlatformType;
}

export function MobileDataAccess({ platform }: MobileDataAccessProps) {
  const { toast } = useToast();
  const [apiKeyGenerated, setApiKeyGenerated] = useState(false);
  const [syncInterval, setSyncInterval] = useState("hourly");
  const [dataOptions, setDataOptions] = useState({
    userProfiles: true,
    deviceInfo: true,
    activityLogs: platform === "ios" ? false : true, // Limited on iOS by default
    locationHistory: platform === "ios" ? false : true, // Limited on iOS by default
    appUsage: true,
  });

  const handleGenerateApiKey = () => {
    setApiKeyGenerated(true);
    toast({
      title: `${platform === "ios" ? "iOS" : "Android"} API Key Generated`,
      description: "The API key for data access has been generated successfully.",
    });
  };

  const handleToggleDataOption = (option: keyof typeof dataOptions) => {
    setDataOptions((prev) => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-primary" />
        <h4 className="font-medium">
          {platform === "ios" ? "iOS" : "Android"} Data Access
        </h4>
      </div>

      <p className="text-sm text-muted-foreground">
        Configure what data the {platform === "ios" ? "iOS" : "Android"} app can access and how frequently it syncs.
        {platform === "ios" && (
          <span className="block mt-1 text-amber-600 text-xs">
            Note: iOS platform restrictions limit some data collection capabilities.
          </span>
        )}
      </p>

      <Separator className="my-2" />

      <div className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Data Access Controls</Label>
          
          {Object.entries(dataOptions).map(([key, value]) => {
            const option = key as keyof typeof dataOptions;
            const disabled = platform === "ios" && (option === "activityLogs" || option === "locationHistory");
            
            return (
              <div key={key} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor={`toggle-${key}`} className={disabled ? "text-muted-foreground" : ""}>
                    {key === "userProfiles" ? "User Profiles" : 
                     key === "deviceInfo" ? "Device Information" : 
                     key === "activityLogs" ? "Activity Logs" : 
                     key === "locationHistory" ? "Location History" : 
                     "App Usage Statistics"}
                  </Label>
                  {disabled && (
                    <p className="text-xs text-muted-foreground">
                      Limited by iOS restrictions
                    </p>
                  )}
                </div>
                <Switch 
                  id={`toggle-${key}`} 
                  checked={value} 
                  disabled={disabled}
                  onCheckedChange={() => handleToggleDataOption(option)}
                />
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sync-interval">Data Sync Interval</Label>
          <Select value={syncInterval} onValueChange={setSyncInterval}>
            <SelectTrigger id="sync-interval">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Real-time (when possible)</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="manual">Manual Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="pt-2">
          {apiKeyGenerated ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">API Key Generated</span>
              </div>
              <div className="p-2 bg-gray-50 border rounded text-xs font-mono break-all">
                iosmb_{platform}_dataacc_{Math.random().toString(36).substring(2, 10)}
              </div>
              <p className="text-xs text-muted-foreground">
                Use this API key in your {platform === "ios" ? "iOS" : "Android"} app to authenticate data access requests.
              </p>
            </div>
          ) : (
            <Button 
              onClick={handleGenerateApiKey} 
              className="w-full gap-2"
            >
              <Key className="h-4 w-4" />
              Generate Data Access API Key
            </Button>
          )}
        </div>
      </div>

      {platform === "ios" && (
        <div className="rounded-lg bg-blue-50 p-3 text-blue-800 border border-blue-200 mt-4">
          <div className="flex items-start space-x-2">
            <Smartphone className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">iOS Data Access Notes</p>
              <p className="mt-1">
                For iOS apps, data access is more restricted compared to Android. To access full user data,
                your iOS app must use MDM enrollment or be registered with your enterprise certificate.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
