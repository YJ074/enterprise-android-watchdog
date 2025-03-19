
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { MdmProfileType } from "@/hooks/useComputerMdm";

const profileFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  applicableTo: z.enum(["windows", "macos", "all"]),
  isActive: z.boolean().default(true),
  settings: z.object({
    securitySettings: z.object({
      passwordPolicy: z.object({
        minLength: z.number().min(4).max(32),
        requireSpecialChars: z.boolean(),
        requireNumbers: z.boolean(),
        expirationDays: z.number().min(0)
      }).optional(),
      diskEncryption: z.boolean().optional(),
      firewallEnabled: z.boolean().optional()
    }).optional(),
    softwareSettings: z.object({
      approvedApplications: z.array(z.string()).optional(),
      blockedApplications: z.array(z.string()).optional(),
      autoUpdateEnabled: z.boolean().optional()
    }).optional(),
    networkSettings: z.object({
      vpnConfiguration: z.object({
        server: z.string().optional(),
        protocol: z.string().optional()
      }).optional(),
      wifiRestrictions: z.boolean().optional()
    }).optional()
  })
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface MdmProfileFormProps {
  initialData?: MdmProfileType;
  onSubmit: (data: Omit<MdmProfileType, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function MdmProfileForm({ initialData, onSubmit, onCancel }: MdmProfileFormProps) {
  const defaultValues: Partial<ProfileFormValues> = initialData || {
    name: "",
    description: "",
    applicableTo: "all",
    isActive: true,
    settings: {
      securitySettings: {
        passwordPolicy: {
          minLength: 8,
          requireSpecialChars: true,
          requireNumbers: true,
          expirationDays: 90
        },
        diskEncryption: true,
        firewallEnabled: true
      },
      softwareSettings: {
        approvedApplications: [],
        blockedApplications: [],
        autoUpdateEnabled: true
      }
    }
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
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
            name="applicableTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Platform</FormLabel>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="windows">Windows</SelectItem>
                    <SelectItem value="macos">macOS</SelectItem>
                    <SelectItem value="all">All Platforms</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter profile description"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Password Policy</h4>
                  
                  <FormField
                    control={form.control}
                    name="settings.securitySettings.passwordPolicy.minLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Password Length</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="settings.securitySettings.passwordPolicy.requireSpecialChars"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Require Special Characters</FormLabel>
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
                  
                  <FormField
                    control={form.control}
                    name="settings.securitySettings.passwordPolicy.requireNumbers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Require Numbers</FormLabel>
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
                  
                  <FormField
                    control={form.control}
                    name="settings.securitySettings.passwordPolicy.expirationDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Expiration (Days)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                        </FormControl>
                        <FormDescription>
                          Set to 0 for no expiration
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="settings.securitySettings.diskEncryption"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Disk Encryption</FormLabel>
                        <FormDescription>
                          Requires BitLocker for Windows or FileVault for macOS
                        </FormDescription>
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
                
                <FormField
                  control={form.control}
                  name="settings.securitySettings.firewallEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Firewall</FormLabel>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="software">
            <Card>
              <CardHeader>
                <CardTitle>Software Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="settings.softwareSettings.autoUpdateEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Automatic Updates</FormLabel>
                        <FormDescription>
                          Automatically install security updates
                        </FormDescription>
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
                
                <FormField
                  control={form.control}
                  name="settings.softwareSettings.approvedApplications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approved Applications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter approved applications, one per line"
                          value={field.value?.join('\n') || ''}
                          onChange={e => field.onChange(e.target.value.split('\n').filter(Boolean))}
                        />
                      </FormControl>
                      <FormDescription>
                        List approved applications, one per line
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="settings.softwareSettings.blockedApplications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blocked Applications</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter blocked applications, one per line"
                          value={field.value?.join('\n') || ''}
                          onChange={e => field.onChange(e.target.value.split('\n').filter(Boolean))}
                        />
                      </FormControl>
                      <FormDescription>
                        List blocked applications, one per line
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="network">
            <Card>
              <CardHeader>
                <CardTitle>Network Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">VPN Configuration</h4>
                  
                  <FormField
                    control={form.control}
                    name="settings.networkSettings.vpnConfiguration.server"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VPN Server</FormLabel>
                        <FormControl>
                          <Input placeholder="vpn.company.com" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="settings.networkSettings.vpnConfiguration.protocol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VPN Protocol</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select VPN protocol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="OpenVPN">OpenVPN</SelectItem>
                            <SelectItem value="WireGuard">WireGuard</SelectItem>
                            <SelectItem value="L2TP/IPSec">L2TP/IPSec</SelectItem>
                            <SelectItem value="PPTP">PPTP</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="settings.networkSettings.wifiRestrictions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Restrict Wi-Fi Networks</FormLabel>
                        <FormDescription>
                          Only allow connection to approved Wi-Fi networks
                        </FormDescription>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active</FormLabel>
                <FormDescription>
                  Make this profile active and ready for deployment
                </FormDescription>
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
          <Button type="submit">
            {initialData ? 'Update Profile' : 'Create Profile'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
