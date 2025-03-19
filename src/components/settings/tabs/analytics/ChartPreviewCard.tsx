
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart3, LineChart, PieChart } from "lucide-react";
import { ChartTypeItem } from "./ChartTypeItem";

type ChartPreviewCardProps = {
  onSave: () => void;
};

export function ChartPreviewCard({ onSave }: ChartPreviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart & Visualization Defaults</CardTitle>
        <CardDescription>
          Configure default chart types and visualization settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ChartTypeItem 
            icon={<BarChart3 className="mr-2 h-4 w-4" />}
            title="Bar Charts"
            description="Default for categorical data"
          />

          <ChartTypeItem
            icon={<LineChart className="mr-2 h-4 w-4" />}
            title="Line Charts"
            description="Default for time series data"
          />

          <ChartTypeItem
            icon={<PieChart className="mr-2 h-4 w-4" />}
            title="Pie Charts"
            description="Default for distribution data"
          />
        </div>

        <div className="pt-4">
          <h4 className="font-medium mb-2">Chart Preview</h4>
          <div className="border rounded-md p-4 bg-card">
            <ChartContainer
              config={{
                example: {
                  label: "Example Chart",
                  theme: {
                    light: "#9b87f5",
                    dark: "#9b87f5",
                  },
                }
              }}
            >
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                Chart Preview Placeholder
              </div>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSave}>Save Default Settings</Button>
      </CardFooter>
    </Card>
  );
}
