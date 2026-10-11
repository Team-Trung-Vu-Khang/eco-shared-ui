import {
  ClipboardList,
  Home,
  Plus,
  Sprout,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export interface MobileNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Các tiền tố đường dẫn cũng coi là đang ở tab này */
  matchPrefixes: string[];
  /** Hành động chính — hiển thị nút nổi ở giữa thanh điều hướng */
  isPrimary?: boolean;
}

export const MOBILE_HOME_PATH = "/home";

export const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    label: "Trang chủ",
    href: MOBILE_HOME_PATH,
    icon: Home,
    matchPrefixes: [MOBILE_HOME_PATH],
  },
  {
    label: "Vườn",
    href: "/dashboard",
    icon: Sprout,
    matchPrefixes: ["/dashboard"],
  },
  {
    label: "Ghi nhật ký",
    href: "/diary/incident",
    icon: Plus,
    matchPrefixes: ["/diary/incident"],
    isPrimary: true,
  },
  {
    label: "Nhật ký",
    href: "/diary/daily-history",
    icon: ClipboardList,
    matchPrefixes: ["/diary/daily-history", "/diary/update", "/diary/history"],
  },
  {
    label: "Tài khoản",
    href: "/profile",
    icon: UserRound,
    matchPrefixes: ["/profile"],
  },
];

export const isNavItemActive = (item: MobileNavItem, location: string) =>
  location === item.href ||
  item.matchPrefixes.some(
    (prefix) => location === prefix || location.startsWith(`${prefix}/`),
  );
