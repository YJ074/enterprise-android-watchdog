
import { useState } from "react";
import { Database, Smartphone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PlatformType } from "../MobileAppFeatures";
import { Separator } from "@/components/ui/separator";
import { DataAccessControls } from "./DataAccessControls";
import { SyncIntervalSelector } from "./SyncIntervalSelector";
import { ApiKeyGenerator } from "./ApiKeyGenerator";
import { PlatformInfoNote } from "./PlatformInfoNote";
import { useDataAccessOptions } from "./hooks/useDataAccessOptions";

interface MobileDataAccessProps {
  platform: PlatformType;
}

export function MobileDataAccess({ platform }: MobileDataAccessProps) {
  const [syncInterval, setSyncInterval] = useState("hourly");
  const { dataOptions, handleToggleDataOption } = useDataAccessOptions(platform);

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
        <DataAccessControls 
          platform={platform}
          dataOptions={dataOptions}
          onToggleOption={handleToggleDataOption}
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
