
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MetricData } from "@/lib/mock-data";

interface DashboardMetricCardProps {
  metric: MetricData;
}

export function DashboardMetricCard({ metric }: DashboardMetricCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-muted-foreground">
            {metric.name}
          </span>
          <div className="flex items-baseline mt-2 justify-between">
            <span className="text-3xl font-bold">
              {metric.value}{metric.name.includes("Rate") ? "%" : ""}
            </span>
            <div className={cn(
              "flex items-center text-sm",
              metric.changeType === "positive" ? "text-green-600" : "",
              metric.changeType === "negative" ? "text-red-600" : "",
              metric.changeType === "neutral" ? "text-gray-500" : "",
            )}>
              {metric.changeType === "positive" && <ArrowUpIcon className="w-4 h-4 mr-1" />}
              {metric.changeType === "negative" && <ArrowDownIcon className="w-4 h-4 mr-1" />}
              {metric.change}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
