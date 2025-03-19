
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { MdmProfile } from "@/hooks/devices/types";
import { ProfileForm } from "./ProfileForm";

interface CreateProfileDialogProps {
  trigger: React.ReactNode;
  onProfileCreated: (profile: MdmProfile) => void;
}

export function CreateProfileDialog({ trigger, onProfileCreated }: CreateProfileDialogProps) {
  const [open, setOpen] = useState(false);
  
  const handleProfileCreated = (profile: MdmProfile) => {
    onProfileCreated(profile);
    setOpen(false);
  };
  
  const handleCancel = () => {
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create MDM Profile</DialogTitle>
        </DialogHeader>
        
        <ProfileForm onSubmit={handleProfileCreated} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}
