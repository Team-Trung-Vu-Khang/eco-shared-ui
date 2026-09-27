import type { ElementType } from "react";

export const SUPER_ADMIN_ROLE = "MEVI_SUPER_ADMIN";
export const REQUIRE_FIRST_ONBOARD_COND = "REQUIRE_FIRST_ONBOARD";
/** User không có role nào trong nhà máy (FACTORY_ROLES) */
export const NO_FACTORY_ROLE_COND = "NO_FACTORY_ROLE";

export type FarmRole =
  // Quản trị toàn hệ thống
  | "MEVI_SUPER_ADMIN"
  | "MEVI_ADMIN"
  // Quản trị theo phân hệ
  | "MEVI_EDU_ADMIN"
  | "MEVI_FARM_ADMIN"
  | "MEVI_FACTORY_ADMIN"
  | "MEVI_SHOP_ADMIN"
  // Người dùng theo phân hệ
  | "MEVI_EDU_TRAINEES"
  | "MEVI_EDU_LECTURER"
  | "MEVI_FARM_MEMBER"
  | "MEVI_FACTORY_MEMBER"
  | "MEVI_SHOP_MEMBER";

/** Nhóm quản trị nhà máy: super admin, admin mevi, admin nhà máy */
export const FACTORY_ADMIN_ROLES: FarmRole[] = [
  "MEVI_SUPER_ADMIN",
  "MEVI_ADMIN",
  "MEVI_FACTORY_ADMIN",
];

/** Tài khoản nhà máy (chủ nhà máy) */
export const FACTORY_MEMBER_ROLE: FarmRole = "MEVI_FACTORY_MEMBER";

/** Các role có quyền trong phân hệ nhà máy */
export const FACTORY_ROLES: FarmRole[] = [
  ...FACTORY_ADMIN_ROLES,
  FACTORY_MEMBER_ROLE,
];

export type MenuCondition = "REQUIRE_FIRST_ONBOARD" | "NO_FACTORY_ROLE";

export interface UserContext {
  roles?: string[];
  isFirstOnboard?: boolean;
}

export interface BaseMenuItem {
  id: string;
  label: string;
  href?: string;
  roles?: FarmRole[];
  conditions?: MenuCondition[];
}

export type MenuChild = BaseMenuItem;

export interface MenuItem extends BaseMenuItem {
  icon?: string | ElementType;
  children?: MenuChild[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
  roles?: FarmRole[];
}
