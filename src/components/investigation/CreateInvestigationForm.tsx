
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useInvestigation } from "@/hooks/useInvestigation";
import { DateRangePicker } from "./DateRangePicker";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "../ui/multi-select";
import { AlertCircle, CalendarRange, Loader2, Save, Shield } from "lucide-react";
import { useDevices } from "@/hooks/useDevices";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

const investigationSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  deviceIds: z.array(z.string()).min(1, { message: "Select at least one device" }),
});

type FormValues = z.infer<typeof investigationSchema>;

export function CreateInvestigationForm() {
  const { createInvestigation } = useInvestigation();
  const { devices } = useDevices();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(investigationSchema),
    defaultValues: {
      title: "",
      description: "",
      deviceIds: [],
    },
  });
  
  const onSubmit = async (data: FormValues) => {
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
      // Fix: Ensure all required properties are provided and not optional
      await createInvestigation({
        title: data.title, // Now explicitly required
        description: data.description, // Now explicitly required
        deviceIds: data.deviceIds, // Now explicitly required
        startDate: format(dateRange.from, "yyyy-MM-dd"),
        endDate: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
        status: "active",
      });
      
      form.reset();
      toast({
        title: "Investigation Created",
        description: "Your investigation has been created successfully.",
      });
      // Close dialog (would need DialogClose from radix-ui)
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
            <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800">
              <AlertCircle className="h-4 w-4 text-blue-800" />
              <AlertDescription>
                All investigation activities are logged and subject to compliance review
              </AlertDescription>
            </Alert>
          
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investigation Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Security Breach Investigation" className="border-gray-300" />
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
                      {...field} 
                      placeholder="Describe the purpose of this investigation"
                      rows={3}
                      className="border-gray-300 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deviceIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Devices to Investigate</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={deviceOptions}
                      values={field.value.map(id => 
                        deviceOptions.find(d => d.value === id) || { value: id, label: id }
                      )}
                      onChange={(options) => field.onChange(options.map(o => o.value))}
                      placeholder="Select devices..."
                      className="border-gray-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel className="flex items-center gap-1">
                <CalendarRange className="h-4 w-4" />
                Investigation Date Range
              </FormLabel>
              <DateRangePicker 
                value={dateRange}
                onChange={setDateRange}
                className="w-full border-gray-300 rounded-md"
              />
              {!dateRange?.from && (
                <p className="text-sm text-destructive">Please select a start date</p>
              )}
            </div>
            
            <CardFooter className="px-0 pb-0 pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4" />
                Create Investigation
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
