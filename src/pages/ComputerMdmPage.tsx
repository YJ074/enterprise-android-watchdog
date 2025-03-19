
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdmProfilesList } from "@/components/mdm/MdmProfilesList";
import { MdmDevicesList } from "@/components/mdm/MdmDevicesList";
import { MdmDashboard } from "@/components/mdm/MdmDashboard";
import { useComputerMdm } from "@/hooks/useComputerMdm";

const ComputerMdmPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const mdmState = useComputerMdm();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Computer MDM Console</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="profiles">Configuration Profiles</TabsTrigger>
            <TabsTrigger value="devices">Managed Devices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <MdmDashboard {...mdmState} />
          </TabsContent>
          
          <TabsContent value="profiles" className="space-y-4">
            <MdmProfilesList {...mdmState} />
          </TabsContent>
          
          <TabsContent value="devices" className="space-y-4">
            <MdmDevicesList {...mdmState} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ComputerMdmPage;
