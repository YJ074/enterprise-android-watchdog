
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
  
  // If we're at a blank page or investigation route with no content, redirect to dashboard
  useEffect(() => {
    const isBlankPage = document.body.innerHTML.trim() === '';
    
    if (isBlankPage || 
        (location.pathname.includes('investigation') && !document.querySelector('main')?.innerHTML.trim())) {
      toast({
        title: "Redirecting to Dashboard",
        description: "You were on a blank page. Redirecting to the dashboard with Software view.",
      });
      
      // Small delay to allow the toast to show
      setTimeout(() => {
        navigate('/');
      }, 500);
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
