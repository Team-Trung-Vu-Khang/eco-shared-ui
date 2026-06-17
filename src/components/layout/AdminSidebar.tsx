import React from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
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
  ChevronDown,
  ChevronRight,
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
  LogOut,
  Map,
  Menu,
  Mountain,
  Package,
  Scale,
  Settings,
  Sprout,
  Tractor,
  TreePine,
  Trees,
  User,
  Users,
  UsersRound,
  Wrench,
  X,
  Search,
  Cpu,
  MapPin,
  SquareM,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { id: string; label: string; href: string }[];
}

const menuProdGroups: { title: string; items: MenuItem[] }[] = [
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

const menuDevGroups: (
  | { title: string; items: MenuItem[] }
  | { note: string }
)[] = [
  {
    title: "Tổng quan",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
    ],
  },
  {
    note: "Foundation",
  },
  {
    title: "Cây trồng",
    items: [
      {
        id: "fd-group-crop",
        label: "Nhóm cây trồng",
        icon: Trees,
        href: "/group-crop",
      },
      {
        id: "fd-crop",
        label: "Cây trồng",
        icon: Flower2,
        href: "/crop-foundation",
      },
      {
        id: "fd-variety",
        label: "Giống cây trồng",
        icon: Sprout,
        href: "/variety-foudation",
      },
    ],
  },
  {
    title: "Canh tác",
    items: [
      {
        id: "fd-farming-method",
        label: "Phương thức canh tác",
        icon: Leaf,
        href: "/farming-method",
      },
      {
        id: "fd-farming-method-crop",
        label: "Phương thức canh tác theo từng cây trồng",
        icon: Sprout,
        href: "/farming-method-crop",
      },
      {
        id: "fd-growth-cycle",
        label: "Chu kỳ sinh trưởng",
        icon: CalendarDays,
        href: "/growth-cycle",
      },
    ],
  },
  {
    title: "Địa lý & Đất",
    items: [
      {
        id: "fd-land",
        label: "Loại đất",
        icon: Layers,
        href: "/land",
      },
      {
        id: "fd-terrain",
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
    ],
  },
  {
    note: "Master Data",
  },
  {
    title: "Tổ chức & Nhân sự",
    items: [
      {
        id: "md-department",
        label: "Thông tin các phòng ban",
        icon: Building,
        href: "/department",
      },
      {
        id: "md-position",
        label: "Thông tin các chức danh - chức vụ",
        icon: User,
        href: "/position",
      },
      {
        id: "md-industry",
        label: "Thông tin các ngành nghề",
        icon: Briefcase,
        href: "/enterprise-type",
      },
    ],
  },
  {
    title: "Hành chính & Tài chính",
    items: [
      {
        id: "md-province",
        label: "Thông tin phường/xã và tỉnh/thành",
        icon: MapPin,
        href: "/province",
      },
      {
        id: "md-bank",
        label: "Thông tin các ngân hàng",
        icon: Landmark,
        href: "/bank-directory",
      },
    ],
  },
  {
    title: "Tiêu chuẩn & Chứng chỉ",
    items: [
      {
        id: "md-certificate",
        label: "Thông tin các loại chứng chỉ và chứng chỉ trong nông nghiệp",
        icon: Award,
        href: "/certificate",
      },
    ],
  },
  {
    title: "Nhóm vật tư",
    items: [
      {
        id: "md-pesticide-group",
        label: "Thông tin nhóm Thuốc BVTV",
        icon: Bug,
        href: "/pesticide-group",
      },
      {
        id: "md-material-group",
        label: "Thông tin nhóm vật tư trong nông nghiệp",
        icon: Boxes,
        href: "/material-group",
      },
      {
        id: "md-fertilizer-group",
        label: "Thông tin nhóm phân bón",
        icon: Atom,
        href: "/fertilizer-group",
      },
      {
        id: "md-vehicle-group",
        label: "Thông tin nhóm dụng cụ - máy móc trong nông nghiệp",
        icon: Tractor,
        href: "/vehicle-group",
      },
    ],
  },
  {
    title: "IoT & Kế hoạch",
    items: [
      {
        id: "md-iot-device-group",
        label: "Thông tin nhóm thiết bị IoT",
        icon: Cpu,
        href: "/iot-device-group",
      },
      {
        id: "md-plan-type",
        label: "Thông tin nhóm kế hoạch",
        icon: ClipboardList,
        href: "/plan-type",
      },
    ],
  },
  {
    note: "Data Owner",
  },
  {
    title: "Tổ chức & Nhân sự",
    items: [
      {
        id: "do-department",
        label: "Thông tin phòng ban",
        icon: Building,
        href: "/department",
      },
      {
        id: "do-position",
        label: "Thông tin chức danh - chức vụ",
        icon: User,
        href: "/position",
      },
      {
        id: "do-unit",
        label: "Thông tin đơn vị",
        icon: Building2,
        href: "/unit",
        children: [
          { id: "do-enterprise", label: "Doanh nghiệp", href: "/enterprise" },
          { id: "do-farmer", label: "Nông hộ", href: "/farmer" },
          { id: "do-cooperative", label: "Hợp tác xã", href: "/cooperative" },
        ],
      },
      {
        id: "do-contact",
        label: "Thông tin danh bạ liên hệ",
        icon: Users,
        href: "/contact",
      },
      {
        id: "do-bank",
        label: "Thông tin tài khoản ngân hàng",
        icon: Landmark,
        href: "/bank",
      },
      {
        id: "do-branch",
        label: "Thiết lập chi nhánh",
        icon: GitBranch,
        href: "/branch",
      },
      {
        id: "do-personnel",
        label: "Thông tin nhân sự",
        icon: Users,
        href: "/personnel",
      },
      {
        id: "do-team",
        label: "Thông tin đội nhóm",
        icon: UsersRound,
        href: "/team",
      },
    ],
  },
  {
    title: "Vùng trồng & Canh tác",
    items: [
      {
        id: "do-seed",
        label: "Thông tin hạt giống",
        icon: Leaf,
        href: "/seed",
      },
      {
        id: "do-region-chart",
        label: "Định danh vùng trồng địa lý",
        icon: Map,
        href: "/region-chart",
        children: [
          {
            id: "do-region-dist",
            label: "Phân bố vùng",
            href: "/region-distribution",
          },
          {
            id: "do-area-dist",
            label: "Phân bố khu vực",
            href: "/area-distribution",
          },
          {
            id: "do-plot-dist",
            label: "Phân bố lô",
            href: "/plot-distribution",
          },
        ],
      },
      {
        id: "do-cultivation-region",
        label: "Định danh vùng canh tác",
        icon: TreePine,
        href: "/cultivation-region",
      },
      {
        id: "do-plant-identification",
        label: "Định danh cây trồng",
        icon: Flower2,
        href: "/plant-identification",
      },
      {
        id: "do-map-view",
        label: "Bản đồ vùng trồng",
        icon: Map,
        href: "/map-view",
      },
    ],
  },
  {
    title: "Thiết lập sản xuất & Kho",
    items: [
      {
        id: "do-growth-cycle",
        label: "Thiết lập chu kỳ sinh trưởng",
        icon: CalendarDays,
        href: "/growth-cycle",
      },
      {
        id: "do-season",
        label: "Thiết lập mùa vụ",
        icon: CalendarDays,
        href: "/season",
      },
      {
        id: "do-unit-convert",
        label: "Đơn vị quy đổi",
        icon: Scale,
        href: "/unit",
      },
      {
        id: "do-warehouse",
        label: "Thông tin kho xưởng",
        icon: Package,
        href: "/warehouse",
      },
      {
        id: "do-inventory-in",
        label: "Nhập kho Thuốc BVTV – Phân bón – Máy móc – Vật tư",
        icon: Package,
        href: "/inventory-in",
      },
      {
        id: "do-inventory-out",
        label: "Xuất kho Thuốc BVTV – Phân bón – Máy móc – Vật tư – Nông sản",
        icon: Package,
        href: "/inventory-out",
      },
    ],
  },
  {
    title: "Kế hoạch & Phác đồ",
    items: [
      {
        id: "do-plan",
        label: "Lập kế hoạch",
        icon: ClipboardList,
        href: "/plan",
      },
      {
        id: "do-task",
        label: "Tạo công việc",
        icon: CheckSquare,
        href: "/task",
      },
      {
        id: "do-amendment-treatment",
        label: "Phác đồ cải tạo",
        icon: Heart,
        href: "/soil-amendment-treatment",
      },
      {
        id: "do-treatment",
        label: "Phác đồ điều trị bệnh",
        icon: Heart,
        href: "/treatment",
      },
    ],
  },
  {
    title: "Báo cáo",
    items: [
      {
        id: "do-inventory-report",
        label: "Báo cáo nhập – xuất kho",
        icon: ClipboardList,
        href: "/inventory-report",
      },
      {
        id: "do-warehouse-report",
        label:
          "Báo cáo hiện trạng kho Thuốc BVTV – Phân bón – Máy móc – Vật tư",
        icon: ClipboardList,
        href: "/warehouse-report",
      },
      {
        id: "do-plan-task-report",
        label: "Báo cáo kế hoạch – công việc",
        icon: ClipboardList,
        href: "/plan-task-report",
      },
      {
        id: "do-harvest-report",
        label: "Báo cáo thu hoạch",
        icon: Leaf,
        href: "/harvest-report",
      },
      {
        id: "do-amendment-report",
        label: "Báo cáo quá trình xử lý theo phác đồ cải tạo",
        icon: Wrench,
        href: "/amendment-report",
      },
      {
        id: "do-treatment-report",
        label: "Báo cáo quá trình xử lý theo phác đồ điều trị bệnh",
        icon: Heart,
        href: "/treatment-report",
      },
    ],
  },
  {
    title: "IoT Nông nghiệp",
    items: [
      {
        id: "do-iot-device",
        label: "Thiết bị IoT",
        icon: Cpu,
        href: "/iot-device",
      },
      {
        id: "do-iot-identification",
        label: "Định danh IoT",
        icon: Cpu,
        href: "/iot-identification",
      },
      {
        id: "do-iot-map",
        label: "Bản đồ IoT và trình trạng kết nối",
        icon: Map,
        href: "/map-iot-device",
      },
      {
        id: "do-iot-maintenance",
        label: "Lên hạng mục và cảnh báo bảo trì thiết bị IoT",
        icon: Cpu,
        href: "/iot-maintenance",
      },
      {
        id: "do-equipment-maintenance",
        label: "Lên hạng mục và cảnh báo bảo trì thiết bị dụng vụ - máy móc",
        icon: Wrench,
        href: "/equipment-maintenance",
      },
    ],
  },
  { note: "" },
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
      {
        id: "group-crop",
        label: "Nhóm cây trồng",
        icon: Trees,
        href: "/group-crop",
      },
      { id: "crop", label: "Cây trồng", icon: Flower2, href: "/crop" },
      {
        id: "variety",
        label: "Giống cây trồng",
        icon: Sprout,
        href: "/variety",
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
        label: "Phân nhóm kế hoạch",
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
        id: "iot-device-group",
        label: "Thông tin nhóm thiết bị IoT",
        icon: Cpu,
        href: "/iot-device-group",
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
    ],
  },
  {
    title: "Dữ liệu liên kết",
    items: [
      {
        id: "group-crop",
        label: "Nhóm cây trồng",
        icon: Trees,
        href: "/group-crop",
      },
      {
        id: "crop-foundation",
        label: "Cây trồng",
        icon: Flower2,
        href: "/crop-foundation",
      },
      {
        icon: Sprout,
        id: "variety-foundation",
        label: "Giống cây trồng",
        href: "/variety-foudation",
      },
      {
        id: "growth-cycle",
        label: "Chu kỳ sinh trưởng",
        icon: CalendarDays,
        href: "/growth-cycle",
      },
      {
        id: "terrain",
        label: "Đặc điểm địa hình",
        icon: Mountain,
        href: "/terrain",
      },
      {
        id: "land-specs",
        label: "Thông số địa hình",
        icon: SquareM,
        href: "/land-specs",
      },
      { id: "land", label: "Loại đất", icon: Layers, href: "/land" },
      {
        id: "farming-method",
        label: "Phương thức canh tác",
        icon: Leaf,
        href: "/farming-method",
      },
      {
        id: "farming-method-crop",
        label: "Phương thức canh tác theo cây trồng",
        icon: Sprout,
        href: "/farming-method-crop",
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
        id: "enterprise-form",
        label: "Loại hình tổ chức",
        icon: Building2,
        href: "/enterprise-form",
      },
      {
        id: "material-group",
        label: "Nhóm vật tư",
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
        id: "vehicle-group",
        label: "Nhóm máy móc - thiết bị",
        icon: Tractor,
        href: "/vehicle-group",
      },
      {
        id: "document-category",
        label: "Danh mục tài liệu",
        icon: FileText,
        href: "/document-category",
      },
      {
        id: "province",
        label: "Thông tin phường/xã và tỉnh/thành",
        icon: MapPin,
        href: "/province",
      },
    ],
  },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  isDev?: boolean;
}

