
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
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
import { MdmProfile, NewMdmProfile } from "@/hooks/devices/types";
import { Switch } from "@/components/ui/switch";

const profileFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  type: z.enum(["security", "restrictions", "wifi", "email", "vpn", "custom"]),
  is_active: z.boolean().default(true),
  settings: z.any()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface CreateProfileDialogProps {
  trigger: React.ReactNode;
  onProfileCreated: (profile: MdmProfile) => void;
}

export function CreateProfileDialog({ trigger, onProfileCreated }: CreateProfileDialogProps) {
  const [open, setOpen] = useState(false);
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
  
  const onSubmit = (data: ProfileFormValues) => {
    // In a real application, this would be an API call
    const newProfile: MdmProfile = {
      id: `profile-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...data
    };
    
    onProfileCreated(newProfile);
    setOpen(false);
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
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create MDM Profile</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            
            {selectedType === "security" && (
              <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">Security Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Require Password</span>
                    <Switch 
                      checked={form.getValues().settings?.password?.required} 
                      onCheckedChange={(checked) => {
                        const settings = form.getValues().settings;
                        form.setValue("settings", {
                          ...settings,
                          password: {
                            ...settings.password,
                            required: checked
                          }
                        });
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Require Device Encryption</span>
                    <Switch 
                      checked={form.getValues().settings?.encryption?.enabled} 
                      onCheckedChange={(checked) => {
                        const settings = form.getValues().settings;
                        form.setValue("settings", {
                          ...settings,
                          encryption: {
                            ...settings.encryption,
                            enabled: checked
                          }
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {selectedType === "wifi" && (
              <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">WiFi Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormLabel>SSID</FormLabel>
                      <Input 
                        placeholder="Network Name" 
                        value={form.getValues().settings?.ssid || ""} 
                        onChange={(e) => {
                          const settings = form.getValues().settings;
                          form.setValue("settings", {
                            ...settings,
                            ssid: e.target.value
                          });
                        }}
                      />
                    </div>
                    
                    <div>
                      <FormLabel>Security Type</FormLabel>
                      <Select 
                        value={form.getValues().settings?.security || "WPA2"}
                        onValueChange={(value) => {
                          const settings = form.getValues().settings;
                          form.setValue("settings", {
                            ...settings,
                            security: value
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA2">WPA2</SelectItem>
                          <SelectItem value="WPA2-Enterprise">WPA2-Enterprise</SelectItem>
                          <SelectItem value="WPA3">WPA3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Profile</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
