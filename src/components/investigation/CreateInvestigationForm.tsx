
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useInvestigation } from "@/hooks/useInvestigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Shield } from "lucide-react";
import { useDevices } from "@/hooks/useDevices";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { investigationSchema, InvestigationFormValues } from "./schema/investigation-schema";
import { InvestigationFormFields } from "./form-fields/InvestigationFormFields";
import { InvestigationDateRange } from "./form-fields/InvestigationDateRange";
import { InvestigationComplianceAlert } from "./form-fields/InvestigationComplianceAlert";
import { InvestigationFormActions } from "./form-fields/InvestigationFormActions";

export function CreateInvestigationForm() {
  const { createInvestigation } = useInvestigation();
  const { devices } = useDevices();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<InvestigationFormValues>({
    resolver: zodResolver(investigationSchema),
    defaultValues: {
      title: "",
      description: "",
      deviceIds: [],
    },
  });
  
  const onSubmit = async (data: InvestigationFormValues) => {
    if (!dateRange?.from) {
      toast({
        title: "Date Range Required",
        description: "Please select a start date for the investigation",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createInvestigation({
        title: data.title,
        description: data.description,
        deviceIds: data.deviceIds,
        startDate: format(dateRange.from, "yyyy-MM-dd"),
        endDate: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
        status: "active",
      });
      
      form.reset();
      toast({
        title: "Investigation Created",
        description: "Your investigation has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating investigation:", error);
      toast({
        title: "Error",
        description: "Failed to create investigation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format devices for multi-select
  const deviceOptions = devices.map(device => ({
    value: device.id,
    label: `${device.name} (${device.model})`
  }));
  
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="bg-gray-50 border-b pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          New Investigation
        </CardTitle>
        <CardDescription>
          Create a new investigation to analyze device activities and detect threats
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <InvestigationComplianceAlert />
            
            <InvestigationFormFields form={form} deviceOptions={deviceOptions} />
            
            <InvestigationDateRange dateRange={dateRange} setDateRange={setDateRange} />
            
            <InvestigationFormActions isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
