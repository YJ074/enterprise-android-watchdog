
import { toast } from "@/components/ui/use-toast";

interface ApiRequestOptions extends RequestInit {
  params?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * API client for making standardized requests to backend services
 */
export const apiClient = {
  /**
   * Make a GET request to the API
   */
  async get<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return makeRequest<T>(endpoint, { ...options, method: 'GET' });
  },

  /**
   * Make a POST request to the API
   */
  async post<T>(endpoint: string, data?: unknown, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return makeRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  },

  /**
   * Make a PUT request to the API
   */
  async put<T>(endpoint: string, data?: unknown, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return makeRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  },

  /**
   * Make a DELETE request to the API
   */
  async delete<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return makeRequest<T>(endpoint, { ...options, method: 'DELETE' });
  },

  /**
   * Make a PATCH request to the API
   */
  async patch<T>(endpoint: string, data?: unknown, options: ApiRequestOptions = {}): Promise<ApiResponse<T>> {
    return makeRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }
};

/**
 * Helper function to make API requests
 */
async function makeRequest<T>(
  endpoint: string, 
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const { params, ...fetchOptions } = options;
    let url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    // Add query parameters if provided
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // Add default headers
    const headers = new Headers(fetchOptions.headers);
    if (!headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    // Execute the request
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    let data = null;
    let error = null;
    
    // Parse response body if present
    if (response.status !== 204) { // No content
      try {
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
      } catch (e) {
        console.error('Error parsing response:', e);
      }
    }

    // Handle error responses
    if (!response.ok) {
      error = typeof data === 'object' && data !== null && 'message' in data
        ? String(data.message)
        : `Request failed with status ${response.status}`;
    }

    return { data, error, status: response.status };
  } catch (error) {
    console.error('API request error:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      status: 0 
    };
  }
}
