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
    label: "Support Team",
    email: "support@mevi.vn",
    note: "Đã xác thực",
  },
] as const;

type WorkspaceMode = "unit" | "workspace";

type WorkspaceItem = {
  id: string;
  name: string;
  domain: string;
  badge?: string;
  group: string;
};

const workspaceGroups: Array<{
  title: string;
  items: WorkspaceItem[];
}> = [
  {
    title: "PerfectApps",
    items: [
      {
        id: "giann-abc",
        name: "giann-abc",
        domain: "giann-abc.myshopify.com",
        badge: "dev",
        group: "PerfectApps",
      },
      {
        id: "ahihi",
        name: "ahihi",
        domain: "g-ahihi.myshopify.com",
        badge: "dev",
        group: "PerfectApps",
      },
      {
        id: "g-2",
        name: "g-2",
        domain: "g-2.myshopify.com",
        group: "PerfectApps",
      },
      {
        id: "g-3",
        name: "g-3",
        domain: "g-3.myshopify.com",
        group: "PerfectApps",
      },
      {
        id: "test-unit",
        name: "Test Unit",
        domain: "test-unit.myshopify.com",
        badge: "dev",
        group: "PerfectApps",
      },
    ],
  },
  {
    title: "Demo Dev",
    items: [
      {
        id: "giann-dev",
        name: "giann-dev",
        domain: "giann-dev.myshopify.com",
        badge: "dev",
        group: "Demo Dev",
      },
      {
        id: "giann-dev-plus",
        name: "giann-dev-plus",
        domain: "giann-dev-plus.myshopify.com",
        badge: "dev",
        group: "Demo Dev",
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
  const isWorkspaceMode = workspaceMode === "workspace";

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
          const haystack = [item.name, item.domain, item.badge, item.group]
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
                        {currentWorkspace?.name ?? "Đơn vị / Tổ chức"}
                      </span>
                      {isWorkspaceMode && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                          Đơn vị
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {currentWorkspace?.domain ?? "Nhấn để mở popup chọn đơn vị"}
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
                  Chọn workspace rồi chọn đơn vị hoặc tổ chức bạn muốn làm việc.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 px-6 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Badge variant="outline" className="w-fit">
                    {workspaceMode === "workspace" ? "Workspace" : "Đơn vị"}
                  </Badge>

                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      value={workspaceSearch}
                      onChange={(event) => setWorkspaceSearch(event.target.value)}
                      placeholder="Tìm đơn vị hoặc tổ chức"
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
                          mevi admin.
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
                                "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors " +
                                (isActive ? "bg-muted" : "hover:bg-muted/60")
                              }
                            >
                              <div
                                className={
                                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white " +
                                  (isActive ? "bg-emerald-500" : "bg-fuchsia-500")
                                }
                              >
                                {item.name.slice(0, 3).toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="truncate text-sm font-semibold text-foreground">
                                    {item.name}
                                  </span>
                                  {item.badge && (
                                    <Badge
                                      variant="secondary"
                                      className="h-5 px-1.5 text-[10px]"
                                    >
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                                <p className="truncate text-sm text-muted-foreground">
                                  {item.domain}
                                </p>
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
                    Tạo đơn vị
                  </button>
                  <button
                    type="button"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setWorkspaceOpen(false)}
                  >
                    Close
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
