import * as React from "react";
import {
  Bell,
  Check,
  Building2,
  LogOut,
  Search,
  User,
} from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { authApi } from "@/features/auth/api/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const verifiedMeviAccounts = [
  {
    value: "mevi-admin-01",
    label: "Khang Vu",
    email: "khang.vu@mevi.vn",
    note: "Đã xác thực",
  },
  {
    value: "mevi-admin-02",
    label: "Trung Nguyen",
    email: "trung.nguyen@mevi.vn",
    note: "Đã xác thực",
  },
  {
    value: "mevi-admin-03",
    label: "Đội hỗ trợ",
    email: "support@mevi.vn",
    note: "Đã xác thực",
  },
] as const;

type WorkspaceMode = "unit" | "workspace";

type WorkspaceItem = {
  id: string;
  organizationName: string;
  organizationGroup: string;
  representativeName: string;
  totalArea: string;
  cropName: string;
};

const workspaceGroups: Array<{
  title: string;
  items: WorkspaceItem[];
}> = [
  {
    title: "Cụm tổ chức mẫu 1",
    items: [
      {
        id: "giann-abc",
        organizationName: "Nông hộ Giann ABC",
        organizationGroup: "Nông hộ",
        representativeName: "Nguyễn Văn A",
        totalArea: "12.5 ha",
        cropName: "Lúa",
      },
      {
        id: "ahihi",
        organizationName: "Hợp tác xã Ahihi",
        organizationGroup: "Hợp tác xã",
        representativeName: "Trần Thị B",
        totalArea: "28 ha",
        cropName: "Sầu riêng",
      },
      {
        id: "g-2",
        organizationName: "Doanh nghiệp G-2",
        organizationGroup: "Doanh nghiệp",
        representativeName: "Lê Văn C",
        totalArea: "64 ha",
        cropName: "Cà phê",
      },
      {
        id: "g-3",
        organizationName: "Nông hộ G-3",
        organizationGroup: "Nông hộ",
        representativeName: "Phạm Thị D",
        totalArea: "8.2 ha",
        cropName: "Mít",
      },
      {
        id: "test-unit",
        organizationName: "Đơn vị thử nghiệm",
        organizationGroup: "Doanh nghiệp",
        representativeName: "Đội hỗ trợ",
        totalArea: "--",
        cropName: "Đang cập nhật",
      },
    ],
  },
  {
    title: "Cụm tổ chức mẫu 2",
    items: [
      {
        id: "giann-dev",
        organizationName: "Hợp tác xã Giann Dev",
        organizationGroup: "Hợp tác xã",
        representativeName: "Nguyễn Văn E",
        totalArea: "16 ha",
        cropName: "Thanh long",
      },
      {
        id: "giann-dev-plus",
        organizationName: "Doanh nghiệp Giann Dev Plus",
        organizationGroup: "Doanh nghiệp",
        representativeName: "Trần Văn F",
        totalArea: "42 ha",
        cropName: "Xoài",
      },
    ],
  },
] as const;

function readSessionStorage(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(key);
}

