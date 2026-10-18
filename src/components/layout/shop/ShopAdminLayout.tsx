import { Store } from "lucide-react";
import { AdminLayout, type AdminLayoutProps } from "../admin/AdminLayout";

export type ShopAdminLayoutProps = Omit<
  AdminLayoutProps,
  | "isDev"
  | "isMevi"
  | "isRice"
  | "isEcoSystemAdmin"
  | "isFactory"
  | "isOwnerFactory"
  | "isShop"
>;

/** Layout desktop cho quản trị cửa hàng — AdminLayout dùng menu shop */
export function ShopAdminLayout({
  brandIcon = Store,
  brandTitle = "Eco Shop",
  ...props
}: ShopAdminLayoutProps) {
  return (
    <AdminLayout
      isShop
      brandIcon={brandIcon}
      brandTitle={brandTitle}
      {...props}
    />
  );
}
