import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import type { ElementType, MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  menuDevGroups,
  menuEcoSystemAdminGroups,
  menuProdGroups,
  menuProdRiceGroups,
  type MenuSection,
} from "./adminSidebarMenus";
import { AdminSidebarBrand } from "./AdminSidebarBrand";

export interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  isDev?: boolean;
  isRice?: boolean;
  isEcoSystemAdmin?: boolean;
  brandIcon?: ElementType;
  brandTitle?: ReactNode;
  brandSubtitle?: ReactNode;
}

export function AdminSidebar({
  collapsed = false,
  onToggle,
  isDev = false,
  isRice = false,
  isEcoSystemAdmin = false,
  brandIcon,
  brandTitle,
  brandSubtitle,
}: AdminSidebarProps) {
  const [location, setLocation] = useLocation();
  const menuGroups: MenuSection[] = isDev
    ? menuDevGroups
    : isRice
      ? menuProdRiceGroups
      : isEcoSystemAdmin
        ? menuEcoSystemAdminGroups
        : menuProdGroups;
  const defaultExpandedGroups = menuGroups
    .filter((group) => "title" in group)
    .map((group) => group.title);
  // State persistence keys
  const STORAGE_KEY_GROUPS = "sidebar_expanded_groups";
  const STORAGE_KEY_ITEMS = "sidebar_expanded_items";
  const STORAGE_KEY_SCROLL = "sidebar_scroll_position";

  // Initialize state from storage or defaults
  const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_GROUPS);
    return saved ? JSON.parse(saved) : defaultExpandedGroups;
  });

  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_ITEMS);
    return saved ? JSON.parse(saved) : [];
  });

  // Use a standard ref and useEffect for clearer cleanup logic

  // Use a standard ref and useEffect for clearer cleanup logic
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isMounting, setIsMounting] = useState(true);

  // Restore scroll position as early as possible
  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    const viewport = root.querySelector("[data-radix-scroll-area-viewport]");
    if (!viewport) return;

    const savedScroll = sessionStorage.getItem(STORAGE_KEY_SCROLL);
    if (savedScroll) {
      viewport.scrollTop = parseInt(savedScroll, 10);
    }

    const handleScroll = () => {
      sessionStorage.setItem(STORAGE_KEY_SCROLL, viewport.scrollTop.toString());
    };

    viewport.addEventListener("scroll", handleScroll);

    // Disable mounting flag after a brief moment
    const timer = setTimeout(() => setIsMounting(false), 50);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Persist state changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_GROUPS, JSON.stringify(expandedGroups));
  }, [expandedGroups]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(expandedItems));
  }, [expandedItems]);

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  // Custom navigation handler to prevent auto-scroll of the main window,
  // sidebar scroll is handled by the persistence logic above.
  const handleNavigate = (href: string) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Navigate
    setLocation(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground flex flex-col",
        !isMounting && "transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
      data-testid="admin-sidebar"
    >
      <div
        className={cn(
          "flex items-center h-16 border-b border-sidebar-border transition-all duration-300",
          collapsed ? "justify-center px-2" : "px-4",
        )}
      >
        {!collapsed && (
          <AdminSidebarBrand
            icon={brandIcon}
            title={brandTitle}
            subtitle={brandSubtitle}
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent transition-all",
            !collapsed && "ml-auto",
          )}
          onClick={onToggle}
          data-testid="toggle-sidebar"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4 scrollbar-thin" ref={viewportRef}>
        <TooltipProvider delayDuration={0}>
          <nav className="px-2 space-y-6">
            {menuGroups.map((group, index) => {
              if ("note" in group) {
                return collapsed ? null : (
                  <div
                    key={`${group.note}-${index}`}
                    className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/35"
                  >
                    ----- {group.note} -----
                  </div>
                );
              }

              return (
                <div key={group.title}>
                  {!collapsed && (
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50 hover:text-sidebar-foreground/80 transition-colors"
                      data-testid={`group-${group.title}`}
                    >
                      <span>{group.title}</span>
                      {expandedGroups.includes(group.title) ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                  {(collapsed || expandedGroups.includes(group.title)) && (
                    <div className="mt-1 space-y-0.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const hasChildren =
                          item.children && item.children.length > 0;
                        const isExpanded = expandedItems.includes(item.id);
                        // Check if any child is active
                        const isChildActive = item.children?.some(
                          (child) => location === child.href,
                        );
                        const isActive =
                          location === item.href || isChildActive;

                        if (hasChildren) {
                          const triggerContent = (
                            <div
                              className={cn(
                                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer select-none",
                                isActive
                                  ? "text-sidebar-primary font-semibold"
                                  : "text-sidebar-foreground/80",
                                collapsed && "justify-center px-2",
                              )}
                              onClick={() => {
                                if (!collapsed) toggleItem(item.id);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-4.5 h-4.5 shrink-0" />
                                {!collapsed && <span>{item.label}</span>}
                              </div>
                              {!collapsed &&
                                (isExpanded ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                ))}
                            </div>
                          );

                          return (
                            <div
                              key={item.id}
                              className="space-y-1 relative group/item"
                            >
                              {collapsed ? (
                                <HoverCard openDelay={100} closeDelay={100}>
                                  <HoverCardTrigger asChild>
                                    {triggerContent}
                                  </HoverCardTrigger>
                                  <HoverCardContent
                                    side="right"
                                    align="start"
                                    className="w-48 p-0 overflow-hidden"
                                  >
                                    <div className="px-3 py-2 bg-muted/50 text-xs font-bold text-muted-foreground uppercase border-b border-border">
                                      {item.label}
                                    </div>
                                    <div className="p-1">
                                      {item.children!.map((child) => {
                                        const isItemActive =
                                          location === child.href;
                                        return (
                                          <a
                                            key={child.id}
                                            href={child.href}
                                            onClick={handleNavigate(child.href)}
                                            className={cn(
                                              "block px-3 py-2 rounded-md text-sm transition-colors cursor-pointer",
                                              isItemActive
                                                ? "text-primary font-medium bg-primary/10"
                                                : "text-foreground/80 hover:text-foreground hover:bg-muted",
                                            )}
                                          >
                                            {child.label}
                                          </a>
                                        );
                                      })}
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              ) : (
                                <>
                                  {triggerContent}
                                  {isExpanded && (
                                    <div className="ml-4 pl-3 border-l border-sidebar-border/50 space-y-1 animation-slide-down">
                                      {item.children!.map((child) => {
                                        const isItemActive =
                                          location === child.href;
                                        return (
                                          <a
                                            key={child.id}
                                            href={child.href}
                                            onClick={handleNavigate(child.href)}
                                            className={cn(
                                              "block px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                                              isItemActive
                                                ? "text-sidebar-primary font-medium bg-sidebar-accent/50"
                                                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30",
                                            )}
                                          >
                                            {child.label}
                                          </a>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        }

                        const linkContent = (
                          <a
                            href={item.href || "#"}
                            onClick={
                              item.href ? handleNavigate(item.href) : undefined
                            }
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer relative group",
                              isActive
                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              collapsed && "justify-center px-2",
                            )}
                            data-testid={`menu-${item.id}`}
                          >
                            <Icon className="w-4.5 h-4.5 shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                          </a>
                        );

                        if (collapsed) {
                          return (
                            <Tooltip key={item.id}>
                              <TooltipTrigger asChild>
                                {linkContent}
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                {item.label}
                              </TooltipContent>
                            </Tooltip>
                          );
                        }

                        return <div key={item.id}>{linkContent}</div>;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </TooltipProvider>
      </ScrollArea>

      {/* <div className="border-t border-sidebar-border p-3 space-y-1">
        <TooltipProvider delayDuration={0}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/settings"
                  onClick={handleNavigate("/settings")}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent transition-all cursor-pointer",
                    collapsed && "justify-center px-2",
                  )}
                  data-testid="menu-settings"
                >
                  <Settings className="w-4.5 h-4.5" />
                  {!collapsed && <span>Cài đặt</span>}
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Cài đặt</TooltipContent>
            </Tooltip>
          ) : (
            <a
              href="/settings"
              onClick={handleNavigate("/settings")}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent transition-all cursor-pointer",
                collapsed && "justify-center px-2",
              )}
              data-testid="menu-settings"
            >
              <Settings className="w-4.5 h-4.5" />
              {!collapsed && <span>Cài đặt</span>}
            </a>
          )}

          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-all",
                    collapsed && "justify-center px-2",
                  )}
                  data-testid="menu-logout"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  {!collapsed && <span>Đăng xuất</span>}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Đăng xuất</TooltipContent>
            </Tooltip>
          ) : (
            <button
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-all",
                collapsed && "justify-center px-2",
              )}
              data-testid="menu-logout"
            >
              <LogOut className="w-4.5 h-4.5" />
              {!collapsed && <span>Đăng xuất</span>}
            </button>
          )}
        </TooltipProvider>
      </div> */}
    </aside>
  );
}
