
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Device } from './types';

export function useDeviceDetail(id: string | undefined) {
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

      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching device:', error);
        toast({
          title: 'Error fetching device',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data;
    },
    enabled: !!id,
  });

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
    handleRefresh,
  };
}
