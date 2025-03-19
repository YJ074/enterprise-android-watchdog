
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { UseFormReturn } from "react-hook-form";
import { InvestigationFormValues } from "../schema/investigation-schema";

interface DeviceOption {
  value: string;
  label: string;
}

interface InvestigationFormFieldsProps {
  form: UseFormReturn<InvestigationFormValues>;
  deviceOptions: DeviceOption[];
}

export function InvestigationFormFields({ form, deviceOptions }: InvestigationFormFieldsProps) {
  return (
    <>
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
    </>
  );
}
