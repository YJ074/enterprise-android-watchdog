
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ChartTypeItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  deviceTypes?: string[]; // New property for supported device types
};

export function ChartTypeItem({ 
  icon, 
  title, 
  description, 
  deviceTypes = ["All"] 
}: ChartTypeItemProps) {
  return (
    <Card className="border border-muted">
      <CardHeader className="p-3">
        <CardTitle className="text-base flex items-center">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {deviceTypes && deviceTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {deviceTypes.map(type => (
              <Badge key={type} variant="outline" className="text-xs">
                {type}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
