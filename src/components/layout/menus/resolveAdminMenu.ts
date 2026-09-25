import {
  menuDevGroups,
  menuEcoSystemAdminGroups,
  menuMeviDevGroups,
  menuProdGroups,
  menuProdRiceGroups,
  type MenuSection,
} from "./adminSidebarMenus";
import { FACTORY_MENU_GROUPS } from "../factory/factoryNav";

export interface AdminMenuOptions {
  /** Menu tùy chỉnh — ưu tiên hơn các cờ bên dưới */
  menu?: MenuSection[];
  isDev?: boolean;
  isMevi?: boolean;
  isRice?: boolean;
  isEcoSystemAdmin?: boolean;
  isFactory?: boolean;
}

export function resolveAdminMenu({
  menu,
  isDev,
  isMevi,
  isRice,
  isEcoSystemAdmin,
  isFactory,
}: AdminMenuOptions): MenuSection[] {
  if (menu) return menu;
  if (isMevi) return menuMeviDevGroups;
  if (isDev) return menuDevGroups;
  if (isRice) return menuProdRiceGroups;
  if (isEcoSystemAdmin) return menuEcoSystemAdminGroups;
  if (isFactory) return FACTORY_MENU_GROUPS;
  return menuProdGroups;
}
