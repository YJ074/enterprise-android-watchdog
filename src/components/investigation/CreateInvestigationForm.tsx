
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
import { Loader2 } from "lucide-react";
import { useDevices } from "@/hooks/useDevices";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const investigationSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  deviceIds: z.array(z.string()).min(1, { message: "Select at least one device" }),
});

type FormValues = z.infer<typeof investigationSchema>;

export function CreateInvestigationForm() {
  const { createInvestigation } = useInvestigation();
  const { devices } = useDevices();
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
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createInvestigation({
        ...data,
        startDate: format(dateRange.from, "yyyy-MM-dd"),
        endDate: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
        status: "active",
      });
      
      form.reset();
      // Close dialog (would need DialogClose from radix-ui)
    } catch (error) {
      console.error("Error creating investigation:", error);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investigation Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g., Security Breach Investigation" />
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <FormLabel>Investigation Date Range</FormLabel>
          <DateRangePicker 
            value={dateRange}
            onChange={setDateRange}
            className="w-full"
          />
          {!dateRange?.from && (
            <p className="text-sm text-destructive">Please select a start date</p>
          )}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Investigation
          </Button>
        </div>
      </form>
    </Form>
  );
}
