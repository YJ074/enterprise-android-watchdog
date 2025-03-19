
import { useDevicesApi } from './useDevicesApi';
import { useDeviceApi } from './useDevicesApi';
import { Device } from '@/lib/types/device.types';

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
