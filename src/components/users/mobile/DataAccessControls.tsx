
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlatformType } from "../MobileAppFeatures";
import { DataAccessOptions } from "./hooks/useDataAccessOptions";

interface DataAccessControlsProps {
  platform: PlatformType;
  dataOptions: DataAccessOptions;
  onToggleOption: (option: keyof DataAccessOptions) => void;
}

export function DataAccessControls({ platform, dataOptions, onToggleOption }: DataAccessControlsProps) {
  const getOptionLabel = (key: string): string => {
    switch (key) {
      case "userProfiles": return "User Profiles";
      case "deviceInfo": return "Device Information";
      case "activityLogs": return "Activity Logs";
      case "locationHistory": return "Location History";
      case "appUsage": return "App Usage Statistics";
      default: return key;
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Data Access Controls</Label>
      
      {Object.entries(dataOptions).map(([key, value]) => {
        const option = key as keyof DataAccessOptions;
        const disabled = platform === "ios" && (option === "activityLogs" || option === "locationHistory");
        
        return (
          <div key={key} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor={`toggle-${key}`} className={disabled ? "text-muted-foreground" : ""}>
                {getOptionLabel(key)}
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
              onCheckedChange={() => onToggleOption(option)}
            />
          </div>
        );
      })}
    </div>
  );
}
