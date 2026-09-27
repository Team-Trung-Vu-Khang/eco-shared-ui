import { Factory } from "lucide-react";
import { AdminLayout, type AdminLayoutProps } from "../admin/AdminLayout";

export type FactoryAdminLayoutProps = Omit<
  AdminLayoutProps,
  "isDev" | "isMevi" | "isRice" | "isEcoSystemAdmin" | "isFactory"
>;

/** Layout desktop cho nhà máy sản xuất — AdminLayout dùng menu nhà máy */
export function FactoryAdminLayout({
  brandIcon = Factory,
  brandTitle = "Eco Factory",
  ...props
}: FactoryAdminLayoutProps) {
  return (
    <AdminLayout
      isFactory
      brandIcon={brandIcon}
      brandTitle={brandTitle}
      {...props}
    />
  );
}
