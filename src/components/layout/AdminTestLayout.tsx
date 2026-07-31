import type { ElementType, ReactNode } from "react";
import { useState } from "react";
import { AdminHeader } from "./AdminHeader";
import { cn } from "@/lib/utils";
import { AdminTestSidebar } from "./AdminTestSidebar";

export interface AdminTestLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  brandIcon?: ElementType;
  brandTitle?: ReactNode;
  brandSubtitle?: ReactNode;
}

export function AdminTestLayout({
  children,
  title,
  description,
  actions,
  brandIcon,
  brandTitle,
  brandSubtitle,
}: AdminTestLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = sessionStorage.getItem("sidebar_collapsed");
    return saved === "true";
  });

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    sessionStorage.setItem("sidebar_collapsed", String(newState));
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminTestSidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        brandIcon={brandIcon}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
      />
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64",
        )}
      >
        <AdminHeader />
        <main className="p-6">
          {(title || actions) && (
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                {title && (
                  <h1
                    className="text-2xl font-display font-bold text-foreground"
                    data-testid="page-title"
                  >
                    {title}
                  </h1>
                )}
                {description && (
                  <p
                    className="mt-1 text-muted-foreground"
                    data-testid="page-description"
                  >
                    {description}
                  </p>
                )}
              </div>
              {actions && (
                <div className="flex items-center gap-2">{actions}</div>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
