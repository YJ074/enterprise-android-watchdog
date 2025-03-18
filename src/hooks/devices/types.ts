
import { Database } from '@/lib/database.types';

export type Device = Database['public']['Tables']['devices']['Row'];
export type NewDevice = Database['public']['Tables']['devices']['Insert'];
export type UpdateDevice = Database['public']['Tables']['devices']['Update'];
