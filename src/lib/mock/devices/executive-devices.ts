
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
  },
  {
    id: "dev-012",
    name: "MacBook Air-CEO",
    model: "MacBook Air M2",
    osVersion: "macOS 14.0",
    lastSeen: "2023-10-15T11:15:00",
    status: "online",
    batteryLevel: 92,
    storageUsed: 234,
    totalStorage: 512,
    user: "Michael Thompson",
    department: "Executive",
    applications: [
      {
        id: "app-016",
        name: "Microsoft Excel",
        installDate: "2023-01-25",
        version: "16.0.16728.20124",
        size: 345,
        permissions: ["Files"],
        isSystemApp: false
      },
      {
        id: "app-017",
        name: "Zoom",
        installDate: "2023-02-15",
        version: "5.15.5",
        size: 156,
        permissions: ["Camera", "Microphone"],
        isSystemApp: false
      }
    ]
  },
  {
    id: "dev-013",
    name: "iPad Air-CFO",
    model: "iPad Air 5",
    osVersion: "iPadOS 16.6",
    lastSeen: "2023-10-15T08:35:00",
    status: "online",
    batteryLevel: 56,
    storageUsed: 89,
    totalStorage: 256,
    user: "Jennifer Foster",
    department: "Executive",
    applications: [
      {
        id: "app-018",
        name: "Outlook",
        installDate: "2023-01-18",
        version: "16.0.16728.20118",
        size: 289,
        permissions: ["Contacts", "Calendar"],
        isSystemApp: false
      }
    ]
  }
];
