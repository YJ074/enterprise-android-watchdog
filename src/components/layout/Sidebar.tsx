
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarFooter } from "./sidebar/SidebarFooter";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  
  // Handle mobile sidebar behavior
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (expanded && window.innerWidth < 1024) {
        const sidebar = document.querySelector('[data-testid="main-sidebar"]');
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setExpanded(false);
        }
      }
    };
    
    // Close sidebar on route change for mobile
    if (expanded && window.innerWidth < 1024) {
      setExpanded(false);
    }
    
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [location.pathname, expanded]);
  
  return (
    <>
      {/* Mobile overlay */}
      {expanded && (
        <div 
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setExpanded(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile menu button */}
      <button
        className="fixed bottom-4 left-4 z-30 lg:hidden bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={() => setExpanded(!expanded)}
        aria-label={expanded ? "Close menu" : "Open menu"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {expanded ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>
      
      {/* Sidebar */}
      <aside
        data-testid="main-sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          expanded ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <SidebarHeader collapsed={collapsed} onClose={() => setExpanded(false)} />
        <SidebarNavigation collapsed={collapsed} />
        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
}
