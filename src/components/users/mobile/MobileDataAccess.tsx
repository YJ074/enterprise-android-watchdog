
import { useState, useEffect } from "react";
import { Database, Smartphone, Shield } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PlatformType } from "../MobileAppFeatures";
import { Separator } from "@/components/ui/separator";
import { DataAccessControls } from "./DataAccessControls";
import { SyncIntervalSelector } from "./SyncIntervalSelector";
import { ApiKeyGenerator } from "./ApiKeyGenerator";
import { PlatformInfoNote } from "./PlatformInfoNote";
import { useDataAccessOptions } from "./hooks/useDataAccessOptions";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface MobileDataAccessProps {
  platform: PlatformType;
}

export function MobileDataAccess({ platform }: MobileDataAccessProps) {
  const [syncInterval, setSyncInterval] = useState("hourly");
  const { 
    dataOptions, 
    handleToggleDataOption, 
    complianceSettings,
    handleUpdateComplianceSetting,
    complianceMode
  } = useDataAccessOptions(platform);

  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <h4 className="font-medium">
            {platform === "ios" ? "iOS" : "Android"} Data Access
          </h4>
        </div>
        
        {complianceMode !== "standard" && (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
            <Shield className="h-3 w-3 mr-1" />
            {complianceMode.toUpperCase()} Compliance
          </Badge>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Configure what data the {platform === "ios" ? "iOS" : "Android"} app can access and how frequently it syncs.
        {platform === "ios" && (
          <span className="block mt-1 text-amber-600 text-xs">
            Note: iOS platform restrictions limit some data collection capabilities.
          </span>
        )}
      </p>

      {complianceMode !== "standard" && (
        <Alert className="bg-amber-50 text-amber-800 border-amber-200">
          <AlertTitle className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            {complianceMode.toUpperCase()} Compliance Mode Active
          </AlertTitle>
          <AlertDescription>
            {complianceMode === "hipaa" && "This mode enforces HIPAA compliance for healthcare data protection."}
            {complianceMode === "gdpr" && "This mode enforces GDPR compliance for EU data protection."}
            {complianceMode === "pci" && "This mode enforces PCI DSS compliance for payment data protection."}
            Some settings are automatically configured to maintain compliance.
          </AlertDescription>
        </Alert>
      )}

      <Separator className="my-2" />

      <div className="space-y-4">
        <DataAccessControls 
          platform={platform}
          dataOptions={dataOptions}
          onToggleOption={handleToggleDataOption}
          complianceSettings={complianceSettings}
          onUpdateComplianceSetting={handleUpdateComplianceSetting}
          complianceMode={complianceMode}
        />

        <SyncIntervalSelector 
          syncInterval={syncInterval} 
          onChange={setSyncInterval} 
        />
        
        <ApiKeyGenerator platform={platform} />
      </div>

      {platform === "ios" && (
        <PlatformInfoNote 
          icon={<Smartphone className="h-5 w-5" />} 
          title="iOS Data Access Notes"
        >
          <p>
            For iOS apps, data access is more restricted compared to Android. To access full user data,
            your iOS app must use MDM enrollment or be registered with your enterprise certificate.
          </p>
        </PlatformInfoNote>
      )}
    </div>
  );
}
