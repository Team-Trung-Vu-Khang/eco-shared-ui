import {
  menuDevGroups,
  menuEcoSystemAdminGroups,
  menuMeviDevGroups,
  menuProdGroups,
  menuProdRiceGroups,
  type MenuSection,
} from "./adminSidebarMenus";
import { menuShopAdminGroups } from "../shop/shopNav";
import { FACTORY_MENU_GROUPS, FACTORY_OWNER_MENU_GROUPS } from "../factory/factoryNav";

export interface AdminMenuOptions {
  /** Menu tùy chỉnh — ưu tiên hơn các cờ bên dưới */
  menu?: MenuSection[];
  isDev?: boolean;
  isMevi?: boolean;
  isRice?: boolean;
  isEcoSystemAdmin?: boolean;
  isFactory?: boolean;
  /** Tài khoản chủ nhà máy — menu rút gọn */
  isOwnerFactory?: boolean;
  /** Quản trị cửa hàng */
  isShop?: boolean;
}

export function resolveAdminMenu({
  menu,
  isDev,
  isMevi,
  isRice,
  isEcoSystemAdmin,
  isFactory,
  isOwnerFactory,
  isShop,
}: AdminMenuOptions): MenuSection[] {
  if (menu) return menu;
  if (isShop) return menuShopAdminGroups;
  if (isMevi) return menuMeviDevGroups;
  if (isDev) return menuDevGroups;
  if (isRice) return menuProdRiceGroups;
  if (isEcoSystemAdmin) return menuEcoSystemAdminGroups;
  if (isOwnerFactory) return FACTORY_OWNER_MENU_GROUPS;
  if (isFactory) return FACTORY_MENU_GROUPS;
  return menuProdGroups;
}
