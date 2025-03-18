
import { Device } from '../../types/device.types';

export const executiveDevices: Device[] = [
  {
    id: "dev-004",
    name: "Galaxy Tab-James",
    model: "Samsung Galaxy Tab S9",
    osVersion: "Android 13",
    lastSeen: "2023-10-13T16:20:00",
    status: "offline",
    batteryLevel: 0,
    storageUsed: 98,
    totalStorage: 256,
    user: "James Wilson",
    department: "Executive",
    applications: [
      {
        id: "app-005",
        name: "Microsoft Office",
        installDate: "2023-02-11",
        version: "16.0.16728.20116",
        size: 456,
        permissions: ["Storage", "Contacts"],
        isSystemApp: false
      }
    ]
  }
];
