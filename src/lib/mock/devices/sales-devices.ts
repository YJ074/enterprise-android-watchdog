
import { Device } from '../../types/device.types';

export const salesDevices: Device[] = [
  {
    id: "dev-003",
    name: "OnePlus 11-Sarah",
    model: "OnePlus 11",
    osVersion: "Android 13",
    lastSeen: "2023-10-15T07:15:00",
    status: "warning",
    batteryLevel: 45,
    storageUsed: 45,
    totalStorage: 128,
    user: "Sarah Garcia",
    department: "Sales",
    applications: [
      {
        id: "app-004",
        name: "Salesforce",
        installDate: "2023-05-18",
        version: "244.2",
        size: 312,
        permissions: ["Contacts", "Location", "Calendar"],
        isSystemApp: false
      }
    ]
  }
];
