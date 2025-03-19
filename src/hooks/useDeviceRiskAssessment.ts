
import { Device } from "@/lib/types/device.types";

// Risk factors and their weights
const RISK_FACTORS = {
  STATUS: {
    online: 0,
    offline: 30,
    warning: 60,
    compromised: 100
  },
  OS_VERSION: {
    upToDate: 0,
    outdated: 40,
    veryOutdated: 70
  },
  LAST_SEEN: {
    recent: 0,    // < 1 day
    moderate: 20, // 1-7 days
    old: 50       // > 7 days
  },
  BATTERY_LEVEL: {
    good: 0,      // > 30%
    low: 10       // <= 30%
  }
};

// Function to determine OS version status based on version string
const getOsVersionStatus = (osVersion: string): keyof typeof RISK_FACTORS.OS_VERSION => {
  // This is a simplified example. In a real app, you would compare against known latest versions
  if (osVersion.includes('latest') || parseInt(osVersion.split('.')[0]) >= 14) {
    return 'upToDate';
  } else if (parseInt(osVersion.split('.')[0]) >= 12) {
    return 'outdated';
  } else {
    return 'veryOutdated';
  }
};

// Function to determine last seen status
const getLastSeenStatus = (lastSeen: string): keyof typeof RISK_FACTORS.LAST_SEEN => {
  const lastSeenDate = new Date(lastSeen);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) {
    return 'recent';
  } else if (diffDays <= 7) {
    return 'moderate';
  } else {
    return 'old';
  }
};

// Calculate risk score for a device (0-100, where 100 is highest risk)
export const calculateDeviceRiskScore = (device: Device): number => {
  const statusRisk = RISK_FACTORS.STATUS[device.status];
  const osVersionRisk = RISK_FACTORS.OS_VERSION[getOsVersionStatus(device.osVersion)];
  const lastSeenRisk = RISK_FACTORS.LAST_SEEN[getLastSeenStatus(device.lastSeen)];
  const batteryRisk = RISK_FACTORS.BATTERY_LEVEL[device.batteryLevel > 30 ? 'good' : 'low'];
  
  // Weighted average of risk factors
  const totalRisk = (statusRisk * 0.4) + (osVersionRisk * 0.3) + (lastSeenRisk * 0.2) + (batteryRisk * 0.1);
  return Math.min(100, Math.round(totalRisk));
};

// Get risk level based on score
export const getRiskLevel = (riskScore: number): 'low' | 'medium' | 'high' | 'critical' => {
  if (riskScore < 25) return 'low';
  if (riskScore < 50) return 'medium';
  if (riskScore < 75) return 'high';
  return 'critical';
};

// Get color for risk level
export const getRiskLevelColor = (riskLevel: ReturnType<typeof getRiskLevel>): string => {
  switch (riskLevel) {
    case 'low': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'critical': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Generate compliance issues based on device state
export const getComplianceIssues = (device: Device): string[] => {
  const issues: string[] = [];
  
  if (device.status === 'compromised') {
    issues.push('Device security compromised');
  }
  
  if (device.status === 'offline' && getLastSeenStatus(device.lastSeen) !== 'recent') {
    issues.push('Device offline for extended period');
  }
  
  if (getOsVersionStatus(device.osVersion) !== 'upToDate') {
    issues.push('Operating system requires update');
  }
  
  if (device.batteryLevel < 20) {
    issues.push('Battery level critically low');
  }
  
  if (device.storageUsed / device.totalStorage > 0.9) {
    issues.push('Storage nearly full (>90% used)');
  }
  
  return issues;
};

export function useDeviceRiskAssessment() {
  return {
    calculateDeviceRiskScore,
    getRiskLevel,
    getRiskLevelColor,
    getComplianceIssues
  };
}
