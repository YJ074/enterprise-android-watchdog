
import { useDevicesApi } from './api/devices/useDevicesApi';
import { useDeviceApi } from './api/devices/useDeviceApi';
import { Device } from '@/lib/types/device.types';

// Re-export the types from the devices/types file
export type { Device, NewDevice, UpdateDevice } from './devices/types';

export function useDevices() {
  const { 
    devices, 
    isLoading, 
    error, 
    addDevice, 
    updateDevice, 
    deleteDevice, 
    bulkUpdateDevices,
    bulkDeleteDevices,
    handleRefresh 
  } = useDevicesApi();

  return {
    devices,
    isLoading,
    error,
    addDevice,
    updateDevice,
    deleteDevice,
    bulkUpdateDevices,
    bulkDeleteDevices,
    handleRefresh,
  };
}

export function useDevice(id: string | undefined) {
  const { device, isLoading, error, updateDevice, handleRefresh } = useDeviceApi(id);
  
  return {
    device,
    isLoading,
    error,
    updateDevice,
    handleRefresh,
  };
}
