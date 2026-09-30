import {
  Award,
  CalendarClock,
  ClipboardList,
  Cog,
  Factory,
  Handshake,
  History,
  Layers,
  LayoutDashboard,
  // ListChecks,
  // Package,
  Search,
  UserCog,
  UserRound,
  // Warehouse,
  Wrench,
} from "lucide-react";
import type { MenuSection } from "../menus/adminSidebarMenus";
import type { MobileNavItem } from "../mobile/mobileNav";
import {
  FACTORY_ADMIN_ROLES,
  FACTORY_MEMBER_ROLE,
  FACTORY_ROLES,
  HIDE_FOR_ADMIN_COND,
  SUPER_ADMIN_ROLE,
  type FarmRole,
  type MenuCondition,
} from "../sidebar/types";

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
  /** Quản lý tài khoản nhà máy (tạo/tạm dừng/xóa, gán cho nhà máy) */
  accounts: `${FACTORY_BASE_PATH}/accounts`,
  demandTypes: `${FACTORY_BASE_PATH}/demand-types`,
  demands: `${FACTORY_BASE_PATH}/demands`,
  /** Hệ thống gợi ý nhà máy phù hợp với nhu cầu */
  demandSuggestions: `${FACTORY_BASE_PATH}/demands/suggestions`,
  /** Nhà máy tự tìm nhu cầu phù hợp */
  demandMatching: `${FACTORY_BASE_PATH}/demands/matching`,
} as const;

const ADMIN = FACTORY_ADMIN_ROLES;
/** Chủ nhà máy (MEVI_FACTORY_MEMBER) */
const OWNER: FarmRole[] = [FACTORY_MEMBER_ROLE];
/** Member không có role nhà máy (super admin bypass vẫn thấy) */
const NO_FACTORY_ROLE: MenuCondition[] = ["NO_FACTORY_ROLE"];

/**
 * Menu sidebar cho nhà máy sản xuất — phân quyền:
 * - Admin (super admin / admin mevi / admin nhà máy): báo cáo tổng quan, hồ sơ,
 *   chứng nhận, quản lý tài khoản nhà máy, dữ liệu liên kết
 * - Chủ nhà máy (MEVI_FACTORY_MEMBER): hồ sơ, chứng nhận, máy & dây chuyền,
 *   lịch nhận chế biến
 * - Member khác (không có role nhà máy, vd nông dân): kết nối nhà máy
 */
