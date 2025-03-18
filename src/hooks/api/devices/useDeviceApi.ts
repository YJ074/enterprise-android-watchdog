
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { useToast } from '@/components/ui/use-toast';
import { useDeviceQuery } from './useDeviceQuery';
import { useDeviceUpdateMutation } from './useDeviceMutations';

export function useDeviceApi(id: string | undefined) {
  const { toast } = useToast();
  
  // Use the extracted query hook
  const { device, isLoading, error, refetch } = useDeviceQuery(id);
  
  // Use the extracted update mutation
  const { updateDevice } = useDeviceUpdateMutation(id);

  const handleRefresh = () => {
    refetch();
    toast({
      title: 'Refreshing Device',
      description: 'Fetching the latest device information...',
    });
  };

  return {
    device,
    isLoading,
    error,
    updateDevice,
    handleRefresh,
  };
}
