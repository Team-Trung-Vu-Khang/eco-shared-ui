import {
  Award,
  Building2,
  CalendarClock,
  ClipboardList,
  Cog,
  Factory,
  Handshake,
  History,
  Home,
  Layers,
  LayoutDashboard,
  ListChecks,
  Package,
  Search,
  Sparkles,
  UserRound,
  Warehouse,
  Wrench,
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
  /** Nhóm nông sản/sản phẩm đang chế biến */
  productGroups: `${FACTORY_BASE_PATH}/product-groups`,
  /** Dịch vụ chế biến tại nhà máy */
  processingServices: `${FACTORY_BASE_PATH}/processing-services`,
  /** Máy & Dây chuyền */
  machines: `${FACTORY_BASE_PATH}/machines`,
  /** Lịch nhận chế biến (đăng tin) */
  processingSchedules: `${FACTORY_BASE_PATH}/processing-schedules`,
  /** Lịch sử đăng tin nhận chế biến */
  processingScheduleHistory: `${FACTORY_BASE_PATH}/processing-schedules/history`,
  /** Kết nối nhà máy - tìm kiếm nhà máy */
  connectionSearch: `${FACTORY_BASE_PATH}/connections/search`,
  /** Kết nối nhà máy - lịch sử kết nối */
  connectionHistory: `${FACTORY_BASE_PATH}/connections/history`,
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
      {
        id: "factory-product-groups",
        label: "Nhóm nông sản/sản phẩm đang chế biến",
        icon: Layers,
        href: FACTORY_ROUTES.productGroups,
      },
      {
        id: "factory-processing-services",
        label: "Dịch vụ chế biến tại nhà máy",
        icon: Wrench,
        href: FACTORY_ROUTES.processingServices,
      },
      {
        id: "factory-machines",
        label: "Máy & Dây chuyền",
        icon: Cog,
        href: FACTORY_ROUTES.machines,
      },
      {
        id: "factory-processing-schedules",
        label: "Lịch nhận chế biến",
        icon: CalendarClock,
        href: FACTORY_ROUTES.processingSchedules,
        children: [
          {
            id: "factory-processing-schedule-list",
            label: "Đăng tin",
            href: FACTORY_ROUTES.processingSchedules,
          },
          {
            id: "factory-processing-schedule-history",
            label: "Lịch sử đăng tin",
            href: FACTORY_ROUTES.processingScheduleHistory,
          },
        ],
      },
    ],
  },
  {
    title: "Kết nối nhà máy",
    items: [
      {
        id: "factory-connections",
        label: "Kết nối nhà máy",
        icon: Handshake,
        href: FACTORY_ROUTES.connectionSearch,
        children: [
          {
            id: "factory-connection-search",
            label: "Tìm kiếm nhà máy",
            href: FACTORY_ROUTES.connectionSearch,
          },
          {
            id: "factory-connection-history",
            label: "Lịch sử kết nối",
            href: FACTORY_ROUTES.connectionHistory,
          },
        ],
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

/** Bottom navigation cho nông hộ khi chuyển sang factory trên mobile */
export const FACTORY_FARMER_MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    label: "Trang chủ",
    href: FACTORY_ROUTES.dashboard,
    icon: Home,
    matchPrefixes: [],
  },
  {
    label: "Tìm kiếm",
    href: FACTORY_ROUTES.connectionSearch,
    icon: Search,
    matchPrefixes: [FACTORY_ROUTES.connectionSearch],
    isPrimary: true,
  },
  {
    label: "Lịch sử",
    href: FACTORY_ROUTES.connectionHistory,
    icon: History,
    matchPrefixes: [FACTORY_ROUTES.connectionHistory],
  },
  {
    label: "Profile",
    href: FACTORY_ROUTES.profile,
    icon: UserRound,
    matchPrefixes: [FACTORY_ROUTES.profile],
  },
];
