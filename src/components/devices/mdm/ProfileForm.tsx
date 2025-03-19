
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { ProfileSettingsRenderer } from "./profile-settings/ProfileSettingsRenderer";
import { MdmProfile } from "@/hooks/devices/types";
import { DialogFooter } from "@/components/ui/dialog";

const profileFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  type: z.enum(["security", "restrictions", "wifi", "email", "vpn", "custom"]),
  is_active: z.boolean().default(true),
  settings: z.any()
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onSubmit: (profile: MdmProfile) => void;
  onCancel: () => void;
}

export function ProfileForm({ onSubmit, onCancel }: ProfileFormProps) {
  const [selectedType, setSelectedType] = useState<string | undefined>();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
      settings: {}
    }
  });
  
  const handleFormSubmit = (data: ProfileFormValues) => {
    // Ensure all required properties are explicitly set
    const newProfile: MdmProfile = {
      id: `profile-${Date.now()}`,
      name: data.name,
      description: data.description,
      type: data.type,
      settings: data.settings || {},
      is_active: data.is_active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    onSubmit(newProfile);
    form.reset();
  };
  
  const handleSelectType = (value: string) => {
    setSelectedType(value);
    form.setValue("type", value as any);
    
    // Set default settings based on the selected profile type
    switch (value) {
      case "security":
        form.setValue("settings", {
          password: {
            required: true,
            minLength: 6,
            requireComplexity: true
          },
          encryption: {
            enabled: true
          }
        });
        break;
      case "wifi":
        form.setValue("settings", {
          ssid: "",
          security: "WPA2",
          authentication: ""
        });
        break;
      case "restrictions":
        form.setValue("settings", {
          appStore: {
            disabled: false
          },
          allowedApps: []
        });
        break;
      default:
        form.setValue("settings", {});
    }
  };

  const handleSettingsChange = (newSettings: any) => {
    form.setValue("settings", newSettings);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter profile name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter profile description"
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Type</FormLabel>
              <Select 
                onValueChange={handleSelectType}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a profile type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="restrictions">Restrictions</SelectItem>
                  <SelectItem value="wifi">WiFi</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="vpn">VPN</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <ProfileSettingsRenderer 
          type={selectedType} 
          settings={form.getValues().settings}
          onSettingsChange={handleSettingsChange}
        />
        
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Make this profile active and ready for deployment
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Profile</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
