
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const migrationSchema = z.object({
  name: z.string().min(3, {
    message: "Migration name must be at least 3 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  type: z.enum(['device', 'user', 'policy', 'settings']),
  scope: z.enum(['all', 'selected', 'filtered']),
  options: z.object({
    createBackup: z.boolean().default(true),
    validateBeforeRun: z.boolean().default(true),
    notifyAdmins: z.boolean().default(false),
  }),
  priority: z.enum(['low', 'normal', 'high', 'critical']).default('normal'),
});

export const MigrationCreator = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const form = useForm<z.infer<typeof migrationSchema>>({
    resolver: zodResolver(migrationSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'device',
      scope: 'all',
      options: {
        createBackup: true,
        validateBeforeRun: true,
        notifyAdmins: false,
      },
      priority: 'normal',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof migrationSchema>) => {
    setIsCreating(true);
    setProgress(0);
    setIsComplete(false);
    
    // Simulate creation process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    clearInterval(interval);
    setProgress(100);
    
    toast({
      title: "Migration Created",
      description: `${values.name} has been created successfully.`,
    });
    
    setIsComplete(true);
    setTimeout(() => {
      form.reset();
      setIsCreating(false);
      setIsComplete(false);
    }, 2000);
  };
  
  const selectedType = form.watch('type');
  const selectedScope = form.watch('scope');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Migration</CardTitle>
        <CardDescription>
          Define a new data migration task to be executed later
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Migration Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter migration name" 
                      {...field} 
                      disabled={isCreating}
                    />
                  </FormControl>
                  <FormDescription>
                    A descriptive name for this migration task
                  </FormDescription>
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
                      placeholder="Describe the purpose of this migration" 
                      {...field} 
                      disabled={isCreating}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about what this migration will accomplish
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Migration Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isCreating}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select migration type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="device">Device Migration</SelectItem>
                        <SelectItem value="user">User Migration</SelectItem>
                        <SelectItem value="policy">Policy Migration</SelectItem>
                        <SelectItem value="settings">Settings Migration</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The type of data this migration will handle
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isCreating}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Set the execution priority for this migration
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="scope"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Migration Scope</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={isCreating}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="all" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          All {selectedType}s
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="selected" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Selected {selectedType}s
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="filtered" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Filtered {selectedType}s
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Define which items will be included in this migration
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedScope === 'filtered' && (
              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Filter Options</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Filter by Status</label>
                    <Select defaultValue="all" disabled={isCreating}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active Only</SelectItem>
                        <SelectItem value="inactive">Inactive Only</SelectItem>
                        <SelectItem value="compromised">Compromised Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedType === 'device' && (
                    <div>
                      <label className="text-sm text-muted-foreground">Filter by OS Type</label>
                      <Select defaultValue="all" disabled={isCreating}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select OS type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All OS Types</SelectItem>
                          <SelectItem value="ios">iOS Only</SelectItem>
                          <SelectItem value="android">Android Only</SelectItem>
                          <SelectItem value="windows">Windows Only</SelectItem>
                          <SelectItem value="macos">macOS Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {selectedType === 'user' && (
                    <div>
                      <label className="text-sm text-muted-foreground">Filter by Department</label>
                      <Select defaultValue="all" disabled={isCreating}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Advanced Options</h3>
              
              <FormField
                control={form.control}
                name="options.createBackup"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Create Backup
                      </FormLabel>
                      <FormDescription>
                        Create a complete backup before executing this migration
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="options.validateBeforeRun"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Validate Before Run
                      </FormLabel>
                      <FormDescription>
                        Validate data integrity before executing the migration
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="options.notifyAdmins"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Notify Administrators
                      </FormLabel>
                      <FormDescription>
                        Send notifications to administrators when migration completes
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            {isCreating && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Creating migration...</span>
                  <span className="text-sm">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isCreating}
                className="gap-2"
              >
                {isCreating ? (
                  <>
                    {isComplete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {isComplete ? "Created" : "Creating..."}
                  </>
                ) : (
                  "Create Migration"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
