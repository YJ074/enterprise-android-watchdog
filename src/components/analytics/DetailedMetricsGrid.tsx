
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MetricData } from "@/lib/types/metric.types";
import { ArrowUpIcon, ArrowDownIcon, ShieldCheckIcon, AlertTriangleIcon, SmartphoneIcon, UserCheckIcon, GlobeIcon, MonitorIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Extended metrics with more details
const detailedMetrics: (MetricData & { 
  icon: React.ReactNode; 
  progressValue: number;
  description: string;
})[] = [
  {
    name: "Device Enrollment",
    value: 843,
    change: 12.5,
    changeType: "positive",
    icon: <SmartphoneIcon className="h-5 w-5 text-indigo-500" />,
    progressValue: 84,
    description: "Active devices enrolled in MDM"
  },
  {
    name: "Compliance Rate",
    value: 92,
    change: 3.2,
    changeType: "positive",
    icon: <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />,
    progressValue: 92,
    description: "Devices meeting security policies"
  },
  {
    name: "Security Risk Score",
    value: 18,
    change: 5.7,
    changeType: "negative",
    icon: <AlertTriangleIcon className="h-5 w-5 text-amber-500" />,
    progressValue: 18,
    description: "Overall security risk assessment"
  },
  {
    name: "User Activation",
    value: 78,
    change: 4.3,
    changeType: "positive",
    icon: <UserCheckIcon className="h-5 w-5 text-blue-500" />,
    progressValue: 78,
    description: "Users with activated accounts"
  },
  {
    name: "Global Coverage",
    value: 68,
    change: 8.1,
    changeType: "positive",
    icon: <GlobeIcon className="h-5 w-5 text-indigo-400" />,
    progressValue: 68,
    description: "Geographic deployment coverage"
  },
  {
    name: "System Uptime",
    value: 99.8,
    change: 0.2,
    changeType: "positive",
    icon: <MonitorIcon className="h-5 w-5 text-teal-500" />,
    progressValue: 99.8,
    description: "Platform availability percentage"
  }
];

export function DetailedMetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {detailedMetrics.map((metric) => (
        <Card key={metric.name} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {metric.icon}
                <CardTitle className="text-lg">{metric.name}</CardTitle>
              </div>
              <div className={cn(
                "flex items-center text-sm font-medium",
                metric.changeType === "positive" ? "text-emerald-600" : "",
                metric.changeType === "negative" ? "text-rose-600" : "",
                metric.changeType === "neutral" ? "text-gray-500" : "",
              )}>
                {metric.changeType === "positive" && <ArrowUpIcon className="w-4 h-4 mr-1" />}
                {metric.changeType === "negative" && <ArrowDownIcon className="w-4 h-4 mr-1" />}
                {metric.change}%
              </div>
            </div>
            <CardDescription>{metric.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">
                  {metric.value}{metric.name.includes("Rate") || metric.name.includes("Uptime") ? "%" : ""}
                </span>
              </div>
              <Progress 
                value={metric.progressValue} 
                indicatorClassName={cn(
                  metric.name === "Security Risk Score" ? "bg-amber-500" : null,
                  metric.name === "Compliance Rate" ? "bg-emerald-500" : null,
                  metric.name === "Device Enrollment" ? "bg-indigo-500" : null,
                  metric.name === "User Activation" ? "bg-blue-500" : null,
                  metric.name === "Global Coverage" ? "bg-indigo-400" : null,
                  metric.name === "System Uptime" ? "bg-teal-500" : null
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
