
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppsTab } from "./tabs/AppsTab";
import { ActivityTab } from "./tabs/ActivityTab";
import { MonitoringTab } from "./tabs/MonitoringTab";
import { PoliciesTab } from "./tabs/PoliciesTab";

type DeviceTabsProps = {
  deviceId: string;
};

export function DeviceTabs({ deviceId }: DeviceTabsProps) {
  return (
    <Tabs defaultValue="apps">
      <TabsList>
        <TabsTrigger value="apps">Applications</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        <TabsTrigger value="policies">Policies</TabsTrigger>
      </TabsList>
      
      <TabsContent value="apps">
        <AppsTab deviceId={deviceId} />
      </TabsContent>
      
      <TabsContent value="activity">
        <ActivityTab deviceId={deviceId} />
      </TabsContent>
      
      <TabsContent value="monitoring">
        <MonitoringTab />
      </TabsContent>
      
      <TabsContent value="policies">
        <PoliciesTab />
      </TabsContent>
    </Tabs>
  );
}
