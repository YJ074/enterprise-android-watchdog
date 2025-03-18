
import { useQuery } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { useToast } from '@/components/ui/use-toast';

export function useDevicesQuery() {
  const { toast } = useToast();

  const {
    data: devices = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const response = await deviceService.getAllDevices();
      
      if (response.error) {
        console.error('Error fetching devices:', response.error);
        toast({
          title: 'Error fetching devices',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return response.data || [];
    },
  });

  return {
    devices,
    isLoading,
    error,
    refetch
  };
}
