
import { Device } from '../../types/device.types';

export const marketingDevices: Device[] = [
  {
    id: "dev-001",
    name: "Galaxy S23-Emma",
    model: "Samsung Galaxy S23",
    osVersion: "Android 13",
    lastSeen: "2023-10-15T08:30:00",
    status: "online",
    batteryLevel: 87,
    storageUsed: 64,
    totalStorage: 128,
    user: "Emma Johnson",
    department: "Marketing",
    applications: [
      {
        id: "app-001",
        name: "Gmail",
        installDate: "2023-01-15",
        version: "2023.10.08",
        size: 156,
        permissions: ["Contacts", "Storage", "Camera"],
        isSystemApp: false
      },
      {
        id: "app-002",
        name: "Chrome",
        installDate: "2023-01-15",
        version: "118.0.5993.65",
        size: 234,
        permissions: ["Location", "Storage", "Camera"],
        isSystemApp: true
      }
    ],
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: "San Francisco, CA"
    }
  }
];
