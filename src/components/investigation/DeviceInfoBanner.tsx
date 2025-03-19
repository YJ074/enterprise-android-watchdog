
import React from "react";
import { Device } from "@/lib/types/device.types";
import { InfoBanner } from "@/components/common/InfoBanner";
import { DeviceInfoContent } from "./banners/DeviceInfoContent";

interface DeviceInfoBannerProps {
  device: Device | null;
}

export function DeviceInfoBanner({ device }: DeviceInfoBannerProps) {
  if (!device) return null;
  
  return (
    <InfoBanner label="Investigating device">
      <DeviceInfoContent device={device} />
    </InfoBanner>
  );
}
