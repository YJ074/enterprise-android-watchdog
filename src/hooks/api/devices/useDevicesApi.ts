
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { useToast } from '@/components/ui/use-toast';
import { useDevicesMutations } from './useDevicesMutations';
import { useDevicesQuery } from './useDevicesQuery';

export function useDevicesApi() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Use the extracted query hook
  const { devices, isLoading, error, refetch } = useDevicesQuery();
  
  // Use the extracted mutations
  const { addDevice, updateDevice, deleteDevice } = useDevicesMutations();

  const handleRefresh = () => {
    refetch();
    toast({
      title: 'Refreshing Data',
      description: 'Fetching the latest device information...',
    });
  };

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
