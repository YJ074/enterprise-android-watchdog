
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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(3, { message: "Device name must be at least 3 characters." }),
  model: z.string().min(2, { message: "Model is required." }),
  osVersion: z.string().min(1, { message: "OS version is required." }),
  user: z.string().min(2, { message: "User name is required." }),
  department: z.string().min(2, { message: "Department is required." }),
});

type FormValues = z.infer<typeof formSchema>;

interface AddDeviceDialogProps {
  onDeviceAdded?: (device: FormValues) => void;
  trigger?: React.ReactNode;
}

export function AddDeviceDialog({ onDeviceAdded, trigger }: AddDeviceDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "",
      osVersion: "",
      user: "",
      department: "",
    },
  });

  function onSubmit(data: FormValues) {
    // In a real application, you would save this to your backend
    const newDevice = {
      ...data,
      id: `dev-${Math.floor(Math.random() * 1000)}`, // Generate a random ID
      status: "offline" as const,
      lastSeen: new Date().toISOString(),
      batteryLevel: 100,
      storageUsed: 0,
      totalStorage: 128,
      applications: [],
    };

    if (onDeviceAdded) {
      onDeviceAdded(data);
    }

    toast({
      title: "Device Added",
      description: `${data.name} has been added to your managed devices.`,
    });

    // Reset form and close dialog
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
              name="osVersion"
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
              name="user"
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
