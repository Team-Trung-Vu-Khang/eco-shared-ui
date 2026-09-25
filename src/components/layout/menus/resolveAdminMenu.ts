import {
  menuDevGroups,
  menuEcoSystemAdminGroups,
  menuMeviDevGroups,
  menuProdGroups,
  menuProdRiceGroups,
  type MenuSection,
} from "./adminSidebarMenus";

export interface AdminMenuOptions {
  /** Menu tùy chỉnh — ưu tiên hơn các cờ bên dưới */
  menu?: MenuSection[];
  isDev?: boolean;
  isMevi?: boolean;
  isRice?: boolean;
  isEcoSystemAdmin?: boolean;
}

export function resolveAdminMenu({
  menu,
  isDev,
  isMevi,
  isRice,
  isEcoSystemAdmin,
}: AdminMenuOptions): MenuSection[] {
  if (menu) return menu;
  if (isMevi) return menuMeviDevGroups;
  if (isDev) return menuDevGroups;
  if (isRice) return menuProdRiceGroups;
  if (isEcoSystemAdmin) return menuEcoSystemAdminGroups;
  return menuProdGroups;
}
