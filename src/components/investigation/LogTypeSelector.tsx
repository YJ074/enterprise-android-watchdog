
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Monitor, 
  FileText, 
  Share2, 
  AlertCircle 
} from "lucide-react";

interface LogTypeSelectorProps {
  selectedTypes: string[];
  onChange: (types: string[]) => void;
}

const logTypes = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { value: "call", label: "Calls", icon: Phone },
  { value: "email", label: "Emails", icon: Mail },
  { value: "screen", label: "Screen Time", icon: Monitor },
  { value: "file", label: "Files", icon: FileText },
  { value: "social", label: "Social Media", icon: Share2 },
  { value: "system", label: "System Events", icon: AlertCircle },
];

export function LogTypeSelector({ selectedTypes, onChange }: LogTypeSelectorProps) {
  const handleValueChange = (value: string[]) => {
    onChange(value);
  };
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Filter by log type:</label>
      <ToggleGroup 
        type="multiple" 
        variant="outline"
        value={selectedTypes}
        onValueChange={handleValueChange}
        className="flex flex-wrap gap-2"
      >
        {logTypes.map((type) => {
          const Icon = type.icon;
          return (
            <ToggleGroupItem 
              key={type.value} 
              value={type.value}
              aria-label={`Toggle ${type.label}`}
              className="flex items-center gap-1"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{type.label}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
      
      {selectedTypes.length > 0 && (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap gap-1">
            {selectedTypes.map((type) => (
              <Badge 
                key={type} 
                variant="secondary"
                className="text-xs"
              >
                {logTypes.find(t => t.value === type)?.label || type}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
