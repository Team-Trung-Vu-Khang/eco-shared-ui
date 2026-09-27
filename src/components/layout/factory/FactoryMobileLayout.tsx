import { Factory } from "lucide-react";
import {
  MobileAppLayout,
  type MobileAppLayoutProps,
} from "../mobile/MobileAppLayout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getFactoryMobileNavItems } from "./factoryNav";

export type FactoryMobileLayoutProps = MobileAppLayoutProps;

/** Layout mobile cho nhà máy sản xuất — header + bottom nav theo quyền */
export function FactoryMobileLayout({
  navItems,
  brandIcon = Factory,
  brandTitle = "Eco Factory",
  ...props
}: FactoryMobileLayoutProps) {
  const { user } = useAuth();
  const roles = (user?.roles ??
    (user?.role ? [user.role].flat() : [])) as string[];

  return (
    <MobileAppLayout
      navItems={navItems ?? getFactoryMobileNavItems(roles)}
      brandIcon={brandIcon}
      brandTitle={brandTitle}
      {...props}
    />
  );
}
