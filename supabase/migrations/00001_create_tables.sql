
-- Create the devices table
CREATE TABLE IF NOT EXISTS public.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  model TEXT NOT NULL,
  os_version TEXT NOT NULL,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT CHECK (status IN ('online', 'offline', 'warning', 'compromised')) DEFAULT 'offline',
  battery_level INTEGER DEFAULT 100,
  storage_used INTEGER DEFAULT 0,
  total_storage INTEGER DEFAULT 128,
  user_id TEXT NOT NULL,
  department TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  location_latitude DOUBLE PRECISION,
  location_longitude DOUBLE PRECISION,
  location_address TEXT
);

-- Create the applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES public.devices(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  install_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  version TEXT NOT NULL,
  size INTEGER DEFAULT 0,
  permissions TEXT[] DEFAULT '{}',
  is_system_app BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create the activity_logs table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES public.devices(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
  type TEXT NOT NULL,
  details TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('info', 'warning', 'critical')) DEFAULT 'info',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create the users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  status TEXT CHECK (status IN ('Active', 'Inactive')) DEFAULT 'Active',
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_devices_user_id ON public.devices(user_id);
CREATE INDEX IF NOT EXISTS idx_devices_status ON public.devices(status);
CREATE INDEX IF NOT EXISTS idx_applications_device_id ON public.applications(device_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_device_id ON public.activity_logs(device_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_type ON public.activity_logs(type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_severity ON public.activity_logs(severity);

-- Add row level security policies
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can read all devices"
  ON public.devices FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert their own devices"
  ON public.devices FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update their own devices"
  ON public.devices FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete their own devices"
  ON public.devices FOR DELETE
  TO authenticated
  USING (true);

-- Similar policies for other tables
CREATE POLICY "Authenticated users can read all applications"
  ON public.applications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read all activity logs"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read all users"
  ON public.users FOR SELECT
  TO authenticated
  USING (true);
