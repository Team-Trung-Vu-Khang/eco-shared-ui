import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onClear, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            onClear && "pr-8",
            className,
          )}
          ref={ref}
          {...props}
        />
        {onClear && props.value && (
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 rounded-full hover:bg-muted opacity-50 hover:opacity-100 transition-all"
            onClick={(e) => {
              e.preventDefault();
              onClear();
            }}
          >
            <X className="h-3.5 w-3.5" />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
