
// API configuration settings

// Default API config
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  VERSION: import.meta.env.VITE_API_VERSION || 'v1',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3', 10),
  
  // Format for the Authorization header. If undefined, no Authorization header will be sent.
  AUTH_FORMAT: import.meta.env.VITE_API_AUTH_FORMAT || 'Bearer {token}',
  
  // Whether to include credentials in cross-origin requests
  INCLUDE_CREDENTIALS: import.meta.env.VITE_API_INCLUDE_CREDENTIALS === 'true',
  
  // Mock mode for development
  MOCK_MODE: import.meta.env.VITE_API_MOCK_MODE === 'true' || import.meta.env.DEV,
  
  // Custom headers to include with every request
  HEADERS: {
    'X-Client-Version': import.meta.env.VITE_APP_VERSION || '1.0.0',
    'X-Client-Id': import.meta.env.VITE_CLIENT_ID || 'watchdog-mdm-client',
  }
};

/**
 * Helper function to get the full API URL for an endpoint
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = API_CONFIG.BASE_URL.endsWith('/')
    ? API_CONFIG.BASE_URL.slice(0, -1)
    : API_CONFIG.BASE_URL;
    
  const version = API_CONFIG.VERSION ? `/${API_CONFIG.VERSION}` : '';
  
  const formattedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`;
    
  return `${baseUrl}${version}${formattedEndpoint}`;
}

/**
 * Sample environment variables for .env files
 * 
 * VITE_API_BASE_URL=https://api.example.com
 * VITE_API_VERSION=v1
 * VITE_API_TIMEOUT=30000
 * VITE_API_RETRY_ATTEMPTS=3
 * VITE_API_AUTH_FORMAT=Bearer {token}
 * VITE_API_INCLUDE_CREDENTIALS=false
 * VITE_API_MOCK_MODE=true
 * VITE_APP_VERSION=1.0.0
 * VITE_CLIENT_ID=watchdog-mdm-client
 */
