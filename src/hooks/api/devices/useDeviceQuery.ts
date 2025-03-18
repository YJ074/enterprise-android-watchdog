
import { useQuery } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { useToast } from '@/components/ui/use-toast';

export function useDeviceQuery(id: string | undefined) {
  const { toast } = useToast();

  const {
    data: device,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['device', id],
    queryFn: async () => {
      if (!id) return null;

      const response = await deviceService.getDeviceById(id);
      
      if (response.error) {
        console.error('Error fetching device:', response.error);
        toast({
          title: 'Error fetching device',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return response.data;
    },
    enabled: !!id,
  });

  return {
    device,
    isLoading,
    error,
    refetch
  };
}
