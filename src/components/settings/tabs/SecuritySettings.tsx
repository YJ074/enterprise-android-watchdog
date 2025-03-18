
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  AuthenticationCard,
  PasswordPolicyCard,
  SecurityMonitoringCard,
  UserSyncCard
} from "./security";
import { securitySettingsSchema, type SecuritySettingsFormValues } from "./security/security-schema";

export function SecuritySettings() {
  const { toast } = useToast();
  const [syncTab, setSyncTab] = useState(false);
  
  const form = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      mfa: false,
      sessionTimeout: 30,
      passwordExpiry: "90days",
      requirements: {
        minLength: true,
        uppercase: true,
        numbers: true,
        special: true
      }
    }
  });
  
  const onSubmit = (data: SecuritySettingsFormValues) => {
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully."
    });
    console.log("Form data:", data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AuthenticationCard 
          form={form}
        />
        
        <PasswordPolicyCard 
          form={form}
        />
        
        <SecurityMonitoringCard />
        
        <UserSyncCard 
          syncTab={syncTab}
          setSyncTab={setSyncTab}
        />
        
        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </form>
    </Form>
  );
}
