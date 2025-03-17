
import { ReactNode } from "react";
import { 
  User, 
  Shield, 
  Monitor, 
  Info, 
  MessageSquare, 
  Mail, 
  PhoneCall, 
  Globe, 
  FileText 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Activity type icon mapping
export const getActivityIcon = (type: string): string => {
  switch (type) {
    case 'app_install':
      return "📲";
    case 'app_uninstall':
      return "🗑️";
    case 'login':
      return "🔐";
    case 'logout':
      return "👋";
    case 'location_change':
      return "📍";
    case 'policy_violation':
      return "⚠️";
    case 'system_update':
      return "⬆️";
    case 'whatsapp_message':
      return "💬";
    case 'gmail_access':
      return "📧";
    case 'call_recorded':
      return "📞";
    case 'screenshot':
      return "📸";
    case 'keylogger':
      return "⌨️";
    case 'browsing_history':
      return "🌐";
    case 'file_access':
      return "📄";
    default:
      return "📱";
  }
};

// Activity category icon mapping
export const getActivityCategoryIcon = (type: string): ReactNode => {
  switch (type) {
    case 'app_install':
    case 'app_uninstall':
    case 'system_update':
      return <Monitor className="h-4 w-4" />;
    case 'login':
    case 'logout':
      return <User className="h-4 w-4" />;
    case 'policy_violation':
    case 'location_change':
      return <Shield className="h-4 w-4" />;
    case 'whatsapp_message':
      return <MessageSquare className="h-4 w-4" />;
    case 'gmail_access':
      return <Mail className="h-4 w-4" />;
    case 'call_recorded':
      return <PhoneCall className="h-4 w-4" />;
    case 'browsing_history':
      return <Globe className="h-4 w-4" />;
    case 'screenshot':
    case 'keylogger':
      return <Monitor className="h-4 w-4" />;
    case 'file_access':
      return <FileText className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

// Get activity category
export const getActivityCategory = (type: string): string => {
  switch (type) {
    case 'app_install':
    case 'app_uninstall':
    case 'system_update':
      return "system";
    case 'login':
    case 'logout':
      return "user";
    case 'policy_violation':
    case 'location_change':
      return "security";
    case 'whatsapp_message':
    case 'gmail_access':
    case 'call_recorded':
      return "communication";
    case 'screenshot':
    case 'keylogger':
    case 'browsing_history':
    case 'file_access':
      return "monitoring";
    default:
      return "other";
  }
};

// Extract app name from details string
export const getAppNameFromDetails = (details: string): string | null => {
  const appMatches = details.match(/in (.*?)( on| at|$)/);
  if (appMatches && appMatches[1]) {
    return appMatches[1];
  }
  return null;
};

// Extract duration from details string
export const getDurationFromDetails = (details: string): { value: number, unit: string } | null => {
  const durationMatches = details.match(/for (\d+) (second|minute|hour|day)s?/);
  if (durationMatches && durationMatches[1] && durationMatches[2]) {
    return {
      value: parseInt(durationMatches[1], 10),
      unit: durationMatches[2]
    };
  }
  return null;
};

// Format duration for display
export const formatDuration = (duration: { value: number, unit: string }): string => {
  return `${duration.value} ${duration.unit}${duration.value !== 1 ? 's' : ''}`;
};

// Get severity badge component
export const getSeverityBadge = (severity: string): ReactNode => {
  switch (severity) {
    case 'info':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
    case 'warning':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>;
    case 'critical':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
    default:
      return null;
  }
};