export function AdminHeader() {
  const { user, isFetching } = useAuth();
  const [workspaceMode, setWorkspaceMode] = React.useState<WorkspaceMode>(() => {
    const savedMode = readSessionStorage("admin_workspace_mode");
    return savedMode === "workspace" ? "workspace" : "unit";
  });
  const [workspaceOpen, setWorkspaceOpen] = React.useState(false);
  const [workspaceSearch, setWorkspaceSearch] = React.useState("");
  const [selectedMeviAccount, setSelectedMeviAccount] = React.useState(
    () =>
      readSessionStorage("admin_workspace_account") ??
      verifiedMeviAccounts[0].value,
  );
  const [currentWorkspace, setCurrentWorkspace] = React.useState<WorkspaceItem | null>(
    () => {
      const savedWorkspace = readSessionStorage("admin_selected_workspace");
      return (
        workspaceGroups
          .flatMap((group) => group.items)
          .find((item) => item.id === savedWorkspace) ??
        workspaceGroups[0]?.items[0] ??
        null
      );
    },
  );

  const displayName = user?.name || "";
  const displayPhone = user?.phoneNumber || "";
  const avatarFallback = (displayName || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  React.useEffect(() => {
    window.sessionStorage.setItem("admin_workspace_mode", workspaceMode);
  }, [workspaceMode]);

  React.useEffect(() => {
    window.sessionStorage.setItem(
      "admin_workspace_account",
      selectedMeviAccount,
    );
  }, [selectedMeviAccount]);

  React.useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    window.sessionStorage.setItem("admin_selected_workspace", currentWorkspace.id);
  }, [currentWorkspace]);

  const selectedMeviProfile =
    verifiedMeviAccounts.find((account) => account.value === selectedMeviAccount) ??
    verifiedMeviAccounts[0];

  const filteredWorkspaceGroups = React.useMemo(() => {
    const keyword = workspaceSearch.trim().toLowerCase();

    if (!keyword) {
      return workspaceGroups;
    }

    return workspaceGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const haystack = [
            item.organizationName,
            item.organizationGroup,
            item.representativeName,
            item.totalArea,
            item.cropName,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(keyword);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [workspaceSearch]);

  const openWorkspace = (item: WorkspaceItem) => {
    setCurrentWorkspace(item);
    setWorkspaceMode("workspace");
    setWorkspaceOpen(false);
  };

  const toggleWorkspaceMode = () => {
    setWorkspaceMode((current) => (current === "unit" ? "workspace" : "unit"));
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex min-h-16 flex-col gap-3 px-6 py-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
                data-testid="search-input"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start xl:self-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                data-testid="notifications-btn"
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Kế hoạch canh tác mới</span>
                <span className="text-xs text-muted-foreground">
                  Mùa vụ 2025 đã được tạo
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Chứng chỉ sắp hết hạn</span>
                <span className="text-xs text-muted-foreground">
                  VietGAP - Nông trại ABC còn 15 ngày
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">Công việc cần xử lý</span>
                <span className="text-xs text-muted-foreground">
                  5 công việc chờ duyệt
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={workspaceOpen} onOpenChange={setWorkspaceOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2"
                  data-testid="user-menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={displayName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {avatarFallback || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium leading-none">
                      {displayName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isFetching ? "Đang tải..." : displayPhone}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-start gap-3 py-3"
                  onSelect={(event) => {
                    event.preventDefault();
                    setWorkspaceOpen(true);
                  }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">
                        {currentWorkspace?.organizationName ?? "Đơn vị / Tổ chức"}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {currentWorkspace?.representativeName ??
                        "Nhấn để mở popup chọn đơn vị"}
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ cá nhân
                </DropdownMenuItem>
                <DropdownMenuItem>Cài đặt</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => authApi.logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0 sm:rounded-3xl">
              <DialogHeader className="border-b bg-muted/30 px-6 py-5 text-left">
                <DialogTitle className="text-xl">Chọn đơn vị</DialogTitle>
                <DialogDescription>
                  Chọn chế độ làm việc rồi chọn đơn vị hoặc tổ chức bạn muốn sử dụng.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 px-6 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={toggleWorkspaceMode}
                    className="inline-flex w-fit items-center rounded-full border border-border/70 bg-muted/40 p-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                    aria-label="Chuyển chế độ giữa đơn vị và không gian làm việc"
                  >
                    <span
                      className={
                        "rounded-full px-3 py-1 transition-colors " +
                        (workspaceMode === "unit"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground")
                      }
                    >
                      Đơn vị
                    </span>
                    <span
                      className={
                        "rounded-full px-3 py-1 transition-colors " +
                        (workspaceMode === "workspace"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground")
                      }
                    >
                      Không gian làm việc
                    </span>
                  </button>

                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      value={workspaceSearch}
                      onChange={(event) => setWorkspaceSearch(event.target.value)}
                      placeholder={
                        workspaceMode === "workspace"
                          ? "Tìm không gian làm việc"
                          : "Tìm đơn vị hoặc tổ chức"
                      }
                      className="h-10 pl-10"
                    />
                  </div>
                </div>

                {workspaceMode === "workspace" && (
                  <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Tài khoản mevi đã xác thực
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Gắn tài khoản xác thực để đánh dấu đây là đơn vị được tạo bởi
                          quản trị viên mevi.
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {selectedMeviProfile.label}
                      </Badge>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {verifiedMeviAccounts.map((account) => {
                        const isActive = account.value === selectedMeviAccount;

                        return (
                          <button
                            key={account.value}
                            type="button"
                            onClick={() => setSelectedMeviAccount(account.value)}
                            className={
                              "flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors " +
                              (isActive
                                ? "border-primary bg-primary/5"
                                : "border-border/70 bg-background hover:bg-muted/50")
                            }
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                              <User className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="truncate text-sm font-semibold">
                                  {account.label}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="h-5 px-1.5 text-[10px]"
                                >
                                  {account.note}
                                </Badge>
                              </div>
                              <p className="truncate text-xs text-muted-foreground">
                                {account.email}
                              </p>
                            </div>
                            {isActive && <Check className="mt-0.5 h-4 w-4 text-primary" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-border/70 bg-background">
                  {filteredWorkspaceGroups.map((group, groupIndex) => (
                    <div
                      key={group.title}
                      className={groupIndex > 0 ? "border-t border-border/70" : ""}
                    >
                      <div className="flex items-center justify-between gap-3 px-4 pt-4">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {group.title}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 p-3">
                        {group.items.map((item) => {
                          const isActive = currentWorkspace?.id === item.id;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => openWorkspace(item)}
                              className={
                                "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors " +
                                (isActive ? "bg-muted" : "hover:bg-muted/60")
                              }
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Building2 className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0 space-y-1">
                                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                                      <span className="truncate text-sm font-semibold text-foreground">
                                        {item.organizationName}
                                      </span>
                                      <Badge className="h-5 rounded-full border-0 bg-amber-100 px-2 text-[10px] font-semibold text-amber-800 hover:bg-amber-100">
                                        {item.organizationGroup}
                                      </Badge>
                                    </div>
                                    <p className="truncate text-sm text-muted-foreground">
                                      {item.representativeName}
                                    </p>
                                  </div>

                                  <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                                    <span className="text-sm font-semibold text-foreground">
                                      {item.totalArea}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      {item.cropName}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {isActive && <Check className="h-4 w-4 text-foreground" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 border-t pt-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    <span className="text-lg leading-none">+</span>
                    Tạo đơn vị mới
                  </button>
                  <button
                    type="button"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setWorkspaceOpen(false)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
