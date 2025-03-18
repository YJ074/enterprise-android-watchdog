
import { MainLayout } from "@/components/layout/MainLayout";
import { UserSync } from "@/components/users/UserSync";
import { MobileAppFeatures } from "@/components/users/MobileAppFeatures";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HelpCircle } from "lucide-react";

const MobileSetupPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Mobile Setup | Enterprise Dashboard</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Mobile App Setup</h1>
            <p className="text-muted-foreground">Configure and deploy the monitoring app for Android and iOS devices</p>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Setup Guide
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Mobile Setup Guide</SheetTitle>
                <SheetDescription>
                  Learn how to configure and deploy the monitoring app on different platforms
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-medium">Android Deployment</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Android apps can be installed directly via APK download or scanning the generated QR code.
                    Hidden mode allows the app to run in the background without an app icon.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">iOS Deployment</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    iOS apps require MDM enrollment or an enterprise certificate for installation.
                    Due to platform restrictions, some monitoring features may be limited compared to Android.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Legal Considerations</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ensure you have proper authorization and consent before deploying monitoring 
                    applications. Always comply with local laws and privacy regulations.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
