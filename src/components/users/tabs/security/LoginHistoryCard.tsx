
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

export function LoginHistoryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Login History
        </CardTitle>
        <CardDescription>
          Recent account login activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm border-b pb-2">
            <div className="font-medium">Yesterday, 15:42</div>
            <div className="text-muted-foreground">IP: 192.168.1.1 • Chrome, Windows</div>
          </div>
          <div className="text-sm border-b pb-2">
            <div className="font-medium">3 days ago, 09:15</div>
            <div className="text-muted-foreground">IP: 192.168.1.1 • Safari, iOS</div>
          </div>
          <div className="text-sm">
            <div className="font-medium">1 week ago, 18:30</div>
            <div className="text-muted-foreground">IP: 192.168.1.1 • Chrome, macOS</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="w-full">View Full History</Button>
      </CardFooter>
    </Card>
  );
}
