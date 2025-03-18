
import { useState, useEffect } from "react";
import { PlatformType } from "../../MobileAppFeatures";
import { useAuth } from "@/context/AuthContext";

export interface DataAccessOptions {
  userProfiles: boolean;
  deviceInfo: boolean;
  activityLogs: boolean;
  locationHistory: boolean;
  appUsage: boolean;
  sensitiveData?: boolean;
  healthData?: boolean;
}

export interface ComplianceSettings {
  dataRetentionDays: number;
  encryptData: boolean;
  allowExport: boolean;
  maskSensitiveData: boolean;
}

export function useDataAccessOptions(platform: PlatformType) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // Get the compliance mode from localStorage
  const getComplianceMode = () => {
    try {
      return localStorage.getItem("complianceMode") || "standard";
    } catch (error) {
      console.error("Error getting compliance mode:", error);
      return "standard";
    }
  };

  const complianceMode = getComplianceMode();

  // Initialize data options based on platform and compliance mode
  const [dataOptions, setDataOptions] = useState<DataAccessOptions>({
    userProfiles: true,
    deviceInfo: true,
    activityLogs: platform === "ios" ? false : true,
    locationHistory: platform === "ios" ? false : true,
    appUsage: true,
    sensitiveData: false,
    healthData: complianceMode === "hipaa" ? false : undefined,
  });

  // Initialize compliance settings based on compliance mode
  const [complianceSettings, setComplianceSettings] = useState<ComplianceSettings>({
    dataRetentionDays: complianceMode === "gdpr" ? 90 : 365,
    encryptData: complianceMode === "hipaa" || complianceMode === "pci",
    allowExport: complianceMode !== "pci" && complianceMode !== "hipaa",
    maskSensitiveData: complianceMode === "hipaa" || complianceMode === "pci" || complianceMode === "gdpr",
  });

  // Load user data access permissions from localStorage
  useEffect(() => {
    if (isAdmin) {
      try {
        const savedAccess = localStorage.getItem("adminDataAccess");
        if (savedAccess) {
          const accessList = JSON.parse(savedAccess);
          // Update data options based on admin permissions
          if (!accessList.includes("user-data")) {
            setDataOptions(prev => ({ ...prev, userProfiles: false }));
          }
          if (!accessList.includes("device-data")) {
            setDataOptions(prev => ({ ...prev, deviceInfo: false }));
          }
          if (!accessList.includes("activity-logs")) {
            setDataOptions(prev => ({ ...prev, activityLogs: false }));
          }
        }
      } catch (error) {
        console.error("Error loading admin data access permissions:", error);
      }
    }
  }, [isAdmin]);

  const handleToggleDataOption = (option: keyof DataAccessOptions) => {
    setDataOptions((prev) => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleUpdateComplianceSetting = (setting: keyof ComplianceSettings, value: any) => {
    setComplianceSettings((prev) => ({
      ...prev,
      [setting]: value
    }));
  };

  return {
    dataOptions,
    handleToggleDataOption,
    complianceSettings,
    handleUpdateComplianceSetting,
    complianceMode
  };
}
