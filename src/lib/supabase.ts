
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// These should be set as environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
