
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
  },
  {
    id: "dev-010",
    name: "iPhone 13-David",
    model: "iPhone 13",
    osVersion: "iOS 17.0",
    lastSeen: "2023-10-15T09:55:00",
    status: "online",
    batteryLevel: 63,
    storageUsed: 86,
    totalStorage: 128,
    user: "David Wilson",
    department: "Sales",
    applications: [
      {
        id: "app-013",
        name: "HubSpot",
        installDate: "2023-04-15",
        version: "23.10.5",
        size: 245,
        permissions: ["Contacts", "Calendar"],
        isSystemApp: false
      },
      {
        id: "app-014",
        name: "LinkedIn",
        installDate: "2023-01-22",
        version: "11.25.0",
        size: 178,
        permissions: ["Contacts", "Location"],
        isSystemApp: false
      }
    ]
  },
  {
    id: "dev-011",
    name: "Galaxy Tab-Monica",
    model: "Samsung Galaxy Tab S8",
    osVersion: "Android 13",
    lastSeen: "2023-10-14T18:45:00",
    status: "offline",
    batteryLevel: 0,
    storageUsed: 46,
    totalStorage: 128,
    user: "Monica Lee",
    department: "Sales",
    applications: [
      {
        id: "app-015",
        name: "Microsoft PowerPoint",
        installDate: "2023-03-02",
        version: "16.0.16728.20124",
        size: 324,
        permissions: ["Storage"],
        isSystemApp: false
      }
    ]
  }
];
