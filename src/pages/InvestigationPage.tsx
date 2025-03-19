
import Layout from "@/components/layout/Layout";
import { InvestigationConsole } from "@/components/investigation/InvestigationConsole";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function InvestigationPage() {
  const [activeTab, setActiveTab] = useState("investigation");

  return (
    <Layout>
      <Helmet>
        <title>Advanced Investigation | MDM Dashboard</title>
      </Helmet>
      
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Advanced Investigation</h1>
          <Button variant="default">New Investigation</Button>
        </div>
        
        <Tabs defaultValue="investigation" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="investigation">Investigation Console</TabsTrigger>
            <TabsTrigger value="saved">Saved Investigations</TabsTrigger>
            <TabsTrigger value="reports">Investigation Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="investigation" className="mt-0">
            <InvestigationConsole />
          </TabsContent>
          
          <TabsContent value="saved" className="mt-0">
            <div className="flex items-center justify-center h-[200px] border rounded-md bg-muted/40">
              <p className="text-muted-foreground">You have no saved investigations</p>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-0">
            <div className="flex items-center justify-center h-[200px] border rounded-md bg-muted/40">
              <p className="text-muted-foreground">No investigation reports generated yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
