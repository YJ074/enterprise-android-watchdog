
import { Switch } from "@/components/ui/switch";

type ExportOptionProps = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function ExportOption({ title, description, checked, onCheckedChange }: ExportOptionProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
