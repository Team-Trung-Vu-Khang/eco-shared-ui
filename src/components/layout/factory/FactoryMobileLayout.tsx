import { Factory } from "lucide-react";
import {
  MobileAppLayout,
  type MobileAppLayoutProps,
} from "../mobile/MobileAppLayout";
import { FACTORY_MOBILE_NAV_ITEMS } from "./factoryNav";

export type FactoryMobileLayoutProps = MobileAppLayoutProps;

/** Layout mobile cho nhà máy sản xuất — header + bottom nav nhà máy */
export function FactoryMobileLayout({
  navItems = FACTORY_MOBILE_NAV_ITEMS,
  brandIcon = Factory,
  brandTitle = "Eco Factory",
  ...props
}: FactoryMobileLayoutProps) {
  return (
    <MobileAppLayout
      navItems={navItems}
      brandIcon={brandIcon}
      brandTitle={brandTitle}
      {...props}
    />
  );
}
