import type { ElementType } from "react";
import type { FarmRole, MenuCondition } from "./sidebar/types";
import {
  Award,
  BookOpenText,
  Bug,
  Building,
  Building2,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  FileText,
  FlaskConical,
  Flower2,
  GitBranch,
  Heart,
  Landmark,
  Layers,
  LayoutDashboard,
  Leaf,
  Map,
  Mountain,
  Package,
  Scale,
  Sprout,
  TreePine,
  Trees,
  User,
  Users,
  UsersRound,
  Wrench,
  Search,
  Cpu,
  MapPin,
  SquareM,
  CirclePile,
  IdCardIcon,
  Fish,
  UserCog,
  PiggyBank,
  Download,
  Upload,
  UserRoundPlus,
  Beef,
  Clock,
  Package2,
  Group,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: ElementType;
  href?: string;
  roles?: FarmRole[];
  conditions?: MenuCondition[];
  children?: {
    id: string;
    label: string;
    href: string;
    roles?: FarmRole[];
    conditions?: MenuCondition[];
  }[];
}

export type MenuGroup = {
  title: string;
  items: MenuItem[];
  roles?: FarmRole[];
};

export type MenuNote = {
  note: string;
};

export type MenuSection = MenuGroup | MenuNote;

export const menuProdGroups: MenuSection[] = [
  {
    title: "Tổ chức",
    items: [
      {
        id: "unit",
        label: "Đơn vị",
        icon: Building2,
        href: "/unit",
        children: [
          {
            id: "enterprise",
            label: "Doanh nghiệp",
            href: "/enterprise",
          },
          {
            id: "farmer",
            label: "Nông hộ",
            href: "/farmer",
          },
          {
            id: "cooperative",
            label: "Hợp tác xã",
            href: "/cooperative",
          },
          {
            id: "search-unit",
            href: "/search-unit",
            label: "Tìm kiếm đơn vị",
          },
        ],
      },
      { id: "branch", label: "Chi nhánh", icon: GitBranch, href: "/branch" },
      {
        id: "bank",
        label: "Thông tin ngân hàng",
        icon: Landmark,
        href: "/bank",
      },
      {
        id: "contact",
        label: "Thông tin liên hệ",
        icon: Users,
        href: "/contact",
      },
      {
        id: "enterprise-certificate",
        label: "Chứng nhận - chứng chỉ",
        icon: Award,
        href: "/enterprise-certificate",
      },
    ],
  },
  {
    title: "Tổ chức & Nhân sự",
    items: [
      {
        id: "personnel",
        label: "Nhân sự",
        icon: Users,
        href: "/personnel",
      },
      {
        id: "department",
        label: "Phòng ban",
        icon: Building,
        href: "/department",
      },
      { id: "position", label: "Chức vụ", icon: User, href: "/position" },
      // {
      //   id: "role-responsibility",
      //   label: "Vai trò & trách nhiệm",
      //   icon: Scale,
      //   href: "/role-responsibility",
      // },
      { id: "team", label: "Đội nhóm", icon: UsersRound, href: "/team" },
    ],
  },
  {
    title: "Vùng trồng",
    items: [
      {
        id: "region-chart",
        label: "Địa lý",
        icon: Map,
        href: "/region-chart",
        children: [
          {
            id: "region-dist",
            label: "Phân bố vùng",
            href: "/region-distribution",
          },
          {
            id: "area-dist",
            label: "Phân bố khu vực",
            href: "/area-distribution",
          },
          {
            id: "plot-dist",
            label: "Phân bố lô",
            href: "/plot-distribution",
          },
          {
            id: "map-view",
            label: "Bản đồ",
            href: "/map-view",
          },
        ],
      },
      {
        id: "cultivation-zone",
        label: "Canh tác",
        icon: TreePine,
        href: "/cultivation-zone",
        children: [
          {
            id: "cultivation-region",
            label: "Vùng canh tác",
            href: "/cultivation-region",
          },
          {
            id: "crop-identification",
            label: "Định danh cây trồng",
            href: "/plant-identification",
          },
          {
            id: "dist-detail",
            label: "Chi tiết phân bổ",
            href: "/distribution-detail",
          },
          {
            id: "search-crop",
            label: "Tìm kiếm cây trồng",
            href: "/search-crop",
          },
          {
            id: "search-zone",
            label: "Tìm kiếm vùng trồng",
            href: "/search-zone",
          },
        ],
      },
    ],
  },
  {
    title: "Cây trồng",
    items: [
      // {
      //   id: "fd-group-crop",
      //   label: "Nhóm cây trồng",
      //   icon: Trees,
      //   href: "/group-crop",
      // },
      // {
      //   id: "fd-crop",
      //   label: "Cây trồng",
      //   icon: Flower2,
      //   href: "/crop-foundation",
      // },
      {
        id: "fd-variety",
        label: "Giống cây trồng",
        icon: Sprout,
        href: "/variety-foundation",
      },
      { id: "seed", label: "Hạt giống", icon: Leaf, href: "/seed" },
      {
        id: "growth-cycle",
        label: "Chu kỳ sinh trưởng",
        icon: CalendarDays,
        href: "/growth-cycle",
      },
    ],
  },
];

