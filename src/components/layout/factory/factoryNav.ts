import {
  Award,
  Building2,
  ClipboardList,
  Factory,
  LayoutDashboard,
  ListChecks,
  Package,
  Search,
  Sparkles,
  Warehouse,
} from "lucide-react";
import type { MenuSection } from "../menus/adminSidebarMenus";
import type { MobileNavItem } from "../mobile/mobileNav";

export const FACTORY_BASE_PATH = "/factory";

export const FACTORY_ROUTES = {
  dashboard: FACTORY_BASE_PATH,
  profile: `${FACTORY_BASE_PATH}/profile`,
  warehouse: `${FACTORY_BASE_PATH}/warehouse`,
  certificates: `${FACTORY_BASE_PATH}/certificates`,
  products: `${FACTORY_BASE_PATH}/products`,
  demandTypes: `${FACTORY_BASE_PATH}/demand-types`,
  demands: `${FACTORY_BASE_PATH}/demands`,
  /** Hệ thống gợi ý nhà máy phù hợp với nhu cầu */
  demandSuggestions: `${FACTORY_BASE_PATH}/demands/suggestions`,
  /** Nhà máy tự tìm nhu cầu phù hợp */
  demandMatching: `${FACTORY_BASE_PATH}/demands/matching`,
} as const;

/** Menu sidebar cho nhà máy sản xuất */
export const FACTORY_MENU_GROUPS: MenuSection[] = [
  {
    title: "Tổng quan",
    items: [
      {
        id: "factory-dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: FACTORY_ROUTES.dashboard,
      },
    ],
  },
  {
    title: "Nhà máy",
    items: [
      {
        id: "factory-profile",
        label: "Hồ sơ nhà máy",
        icon: Factory,
        href: FACTORY_ROUTES.profile,
      },
      {
        id: "factory-warehouse",
        label: "Quản lý kho",
        icon: Warehouse,
        href: FACTORY_ROUTES.warehouse,
      },
      {
        id: "factory-certificates",
        label: "Chứng nhận sản xuất",
        icon: Award,
        href: FACTORY_ROUTES.certificates,
      },
      {
        id: "factory-products",
        label: "Sản phẩm chế biến",
        icon: Package,
        href: FACTORY_ROUTES.products,
      },
    ],
  },
  {
    title: "Nhu cầu",
    items: [
      {
        id: "factory-demand-types",
        label: "Loại nhu cầu",
        icon: ListChecks,
        href: FACTORY_ROUTES.demandTypes,
      },
      {
        id: "factory-demands",
        label: "Thông tin nhu cầu",
        icon: ClipboardList,
        href: FACTORY_ROUTES.demands,
        children: [
          {
            id: "factory-demand-list",
            label: "Danh sách nhu cầu",
            href: FACTORY_ROUTES.demands,
          },
          {
            id: "factory-demand-suggestions",
            label: "Gợi ý nhà máy phù hợp",
            href: FACTORY_ROUTES.demandSuggestions,
          },
          {
            id: "factory-demand-matching",
            label: "Tìm nhu cầu phù hợp",
            href: FACTORY_ROUTES.demandMatching,
          },
        ],
      },
    ],
  },
];

/** Bottom navigation cho nhà máy trên mobile */
export const FACTORY_MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    label: "Tổng quan",
    href: FACTORY_ROUTES.dashboard,
    icon: LayoutDashboard,
    // Chỉ khớp chính xác, tránh active cho mọi trang /factory/*
    matchPrefixes: [],
  },
  {
    label: "Kho",
    href: FACTORY_ROUTES.warehouse,
    icon: Warehouse,
    matchPrefixes: [FACTORY_ROUTES.warehouse],
  },
  {
    label: "Tìm nhu cầu",
    href: FACTORY_ROUTES.demandMatching,
    icon: Search,
    matchPrefixes: [FACTORY_ROUTES.demandMatching],
    isPrimary: true,
  },
  {
    label: "Nhu cầu",
    href: FACTORY_ROUTES.demands,
    icon: Sparkles,
    matchPrefixes: [FACTORY_ROUTES.demands, FACTORY_ROUTES.demandTypes],
  },
  {
    label: "Hồ sơ",
    href: FACTORY_ROUTES.profile,
    icon: Building2,
    matchPrefixes: [
      FACTORY_ROUTES.profile,
      FACTORY_ROUTES.certificates,
      FACTORY_ROUTES.products,
    ],
  },
];
