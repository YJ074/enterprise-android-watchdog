
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react"

const warningVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-blue-200 bg-blue-50 text-blue-800 [&>svg]:text-blue-500",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800 [&>svg]:text-yellow-500",
        success: "border-green-200 bg-green-50 text-green-800 [&>svg]:text-green-500",
        error: "border-red-200 bg-red-50 text-red-800 [&>svg]:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const warningIconMap = {
  default: AlertTriangle,
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
  error: XCircle,
}

export interface WarningProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof warningVariants> {
  title?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Warning = React.forwardRef<
  HTMLDivElement,
  WarningProps
>(({ className, variant = "default", title, action, icon, dismissible, onDismiss, children, ...props }, ref) => {
  const [dismissed, setDismissed] = React.useState(false);
  const IconComponent = warningIconMap[variant || "default"];
  
  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };
  
  if (dismissed) return null;
  
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(warningVariants({ variant }), "animate-fade-in", className)}
      {...props}
    >
      {icon || <IconComponent className="h-4 w-4" />}
      <div className="flex justify-between items-start gap-4">
        <div>
          {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
          <div className="text-sm [&_p]:leading-relaxed">{children}</div>
        </div>
        
        {(action || dismissible) && (
          <div className="flex shrink-0">
            {action}
            {dismissible && (
              <button 
                onClick={handleDismiss}
                className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Dismiss"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
})
Warning.displayName = "Warning"

export { Warning }
