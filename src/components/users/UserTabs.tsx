
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivitiesTab } from "./tabs/ActivitiesTab";
import { DevicesTab } from "./tabs/DevicesTab";
import { SettingsTab } from "./tabs/SettingsTab";
import { SecurityTab } from "./tabs/SecurityTab";

type UserTabsProps = {
  userId: string;
};

export function UserTabs({ userId }: UserTabsProps) {
  return (
    <Tabs defaultValue="activities">
      <TabsList>
        <TabsTrigger value="activities">Activities</TabsTrigger>
        <TabsTrigger value="devices">Devices</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="activities">
        <ActivitiesTab userId={userId} />
      </TabsContent>
      
      <TabsContent value="devices">
        <DevicesTab userId={userId} />
      </TabsContent>
      
      <TabsContent value="security">
        <SecurityTab userId={userId} />
      </TabsContent>
      
      <TabsContent value="settings">
        <SettingsTab userId={userId} />
      </TabsContent>
    </Tabs>
  );
}
