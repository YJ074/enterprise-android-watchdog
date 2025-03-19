
import { Badge } from "@/components/ui/badge";
import { getRiskLevel, getRiskLevelColor } from "@/hooks/useDeviceRiskAssessment";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";

interface DeviceRiskBadgeProps {
  riskScore: number;
  compact?: boolean;
}

export function DeviceRiskBadge({ riskScore, compact = false }: DeviceRiskBadgeProps) {
  const riskLevel = getRiskLevel(riskScore);
  const colorClass = getRiskLevelColor(riskLevel);
  
  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <AlertTriangle 
                className={`h-4 w-4 ${riskScore >= 50 ? 'text-orange-500' : riskScore >= 25 ? 'text-yellow-500' : 'text-green-500'}`} 
              />
              <span className="ml-1 font-medium">{riskScore}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Risk Score: {riskScore}/100 ({riskLevel.toUpperCase()})</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <Badge variant="outline" className={`${colorClass} capitalize`}>
      {riskLevel} ({riskScore})
    </Badge>
  );
}
