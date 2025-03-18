
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Users, Database, Activity, Bell, ChartBar, CreditCard, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";

interface DataAccessOption {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  icon: React.ReactNode;
}

interface RolePermission {
  role: string;
  label: string;
  description: string;
  permissions: string[];
}

export function DataAccessSettings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("data-controls");
  const [complianceMode, setComplianceMode] = useState("standard");
  const [auditLogging, setAuditLogging] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");
  
  // Initial data access options
  const [dataAccessOptions, setDataAccessOptions] = useState<DataAccessOption[]>([
    {
      id: "user-data",
      label: "User Data",
      description: "Access to user profiles, credentials, and personal information",
      checked: true,
      icon: <Users className="h-4 w-4" />
    },
    {
      id: "device-data",
      label: "Device Data",
      description: "Access to device inventory, status, and configuration",
      checked: true,
      icon: <Database className="h-4 w-4" />
    },
    {
      id: "activity-logs",
      label: "Activity Logs",
      description: "Access to system activity, user logins, and audit trails",
      checked: true,
      icon: <Activity className="h-4 w-4" />
    },
    {
      id: "security-alerts",
      label: "Security Alerts",
      description: "Access to security incidents, alerts, and threat information",
      checked: true,
      icon: <Bell className="h-4 w-4" />
    },
    {
      id: "analytics-data",
      label: "Analytics Data",
      description: "Access to usage statistics, performance metrics, and reports",
      checked: false,
      icon: <ChartBar className="h-4 w-4" />
    },
    {
      id: "billing-data",
      label: "Billing Data",
      description: "Access to payment information, invoices, and subscription details",
      checked: false,
      icon: <CreditCard className="h-4 w-4" />
    }
  ]);

  // Predefined role permissions
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([
    {
      role: "admin",
      label: "Administrator",
      description: "Full system access with all permissions",
      permissions: ["user-data", "device-data", "activity-logs", "security-alerts", "analytics-data", "billing-data"]
    },
    {
      role: "security-admin",
      label: "Security Administrator",
      description: "Access to security features and user management",
      permissions: ["user-data", "security-alerts", "activity-logs"]
    },
    {
      role: "device-manager",
      label: "Device Manager",
      description: "Access to device management features",
      permissions: ["device-data", "activity-logs"]
    },
    {
      role: "support",
      label: "Support Staff",
      description: "Limited access for customer support duties",
      permissions: ["user-data", "device-data"]
    },
    {
      role: "auditor",
      label: "Auditor",
      description: "Read-only access to logs and activities",
      permissions: ["activity-logs", "analytics-data"]
    }
  ]);

  // Load saved settings on component mount
  useEffect(() => {
    try {
      // Load data access settings
      const savedAccess = localStorage.getItem("adminDataAccess");
      if (savedAccess) {
        const accessList = JSON.parse(savedAccess);
        setDataAccessOptions(prevOptions => 
          prevOptions.map(option => ({
            ...option,
            checked: accessList.includes(option.id)
          }))
        );
      }

      // Load compliance settings
      const savedComplianceMode = localStorage.getItem("complianceMode");
      if (savedComplianceMode) {
        setComplianceMode(savedComplianceMode);
      }

      const savedAuditLogging = localStorage.getItem("auditLogging");
      if (savedAuditLogging) {
        setAuditLogging(savedAuditLogging === "true");
      }
    } catch (error) {
      console.error("Error loading data access settings:", error);
    }
  }, []);

  const toggleDataAccess = (id: string) => {
    setDataAccessOptions(dataAccessOptions.map(option => 
      option.id === id ? { ...option, checked: !option.checked } : option
    ));
  };

  const applyRoleTemplate = (role: string) => {
    setSelectedRole(role);
    const selectedRole = rolePermissions.find(r => r.role === role);
    
    if (selectedRole) {
      // Apply the role's permissions to the data access options
      setDataAccessOptions(prevOptions => 
        prevOptions.map(option => ({
          ...option,
          checked: selectedRole.permissions.includes(option.id)
        }))
      );
    }
  };

  const saveDataAccessSettings = () => {
    try {
      // Save data access settings
      const enabledAccess = dataAccessOptions
        .filter(option => option.checked)
        .map(option => option.id);
      
      localStorage.setItem("adminDataAccess", JSON.stringify(enabledAccess));
      
      // Save compliance settings
      localStorage.setItem("complianceMode", complianceMode);
      localStorage.setItem("auditLogging", auditLogging.toString());
      
      toast({
        title: "Data Access Settings Saved",
        description: "Your data access controls and compliance settings have been updated.",
      });
    } catch (error) {
      console.error("Error saving data access settings:", error);
      toast({
        title: "Error Saving Settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <span>Data Access & Compliance Controls</span>
        </CardTitle>
        <CardDescription>
          Configure data access permissions and compliance settings for your organization.
          These controls help maintain data privacy and regulatory compliance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="data-controls">Data Access Controls</TabsTrigger>
            <TabsTrigger value="compliance">Compliance Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="data-controls" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Apply Role Template</Label>
                <Select value={selectedRole} onValueChange={applyRoleTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {rolePermissions.map(role => (
                      <SelectItem key={role.role} value={role.role}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  {rolePermissions.find(r => r.role === selectedRole)?.description}
                </p>
              </div>

              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataAccessOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-md">
                    <Checkbox 
                      id={option.id} 
                      checked={option.checked} 
                      onCheckedChange={() => toggleDataAccess(option.id)}
                    />
                    <div className="space-y-1 flex-1">
                      <Label 
                        htmlFor={option.id} 
                        className="font-medium cursor-pointer flex items-center gap-2"
                      >
                        {option.icon}
                        {option.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Compliance Mode</Label>
                <Select value={complianceMode} onValueChange={setComplianceMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compliance mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="hipaa">HIPAA</SelectItem>
                    <SelectItem value="gdpr">GDPR</SelectItem>
                    <SelectItem value="pci">PCI DSS</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  {complianceMode === "hipaa" && "Health Insurance Portability and Accountability Act compliance mode."}
                  {complianceMode === "gdpr" && "General Data Protection Regulation compliance mode for EU data."}
                  {complianceMode === "pci" && "Payment Card Industry Data Security Standard compliance."}
                  {complianceMode === "standard" && "Standard data protection without specific regulatory framework."}
                  {complianceMode === "custom" && "Custom compliance settings for your organization's needs."}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Track all data access events for compliance reporting
                    </p>
                  </div>
                  <Switch 
                    id="audit-logging" 
                    checked={auditLogging}
                    onCheckedChange={setAuditLogging}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-masking">Data Masking</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically mask sensitive information in displays and exports
                    </p>
                  </div>
                  <Switch 
                    id="data-masking" 
                    checked={complianceMode === "hipaa" || complianceMode === "pci" || complianceMode === "gdpr"}
                    disabled={complianceMode === "hipaa" || complianceMode === "pci" || complianceMode === "gdpr"}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-retention">Data Retention Policies</Label>
                    <p className="text-sm text-muted-foreground">
                      Apply automatic data retention and deletion rules
                    </p>
                  </div>
                  <Switch 
                    id="data-retention" 
                    checked={complianceMode === "gdpr"}
                    disabled={complianceMode === "gdpr"}
                  />
                </div>
              </div>
              
              <div className="rounded-md border p-4 bg-muted/50">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-medium">Compliance Information</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {complianceMode === "hipaa" && "HIPAA compliance requires audit logging, data masking, and strict access controls. These settings help maintain compliance with healthcare data regulations."}
                  {complianceMode === "gdpr" && "GDPR compliance includes data retention policies, consent management, and the right to be forgotten. These settings help with EU data protection requirements."}
                  {complianceMode === "pci" && "PCI DSS compliance includes strict data masking and access controls for payment data. These settings help maintain payment security standards."}
                  {complianceMode === "standard" && "Standard mode includes basic data protection measures without specific regulatory framework requirements."}
                  {complianceMode === "custom" && "Custom compliance allows you to tailor data protection to your organization's specific regulatory needs."}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t pt-6">
        <Button variant="outline" onClick={() => {
          setActiveTab("data-controls");
          // Reset to saved settings
          const savedAccess = localStorage.getItem("adminDataAccess");
          if (savedAccess) {
            const accessList = JSON.parse(savedAccess);
            setDataAccessOptions(prevOptions => 
              prevOptions.map(option => ({
                ...option,
                checked: accessList.includes(option.id)
              }))
            );
          }
        }}>
          Cancel
        </Button>
        <Button onClick={saveDataAccessSettings}>
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
