
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";

interface DataAccessOption {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

export function DataAccessSettings() {
  const { toast } = useToast();
  
  const [dataAccessOptions, setDataAccessOptions] = useState<DataAccessOption[]>([
    {
      id: "user-data",
      label: "User Data",
      description: "Access to user profiles, credentials, and personal information",
      checked: true
    },
    {
      id: "device-data",
      label: "Device Data",
      description: "Access to device inventory, status, and configuration",
      checked: true
    },
    {
      id: "activity-logs",
      label: "Activity Logs",
      description: "Access to system activity, user logins, and audit trails",
      checked: true
    },
    {
      id: "security-alerts",
      label: "Security Alerts",
      description: "Access to security incidents, alerts, and threat information",
      checked: true
    },
    {
      id: "analytics-data",
      label: "Analytics Data",
      description: "Access to usage statistics, performance metrics, and reports",
      checked: false
    },
    {
      id: "billing-data",
      label: "Billing Data",
      description: "Access to payment information, invoices, and subscription details",
      checked: false
    }
  ]);

  const toggleDataAccess = (id: string) => {
    setDataAccessOptions(dataAccessOptions.map(option => 
      option.id === id ? { ...option, checked: !option.checked } : option
    ));
  };

  const saveDataAccessSettings = () => {
    // In a real application, this would save to backend/localStorage
    const enabledAccess = dataAccessOptions
      .filter(option => option.checked)
      .map(option => option.id);
    
    console.log("Saved data access settings:", enabledAccess);
    
    // Store in localStorage for persistence
    localStorage.setItem("adminDataAccess", JSON.stringify(enabledAccess));
    
    toast({
      title: "Data Access Settings Saved",
      description: "Your administrator data access preferences have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <span>Administrator Data Access Control</span>
        </CardTitle>
        <CardDescription>
          Configure which data types administrators can access in the system.
          Restricting access helps maintain privacy and compliance with regulations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dataAccessOptions.map((option) => (
            <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-md">
              <Checkbox 
                id={option.id} 
                checked={option.checked} 
                onCheckedChange={() => toggleDataAccess(option.id)}
              />
              <div className="space-y-1">
                <Label 
                  htmlFor={option.id} 
                  className="font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={saveDataAccessSettings}>
            Save Access Settings
          </Button>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Access Control Information</h3>
          <p className="text-sm text-muted-foreground">
            These settings control what data administrators can view and modify in the system.
            Restricting access is recommended for sensitive information that not all administrators need.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
