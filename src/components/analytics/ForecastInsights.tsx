
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowUpRight, TrendingUp, Shield, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

// Forecast insights data
const insights = [
  {
    title: "Device Growth Projection",
    description: "Based on current trends, device enrollment is expected to increase by 18% in the next 30 days.",
    icon: <TrendingUp className="h-5 w-5" />,
    type: "positive",
  },
  {
    title: "Compliance Forecast",
    description: "Compliance rate is projected to improve to 96% within the next quarter based on current policy adoption rates.",
    icon: <Shield className="h-5 w-5" />,
    type: "positive",
  },
  {
    title: "Security Risk Alert",
    description: "Risk models predict a potential 15% increase in security incidents if current vulnerable devices aren't updated.",
    icon: <AlertTriangle className="h-5 w-5" />,
    type: "warning",
  },
  {
    title: "Trend Analysis",
    description: "Statistical analysis shows strong correlation between monthly OS updates and reduced security incidents.",
    icon: <LineChart className="h-5 w-5" />,
    type: "neutral",
  }
];

export function ForecastInsights() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowUpRight className="mr-2 h-5 w-5" />
          Forecast Insights
        </CardTitle>
        <CardDescription>
          Projected trends and statistical insights based on historical data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <Card key={index} className={cn(
              "bg-muted/50",
              insight.type === "warning" && "border-amber-300",
              insight.type === "positive" && "border-emerald-300"
            )}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <span className={cn(
                    "mr-2 p-1.5 rounded-full",
                    insight.type === "positive" && "bg-emerald-100 text-emerald-700",
                    insight.type === "warning" && "bg-amber-100 text-amber-700",
                    insight.type === "neutral" && "bg-blue-100 text-blue-700",
                  )}>
                    {insight.icon}
                  </span>
                  {insight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
