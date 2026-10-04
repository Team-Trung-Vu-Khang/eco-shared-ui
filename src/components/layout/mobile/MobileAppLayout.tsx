import type { ElementType, ReactNode } from "react";
import { Sprout } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { WorkspaceProvider, useWorkspace } from "@/features/workspace";
import type { WorkspaceFeature } from "@/features/workspace/types/workspace.type";
import {
  MOBILE_NAV_ITEMS,
  isNavItemActive,
  type MobileNavItem,
} from "./mobileNav";

export interface MobileAppLayoutProps {
  children: ReactNode;
  /** Mặc định dùng MOBILE_NAV_ITEMS */
  navItems?: MobileNavItem[];
  brandIcon?: ElementType;
  brandTitle?: ReactNode;
  /** Mặc định hiển thị tên đơn vị (workspace) đang chọn */
  brandSubtitle?: ReactNode;
  /** Nội dung bên phải header (vd: chuông thông báo) */
  headerActions?: ReactNode;
  /** Lọc workspace theo feature (vd: "factory") */
  workspaceFeature?: WorkspaceFeature;
}

/** Giao diện mobile: header gọn + bottom navigation, thay cho sidebar */
export function MobileAppLayout(props: MobileAppLayoutProps) {
  return (
    <WorkspaceProvider feature={props.workspaceFeature}>
      <MobileAppLayoutContent {...props} />
    </WorkspaceProvider>
  );
}

function MobileAppLayoutContent({
  children,
  navItems = MOBILE_NAV_ITEMS,
  brandIcon: BrandIcon = Sprout,
  brandTitle = "Eco Farm",
  brandSubtitle,
  headerActions,
}: MobileAppLayoutProps) {
  const [location] = useLocation();
  const { currentWorkspace, feature } = useWorkspace();

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BrandIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-tight text-slate-900">
            {brandTitle}
          </p>
          <p className="truncate text-xs text-slate-500">
            {brandSubtitle ??
              (currentWorkspace?.organizationName &&
                `${feature === "factory" ? "Nhà máy" : "Nông hộ"} ${currentWorkspace.organizationName}`) ??
              "Đang tải đơn vị..."}
          </p>
        </div>
        {headerActions}
      </header>

      {/* Chừa chỗ cho thanh điều hướng + vùng an toàn (thanh home iOS) */}
      <main className="min-w-0 px-4 pt-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        {children}
      </main>

      <nav
        aria-label="Điều hướng chính"
        className="fixed inset-x-0 bottom-0 z-40 rounded-t-3xl bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,23,42,0.08)]"
      >
        <ul
          className="grid h-[4.5rem] items-stretch px-2"
          style={{
            gridTemplateColumns: `repeat(${Math.max(navItems.length, 1)}, minmax(0, 1fr))`,
          }}
        >
          {navItems.map((item) => {
            const isActive = isNavItemActive(item, location);
            const Icon = item.icon;

            return (
              <li key={item.href} className="flex">
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex w-full flex-col items-center justify-center gap-1 transition-colors active:scale-95",
                    isActive ? "text-primary" : "text-slate-500",
                  )}
                >
                  <Icon
                    className="h-6 w-6"
                    strokeWidth={isActive ? 2.4 : 1.6}
                    fill={isActive ? "currentColor" : "none"}
                    fillOpacity={isActive ? 0.15 : 0}
                  />
                  <span
                    className={cn(
                      "line-clamp-1 max-w-full px-0.5 text-center text-[11px] leading-tight",
                      isActive ? "font-bold" : "font-medium",
                    )}
                  >
                    {item.label}
                  </span>
                  {/* Gạch chân dưới tab đang chọn */}
                  <span
                    className={cn(
                      "absolute bottom-1.5 h-[3px] rounded-full bg-primary transition-all duration-300",
                      isActive ? "w-8 opacity-100" : "w-0 opacity-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
