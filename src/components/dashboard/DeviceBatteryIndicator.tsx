
import { Battery, BatteryMedium, BatteryLow, BatteryWarning } from "lucide-react";

interface DeviceBatteryIndicatorProps {
  level: number;
}

export function DeviceBatteryIndicator({ level }: DeviceBatteryIndicatorProps) {
  if (level >= 70) {
    return <Battery className="h-4 w-4 text-green-500" />;
  } else if (level >= 30) {
    return <BatteryMedium className="h-4 w-4 text-yellow-500" />;
  } else if (level > 10) {
    return <BatteryLow className="h-4 w-4 text-orange-500" />;
  } else {
    return <BatteryWarning className="h-4 w-4 text-red-500" />;
  }
}