export const FACTORY_MENU_GROUPS: MenuSection[] = [
  {
    title: "Tổng quan",
    roles: ADMIN,
    items: [
      {
        id: "factory-dashboard",
        label: "Báo cáo tổng quan",
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
        roles: FACTORY_ROLES,
      },
      // Tạm ẩn: Kho sẽ phân khu (vật tư / sản phẩm / thành phẩm) trong tương lai
      // {
      //   id: "factory-warehouse",
      //   label: "Quản lý kho",
      //   icon: Warehouse,
      //   href: FACTORY_ROUTES.warehouse,
      // },
      {
        id: "factory-certificates",
        label: "Chứng nhận sản xuất",
        icon: Award,
        href: FACTORY_ROUTES.certificates,
        roles: FACTORY_ROLES,
      },
      {
        id: "factory-accounts",
        label: "Quản lý tài khoản nhà máy",
        icon: UserCog,
        href: FACTORY_ROUTES.accounts,
        roles: ADMIN,
      },
      // {
      //   id: "factory-products",
      //   label: "Sản phẩm chế biến",
      //   icon: Package,
      //   href: FACTORY_ROUTES.products,
      // },
      {
        id: "factory-machines",
        label: "Máy & Dây chuyền",
        icon: Cog,
        href: FACTORY_ROUTES.machines,
        roles: OWNER,
      },
      {
        id: "factory-processing-schedules",
        label: "Lịch nhận chế biến",
        icon: CalendarClock,
        href: FACTORY_ROUTES.processingSchedules,
        roles: [...ADMIN, ...OWNER],
        children: [
          {
            id: "factory-processing-schedule-list",
            label: "Đăng tin",
            href: FACTORY_ROUTES.processingSchedules,
            roles: OWNER,
            conditions: [HIDE_FOR_ADMIN_COND],
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
    title: "Dữ liệu liên kết",
    roles: ADMIN,
    items: [
      {
        id: "factory-product-groups",
        label: "Nhóm nông sản/sản phẩm",
        icon: Layers,
        href: FACTORY_ROUTES.productGroups,
      },
      {
        id: "factory-processing-services",
        label: "Dịch vụ chế biến tại nhà máy",
        icon: Wrench,
        href: FACTORY_ROUTES.processingServices,
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
        conditions: NO_FACTORY_ROLE,
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
            conditions: [HIDE_FOR_ADMIN_COND],
          },
        ],
      },
    ],
  },
  {
    title: "Nhu cầu",
    roles: [SUPER_ADMIN_ROLE],
    items: [
      // {
      //   id: "factory-demand-types",
      //   label: "Loại nhu cầu",
      //   icon: ListChecks,
      //   href: FACTORY_ROUTES.demandTypes,
      // },
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

/** Menu sidebar cho tài khoản chủ nhà máy (isOwnerFactory) */
export const FACTORY_OWNER_MENU_GROUPS: MenuSection[] = [
  {
    title: "Nhà máy",
    items: [
      {
        id: "factory-owner-profile",
        label: "Thông tin nhà máy",
        icon: Factory,
        href: FACTORY_ROUTES.profile,
        children: [
          {
            id: "factory-owner-profile-info",
            label: "Hồ sơ nhà máy",
            href: FACTORY_ROUTES.profile,
          },
          {
            id: "factory-owner-certificates",
            label: "Chứng nhận",
            href: FACTORY_ROUTES.certificates,
          },
        ],
      },
      {
        id: "factory-owner-processing-schedules",
        label: "Đăng tin",
        icon: CalendarClock,
        href: FACTORY_ROUTES.processingSchedules,
      },
      {
        id: "factory-owner-connection-requests",
        label: "Nhu cầu kết nối",
        icon: Handshake,
        href: FACTORY_ROUTES.connectionHistory,
      },
    ],
  },
];

const MOBILE_ACCOUNT_ITEM: MobileNavItem = {
  label: "Tài khoản",
  href: "/profile",
  icon: UserRound,
  matchPrefixes: ["/profile"],
};

/** Bottom navigation mobile cho chủ nhà máy (MEVI_FACTORY_MEMBER) */
export const FACTORY_MEMBER_MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    label: "Chứng nhận",
    href: FACTORY_ROUTES.certificates,
    icon: Award,
    matchPrefixes: [FACTORY_ROUTES.certificates],
  },
  {
    label: "Máy móc",
    href: FACTORY_ROUTES.machines,
    icon: Cog,
    matchPrefixes: [FACTORY_ROUTES.machines],
  },
  {
    label: "Đăng tin",
    href: FACTORY_ROUTES.processingSchedules,
    icon: CalendarClock,
    // Không match theo prefix để tránh trùng với tab Lịch sử (/processing-schedules/history)
    matchPrefixes: [],
    isPrimary: true,
  },
  {
    label: "Lịch sử",
    href: FACTORY_ROUTES.processingScheduleHistory,
    icon: History,
    matchPrefixes: [FACTORY_ROUTES.processingScheduleHistory],
  },
  {
    label: "Hồ sơ",
    href: FACTORY_ROUTES.profile,
    icon: Factory,
    matchPrefixes: [FACTORY_ROUTES.profile],
  },
];

/** Bottom navigation mobile cho admin nhà máy */
export const FACTORY_ADMIN_MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    label: "Hồ sơ",
    href: FACTORY_ROUTES.profile,
    icon: Factory,
    matchPrefixes: [FACTORY_ROUTES.profile],
  },
  {
    label: "Chứng nhận",
    href: FACTORY_ROUTES.certificates,
    icon: Award,
    matchPrefixes: [FACTORY_ROUTES.certificates],
  },
  {
    label: "Tổng quan",
    href: FACTORY_ROUTES.dashboard,
    icon: LayoutDashboard,
    // Dashboard là "/factory" — chỉ match chính xác
    matchPrefixes: [],
    isPrimary: true,
  },
  {
    label: "Tài khoản nhà máy",
    href: FACTORY_ROUTES.accounts,
    icon: UserCog,
    matchPrefixes: [FACTORY_ROUTES.accounts],
  },
  MOBILE_ACCOUNT_ITEM,
];

/** Bottom navigation mobile cho member không có role nhà máy (kết nối) */
export const FACTORY_MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    label: "Tìm kiếm",
    href: FACTORY_ROUTES.connectionSearch,
    icon: Search,
    matchPrefixes: [FACTORY_ROUTES.connectionSearch],
  },
  {
    label: "Lịch sử",
    href: FACTORY_ROUTES.connectionHistory,
    icon: History,
    matchPrefixes: [FACTORY_ROUTES.connectionHistory],
  },
  MOBILE_ACCOUNT_ITEM,
];

export type FactoryAccessLevel = "admin" | "member" | "guest";

/** Xác định nhóm quyền nhà máy từ danh sách role của user */
export function getFactoryAccessLevel(
  roles: string[] = [],
): FactoryAccessLevel {
  if (FACTORY_ADMIN_ROLES.some((role) => roles.includes(role))) return "admin";
  if (roles.includes(FACTORY_MEMBER_ROLE)) return "member";
  return "guest";
}

/** Bottom nav mobile theo quyền */
export function getFactoryMobileNavItems(
  roles: string[] = [],
): MobileNavItem[] {
  const level = getFactoryAccessLevel(roles);
  if (level === "admin") return FACTORY_ADMIN_MOBILE_NAV_ITEMS;
  if (level === "member") return FACTORY_MEMBER_MOBILE_NAV_ITEMS;
  return FACTORY_MOBILE_NAV_ITEMS;
}
