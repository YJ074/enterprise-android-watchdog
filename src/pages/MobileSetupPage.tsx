
import { MainLayout } from "@/components/layout/MainLayout";
import { UserSync } from "@/components/users/UserSync";
import { MobileAppFeatures } from "@/components/users/MobileAppFeatures";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const MobileSetupPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Mobile Setup | Enterprise Dashboard</title>
      </Helmet>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Mobile App Setup</h1>
          <p className="text-muted-foreground">Configure and deploy the Android monitoring app</p>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="setup">Setup & Installation</TabsTrigger>
            <TabsTrigger value="features">App Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="mt-6">
            <UserSync />
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <MobileAppFeatures />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default MobileSetupPage;
