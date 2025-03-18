
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SyncIntervalSelectorProps {
  syncInterval: string;
  onChange: (value: string) => void;
}

export function SyncIntervalSelector({ syncInterval, onChange }: SyncIntervalSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="sync-interval">Data Sync Interval</Label>
      <Select value={syncInterval} onValueChange={onChange}>
        <SelectTrigger id="sync-interval">
          <SelectValue placeholder="Select interval" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="realtime">Real-time (when possible)</SelectItem>
          <SelectItem value="hourly">Hourly</SelectItem>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="manual">Manual Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
