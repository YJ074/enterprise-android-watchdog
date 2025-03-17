
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthIndicatorProps {
  strength: number;
}

export const PasswordStrengthIndicator = ({ strength }: PasswordStrengthIndicatorProps) => {
  const getStrengthColor = (strength: number): string => {
    if (strength <= 25) return "bg-red-500";
    if (strength <= 50) return "bg-orange-500";
    if (strength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number): string => {
    if (strength <= 25) return "Weak";
    if (strength <= 50) return "Fair";
    if (strength <= 75) return "Good";
    return "Strong";
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>Password strength:</span>
        <span className={strength > 50 ? "text-green-600" : "text-orange-600"}>
          {getStrengthText(strength)}
        </span>
      </div>
      <Progress 
        value={strength} 
        className="h-1" 
        indicatorClassName={getStrengthColor(strength)}
      />
    </div>
  );
};
