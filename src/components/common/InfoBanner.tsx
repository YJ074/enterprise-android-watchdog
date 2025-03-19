
import React from "react";
import { cn } from "@/lib/utils";

interface InfoBannerProps {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  label?: string;
  className?: string;
}

export function InfoBanner({ children, title, message, label, className }: InfoBannerProps) {
  return (
    <div className={cn("bg-muted/20 p-3 rounded-md", className)}>
      {label && <span className="text-sm text-muted-foreground mr-2">{label}:</span>}
      {(title || message) && (
        <div>
          {title && <h3 className="font-medium">{title}</h3>}
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
