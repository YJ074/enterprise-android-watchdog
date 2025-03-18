
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";
import { ApiAccessTab } from "./api/ApiAccessTab";
import { EndpointsTab } from "./api/EndpointsTab";
import { WebhooksTab } from "./api/WebhooksTab";

export function ApiSettings() {
  const { toast } = useToast();
  const [apiEnabled, setApiEnabled] = useState(true);
  const [baseUrl, setBaseUrl] = useState("");
  const [apiVersion, setApiVersion] = useState("v1");
  const [authType, setAuthType] = useState("bearer");
  
  const handleSaveApiSettings = () => {
    toast({
      title: "API settings saved",
      description: "Your API and integration settings have been updated successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="access">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="access">API Access</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="access" className="space-y-4">
          <ApiAccessTab 
            apiEnabled={apiEnabled}
            setApiEnabled={setApiEnabled}
            baseUrl={baseUrl}
            setBaseUrl={setBaseUrl}
            apiVersion={apiVersion}
            setApiVersion={setApiVersion}
            authType={authType}
            setAuthType={setAuthType}
          />
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <EndpointsTab />
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <WebhooksTab />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveApiSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
