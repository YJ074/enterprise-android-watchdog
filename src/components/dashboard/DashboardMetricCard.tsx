
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, TrendingDownIcon, TrendingUpIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MetricData } from "@/lib/mock-data";

interface DashboardMetricCardProps {
  metric: MetricData;
}

export function DashboardMetricCard({ metric }: DashboardMetricCardProps) {
  // Function to determine the trend icon based on change type
  const renderTrendIcon = () => {
    if (metric.changeType === "positive") {
      return <TrendingUpIcon className="w-5 h-5 stroke-[1.5]" />;
    } else if (metric.changeType === "negative") {
      return <TrendingDownIcon className="w-5 h-5 stroke-[1.5]" />;
    } else {
      return <MinusIcon className="w-5 h-5 stroke-[1.5]" />;
    }
  };

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {metric.name}
            </span>
            <div className={cn(
              "p-1.5 rounded-full",
              metric.changeType === "positive" ? "bg-green-50" : "",
              metric.changeType === "negative" ? "bg-red-50" : "",
              metric.changeType === "neutral" ? "bg-gray-50" : "",
            )}>
              {renderTrendIcon()}
            </div>
          </div>
          
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold">
                {metric.value}{metric.name.includes("Rate") ? "%" : ""}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                vs previous period
              </p>
            </div>
            <div className={cn(
              "flex items-center text-sm font-medium",
              metric.changeType === "positive" ? "text-green-600" : "",
              metric.changeType === "negative" ? "text-red-600" : "",
              metric.changeType === "neutral" ? "text-gray-500" : "",
            )}>
              {metric.changeType === "positive" && <ArrowUpIcon className="w-4 h-4 mr-1" />}
              {metric.changeType === "negative" && <ArrowDownIcon className="w-4 h-4 mr-1" />}
              {metric.change}%
            </div>
          </div>
          
          {/* Simple mini trend indicator */}
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full",
                metric.changeType === "positive" ? "bg-green-500" : "",
                metric.changeType === "negative" ? "bg-red-500" : "",
                metric.changeType === "neutral" ? "bg-gray-300" : ""
              )}
              style={{ width: `${Math.min(Math.abs(metric.change) * 3, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
