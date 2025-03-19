
import React from "react";
import { Device } from "@/lib/types/device.types";
import { ShieldCheck } from "lucide-react";

interface DeviceInfoContentProps {
  device: Device;
}

export function DeviceInfoContent({ device }: DeviceInfoContentProps) {
  return (
    <div className="flex items-center space-x-2">
      <ShieldCheck className="h-4 w-4 text-primary" />
      <span className="font-medium text-foreground">{device.name}</span>
      <span className="text-muted-foreground">({device.model})</span>
      {device.osVersion && (
        <span className="text-xs bg-muted px-2 py-1 rounded-full">
          {device.osVersion}
        </span>
      )}
    </div>
  );
}
