import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  username: string;
  role: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User, rememberMe: boolean) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage for existing auth data on initial load
    const checkAuth = () => {
      const storedAuth = localStorage.getItem("isAuthenticated");
      const storedUser = localStorage.getItem("user");
      
      if (storedAuth === "true" && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
      }
      
      setIsLoading(false);
    };
    
    // Simulate a slight delay to avoid flash of unauthenticated content
    setTimeout(checkAuth, 300);
  }, []);

  const login = (userData: User, rememberMe: boolean) => {
    setIsAuthenticated(true);
    setUser(userData);
    
    // If remember me is checked, store auth data in localStorage
    if (rememberMe) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // Use sessionStorage instead for non-persistent sessions
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("user", JSON.stringify(userData));
      // Remove any previous remembered data
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
    // Keep the remembered username if it exists
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
