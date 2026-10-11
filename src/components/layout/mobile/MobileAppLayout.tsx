import type { ElementType, ReactNode } from "react";
import { Sprout } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { WorkspaceProvider, useWorkspace } from "@/features/workspace";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { WorkspaceFeature } from "@/features/workspace/types/workspace.type";
import {
  MOBILE_HOME_PATH,
  MOBILE_NAV_ITEMS,
  isNavItemActive,
  type MobileNavItem,
} from "./mobileNav";
import { ModuleSwitcher, type ModuleSwitcherProps } from "../ModuleSwitcher";

export interface MobileAppLayoutProps {
  children: ReactNode;
  /** Mặc định dùng MOBILE_NAV_ITEMS */
  navItems?: MobileNavItem[];
  brandIcon?: ElementType;
  brandTitle?: ReactNode;
  /** Mặc định: admin hiện "Admin (SĐT)" + workspace; tk thường chỉ workspace */
  brandSubtitle?: ReactNode;
  /** Nội dung bên phải header (vd: chuông thông báo) */
  headerActions?: ReactNode;
  /** Lọc workspace theo feature (vd: "factory") */
  workspaceFeature?: WorkspaceFeature;
  /** Truyền để hiện nút chuyển phân hệ trên header */
  moduleSwitcher?: ModuleSwitcherProps;
  /** Danh sách route ẩn header (vd: ["/home", "/"]). Mặc định ẩn trên trang chủ mobile */
  ignoredHeaderRoutes?: string[];
  /** Tuỳ chọn ẩn hoàn toàn header */
  hideHeader?: boolean;
  /** Hàm điều kiện kiểm tra ẩn header theo pathname */
  shouldHideHeader?: (location: string) => boolean;
  /** Tuỳ chỉnh className cho thẻ main */
  mainClassName?: string;
}

/** Giao diện mobile: header gọn + bottom navigation, thay cho sidebar */
export function MobileAppLayout(props: MobileAppLayoutProps) {
  return (
    <WorkspaceProvider feature={props.workspaceFeature}>
      <MobileAppLayoutContent {...props} />
    </WorkspaceProvider>
  );
}

/** Role được xem là admin (đang làm việc trên workspace của người khác) */
const ADMIN_ROLES = [
  "MEVI_SUPER_ADMIN",
  "MEVI_ADMIN",
  "MEVI_FARM_ADMIN",
  "MEVI_FACTORY_ADMIN",
];

const DEFAULT_IGNORED_HEADER_ROUTES = [MOBILE_HOME_PATH, "/"];

function MobileAppLayoutContent({
  children,
  navItems = MOBILE_NAV_ITEMS,
  brandIcon: BrandIcon = Sprout,
  brandTitle = "Eco Farm",
  brandSubtitle,
  headerActions,
  moduleSwitcher,
  ignoredHeaderRoutes = DEFAULT_IGNORED_HEADER_ROUTES,
  hideHeader = false,
  shouldHideHeader,
  mainClassName,
}: MobileAppLayoutProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  const { currentWorkspace, feature } = useWorkspace();

  const isHeaderIgnored =
    hideHeader ||
    shouldHideHeader?.(location) ||
    Boolean(
      ignoredHeaderRoutes?.some((route) => {
        if (route === "/" || route === "") {
          return location === "/" || location === "";
        }
        return location === route || location.startsWith(`${route}/`);
      }),
    );

  const roles = (user?.roles ??
    (user?.role ? [user.role].flat() : [])) as string[];
  const isAdmin = roles.some((role) => ADMIN_ROLES.includes(role));

  const adminLabel = isAdmin ? "Admin" : null;
  const facilityName =
    feature === "factory"
      ? currentWorkspace?.factoryDisplayName?.trim()
      : currentWorkspace?.farmDisplayName?.trim();

  const ownerName =
    currentWorkspace?.ownerName ||
    currentWorkspace?.representativeName ||
    currentWorkspace?.organizationName ||
    (isAdmin ? undefined : user?.name);

  // Hiển thị tên Farm/Factory; fallback tên chủ workspace hoặc tên tài khoản (bỏ số điện thoại)
  const workspaceLabel =
    facilityName?.trim() ||
    ownerName?.trim() ||
    user?.name?.trim() ||
    "Nông trại";

  return (
    <div className="min-h-dvh bg-slate-50">
      {!isHeaderIgnored && (
        <header className="sticky top-0 z-40 flex min-h-14 items-center py-1.5 gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BrandIcon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-tight text-slate-900">
              {brandTitle}
            </p>
            {brandSubtitle ? (
              <p className="truncate text-xs text-slate-500">{brandSubtitle}</p>
            ) : (
              <>
                {adminLabel && (
                  <p className="truncate text-xs font-medium text-primary">
                    {adminLabel}
                  </p>
                )}
                <p className="truncate text-xs text-slate-500">
                  {workspaceLabel}
                </p>
              </>
            )}
          </div>
          {headerActions}
          {moduleSwitcher && <ModuleSwitcher {...moduleSwitcher} />}
        </header>
      )}

      {/* Chừa chỗ cho thanh điều hướng + vùng an toàn (thanh home iOS) */}
      <main
        className={cn(
          "min-w-0 pb-[calc(5.5rem+env(safe-area-inset-bottom))]",
          isHeaderIgnored ? "pt-0 px-0" : "px-4 pt-4",
          mainClassName,
        )}
      >
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

            if (item.isPrimary) {
              return (
                <li
                  key={item.href}
                  className="flex items-center justify-center"
                >
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                    className="relative -top-3 flex flex-col items-center justify-center gap-1 group active:scale-90 transition-transform"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/35 ring-4 ring-white transition-all group-active:scale-95">
                      <Icon className="h-6 w-6 stroke-[2.5]" />
                    </div>
                    <span
                      className={cn(
                        "line-clamp-1 max-w-full px-0.5 text-center text-[10px] leading-tight",
                        isActive
                          ? "text-primary font-bold"
                          : "text-slate-600 font-medium",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            }

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
