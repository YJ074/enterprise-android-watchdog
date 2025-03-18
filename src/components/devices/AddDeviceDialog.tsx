
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Smartphone, User, Building, Package } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type NewDevice } from "@/hooks/useDevices";

const formSchema = z.object({
  name: z.string().min(3, { message: "Device name must be at least 3 characters." }),
  model: z.string().min(2, { message: "Model is required." }),
  os_version: z.string().min(1, { message: "OS version is required." }),
  user_id: z.string().min(2, { message: "User name is required." }),
  department: z.string().min(2, { message: "Department is required." }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddDeviceDialogProps {
  onDeviceAdded?: (device: NewDevice) => void;
  trigger?: React.ReactNode;
}

export function AddDeviceDialog({ onDeviceAdded, trigger }: AddDeviceDialogProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "",
      os_version: "",
      user_id: "",
      department: "",
    },
  });

  function onSubmit(data: FormValues) {
    const newDevice: NewDevice = {
      name: data.name,
      model: data.model,
      os_version: data.os_version,
      user_id: data.user_id,
      department: data.department,
      status: 'offline',
      battery_level: 100,
      storage_used: 0,
      total_storage: 128,
      last_seen: new Date().toISOString(),
    };

    if (onDeviceAdded) {
      onDeviceAdded(newDevice);
    }

    form.reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Add Device</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
          <DialogDescription>
            Enter the device details to add it to your MDM system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Name</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Galaxy S23-John" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    A unique identifier for this device.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Samsung Galaxy S23" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="os_version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OS Version</FormLabel>
                  <FormControl>
                    <Input placeholder="Android 13" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned User</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="John Doe" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Engineering" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Device</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
