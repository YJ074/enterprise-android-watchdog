
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Info, ExternalLink, Database, Key } from "lucide-react";

export function SupabaseSetupInstructions() {
  return (
    <Card className="max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Database className="h-6 w-6" />
          Supabase Setup Instructions
        </CardTitle>
        <CardDescription>
          Follow these steps to set up your Supabase project for the device management system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="setup">Initial Setup</TabsTrigger>
            <TabsTrigger value="database">Database Setup</TabsTrigger>
            <TabsTrigger value="env">Environment Variables</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Create a Supabase Project</h3>
              <ol className="space-y-2 list-decimal pl-5">
                <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Supabase.com</a> and sign in or create an account.</li>
                <li>Create a new project by clicking "New project".</li>
                <li>Enter a name for your project (e.g., "Enterprise Device Manager").</li>
                <li>Set a secure database password.</li>
                <li>Choose a region closest to your users.</li>
                <li>Click "Create new project".</li>
              </ol>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Project creation may take a few minutes. You can proceed to the next steps once it's ready.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
          
          <TabsContent value="database">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Set Up Database Tables</h3>
              <p>You have two options to create the required database tables:</p>
              
              <div className="space-y-2">
                <h4 className="font-medium">Option 1: Using the SQL Editor</h4>
                <ol className="space-y-2 list-decimal pl-5">
                  <li>In your Supabase dashboard, go to the "SQL Editor" section.</li>
                  <li>Create a new query.</li>
                  <li>Copy the SQL code from the <code className="bg-gray-100 p-1 rounded">supabase/migrations/00001_create_tables.sql</code> file in your project.</li>
                  <li>Run the query to create all necessary tables.</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Option 2: Using Supabase CLI (Advanced)</h4>
                <ol className="space-y-2 list-decimal pl-5">
                  <li>Install the Supabase CLI according to the <a href="https://supabase.com/docs/guides/cli" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">official documentation</a>.</li>
                  <li>Link your local project to your Supabase project.</li>
                  <li>Run <code className="bg-gray-100 p-1 rounded">supabase db push</code> to apply the migrations.</li>
                </ol>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="env">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Set Environment Variables</h3>
              <p>To connect your application to Supabase, you need to set up environment variables:</p>
              
              <ol className="space-y-2 list-decimal pl-5">
                <li>In your Supabase dashboard, go to the "Settings" section and then "API".</li>
                <li>Find your project URL and anon/public key.</li>
                <li>Create a <code className="bg-gray-100 p-1 rounded">.env.local</code> file in your project root with the following:</li>
              </ol>
              
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm my-2">
                VITE_SUPABASE_URL=https://your-project-id.supabase.co<br />
                VITE_SUPABASE_ANON_KEY=your-anon-key
              </div>
              
              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  Never commit your .env.local file to version control. Make sure it's listed in your .gitignore file.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <p className="text-sm text-muted-foreground">
          After completing these steps, restart your application to connect to your Supabase backend.
        </p>
        <Button asChild className="w-full sm:w-auto">
          <a 
            href="https://supabase.com/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Supabase Documentation
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
