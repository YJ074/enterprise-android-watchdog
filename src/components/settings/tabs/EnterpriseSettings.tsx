
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";
import { OrganizationCard } from "./enterprise/OrganizationCard";
import { UserManagementCard } from "./enterprise/UserManagementCard";
import { DataManagementCard } from "./enterprise/DataManagementCard";

export function EnterpriseSettings() {
  const { toast } = useToast();
  
  const handleSaveEnterpriseSettings = () => {
    toast({
      title: "Enterprise settings saved",
      description: "Your enterprise settings have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <OrganizationCard />
      <UserManagementCard />
      <DataManagementCard />
      
      <div className="flex justify-end">
        <Button onClick={handleSaveEnterpriseSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
