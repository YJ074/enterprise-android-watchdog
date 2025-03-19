
import { MainLayout } from "@/components/layout/MainLayout";
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
import { useInvestigation } from "@/hooks/useInvestigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateInvestigationForm } from "@/components/investigation/CreateInvestigationForm";
import { Badge } from "@/components/ui/badge";

export default function InvestigationPage() {
  const [activeTab, setActiveTab] = useState("investigation");
  const { investigations, isLoadingInvestigations } = useInvestigation();
  
  return (
    <MainLayout>
      <Helmet>
        <title>Advanced Investigation | MDM Dashboard</title>
      </Helmet>
      
      <div className="container mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Advanced Investigation</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">New Investigation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Investigation</DialogTitle>
              </DialogHeader>
              <CreateInvestigationForm />
            </DialogContent>
          </Dialog>
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
            {investigations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investigations.map(investigation => (
                  <div key={investigation.id} className="border rounded-md p-4 space-y-2">
                    <h3 className="font-semibold">{investigation.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{investigation.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <Badge variant={investigation.status === 'active' ? 'default' : 
                                      investigation.status === 'completed' ? 'secondary' : 'outline'}>
                        {investigation.status}
                      </Badge>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[200px] border rounded-md bg-muted/40">
                <p className="text-muted-foreground">You have no saved investigations</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reports" className="mt-0">
            <div className="flex items-center justify-center h-[200px] border rounded-md bg-muted/40">
              <p className="text-muted-foreground">No investigation reports generated yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
