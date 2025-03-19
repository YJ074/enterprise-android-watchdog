
import { useQuery } from '@tanstack/react-query';
import { deviceService } from '@/lib/api/services/deviceService';
import { useToast } from '@/components/ui/use-toast';

export function useComputerDevices() {
  const { toast } = useToast();

  const {
    data: computerDevices = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['devices', 'computers'],
    queryFn: async () => {
      const response = await deviceService.getPCAndLaptopDevices();
      
      if (response.error) {
        console.error('Error fetching computer devices:', response.error);
        toast({
          title: 'Error fetching computers',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      
      return response.data || [];
    },
  });

  const {
    data: metrics,
    isLoading: metricsLoading,
  } = useQuery({
    queryKey: ['metrics', 'computers'],
    queryFn: async () => {
      // In a real app, this would call the API
      // For now, we'll import directly from the mock data
      const { computerMetrics } = await import('@/lib/mock/metrics.data');
      return computerMetrics;
    },
  });

  const handleRefresh = () => {
    refetch();
    toast({
      title: 'Refreshing Computer Data',
      description: 'Fetching the latest PC and laptop information...',
    });
  };

  return {
    computerDevices,
    isLoading,
    error,
    metrics,
    metricsLoading,
    handleRefresh,
  };
}
