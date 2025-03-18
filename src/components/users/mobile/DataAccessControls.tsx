
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PlatformType } from "../MobileAppFeatures";
import { DataAccessOptions, ComplianceSettings } from "./hooks/useDataAccessOptions";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

interface DataAccessControlsProps {
  platform: PlatformType;
  dataOptions: DataAccessOptions;
  onToggleOption: (option: keyof DataAccessOptions) => void;
  complianceSettings?: ComplianceSettings;
  onUpdateComplianceSetting?: (setting: keyof ComplianceSettings, value: any) => void;
  complianceMode?: string;
}

export function DataAccessControls({ 
  platform, 
  dataOptions, 
  onToggleOption,
  complianceSettings,
  onUpdateComplianceSetting,
  complianceMode = "standard"
}: DataAccessControlsProps) {
  const getOptionLabel = (key: string): string => {
    switch (key) {
      case "userProfiles": return "User Profiles";
      case "deviceInfo": return "Device Information";
      case "activityLogs": return "Activity Logs";
      case "locationHistory": return "Location History";
      case "appUsage": return "App Usage Statistics";
      case "sensitiveData": return "Sensitive User Data";
      case "healthData": return "Health Data";
      default: return key;
    }
  };

  const getOptionDescription = (key: string): string => {
    switch (key) {
      case "sensitiveData": return "Personal identifiable information";
      case "healthData": return "Medical and health-related information";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Data Access Controls</Label>
        
        {Object.entries(dataOptions).map(([key, value]) => {
          if (value === undefined) return null;
          
          const option = key as keyof DataAccessOptions;
          const disabled = platform === "ios" && (option === "activityLogs" || option === "locationHistory");
          const description = getOptionDescription(key);
          
          // Special case for HIPAA compliance and health data
          const isHealthData = option === "healthData" && complianceMode === "hipaa";
          // Special case for GDPR compliance and sensitive data
          const isSensitiveData = option === "sensitiveData" && complianceMode === "gdpr";
          
          const needsWarning = isHealthData || isSensitiveData;
          
          return (
            <div key={key} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label 
                  htmlFor={`toggle-${key}`} 
                  className={`${disabled ? "text-muted-foreground" : ""} ${needsWarning ? "text-amber-600" : ""}`}
                >
                  {getOptionLabel(key)}
                  {needsWarning && <Shield className="h-3 w-3 inline ml-1" />}
                </Label>
                {description && (
                  <p className="text-xs text-muted-foreground">
                    {description}
                  </p>
                )}
                {disabled && (
                  <p className="text-xs text-muted-foreground">
                    Limited by iOS restrictions
                  </p>
                )}
                {needsWarning && (
                  <p className="text-xs text-amber-600">
                    {isHealthData && "Requires special HIPAA compliance measures"}
                    {isSensitiveData && "Subject to GDPR consent and processing rules"}
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
      
      {complianceSettings && onUpdateComplianceSetting && (
        <>
          <Separator />
          
          <div className="space-y-3">
            <Label className="text-sm font-medium">Compliance Settings</Label>
            
            <div className="space-y-2">
              <Label htmlFor="data-retention">Data Retention (days)</Label>
              <Input
                id="data-retention"
                type="number"
                min={1}
                max={3650}
                value={complianceSettings.dataRetentionDays}
                onChange={(e) => onUpdateComplianceSetting('dataRetentionDays', parseInt(e.target.value) || 365)}
                className="w-full"
              />
              {complianceMode === "gdpr" && (
                <p className="text-xs text-amber-600">
                  GDPR compliance recommends minimizing data retention periods
                </p>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="encrypt-data">Encrypt Data</Label>
                <p className="text-xs text-muted-foreground">
                  Store all collected data with encryption
                </p>
              </div>
              <Switch 
                id="encrypt-data" 
                checked={complianceSettings.encryptData}
                disabled={complianceMode === "hipaa" || complianceMode === "pci"}
                onCheckedChange={(checked) => onUpdateComplianceSetting('encryptData', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-export">Allow Data Export</Label>
                <p className="text-xs text-muted-foreground">
                  Enable exporting of collected data
                </p>
              </div>
              <Switch 
                id="allow-export" 
                checked={complianceSettings.allowExport}
                disabled={complianceMode === "hipaa" || complianceMode === "pci"}
                onCheckedChange={(checked) => onUpdateComplianceSetting('allowExport', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mask-data">Mask Sensitive Data</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically mask PII in displays and exports
                </p>
              </div>
              <Switch 
                id="mask-data" 
                checked={complianceSettings.maskSensitiveData}
                disabled={complianceMode === "hipaa" || complianceMode === "pci" || complianceMode === "gdpr"}
                onCheckedChange={(checked) => onUpdateComplianceSetting('maskSensitiveData', checked)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