export const menuProdRiceGroups: MenuSection[] = [
  {
    title: "Tổng quan",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    ],
  },
  {
    title: "Tổ chức",
    items: [
      // {
      //   id: "region-chart",
      //   label: "Biểu đồ vùng",
      //   icon: Map,
      //   href: "/region-chart",
      //   children: [
      //     {
      //       id: "region-dist",
      //       label: "Phân bố vùng",
      //       href: "/region-distribution",
      //     },
      //     {
      //       id: "area-dist",
      //       label: "Phân bố khu vực",
      //       href: "/area-distribution",
      //     },
      //     {
      //       id: "plot-dist",
      //       label: "Phân bố lô",
      //       href: "/plot-distribution",
      //     },
      //     {
      //       id: "map-view",
      //       label: "Bản đồ",
      //       href: "/map-view",
      //     },
      //   ],
      // },
      {
        id: "unit",
        label: "Đơn vị",
        icon: Building2,
        href: "/unit",
        children: [
          {
            id: "enterprise",
            label: "Doanh nghiệp",
            href: "/enterprise",
          },
          {
            id: "farmer",
            label: "Nông hộ",
            href: "/farmer",
          },
          {
            id: "cooperative",
            label: "Hợp tác xã",
            href: "/cooperative",
          },
          {
            id: "search-unit",
            href: "/search-unit",
            label: "Tìm kiếm đơn vị",
          },
        ],
      },
      { id: "branch", label: "Chi nhánh", icon: GitBranch, href: "/branch" },
      {
        id: "bank",
        label: "Thông tin ngân hàng",
        icon: Landmark,
        href: "/bank",
      },
      {
        id: "contact",
        label: "Thông tin liên hệ",
        icon: Users,
        href: "/contact",
      },
      {
        id: "enterprise-certificate",
        label: "Chứng nhận - chứng chỉ",
        icon: Award,
        href: "/enterprise-certificate",
      },
    ],
  },
  {
    title: "Tổ chức & Nhân sự",
    items: [
      {
        id: "personnel",
        label: "Nhân sự",
        icon: Users,
        href: "/personnel",
      },
      {
        id: "department",
        label: "Phòng ban",
        icon: Building,
        href: "/department",
      },
      { id: "position", label: "Chức vụ", icon: User, href: "/position" },
      {
        id: "role-responsibility",
        label: "Vai trò & trách nhiệm",
        icon: Scale,
        href: "/role-responsibility",
      },
      { id: "team", label: "Đội nhóm", icon: UsersRound, href: "/team" },
    ],
  },
  {
    title: "Vùng trồng",
    items: [
      {
        id: "region-chart",
        label: "Địa lý",
        icon: Map,
        href: "/region-chart",
        children: [
          {
            id: "region-dist",
            label: "Phân bố vùng",
            href: "/region-distribution",
          },
          {
            id: "area-dist",
            label: "Phân bố khu vực",
            href: "/area-distribution",
          },
          {
            id: "plot-dist",
            label: "Phân bố lô",
            href: "/plot-distribution",
          },
          {
            id: "map-view",
            label: "Bản đồ",
            href: "/map-view",
          },
        ],
      },
      {
        id: "cultivation-zone",
        label: "Canh tác",
        icon: TreePine,
        href: "/cultivation-zone",
        children: [
          {
            id: "cultivation-region",
            label: "Vùng canh tác",
            href: "/cultivation-region",
          },
          // {
          //   id: "cultivation-area",
          //   label: "Khu vực canh tác",
          //   href: "/cultivation-area",
          // },
          // {
          //   id: "cultivation-plot",
          //   label: "Lô canh tác",
          //   href: "/cultivation-plot",
          // },
          // {
          //   id: "crop-identification",
          //   label: "Định danh cây trồng",
          //   href: "/plant-identification",
          // },
          {
            id: "dist-detail",
            label: "Chi tiết phân bổ",
            href: "/distribution-detail",
          },
          {
            id: "search-crop",
            label: "Tìm kiếm cây trồng",
            href: "/search-crop",
          },
          {
            id: "search-zone",
            label: "Tìm kiếm vùng trồng",
            href: "/search-zone",
          },
        ],
      },
    ],
  },
  {
    title: "Cây trồng",
    items: [
      { id: "crop", label: "Cây trồng", icon: Flower2, href: "/crop" },
      {
        id: "variety",
        label: "Giống cây trồng",
        icon: Sprout,
        href: "/variety",
      },
      {
        id: "group-crop",
        label: "Nhóm cây trồng",
        icon: Trees,
        href: "/group-crop",
      },
      { id: "seed", label: "Hạt giống", icon: Leaf, href: "/seed" },
      {
        id: "growth-cycle",
        label: "Chu kỳ sinh trưởng",
        icon: CalendarDays,
        href: "/growth-cycle",
      },
      { id: "season", label: "Mùa vụ", icon: CalendarDays, href: "/season" },
      {
        id: "docs",
        label: "Tài liệu kỹ thuật",
        icon: BookOpenText,
        href: "/docs",
      },
      // {
      //   id: "treatment",
      //   label: "Phác đồ điều trị",
      //   icon: Heart,
      //   href: "/treatment",
      // },
    ],
  },
  {
    title: "Vật tư",
    items: [
      { id: "pesticide", label: "Thuốc BVTV", icon: Bug, href: "/pesticide" },
      {
        id: "fertilizer",
        label: "Phân bón",
        icon: FlaskConical,
        href: "/fertilizer",
      },
      {
        id: "material",
        label: "Vật tư khác",
        icon: Package,
        href: "/material",
      },
      {
        id: "equipment",
        label: "Dụng cụ – Máy móc",
        icon: Wrench,
        href: "/equipment",
      },
      {
        id: "lookup-material",
        label: "Tra cứu vật tư",
        icon: Search,
        href: "/lookup-material",
      },
      { id: "unit", label: "Đơn vị quy đổi", icon: Scale, href: "/unit" },
    ],
  },
  {
    title: "Kế hoạch & Công việc",
    items: [
      {
        id: "plan",
        label: "Kế hoạch",
        icon: ClipboardList,
        href: "/plan",
      },
      { id: "task", label: "Công việc", icon: CheckSquare, href: "/task" },
      {
        id: "plan-type",
        label: "Thông tin nhóm kế hoạch",
        icon: CheckSquare,
        href: "/plan-type",
      },
    ],
  },
  {
    title: "Cải tạo đất",
    items: [
      {
        id: "amendment-cycle",
        label: "Chu kỳ cải tạo",
        href: "/amendment-cycle",
        icon: CalendarDays,
      },
      {
        id: "amendment-method",
        label: "Phương pháp & Quy trình",
        href: "/amendment-method",
        icon: Wrench,
      },
      {
        id: "amendment-plan",
        label: "Kế hoạch",
        href: "/amendment-plan",
        icon: ClipboardList,
      },
      {
        id: "amendment-task",
        label: "Công việc",
        href: "/amendment-task",
        icon: CheckSquare,
      },
      {
        id: "soil-amendment-map",
        label: "Bản đồ",
        href: "/soil-amendment-map",
        icon: Map,
      },
      // {
      //   id: "soil-amendment-treatment",
      //   label: "Phác đồ cải tạo",
      //   href: "/soil-amendment-treatment",
      //   icon: Heart,
      // },
    ],
  },
  // {
  //   title: "Hồ sơ",
  //   items: [
  //     { id: "contract", label: "Hợp đồng", icon: FileText, href: "/contract" },
  //     {
  //       id: "document-version",
  //       label: "Quản lý phiên bản tài liệu",
  //       icon: BookOpenText,
  //       href: "/document-version",
  //     },
  //   ],
  // },
  {
    title: "IoT Nông nghiệp",
    items: [
      {
        id: "iot-device",
        label: "Thiết bị IoT",
        icon: Cpu,
        href: "/iot-device",
      },
      {
        id: "iot-device-map",
        label: "Bản đồ thiết bị IoT",
        icon: Map,
        href: "/map-iot-device",
      },
    ],
  },
  {
    title: "Báo cáo - thống kê",
    items: [
      {
        id: "production-cultivation-report",
        label: "Báo cáo sản xuất/canh tác",
        icon: ClipboardList,
        href: "/production-cultivation-report",
      },
      {
        id: "admin-report",
        label: "Báo cáo quản trị Admin",
        icon: UserCog,
        href: "/admin-report",
      },
      // {
      //   id: "treatment-report",
      //   label: "Báo cáo điều trị",
      //   icon: Heart,
      //   href: "/treatment-report",
      // },
      // {
      //   id: "amendment-report",
      //   label: "Báo cáo cải tạo",
      //   icon: Wrench,
      //   href: "/amendment-report",
      // },
      // {
      //   id: "harvest-report",
      //   label: "Báo cáo thu hoạch",
      //   icon: Leaf,
      //   href: "/harvest-report",
      // },
      // {
      //   id: "environment-iot-report",
      //   label: "Báo cáo môi trường và IoT",
      //   icon: Cpu,
      //   href: "/environment-iot-report",
      // },
      // {
      //   id: "executive-dashboard",
      //   label: "Dashboard điều hành tổng hợp",
      //   icon: LayoutDashboard,
      //   href: "/executive-dashboard",
      // },
      // {
      //   id: "summary-report-export",
      //   label: "Xuất báo cáo tổng hợp",
      //   icon: FileText,
      //   href: "/summary-report-export",
      // },
    ],
  },
  // {
  //   title: "Dữ liệu liên kết",
  //   items: [
  //     {
  //       id: "terrain",
  //       label: "Đặc điểm địa hình",
  //       icon: Mountain,
  //       href: "/terrain",
  //     },
  //     { id: "land", label: "Chất đất", icon: Layers, href: "/land" },
  //     {
  //       id: "farming-method",
  //       label: "Phương thức canh tác",
  //       icon: Leaf,
  //       href: "/farming-method",
  //     },
  //     {
  //       id: "certificate",
  //       label: "Bộ tiêu chuẩn",
  //       icon: Award,
  //       href: "/certificate",
  //     },
  //     {
  //       id: "bank-directory",
  //       label: "Ngân hàng",
  //       icon: Landmark,
  //       href: "/bank-directory",
  //     },
  //     {
  //       id: "enterprise-type",
  //       label: "Nhóm tổ chức",
  //       icon: Building2,
  //       href: "/enterprise-type",
  //     },
  //     {
  //       id: "enterprise-form",
  //       label: "Loại hình tổ chức",
  //       icon: Building2,
  //       href: "/enterprise-form",
  //     },
  //     {
  //       id: "material-group",
  //       label: "Nhóm vật tư",
  //       icon: Boxes,
  //       href: "/material-group",
  //     },
  //     {
  //       id: "fertilizer-group",
  //       label: "Nhóm phân bón",
  //       icon: Atom,
  //       href: "/fertilizer-group",
  //     },
  //     {
  //       id: "pesticide-group",
  //       label: "Nhóm thuốc BVTV",
  //       icon: Bug,
  //       href: "/pesticide-group",
  //     },
  //     {
  //       id: "vehicle-group",
  //       label: "Nhóm máy móc - thiết bị",
  //       icon: Tractor,
  //       href: "/vehicle-group",
  //     },
  //     {
  //       id: "document-category",
  //       label: "Danh mục tài liệu",
  //       icon: FileText,
  //       href: "/document-category",
  //     },
  //   ],
  // },
];

