import type { ElementType, ReactNode } from "react";
import { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  isDev?: boolean;
  isRice?: boolean;
  isEcoSystemAdmin?: boolean;
  brandIcon?: ElementType;
  brandTitle?: ReactNode;
  brandSubtitle?: ReactNode;
}

export function AdminLayout({
  children,
  title,
  description,
  actions,
  isDev = false,
  isRice = false,
  isEcoSystemAdmin = false,
  brandIcon,
  brandTitle,
  brandSubtitle,
}: AdminLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarPreferenceCollapsed, setSidebarPreferenceCollapsed] = useState(
    () => {
      if (typeof window === "undefined") {
        return false;
      }

      const saved = window.sessionStorage.getItem("sidebar_collapsed");
      return saved === "true";
    },
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    window.sessionStorage.setItem(
      "sidebar_collapsed",
      String(sidebarPreferenceCollapsed),
    );
  }, [sidebarPreferenceCollapsed]);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, mobileSidebarOpen]);

  const sidebarCollapsed = isMobile
    ? !mobileSidebarOpen
    : sidebarPreferenceCollapsed;

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen((current) => !current);
      return;
    }

    setSidebarPreferenceCollapsed((current) => !current);
  };

  return (
    <div className="min-h-screen bg-background">
      {isMobile && mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        isMobile={isMobile}
        mobileOpen={mobileSidebarOpen}
        isDev={isDev}
        isRice={isRice}
        isEcoSystemAdmin={isEcoSystemAdmin}
        brandIcon={brandIcon}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
      />
      <div
        className={cn(
          "transition-all duration-300",
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64",
        )}
      >
        <AdminHeader
          isEcoSystemAdmin={isEcoSystemAdmin}
          onToggleSidebar={isMobile ? () => setMobileSidebarOpen(true) : undefined}
        />
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
