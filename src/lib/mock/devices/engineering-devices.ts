
import { Device } from '../../types/device.types';

export const engineeringDevices: Device[] = [
  {
    id: "dev-002",
    name: "Pixel 7-Marcus",
    model: "Google Pixel 7",
    osVersion: "Android 14",
    lastSeen: "2023-10-15T09:45:00",
    status: "offline",
    batteryLevel: 23,
    storageUsed: 187,
    totalStorage: 256,
    user: "Marcus Chen",
    department: "Engineering",
    applications: [
      {
        id: "app-003",
        name: "Slack",
        installDate: "2023-03-22",
        version: "23.10.10.0",
        size: 198,
        permissions: ["Contacts", "Storage", "Microphone"],
        isSystemApp: false
      }
    ]
  }
];
