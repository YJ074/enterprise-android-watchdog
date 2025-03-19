
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { investigationService, Investigation, InvestigationLog } from '@/lib/api/investigation/investigationService';
import { useToast } from '@/components/ui/use-toast';
import { DateRange } from 'react-day-picker';
import { format, subDays } from 'date-fns';

export function useInvestigation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLogTypes, setSelectedLogTypes] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  
  // Get all investigations
  const {
    data: investigations = [],
    isLoading: isLoadingInvestigations,
    error: investigationsError,
  } = useQuery({
    queryKey: ['investigations'],
    queryFn: async () => {
      const response = await investigationService.getInvestigations();
      if (response.error) {
        toast({
          title: 'Error loading investigations',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      return response.data || [];
    },
  });

  // Create a new investigation
  const createInvestigationMutation = useMutation({
    mutationFn: async (data: Omit<Investigation, 'id' | 'logs'>) => {
      const response = await investigationService.createInvestigation(data);
      if (response.error) {
        toast({
          title: 'Error creating investigation',
          description: response.error,
          variant: 'destructive',
        });
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investigations'] });
      toast({
        title: 'Investigation created',
        description: 'The investigation has been created successfully',
      });
    },
  });
  
  // Get device logs
  const getDeviceLogs = async (deviceId: string) => {
    if (!dateRange?.from) return [];
    
    const response = await investigationService.getDeviceInvestigationLogs(
      deviceId,
      {
        startDate: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
        endDate: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
        types: selectedLogTypes.length > 0 ? selectedLogTypes : undefined,
      }
    );
    
    if (response.error) {
      toast({
        title: 'Error loading device logs',
        description: response.error,
        variant: 'destructive',
      });
      throw new Error(response.error);
    }
    
    return response.data || [];
  };
  
  // Search logs
  const searchLogs = async (query: string, deviceIds?: string[]) => {
    if (!query.trim()) return [];
    
    const response = await investigationService.searchLogs(query, {
      deviceIds,
      startDate: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
      endDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
      types: selectedLogTypes.length > 0 ? selectedLogTypes : undefined,
    });
    
    if (response.error) {
      toast({
        title: 'Error searching logs',
        description: response.error,
        variant: 'destructive',
      });
      throw new Error(response.error);
    }
    
    return response.data || [];
  };

  return {
    investigations,
    isLoadingInvestigations,
    investigationsError,
    createInvestigation: createInvestigationMutation.mutate,
    getDeviceLogs,
    searchLogs,
    searchQuery,
    setSearchQuery,
    selectedLogTypes,
    setSelectedLogTypes,
    dateRange,
    setDateRange,
  };
}
