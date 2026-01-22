import { useState } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Mountain,
  Layers,
  Leaf,
  Award,
  Building2,
  GitBranch,
  Landmark,
  Users,
  Building,
  MapPin,
  UsersRound,
  Map,
  TreePine,
  Sprout,
  Flower2,
  CalendarDays,
  Bug,
  FlaskConical,
  Package,
  Wrench,
  FileText,
  Scale,
  ClipboardList,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Menu,
  X,
  Settings,
  LogOut,
  Tractor,
  Heart,
  Trees,
  BookOpenText,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { id: string; label: string; href: string }[];
}

const menuGroups: { title: string; items: MenuItem[] }[] = [
  {
    title: "Tổng quan",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    ],
  },
  {
    title: "Danh mục cơ bản",
    items: [
      {
        id: "terrain",
        label: "Quản lý địa hình",
        icon: Mountain,
        href: "/terrain",
      },
      { id: "land", label: "Quản lý đất", icon: Layers, href: "/land" },
      {
        id: "farming-method",
        label: "Phương thức canh tác",
        icon: Leaf,
        href: "/farming-method",
      },
      {
        id: "certificate",
        label: "Chứng nhận chứng chỉ",
        icon: Award,
        href: "/certificate",
      },
    ],
  },
  {
    title: "Tổ chức",
    items: [
      {
        id: "enterprise",
        label: "Doanh nghiệp / Nông hộ",
        icon: Building2,
        href: "/enterprise",
      },
      { id: "branch", label: "Chi nhánh", icon: GitBranch, href: "/branch" },
      {
        id: "bank",
        label: "Thông tin ngân hàng",
        icon: Landmark,
        href: "/bank",
      },
      {
        id: "contact",
        label: "Thông tin liên hệ",
        icon: Users,
        href: "/contact",
      },
    ],
  },
  {
    title: "Tổ chức & Nhân sự",
    items: [
      {
        id: "personnel",
        label: "Nhân sự",
        icon: Users,
        href: "/personnel",
      },
      {
        id: "department",
        label: "Phòng ban",
        icon: Building,
        href: "/department",
      },
      { id: "position", label: "Vị trí", icon: MapPin, href: "/position" },
      { id: "team", label: "Đội nhóm", icon: UsersRound, href: "/team" },
    ],
  },
  {
    title: "Vùng trồng",
    items: [
      {
        id: "region-chart",
        label: "Biểu đồ vùng",
        icon: Map,
        href: "/region-chart",
        children: [
          {
            id: "region-dist",
            label: "Phân bố vùng",
            href: "/region-distribution",
          },
          {
            id: "area-dist",
            label: "Phân bố khu vực",
            href: "/area-distribution",
          },
          {
            id: "plot-dist",
            label: "Phân bố lô",
            href: "/plot-distribution",
          },
          {
            id: "map-view",
            label: "Bản đồ",
            href: "/map-view",
          },
        ],
      },
      {
        id: "cultivation-zone",
        label: "Vùng canh tác",
        icon: TreePine,
        href: "/cultivation-zone",
        children: [
          {
            id: "cultivation-area",
            label: "Khu vực canh tác",
            href: "/cultivation-area",
          },
          {
            id: "dist-detail",
            label: "Chi tiết phân bổ",
            href: "/distribution-detail",
          },
          {
            id: "search-crop",
            label: "Tìm kiếm cây trồng",
            href: "/search-crop",
          },
          {
            id: "search-zone",
            label: "Tìm kiếm vùng trồng",
            href: "/search-zone",
          },
        ],
      },
    ],
  },
  {
    title: "Cây trồng",
    items: [
      { id: "crop", label: "Cây trồng", icon: Flower2, href: "/crop" },
      {
        id: "variety",
        label: "Giống cây trồng",
        icon: Sprout,
        href: "/variety",
      },
      {
        id: "group-crop",
        label: "Nhóm cây trồng",
        icon: Trees,
        href: "/group-crop",
      },
      { id: "seed", label: "Hạt giống", icon: Leaf, href: "/seed" },
      {
        id: "growth-cycle",
        label: "Chu kỳ sinh trưởng",
        icon: CalendarDays,
        href: "/growth-cycle",
      },
      { id: "season", label: "Mùa vụ", icon: CalendarDays, href: "/season" },
      {
        id: "treatment",
        label: "Phác đồ điều trị",
        icon: Heart,
        href: "/treatment",
      },
      {
        id: "docs",
        label: "Tài liệu kỹ thuật",
        icon: BookOpenText,
        href: "/docs",
      },
    ],
  },
  {
    title: "Vật tư",
    items: [
      { id: "pesticide", label: "Thuốc BVTV", icon: Bug, href: "/pesticide" },
      {
        id: "fertilizer",
        label: "Phân bón",
        icon: FlaskConical,
        href: "/fertilizer",
      },
      {
        id: "material",
        label: "Vật tư khác",
        icon: Package,
        href: "/material",
      },
      {
        id: "equipment",
        label: "Dụng cụ – Máy móc",
        icon: Wrench,
        href: "/equipment",
      },
      { id: "unit", label: "Đơn vị quy đổi", icon: Scale, href: "/unit" },
    ],
  },
  {
    title: "Quản lý hoạt động",
    items: [
      { id: "contract", label: "Hợp đồng", icon: FileText, href: "/contract" },
      {
        id: "plan",
        label: "Kế hoạch canh tác",
        icon: ClipboardList,
        href: "/plan",
      },
      { id: "task", label: "Công việc", icon: CheckSquare, href: "/task" },
    ],
  },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({
  collapsed = false,
  onToggle,
}: AdminSidebarProps) {
  const [location, setLocation] = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    menuGroups.map((g) => g.title),
  );

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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

  // Custom navigation handler to prevent auto-scroll
  const handleNavigate = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Store current scroll position
    const scrollY = window.scrollY;

    // Navigate without triggering scroll
    setLocation(href, { replace: false });

    // Restore scroll position after navigation
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
      data-testid="admin-sidebar"
    >
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Tractor className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-display font-bold text-lg leading-tight">
                FARM
              </h1>
              <p className="text-xs text-sidebar-foreground/60">Admin Portal</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={onToggle}
          data-testid="toggle-sidebar"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4 scrollbar-thin">
        <nav className="px-2 space-y-6">
          {menuGroups.map((group) => (
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
                    const isActive = location === item.href || isChildActive;

                    if (hasChildren) {
                      return (
                        <div key={item.id} className="space-y-1">
                          <button
                            onClick={() => {
                              if (collapsed && onToggle) onToggle();
                              toggleItem(item.id);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              isActive
                                ? "text-sidebar-primary font-semibold"
                                : "text-sidebar-foreground/80",
                              collapsed && "justify-center px-2",
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                              {!collapsed && <span>{item.label}</span>}
                            </div>
                            {!collapsed &&
                              (isExpanded ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              ))}
                          </button>
                          {!collapsed && isExpanded && (
                            <div className="ml-4 pl-3 border-l border-sidebar-border/50 space-y-1">
                              {item.children!.map((child) => {
                                const isItemActive = location === child.href;
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
                        </div>
                      );
                    }

                    return (
                      <a
                        key={item.id}
                        href={item.href || "#"}
                        onClick={
                          item.href ? handleNavigate(item.href) : undefined
                        }
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          collapsed && "justify-center px-2",
                        )}
                        data-testid={`menu-${item.id}`}
                      >
                        <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-3 space-y-1">
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
      </div>
    </aside>
  );
}
