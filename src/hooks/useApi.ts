
import { useState, useCallback } from 'react';
import { apiClient, ApiResponse } from '@/lib/api/apiClient';
import { useToast } from '@/components/ui/use-toast';

export interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  status: number | null;
}

/**
 * Hook for making API requests from React components with
 * integrated loading state and toast notifications
 */
export function useApi<T>(defaultOptions: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
    status: null,
  });
  
  const { toast } = useToast();

  const handleApiResponse = useCallback(
    async <R>(
      promise: Promise<ApiResponse<R>>,
      options: UseApiOptions = {}
    ): Promise<ApiResponse<R>> => {
      const mergedOptions = { ...defaultOptions, ...options };
      
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const response = await promise;
        
        setState({
          data: response.data as unknown as T | null,
          isLoading: false,
          error: response.error,
          status: response.status,
        });
        
        if (response.error) {
          if (mergedOptions.showErrorToast) {
            toast({
              title: 'Error',
              description: mergedOptions.errorMessage || response.error,
              variant: 'destructive',
            });
          }
          
          mergedOptions.onError?.(response.error);
        } else {
          if (mergedOptions.showSuccessToast) {
            toast({
              title: 'Success',
              description: mergedOptions.successMessage || 'Operation completed successfully',
            });
          }
          
          mergedOptions.onSuccess?.(response.data);
        }
        
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        setState({
          data: null,
          isLoading: false,
          error: errorMessage,
          status: 0,
        });
        
        if (mergedOptions.showErrorToast) {
          toast({
            title: 'Error',
            description: mergedOptions.errorMessage || errorMessage,
            variant: 'destructive',
          });
        }
        
        mergedOptions.onError?.(errorMessage);
        
        return { data: null, error: errorMessage, status: 0 };
      }
    },
    [defaultOptions, toast]
  );

  const get = useCallback(
    <R>(endpoint: string, options?: RequestInit & { params?: Record<string, string | number | boolean | undefined> }, toastOptions?: UseApiOptions) => {
      return handleApiResponse<R>(apiClient.get<R>(endpoint, options), toastOptions);
    },
    [handleApiResponse]
  );

  const post = useCallback(
    <R>(endpoint: string, data?: unknown, options?: RequestInit, toastOptions?: UseApiOptions) => {
      return handleApiResponse<R>(apiClient.post<R>(endpoint, data, options), toastOptions);
    },
    [handleApiResponse]
  );

  const put = useCallback(
    <R>(endpoint: string, data?: unknown, options?: RequestInit, toastOptions?: UseApiOptions) => {
      return handleApiResponse<R>(apiClient.put<R>(endpoint, data, options), toastOptions);
    },
    [handleApiResponse]
  );

  const del = useCallback(
    <R>(endpoint: string, options?: RequestInit, toastOptions?: UseApiOptions) => {
      return handleApiResponse<R>(apiClient.delete<R>(endpoint, options), toastOptions);
    },
    [handleApiResponse]
  );

  const patch = useCallback(
    <R>(endpoint: string, data?: unknown, options?: RequestInit, toastOptions?: UseApiOptions) => {
      return handleApiResponse<R>(apiClient.patch<R>(endpoint, data, options), toastOptions);
    },
    [handleApiResponse]
  );

  return {
    ...state,
    get,
    post,
    put,
    delete: del,
    patch,
  };
}
