import type { ElementType, ReactNode } from "react";
import { Sprout } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { WorkspaceProvider, useWorkspace } from "@/features/workspace";
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
}

/** Giao diện mobile: header gọn + bottom navigation, thay cho sidebar */
export function MobileAppLayout(props: MobileAppLayoutProps) {
  return (
    <WorkspaceProvider>
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
}: MobileAppLayoutProps) {
  const [location] = useLocation();
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BrandIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold leading-tight text-slate-900">
            {brandTitle}
          </p>
          <p className="truncate text-xs text-slate-500">
            {brandSubtitle ??
              currentWorkspace?.organizationName ??
              "Đang tải đơn vị..."}
          </p>
        </div>
      </header>

      {/* Chừa chỗ cho bottom nav + vùng an toàn (tai thỏ / thanh home iOS) */}
      <main className="min-w-0 px-4 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom))]">
        {children}
      </main>

      <nav
        aria-label="Điều hướng chính"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]"
      >
        <ul
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${Math.max(navItems.length, 1)}, minmax(0, 1fr))`,
          }}
        >
          {navItems.map((item) => {
            const isActive = isNavItemActive(item, location);
            const Icon = item.icon;
            if (item.isPrimary) {
              return (
                <li key={item.href} className="flex justify-center">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className="flex h-16 flex-col items-center justify-end gap-1 pb-1.5 text-[11px] font-medium"
                  >
                    <span
                      className={cn(
                        "-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-white transition-transform active:scale-95",
                        isActive && "ring-primary/20",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span
                      className={cn(
                        "max-w-full truncate px-1",
                        isActive ? "text-primary" : "text-slate-600",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-slate-500 active:text-slate-700",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                      isActive && "bg-primary/10",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="max-w-full truncate px-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
