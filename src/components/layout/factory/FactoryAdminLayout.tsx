import { Factory } from "lucide-react";
import { AdminLayout, type AdminLayoutProps } from "../admin/AdminLayout";
import { FACTORY_MENU_GROUPS } from "./factoryNav";

export type FactoryAdminLayoutProps = Omit<
  AdminLayoutProps,
  "isDev" | "isMevi" | "isRice" | "isEcoSystemAdmin"
>;

/** Layout desktop cho nhà máy sản xuất — AdminLayout dùng menu nhà máy */
export function FactoryAdminLayout({
  menu = FACTORY_MENU_GROUPS,
  brandIcon = Factory,
  brandTitle = "Eco Factory",
  ...props
}: FactoryAdminLayoutProps) {
  return (
    <AdminLayout
      menu={menu}
      brandIcon={brandIcon}
      brandTitle={brandTitle}
      {...props}
    />
  );
}
