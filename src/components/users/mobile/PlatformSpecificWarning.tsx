
import { ReactNode } from "react";

interface PlatformSpecificWarningProps {
  title: string;
  children: ReactNode;
}

export function PlatformSpecificWarning({ title, children }: PlatformSpecificWarningProps) {
  return (
    <div className="text-sm mt-1 space-y-1">
      <p>{title}</p>
      {children}
    </div>
  );
}
