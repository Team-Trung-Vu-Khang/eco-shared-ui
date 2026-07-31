import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  isDev?: boolean;
  isRice?: boolean;
  isEcoSystemAdmin?: boolean;
}

export function AdminLayout({
  children,
  title,
  description,
  actions,
  isDev = false,
  isRice = false,
  isEcoSystemAdmin = false,
}: AdminLayoutProps) {
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
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        isDev={isDev}
        isRice={isRice}
        isEcoSystemAdmin={isEcoSystemAdmin}
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
