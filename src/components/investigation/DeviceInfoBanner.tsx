
import React from "react";
import { Device } from "@/lib/types/device.types";

interface DeviceInfoBannerProps {
  device: Device | null;
}

export function DeviceInfoBanner({ device }: DeviceInfoBannerProps) {
  if (!device) return null;
  
  return (
    <div className="bg-muted/20 p-3 rounded-md">
      <p className="text-sm text-muted-foreground">
        Investigating device: <span className="font-medium text-foreground">{device.name}</span>
      </p>
    </div>
  );
}
