import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tractor } from "lucide-react";

export interface AdminSidebarBrandProps {
  icon?: ElementType;
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export function AdminSidebarBrand({
  icon: Icon = Tractor,
  title = "FARM",
  subtitle = "Admin Portal",
  className,
}: AdminSidebarBrandProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 overflow-hidden whitespace-nowrap animation-fade-in",
        className,
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-sidebar-primary-foreground" />
      </div>
      <div>
        <h1 className="font-display font-bold text-lg leading-tight">
          {title}
        </h1>
        <p className="text-xs text-sidebar-foreground/60">{subtitle}</p>
      </div>
    </div>
  );
}
