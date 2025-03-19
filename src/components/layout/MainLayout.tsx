
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Make sure we have content on the page
  useEffect(() => {
    // Check if we're on the index route with no content
    const isBlankPage = document.querySelector('main')?.innerHTML.trim() === '';
    
    if (isBlankPage) {
      toast({
        title: "Refreshing Dashboard",
        description: "Loading the Software Dashboard view...",
      });
      
      // Force a refresh to ensure content is displayed
      window.location.reload();
    }
  }, [location.pathname, navigate, toast]);

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
