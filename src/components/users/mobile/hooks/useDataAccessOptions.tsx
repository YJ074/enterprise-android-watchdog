
import { useState } from "react";
import { PlatformType } from "../../MobileAppFeatures";

export interface DataAccessOptions {
  userProfiles: boolean;
  deviceInfo: boolean;
  activityLogs: boolean;
  locationHistory: boolean;
  appUsage: boolean;
}

export function useDataAccessOptions(platform: PlatformType) {
  const [dataOptions, setDataOptions] = useState<DataAccessOptions>({
    userProfiles: true,
    deviceInfo: true,
    activityLogs: platform === "ios" ? false : true,
    locationHistory: platform === "ios" ? false : true,
    appUsage: true,
  });

  const handleToggleDataOption = (option: keyof DataAccessOptions) => {
    setDataOptions((prev) => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return {
    dataOptions,
    handleToggleDataOption
  };
}
