import {
  ClipboardCheck,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  UserRound,
} from "lucide-react";
import type { MenuSection } from "../menus/adminSidebarMenus";
import type { MobileNavItem } from "../mobile/mobileNav";

export const SHOP_ROUTES = {
  dashboard: "/admin/dashboard",
  products: "/admin/products",
  productCreate: "/admin/products/new",
  productApproval: "/admin/products/approval",
  orders: "/admin/orders",
  agencies: "/admin/agencies",
} as const;

export const menuShopAdminGroups: MenuSection[] = [
  {
    title: "Tổng quan",
    items: [
      {
        id: "shop-dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
        roles: ["MEVI_SHOP_ADMIN", "MEVI_ADMIN", "MEVI_SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Sản phẩm",
    items: [
      {
        id: "shop-products",
        label: "Quản lý sản phẩm",
        icon: Package,
        roles: ["MEVI_SHOP_ADMIN", "MEVI_ADMIN", "MEVI_SUPER_ADMIN"],
        children: [
          {
            id: "shop-product-list",
            label: "Danh sách sản phẩm",
            href: "/admin/products",
            roles: ["MEVI_SHOP_ADMIN", "MEVI_ADMIN", "MEVI_SUPER_ADMIN"],
          },
          {
            id: "shop-product-create",
            label: "Thêm sản phẩm",
            href: "/admin/products/new",
            roles: ["MEVI_SHOP_ADMIN", "MEVI_ADMIN", "MEVI_SUPER_ADMIN"],
          },
        ],
      },
      {
        id: "shop-product-approval",
        label: "Duyệt sản phẩm",
        icon: ClipboardCheck,
        href: "/admin/products/approval",
        roles: ["MEVI_SHOP_ADMIN", "MEVI_ADMIN", "MEVI_SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Bán hàng",
    items: [
      {
        id: "shop-orders",
        label: "Đơn đặt hàng",
        icon: ShoppingCart,
        href: "/admin/orders",
        roles: ["MEVI_SHOP_ADMIN", "MEVI_ADMIN", "MEVI_SUPER_ADMIN"],
      },
    ],
  },
  {
    title: "Đối tác",
    items: [
      {
        id: "shop-agencies",
        label: "Đại lý",
        icon: Store,
        href: "/admin/agencies",
        roles: ["MEVI_SHOP_ADMIN", "MEVI_SUPER_ADMIN"],
      },
    ],
  },
];

/** Bottom navigation mobile cho quản trị cửa hàng */
export const SHOP_MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    label: "Sản phẩm",
    href: SHOP_ROUTES.products,
    icon: Package,
    // Trang duyệt có tab riêng
    matchPrefixes: [SHOP_ROUTES.products, SHOP_ROUTES.productCreate],
  },
  {
    label: "Duyệt SP",
    href: SHOP_ROUTES.productApproval,
    icon: ClipboardCheck,
    matchPrefixes: [SHOP_ROUTES.productApproval],
  },
  {
    label: "Tổng quan",
    href: SHOP_ROUTES.dashboard,
    icon: LayoutDashboard,
    matchPrefixes: [SHOP_ROUTES.dashboard],
    isPrimary: true,
  },
  {
    label: "Đơn hàng",
    href: SHOP_ROUTES.orders,
    icon: ShoppingCart,
    matchPrefixes: [SHOP_ROUTES.orders],
  },
  {
    label: "Tài khoản",
    href: "/profile",
    icon: UserRound,
    matchPrefixes: ["/profile"],
  },
];
