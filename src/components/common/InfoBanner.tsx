
import React from "react";
import { cn } from "@/lib/utils";

interface InfoBannerProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export function InfoBanner({ children, label, className }: InfoBannerProps) {
  return (
    <div className={cn("bg-muted/20 p-3 rounded-md", className)}>
      {label && <span className="text-sm text-muted-foreground mr-2">{label}:</span>}
      {children}
    </div>
  );
}
