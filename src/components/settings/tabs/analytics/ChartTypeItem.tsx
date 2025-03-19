
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChartTypeItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function ChartTypeItem({ icon, title, description }: ChartTypeItemProps) {
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
      </CardContent>
    </Card>
  );
}
