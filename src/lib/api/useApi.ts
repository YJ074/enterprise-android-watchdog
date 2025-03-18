
import { useState, useCallback } from 'react';
import { apiClient } from './apiClient';
import { useToast } from '@/components/ui/use-toast';

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  status: number | null;
}

/**
 * Hook for making API requests from React components
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
    (
      promise: Promise<{ data: T | null; error: string | null; status: number }>,
      options: UseApiOptions = {}
    ) => {
      const mergedOptions = { ...defaultOptions, ...options };
      
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      
      return promise
        .then((response) => {
          setState({
            data: response.data,
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
          } else if (mergedOptions.showSuccessToast) {
            toast({
              title: 'Success',
              description: mergedOptions.successMessage || 'Operation completed successfully',
            });
          }
          
          return response;
        })
        .catch((error) => {
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
          
          return { data: null, error: errorMessage, status: 0 };
        });
    },
    [defaultOptions, toast]
  );

  const get = useCallback(
    (endpoint: string, options?: RequestInit & { params?: Record<string, string> }, toastOptions?: UseApiOptions) => {
      return handleApiResponse(apiClient.get<T>(endpoint, options), toastOptions);
    },
    [handleApiResponse]
  );

  const post = useCallback(
    (endpoint: string, data?: unknown, options?: RequestInit, toastOptions?: UseApiOptions) => {
      return handleApiResponse(apiClient.post<T>(endpoint, data, options), toastOptions);
    },
    [handleApiResponse]
  );

  const put = useCallback(
    (endpoint: string, data?: unknown, options?: RequestInit, toastOptions?: UseApiOptions) => {
      return handleApiResponse(apiClient.put<T>(endpoint, data, options), toastOptions);
    },
    [handleApiResponse]
  );

  const del = useCallback(
    (endpoint: string, options?: RequestInit, toastOptions?: UseApiOptions) => {
      return handleApiResponse(apiClient.delete<T>(endpoint, options), toastOptions);
    },
    [handleApiResponse]
  );

  const patch = useCallback(
    (endpoint: string, data?: unknown, options?: RequestInit, toastOptions?: UseApiOptions) => {
      return handleApiResponse(apiClient.patch<T>(endpoint, data, options), toastOptions);
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
