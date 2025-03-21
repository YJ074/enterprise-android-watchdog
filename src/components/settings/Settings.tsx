
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./tabs/GeneralSettings";
import { NotificationSettings } from "./tabs/NotificationSettings";
import { SecuritySettings } from "./tabs/SecuritySettings";
import { ApiSettings } from "./tabs/ApiSettings";
import { EnterpriseSettings } from "./tabs/EnterpriseSettings";
import { MonitoringSettings } from "./tabs/MonitoringSettings";
import { DataAccessSettings } from "./tabs/DataAccessSettings";
import { AnalyticsSettings } from "./tabs/AnalyticsSettings";
import { useAuth } from "@/context/AuthContext";

export function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your application settings and preferences.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-background border">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          {isAdmin && <TabsTrigger value="data-access">Data Access</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <GeneralSettings />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="monitoring" className="space-y-4">
          <MonitoringSettings />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsSettings />
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <ApiSettings />
        </TabsContent>
        
        <TabsContent value="enterprise" className="space-y-4">
          <EnterpriseSettings />
        </TabsContent>

        {isAdmin && (
          <TabsContent value="data-access" className="space-y-4">
            <DataAccessSettings />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
