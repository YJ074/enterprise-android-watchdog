
import { useDevicesList } from './useDevicesList';
import { useDeviceDetail } from './useDeviceDetail';
import { useDeviceMutations } from './useDeviceMutations';
import { Device, NewDevice, UpdateDevice } from './types';

export function useDevices() {
  const { devices, isLoading, error, handleRefresh } = useDevicesList();
  const { addDevice, updateDevice, deleteDevice } = useDeviceMutations();

  return {
    devices,
    isLoading,
    error,
    addDevice,
    updateDevice,
    deleteDevice,
    handleRefresh,
  };
}

export function useDevice(id: string | undefined) {
  const { device, isLoading, error, handleRefresh } = useDeviceDetail(id);
  
  return {
    device,
    isLoading,
    error,
    handleRefresh,
  };
}

export type { Device, NewDevice, UpdateDevice };
