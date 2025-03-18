
import { marketingDevices } from './devices/marketing-devices';
import { engineeringDevices } from './devices/engineering-devices';
import { salesDevices } from './devices/sales-devices';
import { executiveDevices } from './devices/executive-devices';
import { supportDevices } from './devices/support-devices';
import { Device } from '../types/device.types';

export const devices: Device[] = [
  ...marketingDevices,
  ...engineeringDevices,
  ...salesDevices,
  ...executiveDevices,
  ...supportDevices
];
