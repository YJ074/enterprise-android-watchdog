
export interface MdmPolicy {
  id: string;
  name: string;
  description: string;
  type: 'security' | 'compliance' | 'software' | 'network';
  settings: Record<string, any>;
  isActive: boolean;
  appliesTo: 'windows' | 'macos' | 'all';
  createdAt: string;
}

export interface MdmDeployment {
  id: string;
  policyId: string;
  deviceId: string;
  status: 'pending' | 'deployed' | 'failed';
  timestamp: string;
  errorMessage?: string;
}

export interface OsDistribution {
  name: string;
  count: number;
  percentage: number;
}

export interface MdmStatistics {
  totalDevices: number;
  compliantDevices: number;
  osDistribution: OsDistribution[];
  recentDeployments: number;
  failedDeployments: number;
}
