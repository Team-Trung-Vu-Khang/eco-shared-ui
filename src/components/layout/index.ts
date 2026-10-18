// Admin (desktop) layouts
export * from "./admin/AdminHeader";
export * from "./admin/AdminLayout";
export * from "./admin/AdminSidebarBrand";
export * from "./admin/AdminSidebar";
export * from "./admin/AdminTestSidebar";
export * from "./admin/AdminTestLayout";

// Chuyển phân hệ
export * from "./ModuleSwitcher";

// Mobile layouts
export * from "./mobile/MobileAppLayout";
export * from "./mobile/mobileNav";
export * from "./mobile/mobileNavContext";

// Factory (nhà máy sản xuất)
export * from "./factory/factoryNav";
export * from "./factory/FactoryAdminLayout";
export * from "./factory/FactoryMobileLayout";

// Shop (quản trị cửa hàng)
export * from "./shop/shopNav";
export * from "./shop/ShopAdminLayout";
export * from "./shop/ShopMobileLayout";

// Sidebar menu & Account permissions
export * from "./sidebar/useAccountSidebarMenu";
export {
  filterMenuByContext,
  getIconComponent,
  isRouteAuthorized,
  getCachedFilteredMenu,
  getCachedMasterMenu,
} from "./sidebar/menuUtils";
export * from "./menus/resolveAdminMenu";
export type {
  MenuSection as AdminMenuSection,
  MenuGroup,
  MenuNote,
} from "./menus/adminSidebarMenus";
export type {
  MenuItem,
  MenuChild,
  UserContext,
  FarmRole,
  MenuCondition,
} from "./sidebar/types";