export const menuDevGroups: MenuSection[] = [
  {
    title: "Tổng quan",
    items: [
      // {
      //   id: "dashboard",
      //   label: "Dashboard",
      //   icon: LayoutDashboard,
      //   href: "/",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },
      {
        id: "admin-report",
        label: "Báo cáo quản trị Admin",
        icon: UserCog,
        href: "/admin-report",
        roles: ["MEVI_ADMIN", "MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN"],
      },
      {
        id: "rc-overview",
        label: "Tổng quan",
        icon: LayoutDashboard,
        href: "/reports/crops/overview",
        roles: ["MEVI_FARM_MEMBER"],
      },
    ],
  },
  {
    title: "Danh bạ",
    items: [
      {
        id: "unit",
        label: "Đơn vị",
        icon: Building2,
        href: "/unit",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
        children: [
          {
            id: "enterprise",
            roles: [
              "MEVI_FARM_ADMIN",
              "MEVI_SUPER_ADMIN",
              "MEVI_ADMIN",
              "MEVI_FARM_MEMBER",
            ],
            label: "Doanh nghiệp",
            href: "/enterprise",
          },
          {
            id: "farmer",
            roles: [
              "MEVI_FARM_ADMIN",
              "MEVI_SUPER_ADMIN",
              "MEVI_ADMIN",
              "MEVI_FARM_MEMBER",
            ],
            label: "Nông hộ",
            href: "/farmer",
          },
          {
            id: "cooperative",
            roles: [
              "MEVI_FARM_ADMIN",
              "MEVI_SUPER_ADMIN",
              "MEVI_ADMIN",
              "MEVI_FARM_MEMBER",
            ],
            label: "Hợp tác xã",
            href: "/cooperative",
          },
          {
            id: "search-unit",
            roles: [
              "MEVI_FARM_ADMIN",
              "MEVI_SUPER_ADMIN",
              "MEVI_ADMIN",
              "MEVI_FARM_MEMBER",
            ],
            href: "/search-unit",
            label: "Tìm kiếm đơn vị",
          },
        ],
      },
      {
        id: "branch",
        label: "Chi nhánh",
        icon: GitBranch,
        href: "/branch",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
      },
      {
        id: "bank",
        label: "Thông tin ngân hàng",
        icon: Landmark,
        href: "/bank",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
      },
      {
        id: "contact",
        label: "Thông tin liên hệ",
        icon: Users,
        href: "/contact",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
      },
      {
        id: "enterprise-certificate",
        roles: ["MEVI_FARM_MEMBER"],
        label: "Chứng nhận - chứng chỉ",
        icon: Award,
        href: "/enterprise-certificate",
      },
    ],
  },
  {
    title: "Nguồn nhân lực",
    items: [
      {
        id: "personnel",
        label: "Nhân sự",
        icon: Users,
        href: "/personnel",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
      },
      {
        id: "owner-department",
        label: "Phòng ban",
        icon: Building,
        href: "/owner-department",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
      },
      {
        id: "owner-position",
        label: "Chức vụ",
        icon: User,
        href: "/owner-position",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
      },
      // {
      //   id: "role-responsibility",
      //   label: "Vai trò & trách nhiệm",
      //   icon: Scale,
      //   href: "/role-responsibility",
      // },
      {
        id: "team",
        label: "Đội nhóm",
        icon: UsersRound,
        href: "/team",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
      },
    ],
  },
  {
    title: "Vùng sản xuất",
    items: [
      {
        id: "region-chart",
        label: "Địa lý",
        icon: Map,
        href: "/region-chart",
        roles: ["MEVI_FARM_MEMBER"],
        children: [
          {
            id: "region-dist",
            label: "Phân bố vùng",
            href: "/region-distribution",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "area-dist",
            label: "Phân bố khu vực",
            href: "/area-distribution",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "plot-dist",
            label: "Phân bố lô",
            href: "/plot-distribution",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "map-view",
            label: "Bản đồ",
            href: "/map-view",
            roles: ["MEVI_FARM_MEMBER"],
          },
        ],
      },
      {
        id: "cultivation-zone",
        roles: ["MEVI_FARM_MEMBER"],
        label: "Trồng trọt",
        icon: TreePine,
        href: "/cultivation-zone",
        children: [
          {
            id: "cultivation-region",
            roles: ["MEVI_FARM_MEMBER"],
            label: "Vùng canh tác",
            href: "/cultivation-region",
          },
          // {
          //   id: "region-basic-distribution",
          //   label: "Định danh cơ bản",
          //   href: "/region-basic-distribution",
          // },
          {
            id: "crop-identification",
            roles: ["MEVI_FARM_MEMBER"],
            label: "Định danh cây trồng",
            href: "/plant-identification",
          },
          {
            id: "dist-detail",
            roles: ["MEVI_FARM_MEMBER"],
            label: "Chi tiết phân bổ",
            href: "/distribution-detail",
          },
          {
            id: "search-crop",
            roles: ["MEVI_FARM_MEMBER"],
            label: "Tìm kiếm cây trồng",
            href: "/search-crop",
          },
          {
            id: "search-zone",
            roles: ["MEVI_FARM_MEMBER"],
            label: "Tìm kiếm vùng trồng",
            href: "/search-zone",
          },
          {
            id: "growth-cycle",
            roles: ["MEVI_FARM_MEMBER"],
            label: "Vụ mùa",
            href: "/growth-cycle",
          },
        ],
      },
      // tạm ẩn
      // {
      //   id: "animal-husbandry",
      //   roles: ["MEVI_FARM_MEMBER"],
      //   label: "Chăn nuôi",
      //   icon: PiggyBank,
      //   href: "/animal-husbandry",
      //   children: [
      //     {
      //       label: "Vùng chăn nuôi",
      //       id: "animal-husbandry-region",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       href: "/animal-husbandry-region",
      //     },
      //     {
      //       label: "Định danh cá thể",
      //       id: "animal-identification",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       href: "/animal-identification",
      //     },
      //     {
      //       label: "Tìm kiếm cá thể",
      //       id: "animal-identification-search",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       href: "/animal-identification/search",
      //     },
      //     {
      //       label: "Tìm kiếm trang trại",
      //       id: "animal-identification-search-farm",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       href: "/animal-identification/search-farm",
      //     },
      //     {
      //       id: "animal-distribution-detail",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       label: "Chi tiết phân bổ",
      //       href: "/animal-distribution-detail",
      //     },
      //     {
      //       id: "animal-growth-cycle",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       label: "Vụ nuôi",
      //       href: "/animal-growth-cycle",
      //     },
      //   ],
      // },
      // {
      //   id: "aquaculture",
      //   roles: ["MEVI_FARM_MEMBER"],
      //   label: "Nuôi trồng thuỷ sản",
      //   icon: Fish,
      //   href: "/aquaculture",
      //   children: [
      //     {
      //       label: "Vùng nuôi trồng",
      //       id: "aquaculture-region",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       href: "/aquaculture-region",
      //     },
      //     {
      //       label: "Định danh cá thể",
      //       id: "aquaculture-identification",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       href: "/aquaculture-identification",
      //     },
      //     {
      //       label: "Tìm kiếm cá thể",
      //       id: "aquaculture-identification-search",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       href: "/aquaculture-identification/search",
      //     },
      //     {
      //       label: "Tìm kiếm trang trại",
      //       id: "aquaculture-search-farm",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       href: "/aquaculture-search-farm",
      //     },
      //     {
      //       id: "aquaculture-distribution-detail",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       label: "Chi tiết phân bổ",
      //       href: "/aquaculture-distribution-detail",
      //     },
      //     {
      //       id: "aquaculture-growth-cycle",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       label: "Vụ nuôi",
      //       href: "/aquaculture-growth-cycle",
      //     },
      //   ],
      // },
      // {
      //   id: "cultivation-region-identification",
      //   roles: ["MEVI_FARM_MEMBER"],
      //   conditions: ["REQUIRE_FIRST_ONBOARD"],
      //   label: "Định danh vùng canh tác",
      //   icon: IdCardIcon,
      //   href: "/cultivation-region-identification",
      //   children: [
      //     {
      //       id: "cultivation-region-identification-crop",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       conditions: ["REQUIRE_FIRST_ONBOARD"],
      //       label: "Trồng trọt",
      //       href: "/cultivation-region-identification/crop",
      //     },
      //     {
      //       id: "animal-identification",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       conditions: ["REQUIRE_FIRST_ONBOARD"],
      //       label: "Chăn nuôi",
      //       href: "/cultivation-region-identification/animal",
      //     },
      //     {
      //       id: "aquaculture-identification",
      //       roles: ["MEVI_FARM_MEMBER"],
      //       conditions: ["REQUIRE_FIRST_ONBOARD"],
      //       label: "Nuôi trồng thuỷ sản",
      //       href: "/cultivation-region-identification/aquaculture",
      //     },
      //   ],
      // },
      {
        id: "legal-identification",
        roles: [
          "MEVI_FARM_ADMIN",
          "MEVI_SUPER_ADMIN",
          "MEVI_ADMIN",
          "MEVI_FARM_MEMBER",
        ],
        label: "Định danh pháp lý",
        icon: IdCardIcon,
        href: "/legal-identification",
      },
    ],
  },
  {
    title: "Cây trồng",
    items: [
      {
        id: "seed",
        label: "Hạt giống",
        icon: Leaf,
        href: "/seed",
        roles: ["MEVI_FARM_MEMBER"],
      },
      // {
      //   id: "growth-cycle",
      //   label: "Chu kỳ sinh trưởng",
      //   icon: CalendarDays,
      //   href: "/growth-cycle",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },

      // Tạm ẩn
      // {
      //   id: "docs",
      //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //   label: "Tài liệu kỹ thuật",
      //   icon: BookOpenText,
      //   href: "/docs",
      // },
      // Tạm ẩn
      // {
      //   id: "treatment",
      //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //   label: "Phác đồ điều trị",
      //   icon: Heart,
      //   href: "/treatment",
      // },
    ],
  },
  {
    title: "Vật tư",
    items: [
      {
        id: "lookup-material",
        label: "Tra cứu vật tư",
        icon: Search,
        href: "/lookup-material",
        roles: ["MEVI_FARM_MEMBER"],
      },
      {
        id: "supply-conversion-rules",
        label: "Đơn vị quy đổi",
        icon: Scale,
        href: "/supply-conversion-rules",
        roles: ["MEVI_FARM_MEMBER"],
      },
      {
        id: "cultivation-material",
        label: "Vật tư trồng trọt",
        icon: TreePine,
        href: "/cultivation-zone",
        roles: ["MEVI_FARM_MEMBER"],
        children: [
          {
            id: "pesticide",
            label: "Thuốc BVTV",
            href: "/cultivation-material/pesticide",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "fertilizer",
            label: "Phân bón",
            href: "/cultivation-material/fertilizer",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "material",
            label: "Vật tư khác",
            href: "/cultivation-material/material",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "equipment",
            label: "Dụng cụ – Máy móc",
            href: "/cultivation-material/equipment",
            roles: ["MEVI_FARM_MEMBER"],
          },
        ],
      },
      // Tạm ẩn
      // {
      //   id: "animal-husbandry-material",
      //   label: "Vật tư chăn nuôi",
      //   icon: PiggyBank,
      //   href: "/animal-husbandry-material",
      //   roles: ["MEVI_FARM_MEMBER"],
      //   children: [
      //     {
      //       id: "pesticide",
      //       label: "Thuốc",
      //       href: "/animal-husbandry-material/pesticide",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "material",
      //       label: "Vật tư khác",
      //       href: "/animal-husbandry-material/material",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "equipment",
      //       label: "Dụng cụ – Máy móc",
      //       href: "/animal-husbandry-material/equipment",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //   ],
      // },
      // {
      //   id: "aquaculture-material",
      //   label: "Vật tư nuôi trồng thủy sản",
      //   icon: Fish,
      //   href: "/aquaculture-material",
      //   roles: ["MEVI_FARM_MEMBER"],
      //   children: [
      //     {
      //       id: "pesticide",
      //       label: "Thuốc",
      //       href: "/aquaculture-material/pesticide",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "material",
      //       label: "Vật tư khác",
      //       href: "/aquaculture-material/material",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "equipment",
      //       label: "Dụng cụ – Máy móc",
      //       href: "/aquaculture-material/equipment",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Kế hoạch & Công việc",
    items: [
      {
        id: "plan",
        roles: ["MEVI_FARM_MEMBER"],
        label: "Quản lý canh tác",
        icon: ClipboardList,
        children: [
          {
            id: "plan-crop",
            roles: ["MEVI_FARM_MEMBER"],
            label: "Kế hoạch mùa vụ",
            href: "/plan-growth",
          },
          // Tạm ẩn
          // {
          //   id: "plan-animal",
          //   roles: ["MEVI_FARM_MEMBER"],
          //   label: "Kế hoạch chăn nuôi",
          //   href: "/plan-animal-growth",
          // },
          // {
          //   id: "plan-aquaculture",
          //   roles: ["MEVI_FARM_MEMBER"],
          //   label: "Kế hoạch nuôi trồng thủy sản",
          //   href: "/plan-aquaculture-growth",
          // },
        ],
      },
      {
        id: "task",
        label: "Công việc",
        icon: CheckSquare,
        href: "/task",
        roles: ["MEVI_FARM_MEMBER"],
      },
      {
        id: "plan-type",
        label: "Thông tin nhóm kế hoạch",
        icon: CheckSquare,
        href: "/plan-type",
        roles: ["MEVI_FARM_MEMBER"],
      },
    ],
  },
  {
    title: "Nhật ký canh tác",
    items: [
      {
        label: "Lịch sử canh tác",
        id: "farm-history",
        icon: Clock,
        roles: ["MEVI_FARM_MEMBER"],
        href: "/history",
      },
      {
        icon: FileText,
        id: "farm-history-create",
        label: "Cập nhật canh tác",
        roles: ["MEVI_FARM_MEMBER"],
        href: "/history/create",
      },
    ],
  },
  // {
  //   title: "Cải tạo đất",
  //   items: [
  //     {
  //       id: "amendment-cycle",
  //       label: "Chu kỳ cải tạo",
  //       href: "/amendment-cycle",
  //       icon: CalendarDays,
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "amendment-method",
  //       label: "Phương pháp & Quy trình",
  //       href: "/amendment-method",
  //       icon: Wrench,
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "amendment-plan",
  //       label: "Kế hoạch",
  //       href: "/amendment-plan",
  //       icon: ClipboardList,
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "amendment-task",
  //       label: "Công việc",
  //       href: "/amendment-task",
  //       icon: CheckSquare,
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "soil-amendment-map",
  //       label: "Bản đồ",
  //       href: "/soil-amendment-map",
  //       icon: Map,
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "soil-amendment-treatment",
  //       label: "Phác đồ cải tạo",
  //       href: "/soil-amendment-treatment",
  //       icon: Heart,
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //   ],
  // },
  // {
  //   title: "Hồ sơ",
  //   items: [
  //     {
  //       id: "contract",
  //       label: "Hợp đồng",
  //       icon: FileText,
  //       href: "/contract",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "document-version",
  //       label: "Quản lý phiên bản tài liệu",
  //       icon: BookOpenText,
  //       href: "/document-version",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //   ],
  // },
  // {
  //   title: "IoT Nông nghiệp",
  //   items: [
  //     {
  //       id: "iot-device",
  //       label: "Thiết bị IoT",
  //       icon: Cpu,
  //       href: "/iot-device",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "iot-device-map",
  //       label: "Bản đồ thiết bị IoT",
  //       icon: Map,
  //       href: "/map-iot-device",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //   ],
  // },
  // {
  //   title: "Kho vật tư",
  //   items: [
  //     {
  //       id: "inventory-area",
  //       label: "Khu vực kho",
  //       icon: Map,
  //       href: "/inventory-area",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "crop-material-inventory",
  //       label: "Kho vật tư trồng trọt",
  //       icon: TreePine,
  //       href: "/crop-material-inventory",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     // Tạm ẩn
  //     // {
  //     //   id: "livestock-material-inventory",
  //     //   label: "Kho vật tư chăn nuôi",
  //     //   icon: PiggyBank,
  //     //   href: "/livestock-material-inventory",
  //     //   roles: ["MEVI_FARM_MEMBER"],
  //     // },
  //     // {
  //     //   id: "aquaculture-material-inventory",
  //     //   label: "Kho vật tư nuôi trồng thuỷ sản",
  //     //   icon: Fish,
  //     //   href: "/aquaculture-material-inventory",
  //     //   roles: ["MEVI_FARM_MEMBER"],
  //     // },
  //     {
  //       id: "inventory-lookup",
  //       label: "Tra cứu tồn kho",
  //       icon: Search,
  //       href: "/inventory-lookup",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "inventory-in",
  //       label: "Nhập kho",
  //       icon: Download,
  //       href: "/inventory-in",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //     {
  //       id: "inventory-out",
  //       label: "Xuất kho",
  //       icon: Upload,
  //       href: "/inventory-out",
  //       roles: ["MEVI_FARM_MEMBER"],
  //     },
  //   ],
  // },
  {
    title: "Báo cáo - thống kê",
    items: [
      // {
      //   id: "production-cultivation-report",
      //   label: "Báo cáo sản xuất/canh tác",
      //   icon: ClipboardList,
      //   href: "/production-cultivation-report",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },
      {
        id: "admin-report",
        label: "Báo cáo quản trị Admin",
        icon: UserCog,
        href: "/admin-report",
        roles: ["MEVI_ADMIN", "MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN"],
      },
      // {
      //   id: "treatment-report",
      //   label: "Báo cáo điều trị",
      //   icon: Heart,
      //   href: "/treatment-report",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },
      // {
      //   id: "amendment-report",
      //   label: "Báo cáo cải tạo",
      //   icon: Wrench,
      //   href: "/amendment-report",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },
      // {
      //   id: "harvest-report",
      //   label: "Báo cáo thu hoạch",
      //   icon: Leaf,
      //   href: "/harvest-report",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },
      // {
      //   id: "environment-iot-report",
      //   label: "Báo cáo môi trường và IoT",
      //   icon: Cpu,
      //   href: "/environment-iot-report",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },
      // {
      //   id: "executive-dashboard",
      //   label: "Dashboard điều hành tổng hợp",
      //   icon: LayoutDashboard,
      //   href: "/executive-dashboard",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },
      // {
      //   id: "summary-report-export",
      //   label: "Xuất báo cáo tổng hợp",
      //   icon: FileText,
      //   href: "/summary-report-export",
      //   roles: ["MEVI_FARM_MEMBER"],
      // },
      {
        id: "report-crops",
        label: "Canh tác trồng trọt",
        icon: Sprout,
        href: "/reports/crops/overview",
        roles: ["MEVI_FARM_MEMBER"],
        children: [
          {
            id: "rc-overview",
            label: "Tổng quan",
            href: "/reports/crops/overview",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "rc-plan-work",
            label: "Kế hoạch - công việc",
            href: "/reports/crops/plan-work",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "rc-harvest",
            label: "Thu hoạch",
            href: "/reports/crops/harvest",
            roles: ["MEVI_FARM_MEMBER"],
          },
          {
            id: "rc-materials",
            label: "Vật tư",
            href: "/reports/crops/materials",
            roles: ["MEVI_FARM_MEMBER"],
          },
          // {
          //   id: "rc-inventory",
          //   label: "Tồn kho",
          //   href: "/reports/crops/inventory",
          //   roles: ["MEVI_FARM_MEMBER"],
          // },
        ],
      },
      // tạm ẩn
      // {
      //   id: "report-livestock",
      //   label: "Canh tác chăn nuôi",
      //   icon: Beef,
      //   href: "/reports/livestock/overview",
      //   roles: ["MEVI_FARM_MEMBER"],
      //   children: [
      //     {
      //       id: "rl-overview",
      //       label: "Tổng quan",
      //       href: "/reports/livestock/overview",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "rl-plan-work",
      //       label: "Kế hoạch - công việc",
      //       href: "/reports/livestock/plan-work",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "rl-harvest",
      //       label: "Thu hoạch",
      //       href: "/reports/livestock/harvest",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "rl-materials",
      //       label: "Vật tư",
      //       href: "/reports/livestock/materials",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "rl-inventory",
      //       label: "Tồn kho",
      //       href: "/reports/livestock/inventory",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //   ],
      // },
      // {
      //   id: "report-aqua",
      //   label: "Canh tác nuôi trồng thủy sản",
      //   icon: Fish,
      //   href: "/reports/aqua/overview",
      //   roles: ["MEVI_FARM_MEMBER"],
      //   children: [
      //     {
      //       id: "ra-overview",
      //       label: "Tổng quan",
      //       href: "/reports/aqua/overview",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "ra-plan-work",
      //       label: "Kế hoạch - công việc",
      //       href: "/reports/aqua/plan-work",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "ra-harvest",
      //       label: "Thu hoạch",
      //       href: "/reports/aqua/harvest",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "ra-materials",
      //       label: "Vật tư",
      //       href: "/reports/aqua/materials",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //     {
      //       id: "ra-inventory",
      //       label: "Tồn kho",
      //       href: "/reports/aqua/inventory",
      //       roles: ["MEVI_FARM_MEMBER"],
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Dữ liệu liên kết",
    items: [
      {
        id: "parent-crop",
        label: "Cây trồng & Giống",
        icon: Leaf,
        children: [
          {
            id: "fd-group-crop",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Nhóm cây trồng",
            // icon: Trees,
            href: "/group-crop",
          },
          {
            id: "fd-crop",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Cây trồng",
            // icon: Flower2,
            href: "/crop-foundation",
          },
          {
            id: "fd-variety",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Giống cây trồng",
            // icon: Sprout,
            href: "/variety-foundation",
          },
        ],
      },
      // Tạm ẩn
      // {
      //   id: "fd-group-livestock",
      //   label: "Nhóm vật nuôi",
      //   icon: PiggyBank,
      //   href: "/group-livestock",
      //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      // },
      // {
      //   id: "fd-group-aqua",
      //   label: "Nhóm thủy sản",
      //   icon: Fish,
      //   href: "/group-aqua",
      //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      // },
      {
        id: "season",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        label: "Chu kỳ sinh trưởng",
        icon: CalendarDays,
        href: "/season",
      },
      {
        id: "land-and-terrain",
        label: "Đất đai và Địa hình",
        icon: Mountain,
        roles: ["MEVI_ADMIN", "MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN"],
        children: [
          {
            id: "terrain",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Đặc điểm địa hình",
            // icon: Mountain,
            href: "/terrain",
          },
          {
            id: "fd-land-specs",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Thông số địa hình",
            // icon: SquareM,
            href: "/land-specs",
          },
          {
            id: "land",
            label: "Chất đất",
            // icon: Layers,
            href: "/land",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          },
        ],
      },
      {
        id: "farming-method",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        label: "Phương pháp sản xuất",
        icon: Leaf,
        // href: "/farming-method",
        children: [
          {
            id: "farming-method",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Định nghĩa",
            href: "/farming-method",
          },
          {
            label: "Liên kết giống",
            id: "farming-method-crop",
            href: "/farming-method-crop",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          },
          {
            id: "irrigation-systems",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Phương pháp tưới tiêu",
            // icon: Leaf,
            href: "/irrigation-systems",
          },
        ],
      },

      {
        id: "certificate",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        label: "Bộ tiêu chuẩn",
        icon: Award,
        href: "/certificate",
      },
      {
        id: "bank-directory",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        label: "Ngân hàng",
        icon: Landmark,
        href: "/bank-directory",
      },
      {
        icon: Group,
        id: "organization-structure",
        label: "Cơ cấu tổ chức",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        children: [
          {
            id: "enterprise-type",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Nhóm tổ chức",
            // icon: Building2,
            href: "/enterprise-type",
          },
          {
            id: "md-group-position",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Nhóm chức vụ - chức danh",
            // icon: CirclePile,
            href: "/group-position",
          },
          {
            id: "enterprise-form",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Loại hình tổ chức",
            // icon: Building2,
            href: "/enterprise-form",
          },
          {
            id: "department",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Phòng ban",
            // icon: Building,
            href: "/department",
          },
          {
            id: "position",
            label: "Chức vụ",
            // icon: User,
            href: "/position",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          },
        ],
      },
      {
        id: "group-material",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        label: "Nhóm vật tư",
        icon: Package2,
        href: "/group-material",
        children: [
          {
            id: "material-group",
            label: "Nhóm vật tư khác",
            // icon: Boxes,
            href: "/material-group",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          },
          {
            id: "fertilizer-group",
            label: "Nhóm phân bón",
            // icon: Atom,
            href: "/fertilizer-group",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          },
          {
            id: "pesticide-group",
            label: "Nhóm thuốc BVTV",
            // icon: Bug,
            href: "/pesticide-group",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          },
          // Tạm ẩn
          // {
          //   id: "livestock-medicine-group",
          //   label: "Nhóm thuốc (Chăn nuôi)",
          //   // icon: ShieldCheck,
          //   href: "/livestock-medicine-group",
          //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          // },
          // {
          //   id: "aquaculture-medicine-group",
          //   label: "Nhóm thuốc (Thủy sản)",
          //   // icon: Fish,
          //   href: "/aquaculture-medicine-group",
          //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          // },
          {
            id: "vehicle-group",
            label: "Nhóm máy móc - thiết bị",
            // icon: Tractor,
            href: "/vehicle-group",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          },
        ],
      },
      {
        id: "plan-and-task",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        label: "Kế hoạch & Công việc",
        icon: ClipboardList,
        href: "/plan-and-task",
        children: [
          {
            id: "task-category",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Hạng mục công việc",
            // icon: ClipboardList,
            href: "/task-category",
          },
          // {
          //   id: "document-category",
          //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
          //   label: "Danh mục tài liệu",
          //   // icon: FileText,
          //   href: "/document-category",
          // },
        ],
      },
      {
        id: "province",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        label: "Thông tin tỉnh/thành",
        icon: MapPin,
        href: "/province",
      },
      // {
      //   id: "iot-device-group",
      //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //   label: "Nhóm thiết bị IOT",
      //   icon: Cpu,
      //   href: "/iot-device-group",
      // },
      {
        id: "admin-crop-supplies",
        roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
        label: "Vật tư trồng trọt",
        icon: TreePine,
        href: "/admin/material",
        children: [
          {
            id: "pesticide",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Thuốc BVTV",
            href: "/admin/pesticide",
          },
          {
            id: "fertilizer",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Phân bón",
            href: "/admin/fertilizer",
          },
          {
            id: "material",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Vật tư khác",
            href: "/admin/material",
          },
          {
            id: "equipment",
            roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
            label: "Dụng cụ – Máy móc",
            href: "/admin/equipment",
          },
        ],
      },
      // Tạm ẩn
      // {
      //   id: "admin-livestock-supplies",
      //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //   label: "Vật tư chăn nuôi",
      //   icon: PiggyBank,
      //   href: "/admin/ah-material",
      //   children: [
      //     {
      //       id: "pesticide",
      //       roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //       label: "Thuốc",
      //       href: "/admin/ah-pesticide",
      //     },
      //     {
      //       id: "material",
      //       roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //       label: "Vật tư khác",
      //       href: "/admin/ah-material",
      //     },
      //     {
      //       id: "equipment",
      //       roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //       label: "Dụng cụ – Máy móc",
      //       href: "/admin/ah-equipment",
      //     },
      //   ],
      // },
      // {
      //   id: "admin-aquaculture-supplies",
      //   roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //   label: "Vật tư thủy sản",
      //   icon: Fish,
      //   href: "/admin/aq-material",
      //   children: [
      //     {
      //       id: "pesticide",
      //       roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //       label: "Thuốc",
      //       href: "/admin/aq-pesticide",
      //     },
      //     {
      //       id: "material",
      //       roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //       label: "Vật tư khác",
      //       href: "/admin/aq-material",
      //     },
      //     {
      //       id: "equipment",
      //       roles: ["MEVI_FARM_ADMIN", "MEVI_SUPER_ADMIN", "MEVI_ADMIN"],
      //       label: "Dụng cụ – Máy móc",
      //       href: "/admin/aq-equipment",
      //     },
      //   ],
      // },
    ],
  },
];

export const menuEcoSystemAdminGroups: MenuSection[] = [
  {
    title: "Quản lý người giới thiệu",
    items: [
      {
        href: "/referrals",
        id: "referrals",
        icon: Users,
        label: "Danh sách người giới thiệu",
      },
      {
        id: "referrals-update",
        href: "/referrals/update-user",
        icon: UserRoundPlus,
        label: "Cập nhật người được giới thiệu",
      },
      // {
      //   id: "system-account",
      //   label: "Quản lý tài khoản",
      //   icon: Users,
      //   href: "/users",
      // },
    ],
  },
];
