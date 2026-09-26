import type { ElementType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "wouter";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { WorkspaceProvider, useWorkspace } from "@/features/workspace";

import { ShieldAlert } from "lucide-react";

import { isRouteAuthorized, filterMenuByContext } from "../sidebar/menuUtils";
import type { MenuSection as SidebarMenuSection } from "../sidebar/types";
import type { MenuSection } from "../menus/adminSidebarMenus";
import { resolveAdminMenu } from "../menus/resolveAdminMenu";

export interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  isDev?: boolean;
  isMevi?: boolean;
  isRice?: boolean;
  isEcoSystemAdmin?: boolean;
  isFactory?: boolean;
  isOwnerFactory?: boolean;
  /** Menu sidebar tùy chỉnh — ưu tiên hơn isDev/isMevi/isRice/isEcoSystemAdmin/isFactory */
  menu?: MenuSection[];
  brandIcon?: ElementType;
  brandTitle?: ReactNode;
  brandSubtitle?: ReactNode;
}

export function AdminLayout(props: AdminLayoutProps) {
  return (
    <WorkspaceProvider>
      <AdminLayoutContent {...props} />
    </WorkspaceProvider>
  );
}

function AdminLayoutContent({
  children,
  title,
  description,
  actions,
  isDev = false,
  isMevi = false,
  isRice = false,
  isEcoSystemAdmin = false,
  isFactory = false,
  isOwnerFactory = false,
  menu,
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

  const [location] = useLocation();
  const { user, isLoading } = useAuth();
  const { workspaces, isLoading: isWorkspaceLoading } = useWorkspace();
  const needsWorkspace = !isEcoSystemAdmin;

  const userContext = useMemo(
    () => ({
      roles: (user?.roles ??
        (user?.role ? [user.role].flat() : [])) as string[],
      isFirstOnboard: !!(user as Record<string, unknown>)?.isFirstOnboard,
    }),
    [user],
  );

  const masterMenu = useMemo(
    () =>
      resolveAdminMenu({
        menu,
        isDev,
        isMevi,
        isRice,
        isEcoSystemAdmin,
        isFactory,
        isOwnerFactory,
      }),
    [menu, isDev, isMevi, isRice, isEcoSystemAdmin, isFactory, isOwnerFactory],
  );

  const isAuthorized = useMemo(() => {
    const master = masterMenu as unknown as SidebarMenuSection[];
    return isRouteAuthorized(
      location,
      userContext,
      master,
      filterMenuByContext(master, userContext),
    );
  }, [location, userContext, masterMenu]);

  const renderContent = () => {
    if (isLoading)
      return <LoadingState message="Đang kiểm tra quyền truy cập..." />;
    if (needsWorkspace && isWorkspaceLoading)
      return (
        <LoadingState message="Đang tải danh sách không gian làm việc..." />
      );
    if (needsWorkspace && workspaces.length === 0)
      return (
        <LoadingState message="Hệ thống đang khởi tạo không gian làm việc, vui lòng đợi trong giây lát..." />
      );
    if (!isAuthorized) return <UnauthorizedState />;

    return (
      <main className="p-6 flex-1">
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
    );
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
        menu={masterMenu}
        brandIcon={brandIcon}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
      />
      <div
        className={cn(
          "transition-all duration-300 min-h-screen flex flex-col",
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64",
        )}
      >
        <AdminHeader
          isEcoSystemAdmin={isEcoSystemAdmin}
          onToggleSidebar={
            isMobile ? () => setMobileSidebarOpen(true) : undefined
          }
        />
        {renderContent()}
      </div>
    </div>
  );
}

function LoadingState({ message }: { message: string }) {
  return (
    <main className="p-6 flex-1 flex items-center justify-center bg-slate-50/30 dark:bg-slate-900/30">
      <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-md p-6">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-semibold animate-pulse">
          {message}
        </p>
      </div>
    </main>
  );
}

function UnauthorizedState() {
  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-md w-full text-center p-8 rounded-2xl border border-border bg-card/60 backdrop-blur-xl shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Không có quyền truy cập
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Tài khoản của bạn không được phân quyền để truy cập trang này. Vui
            lòng liên hệ quản trị viên hoặc quay lại trang chủ.
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              window.open(
                "https://mevi-center.otechz.com/dashboard",
                "_blank",
                "noopener,noreferrer",
              );
            }}
            className="w-full py-2.5 px-4 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            Quay lại Trang chủ
          </button>
        </div>
      </div>
    </main>
  );
}
