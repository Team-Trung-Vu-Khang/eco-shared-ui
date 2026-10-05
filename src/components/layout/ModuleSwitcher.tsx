import * as React from "react";
import {
  BookOpen,
  Check,
  Factory,
  LayoutGrid,
  ShoppingBag,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { FarmRole } from "./sidebar/types";

/** Các role có quyền trong phân hệ trang trại */
const FARM_ROLES: FarmRole[] = [
  "MEVI_SUPER_ADMIN",
  "MEVI_ADMIN",
  "MEVI_FARM_ADMIN",
  "MEVI_FARM_MEMBER",
];

export type EcoModuleKey = "learning" | "farm" | "factory" | "store";

export interface EcoModule {
  key: EcoModuleKey | (string & {});
  title: string;
  description: string;
  icon: LucideIcon;
  /** Class màu cho ô icon */
  iconClassName: string;
  /** URL phân hệ; không có => đang phát triển */
  href?: string;
  /** Chỉ hiện khi user có 1 trong các role này; bỏ trống => ai cũng thấy */
  roles?: string[];
}

/** Danh sách phân hệ MEVI mặc định — truyền `modules` để ghi đè URL */
export const ECO_MODULES: EcoModule[] = [
  {
    key: "learning",
    title: "Trung tâm học tập",
    description: "Đào tạo & hướng dẫn kỹ thuật",
    icon: BookOpen,
    iconClassName: "bg-blue-100 text-blue-600",
    href: "https://mevi-edu.otechz.com/",
  },
  {
    key: "farm",
    title: "Trang trại",
    description: "Quản lý nông trại & canh tác",
    icon: Sprout,
    iconClassName: "bg-emerald-100 text-emerald-600",
    href: "https://mevi-farm.otechz.com/",
    roles: FARM_ROLES,
  },
  {
    key: "factory",
    title: "Nhà máy / Cơ sở chế biến",
    description: "Quản lý nhà máy & chế biến",
    icon: Factory,
    iconClassName: "bg-orange-100 text-orange-600",
    href: "https://mevi-factory.otechz.com/factory/login",
  },
  {
    key: "store",
    title: "Trạm xanh",
    description: "Cửa hàng & phân phối",
    icon: ShoppingBag,
    iconClassName: "bg-violet-100 text-violet-600",
  },
];

export interface ModuleSwitcherProps {
  /** Phân hệ đang dùng */
  currentModule?: EcoModule["key"];
  modules?: EcoModule[];
  /** Mặc định mở link trong tab hiện tại */
  onSelect?: (module: EcoModule) => void;
  className?: string;
}

/** Nút chuyển phân hệ (app launcher) — popover trên desktop, drawer trên mobile */
export function ModuleSwitcher({
  currentModule,
  modules = ECO_MODULES,
  onSelect,
  className,
}: ModuleSwitcherProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  const visibleModules = React.useMemo(() => {
    const userRoles = (user?.roles ??
      (user?.role ? [user.role].flat() : [])) as string[];
    return modules.filter(
      (module) =>
        !module.roles?.length ||
        module.roles.some((role) => userRoles.includes(role)),
    );
  }, [modules, user]);

  const handleSelect = (module: EcoModule) => {
    if (!module.href || module.key === currentModule) {
      setOpen(false);
      return;
    }
    setOpen(false);
    if (onSelect) {
      onSelect(module);
    } else {
      window.location.assign(module.href);
    }
  };

  const trigger = (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("shrink-0 rounded-full", className)}
      aria-label="Chuyển phân hệ"
      data-testid="module-switcher"
    >
      <LayoutGrid className="h-5 w-5" />
    </Button>
  );

  const grid = (
    <div className="grid grid-cols-2 gap-2">
      {visibleModules.map((module) => {
        const Icon = module.icon;
        const isActive = module.key === currentModule;
        const isDisabled = !module.href && !isActive;

        return (
          <button
            key={module.key}
            type="button"
            disabled={isDisabled}
            onClick={() => handleSelect(module)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "relative flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-colors",
              isActive
                ? "border-primary/40 bg-primary/5"
                : "border-transparent hover:bg-muted/70",
              isDisabled && "cursor-not-allowed opacity-60 hover:bg-transparent",
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                module.iconClassName,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">
                {module.title}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                {module.description}
              </p>
            </div>
            {isActive ? (
              <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3 w-3" />
              </span>
            ) : (
              isDisabled && (
                <span className="absolute right-2 top-2 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  Sắp ra mắt
                </span>
              )
            )}
          </button>
        );
      })}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Phân hệ MEVI</DrawerTitle>
            <DrawerDescription>Chọn phân hệ bạn muốn sử dụng</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            {grid}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-[22rem] rounded-2xl p-3">
        <p className="px-1 pb-2 text-sm font-semibold">Phân hệ MEVI</p>
        {grid}
      </PopoverContent>
    </Popover>
  );
}
