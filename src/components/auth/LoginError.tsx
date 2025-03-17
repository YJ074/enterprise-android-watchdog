
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LoginErrorProps {
  message: string;
}

export const LoginError = ({ message }: LoginErrorProps) => {
  if (!message) return null;

  return (
    <Alert variant="destructive" className="mb-4 animate-fade-in">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
