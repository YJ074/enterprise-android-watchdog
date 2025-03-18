
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone } from "lucide-react";

interface MobileAppConfigurationProps {
  onGenerateQR: () => void;
}

export function MobileAppConfiguration({ onGenerateQR }: MobileAppConfigurationProps) {
  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Smartphone className="h-5 w-5 text-primary" />
        <h4 className="font-medium">Configuration</h4>
      </div>
      
      <div className="space-y-2">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="app-name">App Display Name</Label>
          <Input id="app-name" defaultValue="System Services" />
        </div>
        
        <div className="space-y-2 pt-2">
          <Label>App Visibility</Label>
          <Select defaultValue="hidden">
            <SelectTrigger>
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="visible">Visible (Normal App Icon)</SelectItem>
              <SelectItem value="hidden">Hidden (No App Icon)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <Label htmlFor="auto-start">Auto Start on Boot</Label>
          <Switch id="auto-start" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="data-saving">Data Saving Mode</Label>
          <Switch id="data-saving" defaultChecked />
        </div>
      </div>
      
      <div className="pt-2">
        <Button className="w-full gap-2" onClick={onGenerateQR}>
          Generate Installation QR
        </Button>
      </div>
    </div>
  );
}
