
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type SettingsTabProps = {
  userId: string;
};

export function SettingsTab({ userId }: SettingsTabProps) {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    email: "user@example.com",
    displayName: "John Doe",
    timezone: "UTC-05:00 (Eastern Time)",
    language: "English (US)"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Updated",
        description: "Your user settings have been saved successfully.",
      });
      setIsEditing(false);
    }, 800);
  };
  
  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">User Settings</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Edit Settings</Button>
        )}
      </div>
      
      <form onSubmit={handleSaveChanges}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input 
                id="displayName"
                name="displayName"
                value={formState.displayName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input 
                id="timezone"
                name="timezone"
                value={formState.timezone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input 
                id="language"
                name="language"
                value={formState.language}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
