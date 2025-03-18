
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Default fallback values for development
const fallbackUrl = 'https://your-project-url.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2MDgwMDAwLCJleHAiOjE5MzE2NTYwMDB9.fallback-key';

// Use environment variables if available, otherwise use fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackUrl;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackKey;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
  },
});

// Mock implementation for development and testing
export const isMockEnvironment = !import.meta.env.VITE_SUPABASE_URL;
