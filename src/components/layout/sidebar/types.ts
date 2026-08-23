import type { ElementType } from "react";

export const SUPER_ADMIN_ROLE = "MEVI_SUPER_ADMIN";
export const REQUIRE_FIRST_ONBOARD_COND = "REQUIRE_FIRST_ONBOARD";

export type FarmRole =
  | "MEVI_ADMIN"
  | "MEVI_SUPER_ADMIN"
  | "MEVI_FARM_ADMIN"
  | "MEVI_FARM_MEMBER";

export type MenuCondition = "REQUIRE_FIRST_ONBOARD";

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
