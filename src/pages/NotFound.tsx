
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PackageOpen, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button 
            variant="default"
            onClick={() => navigate('/')}
            className="flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              navigate('/');
              // After navigation, try to select the software tab
              setTimeout(() => {
                const softwareTab = document.querySelector('[value="software"]');
                if (softwareTab instanceof HTMLElement) {
                  softwareTab.click();
                }
              }, 500);
            }}
            className="flex items-center"
          >
            <PackageOpen className="mr-2 h-4 w-4" />
            Go to Software
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
