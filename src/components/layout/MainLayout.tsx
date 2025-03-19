
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Default to collapsed sidebar on software pages or mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    location.pathname.includes('/software') || window.innerWidth < 1024
  );
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Auto-collapse sidebar for software pages and handle resize
  useEffect(() => {
    if (location.pathname.includes('/software') && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
    
    const handleResize = () => {
      if (window.innerWidth < 1024 && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname, sidebarCollapsed]);
  
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
      <Sidebar collapsed={sidebarCollapsed} />
      <div className={cn(
        "flex-1 flex flex-col overflow-hidden",
        "transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
