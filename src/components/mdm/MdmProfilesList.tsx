
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Laptop, Send, Check, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { MdmProfileForm } from "./MdmProfileForm";
import { MdmDeployDialog } from "./MdmDeployDialog";
import { MdmProfileType } from "@/hooks/useComputerMdm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function MdmProfilesList({ 
  profiles, 
  createProfile, 
  updateProfile, 
  deleteProfile, 
  deployProfile,
  getProfileDeployments,
  computerDevices
}) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<MdmProfileType | null>(null);
  
  const handleEditProfile = (profile: MdmProfileType) => {
    setEditingProfile(profile);
  };
  
  const handleUpdateProfile = (id: string, data: Partial<MdmProfileType>) => {
    updateProfile(id, data);
    setEditingProfile(null);
  };
  
  const handleToggleActive = (id: string, isActive: boolean) => {
    updateProfile(id, { isActive });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Configuration Profiles</h2>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Profile
        </Button>
      </div>
      
      {profiles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No profiles created yet. Create your first profile to get started.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profile Name</TableHead>
              <TableHead>Platform</TableHead>
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
                    {profile.applicableTo === 'all' 
                      ? 'Windows & macOS' 
                      : profile.applicableTo}
                  </Badge>
                </TableCell>
                <TableCell>{profile.description}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Badge variant={profile.isActive ? "default" : "secondary"}>
                    {profile.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleToggleActive(profile.id, !profile.isActive)}>
                      {profile.isActive ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditProfile(profile)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProfile(profile.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <MdmDeployDialog
                      profile={profile}
                      devices={computerDevices.filter(d => 
                        profile.applicableTo === 'all' || 
                        (profile.applicableTo === 'windows' && d.osVersion.toLowerCase().includes('windows')) ||
                        (profile.applicableTo === 'macos' && (
                          d.osVersion.toLowerCase().includes('mac') || 
                          d.osVersion.toLowerCase().includes('osx')
                        ))
                      )}
                      onDeploy={(deviceIds) => deployProfile(profile.id, deviceIds)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      {/* Create Profile Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create MDM Profile</DialogTitle>
          </DialogHeader>
          <MdmProfileForm 
            onSubmit={(data) => {
              createProfile(data);
              setCreateDialogOpen(false);
            }}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Profile Dialog */}
      {editingProfile && (
        <Dialog open={!!editingProfile} onOpenChange={() => setEditingProfile(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <MdmProfileForm 
              initialData={editingProfile}
              onSubmit={(data) => handleUpdateProfile(editingProfile.id, data)}
              onCancel={() => setEditingProfile(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
