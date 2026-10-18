import { Store } from "lucide-react";
import {
  MobileAppLayout,
  type MobileAppLayoutProps,
} from "../mobile/MobileAppLayout";
import { SHOP_MOBILE_NAV_ITEMS } from "./shopNav";

export type ShopMobileLayoutProps = MobileAppLayoutProps;

/** Layout mobile cho quản trị cửa hàng — header + bottom nav */
export function ShopMobileLayout({
  navItems = SHOP_MOBILE_NAV_ITEMS,
  brandIcon = Store,
  brandTitle = "Eco Shop",
  ...props
}: ShopMobileLayoutProps) {
  return (
    <MobileAppLayout
      navItems={navItems}
      brandIcon={brandIcon}
      brandTitle={brandTitle}
      {...props}
    />
  );
}
