
import { Device } from '../../types/device.types';

export const supportDevices: Device[] = [
  {
    id: "dev-005",
    name: "Pixel 6a-Aisha",
    model: "Google Pixel 6a",
    osVersion: "Android 13",
    lastSeen: "2023-10-15T10:10:00",
    status: "compromised",
    batteryLevel: 62,
    storageUsed: 56,
    totalStorage: 128,
    user: "Aisha Patel",
    department: "Customer Support",
    applications: [
      {
        id: "app-006",
        name: "Zendesk",
        installDate: "2023-06-01",
        version: "23.10.1",
        size: 178,
        permissions: ["Contacts", "Storage", "Microphone", "Camera"],
        isSystemApp: false
      }
    ]
  }
];
