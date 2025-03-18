
export interface Device {
  id: string;
  name: string;
  model: string;
  osVersion: string;
  lastSeen: string;
  status: 'online' | 'offline' | 'warning' | 'compromised';
  batteryLevel: number;
  storageUsed: number;
  totalStorage: number;
  user: string;
  department: string;
  applications: Application[];
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface Application {
  id: string;
  name: string;
  installDate: string;
  version: string;
  size: number;
  permissions: string[];
  isSystemApp: boolean;
}
