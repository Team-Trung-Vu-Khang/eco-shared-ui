import type { ElementType } from "react";
import {
  Atom,
  Award,
  BookOpenText,
  Boxes,
  Briefcase,
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
  Tractor,
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
  Shell,
  Fish,
  UserCog,
  ShieldCheck,
  PiggyBank,
  Download,
  Upload,
  List,
  UserRoundPlus,
  Beef,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: ElementType;
  href?: string;
  children?: { id: string; label: string; href: string }[];
}

export type MenuGroup = {
  title: string;
  items: MenuItem[];
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
      {
        id: "treatment-report",
        label: "Báo cáo điều trị",
        icon: Heart,
        href: "/treatment-report",
      },
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
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    ],
  },
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
        id: "owner-department",
        label: "Phòng ban",
        icon: Building,
        href: "/owner-department",
      },
      {
        id: "owner-position",
        label: "Chức vụ",
        icon: User,
        href: "/owner-position",
      },
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
    title: "Vùng sản xuất",
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
        label: "Trồng trọt",
        icon: TreePine,
        href: "/cultivation-zone",
        children: [
          {
            id: "cultivation-region",
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
          {
            id: "growth-cycle",
            label: "Vụ mùa",
            href: "/growth-cycle",
          },
        ],
      },
      {
        id: "animal-husbandry",
        label: "Chăn nuôi",
        icon: PiggyBank,
        href: "/animal-husbandry",
        children: [
          {
            label: "Vùng chăn nuôi",
            id: "animal-husbandry-region",
            href: "/animal-husbandry-region",
          },
          {
            label: "Định danh cá thể",
            id: "animal-identification",
            href: "/animal-identification",
          },
          {
            label: "Tìm kiếm cá thể",
            id: "animal-identification-search",
            href: "/animal-identification/search",
          },
          {
            label: "Tìm kiếm trang trại",
            id: "animal-identification-search-farm",
            href: "/animal-identification/search-farm",
          },
          {
            id: "animal-distribution-detail",
            label: "Chi tiết phân bổ",
            href: "/animal-distribution-detail",
          },
          {
            id: "animal-growth-cycle",
            label: "Vụ nuôi",
            href: "/animal-growth-cycle",
          },
        ],
      },
      {
        id: "aquaculture",
        label: "Nuôi trồng thuỷ sản",
        icon: Fish,
        href: "/aquaculture",
        children: [
          {
            label: "Vùng nuôi trồng",
            id: "aquaculture-region",
            href: "/aquaculture-region",
          },
          {
            label: "Định danh cá thể",
            id: "aquaculture-identification",
            href: "/aquaculture-identification",
          },
          {
            label: "Tìm kiếm cá thể",
            id: "aquaculture-identification-search",
            href: "/aquaculture-identification/search",
          },
          {
            label: "Tìm kiếm trang trại",
            id: "aquaculture-search-farm",
            href: "/aquaculture-search-farm",
          },
          {
            id: "aquaculture-distribution-detail",
            label: "Chi tiết phân bổ",
            href: "/aquaculture-distribution-detail",
          },
          {
            id: "aquaculture-growth-cycle",
            label: "Vụ nuôi",
            href: "/aquaculture-growth-cycle",
          },
        ],
      },
      {
        id: "cultivation-region-identification",
        label: "Định danh vùng canh tác",
        icon: IdCardIcon,
        href: "/cultivation-region-identification",
        children: [
          {
            id: "cultivation-region-identification-crop",
            label: "Trồng trọt",
            href: "/cultivation-region-identification/crop",
          },
          {
            id: "animal-identification",
            label: "Chăn nuôi",
            href: "/cultivation-region-identification/animal",
          },
          {
            id: "aquaculture-identification",
            label: "Nuôi trồng thuỷ sản",
            href: "/cultivation-region-identification/aquaculture",
          },
        ],
      },
      {
        id: "legal-identification",
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
      {
        id: "docs",
        label: "Tài liệu kỹ thuật",
        icon: BookOpenText,
        href: "/docs",
      },
      {
        id: "treatment",
        label: "Phác đồ điều trị",
        icon: Heart,
        href: "/treatment",
      },
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
      },
      {
        id: "supply-conversion-rules",
        label: "Đơn vị quy đổi",
        icon: Scale,
        href: "/supply-conversion-rules",
      },
      {
        id: "cultivation-material",
        label: "Vật tư trồng trọt",
        icon: TreePine,
        href: "/cultivation-zone",
        children: [
          {
            id: "pesticide",
            label: "Thuốc BVTV",
            href: "/cultivation-material/pesticide",
          },
          {
            id: "fertilizer",
            label: "Phân bón",
            href: "/cultivation-material/fertilizer",
          },
          {
            id: "material",
            label: "Vật tư khác",
            href: "/cultivation-material/material",
          },
          {
            id: "equipment",
            label: "Dụng cụ – Máy móc",
            href: "/cultivation-material/equipment",
          },
        ],
      },
      {
        id: "animal-husbandry-material",
        label: "Vật tư chăn nuôi",
        icon: PiggyBank,
        href: "/animal-husbandry-material",
        children: [
          {
            id: "pesticide",
            label: "Thuốc",
            href: "/animal-husbandry-material/pesticide",
          },
          {
            id: "material",
            label: "Vật tư khác",
            href: "/animal-husbandry-material/material",
          },
          {
            id: "equipment",
            label: "Dụng cụ – Máy móc",
            href: "/animal-husbandry-material/equipment",
          },
        ],
      },
      {
        id: "aquaculture-material",
        label: "Vật tư nuôi trồng thủy sản",
        icon: Fish,
        href: "/aquaculture-material",
        children: [
          {
            id: "pesticide",
            label: "Thuốc",
            href: "/aquaculture-material/pesticide",
          },
          {
            id: "material",
            label: "Vật tư khác",
            href: "/aquaculture-material/material",
          },
          {
            id: "equipment",
            label: "Dụng cụ – Máy móc",
            href: "/aquaculture-material/equipment",
          },
        ],
      },
    ],
  },
  {
    title: "Kế hoạch & Công việc",
    items: [
      {
        id: "plan",
        label: "Quản lý canh tác",
        icon: ClipboardList,
        children: [
          {
            id: "plan-crop",
            label: "Kế hoạch mùa vụ",
            href: "/plan-growth",
          },
          {
            id: "plan-animal",
            label: "Kế hoạch chăn nuôi",
            href: "/plan-animal-growth",
          },
          {
            id: "plan-aquaculture",
            label: "Kế hoạch nuôi trồng thủy sản",
            href: "/plan-aquaculture-growth",
          },
        ],
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
      {
        id: "soil-amendment-treatment",
        label: "Phác đồ cải tạo",
        href: "/soil-amendment-treatment",
        icon: Heart,
      },
    ],
  },
  {
    title: "Hồ sơ",
    items: [
      { id: "contract", label: "Hợp đồng", icon: FileText, href: "/contract" },
      {
        id: "document-version",
        label: "Quản lý phiên bản tài liệu",
        icon: BookOpenText,
        href: "/document-version",
      },
    ],
  },
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
    title: "Kho vật tư",
    items: [
      {
        id: "inventory-area",
        label: "Khu vực kho",
        icon: Map,
        href: "/inventory-area",
      },
      {
        id: "crop-material-inventory",
        label: "Kho vật tư trồng trọt",
        icon: TreePine,
        href: "/crop-material-inventory",
      },
      {
        id: "livestock-material-inventory",
        label: "Kho vật tư chăn nuôi",
        icon: PiggyBank,
        href: "/livestock-material-inventory",
      },
      {
        id: "aquaculture-material-inventory",
        label: "Kho vật tư nuôi trồng thuỷ sản",
        icon: Fish,
        href: "/aquaculture-material-inventory",
      },
      {
        id: "inventory-lookup",
        label: "Tra cứu tồn kho",
        icon: Search,
        href: "/inventory-lookup",
      },
      {
        id: "inventory-in",
        label: "Nhập kho",
        icon: Download,
        href: "/inventory-in",
      },
      {
        id: "inventory-out",
        label: "Xuất kho",
        icon: Upload,
        href: "/inventory-out",
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
      {
        id: "treatment-report",
        label: "Báo cáo điều trị",
        icon: Heart,
        href: "/treatment-report",
      },
      {
        id: "amendment-report",
        label: "Báo cáo cải tạo",
        icon: Wrench,
        href: "/amendment-report",
      },
      {
        id: "harvest-report",
        label: "Báo cáo thu hoạch",
        icon: Leaf,
        href: "/harvest-report",
      },
      {
        id: "environment-iot-report",
        label: "Báo cáo môi trường và IoT",
        icon: Cpu,
        href: "/environment-iot-report",
      },
      {
        id: "executive-dashboard",
        label: "Dashboard điều hành tổng hợp",
        icon: LayoutDashboard,
        href: "/executive-dashboard",
      },
      {
        id: "summary-report-export",
        label: "Xuất báo cáo tổng hợp",
        icon: FileText,
        href: "/summary-report-export",
      },
      {
        id: "report-crops",
        label: "Canh tác trồng trọt",
        icon: Sprout,
        href: "/reports/crops/overview",
        children: [
          {
            id: "rc-overview",
            label: "Tổng quan",
            href: "/reports/crops/overview",
          },
          {
            id: "rc-plan-work",
            label: "Kế hoạch - công việc",
            href: "/reports/crops/plan-work",
          },
          {
            id: "rc-harvest",
            label: "Thu hoạch",
            href: "/reports/crops/harvest",
          },
          {
            id: "rc-materials",
            label: "Vật tư",
            href: "/reports/crops/materials",
          },
          {
            id: "rc-inventory",
            label: "Tồn kho",
            href: "/reports/crops/inventory",
          },
        ],
      },
      {
        id: "report-livestock",
        label: "Canh tác chăn nuôi",
        icon: Beef,
        href: "/reports/livestock/overview",
        children: [
          {
            id: "rl-overview",
            label: "Tổng quan",
            href: "/reports/livestock/overview",
          },
          {
            id: "rl-plan-work",
            label: "Kế hoạch - công việc",
            href: "/reports/livestock/plan-work",
          },
          {
            id: "rl-harvest",
            label: "Thu hoạch",
            href: "/reports/livestock/harvest",
          },
          {
            id: "rl-materials",
            label: "Vật tư",
            href: "/reports/livestock/materials",
          },
          {
            id: "rl-inventory",
            label: "Tồn kho",
            href: "/reports/livestock/inventory",
          },
        ],
      },
      {
        id: "report-aqua",
        label: "Canh tác nuôi trồng thủy sản",
        icon: Fish,
        href: "/reports/aqua/overview",
        children: [
          {
            id: "ra-overview",
            label: "Tổng quan",
            href: "/reports/aqua/overview",
          },
          {
            id: "ra-plan-work",
            label: "Kế hoạch - công việc",
            href: "/reports/aqua/plan-work",
          },
          {
            id: "ra-harvest",
            label: "Thu hoạch",
            href: "/reports/aqua/harvest",
          },
          {
            id: "ra-materials",
            label: "Vật tư",
            href: "/reports/aqua/materials",
          },
          {
            id: "ra-inventory",
            label: "Tồn kho",
            href: "/reports/aqua/inventory",
          },
        ],
      },
    ],
  },
  {
    title: "Dữ liệu liên kết",
    items: [
      {
        id: "fd-group-crop",
        label: "Nhóm cây trồng",
        icon: Trees,
        href: "/group-crop",
      },
      {
        id: "fd-group-livestock",
        label: "Nhóm vật nuôi",
        icon: PiggyBank,
        href: "/group-livestock",
      },
      {
        id: "fd-group-aqua",
        label: "Nhóm thủy sản",
        icon: Fish,
        href: "/group-aqua",
      },
      {
        id: "fd-crop",
        label: "Cây trồng",
        icon: Flower2,
        href: "/crop-foundation",
      },
      {
        id: "season",
        label: "Chu kỳ sinh trưởng",
        icon: CalendarDays,
        href: "/season",
      },
      {
        id: "terrain",
        label: "Đặc điểm địa hình",
        icon: Mountain,
        href: "/terrain",
      },
      {
        id: "fd-land-specs",
        label: "Thông số địa hình",
        icon: SquareM,
        href: "/land-specs",
      },
      { id: "land", label: "Chất đất", icon: Layers, href: "/land" },
      {
        id: "farming-method",
        label: "Phương pháp sản xuất",
        icon: Leaf,
        href: "/farming-method",
      },
      {
        id: "irrigation-systems",
        label: "Phương pháp tưới tiêu",
        icon: Leaf,
        href: "/irrigation-systems",
      },
      {
        id: "certificate",
        label: "Bộ tiêu chuẩn",
        icon: Award,
        href: "/certificate",
      },
      {
        id: "bank-directory",
        label: "Ngân hàng",
        icon: Landmark,
        href: "/bank-directory",
      },
      {
        id: "enterprise-type",
        label: "Nhóm tổ chức",
        icon: Building2,
        href: "/enterprise-type",
      },
      {
        id: "md-group-position",
        label: "Nhóm chức vụ - chức danh",
        icon: CirclePile,
        href: "/group-position",
      },
      {
        id: "enterprise-form",
        label: "Loại hình tổ chức",
        icon: Building2,
        href: "/enterprise-form",
      },
      {
        id: "department",
        label: "Phòng ban",
        icon: Building,
        href: "/department",
      },
      { id: "position", label: "Chức vụ", icon: User, href: "/position" },
      {
        id: "material-group",
        label: "Nhóm vật tư khác",
        icon: Boxes,
        href: "/material-group",
      },
      {
        id: "fertilizer-group",
        label: "Nhóm phân bón",
        icon: Atom,
        href: "/fertilizer-group",
      },
      {
        id: "pesticide-group",
        label: "Nhóm thuốc BVTV",
        icon: Bug,
        href: "/pesticide-group",
      },
      {
        id: "livestock-medicine-group",
        label: "Nhóm thuốc (Chăn nuôi)",
        icon: ShieldCheck,
        href: "/livestock-medicine-group",
      },
      {
        id: "aquaculture-medicine-group",
        label: "Nhóm thuốc (Thủy sản)",
        icon: Fish,
        href: "/aquaculture-medicine-group",
      },
      {
        id: "vehicle-group",
        label: "Nhóm máy móc - thiết bị",
        icon: Tractor,
        href: "/vehicle-group",
      },
      {
        id: "task-category",
        label: "Hạng mục công việc",
        icon: ClipboardList,
        href: "/task-category",
      },
      {
        id: "document-category",
        label: "Danh mục tài liệu",
        icon: FileText,
        href: "/document-category",
      },
      {
        id: "province",
        label: "Thông tin tỉnh/thành",
        icon: MapPin,
        href: "/province",
      },
      {
        id: "iot-device-group",
        label: "Nhóm thiết bị IOT",
        icon: Cpu,
        href: "/iot-device-group",
      },
      {
        id: "admin-crop-supplies",
        label: "Vật tư trồng trọt (Hệ thống)",
        icon: TreePine,
        href: "/admin/material",
        children: [
          {
            id: "pesticide",
            label: "Thuốc BVTV",
            href: "/admin/pesticide",
          },
          {
            id: "fertilizer",
            label: "Phân bón",
            href: "/admin/fertilizer",
          },
          {
            id: "material",
            label: "Vật tư khác",
            href: "/admin/material",
          },
          {
            id: "equipment",
            label: "Dụng cụ – Máy móc",
            href: "/admin/equipment",
          },
        ],
      },
      {
        id: "admin-livestock-supplies",
        label: "Vật tư chăn nuôi (Hệ thống)",
        icon: PiggyBank,
        href: "/admin/ah-material",
        children: [
          {
            id: "pesticide",
            label: "Thuốc",
            href: "/admin/ah-pesticide",
          },
          {
            id: "material",
            label: "Vật tư khác",
            href: "/admin/ah-material",
          },
          {
            id: "equipment",
            label: "Dụng cụ – Máy móc",
            href: "/admin/ah-equipment",
          },
        ],
      },
      {
        id: "admin-aquaculture-supplies",
        label: "Vật tư thủy sản (Hệ thống)",
        icon: Fish,
        href: "/admin/aq-material",
        children: [
          {
            id: "pesticide",
            label: "Thuốc",
            href: "/admin/aq-pesticide",
          },
          {
            id: "material",
            label: "Vật tư khác",
            href: "/admin/aq-material",
          },
          {
            id: "equipment",
            label: "Dụng cụ – Máy móc",
            href: "/admin/aq-equipment",
          },
        ],
      },
      {
        label: "Phương thức canh tác theo cây trồng",
        id: "farming-method-crop",
        href: "/farming-method-crop",
        icon: Leaf,
      },
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
