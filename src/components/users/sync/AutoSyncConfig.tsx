
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AutoSyncConfigProps {
  autoSync: boolean;
  setAutoSync: (value: boolean) => void;
  syncInterval: string;
  setSyncInterval: (interval: string) => void;
}

export function AutoSyncConfig({ 
  autoSync, 
  setAutoSync, 
  syncInterval, 
  setSyncInterval 
}: AutoSyncConfigProps) {
  return (
    <>
      <div className="flex items-center justify-between pt-4">
        <div className="space-y-0.5">
          <Label htmlFor="auto-sync">Automatic Synchronization</Label>
          <p className="text-sm text-muted-foreground">
            Automatically sync users on a schedule.
          </p>
        </div>
        <Switch 
          id="auto-sync" 
          checked={autoSync} 
          onCheckedChange={setAutoSync} 
        />
      </div>

      {autoSync && (
        <div className="space-y-2 ml-6 pl-2 border-l-2 border-muted">
          <Label htmlFor="sync-interval">Sync Interval</Label>
          <Select value={syncInterval} onValueChange={setSyncInterval}>
            <SelectTrigger id="sync-interval">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
