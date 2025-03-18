
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Device } from './types';

export function useDevicesList() {
  const { toast } = useToast();

  const {
    data: devices = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('last_seen', { ascending: false });

      if (error) {
        console.error('Error fetching devices:', error);
        toast({
          title: 'Error fetching devices',
          description: error.message,
          variant: 'destructive',
        });
        throw error;
      }

      return data || [];
    },
  });

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
    handleRefresh,
  };
}
