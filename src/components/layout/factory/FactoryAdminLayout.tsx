import { Factory } from "lucide-react";
import { AdminLayout, type AdminLayoutProps } from "../admin/AdminLayout";

export type FactoryAdminLayoutProps = Omit<
  AdminLayoutProps,
  "isDev" | "isMevi" | "isRice" | "isEcoSystemAdmin" | "isFactory"
> & {
  /** Tài khoản chủ nhà máy — chỉ hiện menu hồ sơ, đăng tin, nhu cầu kết nối */
  isOwnerFactory?: boolean;
};

/** Layout desktop cho nhà máy sản xuất — AdminLayout dùng menu nhà máy */
export function FactoryAdminLayout({
  brandIcon = Factory,
  brandTitle = "Eco Factory",
  isOwnerFactory = false,
  ...props
}: FactoryAdminLayoutProps) {
  return (
    <AdminLayout
      isFactory
      isOwnerFactory={isOwnerFactory}
      brandIcon={brandIcon}
      brandTitle={brandTitle}
      {...props}
    />
  );
}
