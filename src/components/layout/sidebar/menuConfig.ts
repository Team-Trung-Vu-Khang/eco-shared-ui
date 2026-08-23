import type { MenuSection } from "./types";

export const menuDevGroups: MenuSection[] = [
  {
    title: "Tổng quan",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    title: "Tổ chức",
    items: [
      {
        id: "unit",
        label: "Đơn vị",
        icon: "Building2",
        href: "/unit",
        children: [
          {
            id: "enterprise",
            label: "Doanh nghiệp",
            href: "/enterprise",
            roles: ["MEVI_FARM_ADMIN", "MEVI_FARM_MEMBER"],
          },
        ],
      },
    ],
  },
  {
    title: "Vùng sản xuất",
    items: [
      {
        id: "cultivation-region-identification",
        label: "Định danh vùng canh tác",
        icon: "IdCardIcon",
        href: "/cultivation-region-identification",
        roles: ["MEVI_FARM_MEMBER"],
        conditions: ["REQUIRE_FIRST_ONBOARD"],
      },
    ],
  },
];
