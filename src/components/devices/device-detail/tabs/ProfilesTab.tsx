
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, FileCode, Download, Check, UploadCloud, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MdmProfile } from "@/hooks/devices/types";
import { format } from "date-fns";

interface ProfilesTabProps {
  deviceId: string;
}

// Mock profiles data for demonstration
const mockAssignedProfiles = [
  {
    id: "prof-1",
    name: "Basic Security Profile",
    description: "Enforces password requirements and device encryption",
    type: "security",
    settings: {
      password: {
        required: true,
        minLength: 6,
        requireComplexity: true
      },
      encryption: {
        enabled: true
      }
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    deployed_at: new Date().toISOString(),
    status: "deployed"
  },
  {
    id: "prof-2",
    name: "WiFi Configuration",
    description: "Corporate WiFi network settings",
    type: "wifi",
    settings: {
      ssid: "CORP-NETWORK",
      security: "WPA2-Enterprise",
      authentication: "PEAP"
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true,
    deployed_at: new Date().toISOString(),
    status: "deployed"
  }
];

export function ProfilesTab({ deviceId }: ProfilesTabProps) {
  const [assignedProfiles, setAssignedProfiles] = useState(mockAssignedProfiles);
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return <Check className="h-4 w-4 text-green-500" />;
      case "pending":
        return <UploadCloud className="h-4 w-4 text-amber-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="text-sm font-medium mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-muted-foreground" />
        Configuration Profiles
      </div>
      
      {assignedProfiles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No configuration profiles assigned to this device.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {assignedProfiles.map(profile => (
            <div 
              key={profile.id} 
              className="p-4 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{profile.name}</h3>
                    <Badge variant="outline" className="capitalize ml-2">
                      {profile.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profile.description}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className="flex items-center gap-1"
                >
                  {getStatusIcon(profile.status)}
                  <span className="capitalize">{profile.status}</span>
                </Badge>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                Deployed: {format(new Date(profile.deployed_at), "MMM d, yyyy 'at' h:mm a")}
              </div>
              
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