export function AdminSidebar({
  collapsed = false,
  onToggle,
  isDev = false,
}: AdminSidebarProps) {
  const [location, setLocation] = useLocation();
  const menuGroups = isDev ? menuDevGroups : menuProdGroups;
  const defaultExpandedGroups = menuGroups
    .filter((group) => "title" in group)
    .map((group) => group.title);
  // State persistence keys
  const STORAGE_KEY_GROUPS = "sidebar_expanded_groups";
  const STORAGE_KEY_ITEMS = "sidebar_expanded_items";
  const STORAGE_KEY_SCROLL = "sidebar_scroll_position";

  // Initialize state from storage or defaults
  const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_GROUPS);
    return saved ? JSON.parse(saved) : defaultExpandedGroups;
  });

  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_ITEMS);
    return saved ? JSON.parse(saved) : [];
  });

  // Use a standard ref and useEffect for clearer cleanup logic

  // Use a standard ref and useEffect for clearer cleanup logic
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isMounting, setIsMounting] = useState(true);

  // Restore scroll position as early as possible
  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    const viewport = root.querySelector("[data-radix-scroll-area-viewport]");
    if (!viewport) return;

    const savedScroll = sessionStorage.getItem(STORAGE_KEY_SCROLL);
    if (savedScroll) {
      viewport.scrollTop = parseInt(savedScroll, 10);
    }

    const handleScroll = () => {
      sessionStorage.setItem(STORAGE_KEY_SCROLL, viewport.scrollTop.toString());
    };

    viewport.addEventListener("scroll", handleScroll);

    // Disable mounting flag after a brief moment
    const timer = setTimeout(() => setIsMounting(false), 50);

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Persist state changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_GROUPS, JSON.stringify(expandedGroups));
  }, [expandedGroups]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(expandedItems));
  }, [expandedItems]);

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  // Custom navigation handler to prevent auto-scroll of the main window,
  // sidebar scroll is handled by the persistence logic above.
  const handleNavigate = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Navigate
    setLocation(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground flex flex-col",
        !isMounting && "transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
      data-testid="admin-sidebar"
    >
      <div
        className={cn(
          "flex items-center h-16 border-b border-sidebar-border transition-all duration-300",
          collapsed ? "justify-center px-2" : "px-4",
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap animation-fade-in">
            <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
              <Tractor className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg leading-tight">
                FARM
              </h1>
              <p className="text-xs text-sidebar-foreground/60">Admin Portal</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent transition-all",
            !collapsed && "ml-auto",
          )}
          onClick={onToggle}
          data-testid="toggle-sidebar"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4 scrollbar-thin" ref={viewportRef}>
        <TooltipProvider delayDuration={0}>
          <nav className="px-2 space-y-6">
            {menuGroups.map((group, index) => {
              if ("note" in group) {
                return collapsed ? null : (
                  <div
                    key={`${group.note}-${index}`}
                    className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-sidebar-foreground/35"
                  >
                    ----- {group.note} -----
                  </div>
                );
              }

              return (
                <div key={group.title}>
                  {!collapsed && (
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50 hover:text-sidebar-foreground/80 transition-colors"
                      data-testid={`group-${group.title}`}
                    >
                      <span>{group.title}</span>
                      {expandedGroups.includes(group.title) ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                  {(collapsed || expandedGroups.includes(group.title)) && (
                    <div className="mt-1 space-y-0.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const hasChildren =
                          item.children && item.children.length > 0;
                        const isExpanded = expandedItems.includes(item.id);
                        // Check if any child is active
                        const isChildActive = item.children?.some(
                          (child) => location === child.href,
                        );
                        const isActive =
                          location === item.href || isChildActive;

                        if (hasChildren) {
                          const triggerContent = (
                            <div
                              className={cn(
                                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer select-none",
                                isActive
                                  ? "text-sidebar-primary font-semibold"
                                  : "text-sidebar-foreground/80",
                                collapsed && "justify-center px-2",
                              )}
                              onClick={() => {
                                if (!collapsed) toggleItem(item.id);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-4.5 h-4.5 shrink-0" />
                                {!collapsed && <span>{item.label}</span>}
                              </div>
                              {!collapsed &&
                                (isExpanded ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                ))}
                            </div>
                          );

                          return (
                            <div
                              key={item.id}
                              className="space-y-1 relative group/item"
                            >
                              {collapsed ? (
                                <HoverCard openDelay={100} closeDelay={100}>
                                  <HoverCardTrigger asChild>
                                    {triggerContent}
                                  </HoverCardTrigger>
                                  <HoverCardContent
                                    side="right"
                                    align="start"
                                    className="w-48 p-0 overflow-hidden"
                                  >
                                    <div className="px-3 py-2 bg-muted/50 text-xs font-bold text-muted-foreground uppercase border-b border-border">
                                      {item.label}
                                    </div>
                                    <div className="p-1">
                                      {item.children!.map((child) => {
                                        const isItemActive =
                                          location === child.href;
                                        return (
                                          <a
                                            key={child.id}
                                            href={child.href}
                                            onClick={handleNavigate(child.href)}
                                            className={cn(
                                              "block px-3 py-2 rounded-md text-sm transition-colors cursor-pointer",
                                              isItemActive
                                                ? "text-primary font-medium bg-primary/10"
                                                : "text-foreground/80 hover:text-foreground hover:bg-muted",
                                            )}
                                          >
                                            {child.label}
                                          </a>
                                        );
                                      })}
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              ) : (
                                <>
                                  {triggerContent}
                                  {isExpanded && (
                                    <div className="ml-4 pl-3 border-l border-sidebar-border/50 space-y-1 animation-slide-down">
                                      {item.children!.map((child) => {
                                        const isItemActive =
                                          location === child.href;
                                        return (
                                          <a
                                            key={child.id}
                                            href={child.href}
                                            onClick={handleNavigate(child.href)}
                                            className={cn(
                                              "block px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                                              isItemActive
                                                ? "text-sidebar-primary font-medium bg-sidebar-accent/50"
                                                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30",
                                            )}
                                          >
                                            {child.label}
                                          </a>
                                        );
                                      })}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        }

                        const linkContent = (
                          <a
                            href={item.href || "#"}
                            onClick={
                              item.href ? handleNavigate(item.href) : undefined
                            }
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer relative group",
                              isActive
                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              collapsed && "justify-center px-2",
                            )}
                            data-testid={`menu-${item.id}`}
                          >
                            <Icon className="w-4.5 h-4.5 shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                          </a>
                        );

                        if (collapsed) {
                          return (
                            <Tooltip key={item.id}>
                              <TooltipTrigger asChild>
                                {linkContent}
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                {item.label}
                              </TooltipContent>
                            </Tooltip>
                          );
                        }

                        return <div key={item.id}>{linkContent}</div>;
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </TooltipProvider>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-3 space-y-1">
        <TooltipProvider delayDuration={0}>
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/settings"
                  onClick={handleNavigate("/settings")}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent transition-all cursor-pointer",
                    collapsed && "justify-center px-2",
                  )}
                  data-testid="menu-settings"
                >
                  <Settings className="w-4.5 h-4.5" />
                  {!collapsed && <span>Cài đặt</span>}
                </a>
              </TooltipTrigger>
              <TooltipContent side="right">Cài đặt</TooltipContent>
            </Tooltip>
          ) : (
            <a
              href="/settings"
              onClick={handleNavigate("/settings")}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent transition-all cursor-pointer",
                collapsed && "justify-center px-2",
              )}
              data-testid="menu-settings"
            >
              <Settings className="w-4.5 h-4.5" />
              {!collapsed && <span>Cài đặt</span>}
            </a>
          )}

          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-all",
                    collapsed && "justify-center px-2",
                  )}
                  data-testid="menu-logout"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  {!collapsed && <span>Đăng xuất</span>}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Đăng xuất</TooltipContent>
            </Tooltip>
          ) : (
            <button
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-destructive/20 hover:text-destructive transition-all",
                collapsed && "justify-center px-2",
              )}
              data-testid="menu-logout"
            >
              <LogOut className="w-4.5 h-4.5" />
              {!collapsed && <span>Đăng xuất</span>}
            </button>
          )}
        </TooltipProvider>
      </div>
    </aside>
  );
}
