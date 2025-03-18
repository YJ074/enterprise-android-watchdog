
import { ReactNode } from "react";

interface PlatformInfoNoteProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export function PlatformInfoNote({ icon, title, children }: PlatformInfoNoteProps) {
  return (
    <div className="rounded-lg bg-blue-50 p-3 text-blue-800 border border-blue-200 mt-4">
      <div className="flex items-start space-x-2">
        <div className="flex-shrink-0 mt-0.5">{icon}</div>
        <div className="text-sm">
          <p className="font-medium">{title}</p>
          <div className="mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
