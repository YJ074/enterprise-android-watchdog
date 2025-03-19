
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { MdmProfile } from "@/hooks/devices/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CreateProfileDialog } from "./CreateProfileDialog";

const mockProfiles: MdmProfile[] = [
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
    is_active: true
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
    is_active: true
  },
  {
    id: "prof-3",
    name: "App Restrictions",
    description: "Restricts installation of non-approved applications",
    type: "restrictions",
    settings: {
      appStore: {
        disabled: true
      },
      allowedApps: [
        "com.company.app1",
        "com.company.app2"
      ]
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: false
  }
];

export function ProfilesList() {
  const [profiles, setProfiles] = useState<MdmProfile[]>(mockProfiles);
  
  const handleCreateProfile = (newProfile: MdmProfile) => {
    setProfiles([...profiles, newProfile]);
  };
  
  const handleDeleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };
  
  const handleToggleActive = (id: string) => {
    setProfiles(profiles.map(profile => 
      profile.id === id 
        ? { ...profile, is_active: !profile.is_active } 
        : profile
    ));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">MDM Configuration Profiles</h2>
        <CreateProfileDialog 
          trigger={
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
          }
          onProfileCreated={handleCreateProfile}
        />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell className="font-medium">{profile.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {profile.type}
                </Badge>
              </TableCell>
              <TableCell>{profile.description}</TableCell>
              <TableCell>{format(new Date(profile.created_at), "MMM d, yyyy")}</TableCell>
              <TableCell>
                <Badge variant={profile.is_active ? "default" : "secondary"}>
                  {profile.is_active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleToggleActive(profile.id)}>
                    {profile.is_active ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteProfile(profile.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
