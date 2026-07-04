import * as React from "react";
import { Bell, Check, Building2, LogOut, Search, User } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { authApi } from "@/features/auth/api/auth.api";
import { workspaceApi } from "@/features/workspace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { useLocation } from "wouter";
import type { Workspace } from "@/features/workspace";

type WorkspaceItem = {
  id: string;
  organizationName: string;
  organizationGroup: string;
  representativeName: string;
  taxCode: string;
  businessLineName: string;
  mainCropName: string;
  totalAcreage: number;
};

let cachedDefaultWorkspaceItems: WorkspaceItem[] | null = null;
let cachedDefaultWorkspacePromise: Promise<WorkspaceItem[]> | null = null;

function mapWorkspaceItems(items: Array<Workspace>): WorkspaceItem[] {
  return items.map((item) => ({
    id: String(item.id),
    organizationName: item.brandName || item.name,
    organizationGroup:
      item.organizationType?.name ?? item.organizationType?.code ?? "Đơn vị",
    representativeName: item.representative || "Chưa có người đại diện",
    taxCode: item.taxCode || item.code || "--",
    businessLineName:
      item.businessLines
        ?.map((businessLine) => businessLine?.name)
        .filter(Boolean)
        .join(", ") ||
      item.mainCrop?.name ||
      "Đang cập nhật",
    totalAcreage: item.totalAcreage || 0,
    mainCropName: item.mainCrop?.name || "",
  }));
}

function resolveWorkspaceId(
  items: WorkspaceItem[],
  currentId: string | null,
): string | null {
  if (currentId && items.some((item) => item.id === currentId)) {
    return currentId;
  }

  const savedWorkspaceId = readSessionStorage("admin_selected_workspace");

  return (
    items.find((item) => item.id === savedWorkspaceId)?.id ??
    items[0]?.id ??
    null
  );
}

async function getDefaultWorkspaceItems() {
  if (cachedDefaultWorkspaceItems) {
    return cachedDefaultWorkspaceItems;
  }

  if (!cachedDefaultWorkspacePromise) {
    cachedDefaultWorkspacePromise = workspaceApi
      .getWorkspaces({
        page: 0,
        size: 100,
      })
      .then((response) => {
        cachedDefaultWorkspaceItems = mapWorkspaceItems(response.content);
        return cachedDefaultWorkspaceItems;
      })
      .finally(() => {
        cachedDefaultWorkspacePromise = null;
      });
  }

  return cachedDefaultWorkspacePromise;
}

function readSessionStorage(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.sessionStorage.getItem(key);
}

export function AdminHeader() {
  const { user, isFetching } = useAuth();
  const [, setLocation] = useLocation();
  const [workspaceOpen, setWorkspaceOpen] = React.useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false);
  const [workspaceSearch, setWorkspaceSearch] = React.useState("");
  const [workspaceItems, setWorkspaceItems] = React.useState<WorkspaceItem[]>(
    [],
  );
  const [workspaceLoading, setWorkspaceLoading] = React.useState(false);
  const [workspaceError, setWorkspaceError] = React.useState<string | null>(
    null,
  );
  const [currentWorkspaceId, setCurrentWorkspaceId] = React.useState<
    string | null
  >(() => readSessionStorage("admin_selected_workspace"));

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
    if (!currentWorkspaceId) {
      return;
    }

    window.sessionStorage.setItem(
      "admin_selected_workspace",
      currentWorkspaceId,
    );
  }, [currentWorkspaceId]);

  React.useEffect(() => {
    let isActive = true;

    const initializeWorkspace = async () => {
      try {
        const nextItems = await getDefaultWorkspaceItems();

        if (!isActive) {
          return;
        }

        setWorkspaceItems(nextItems);
        setCurrentWorkspaceId((currentId) =>
          resolveWorkspaceId(nextItems, currentId),
        );
      } catch {
        if (isActive) {
          setWorkspaceItems([]);
        }
      }
    };

    void initializeWorkspace();

    return () => {
      isActive = false;
    };
  }, []);

  React.useEffect(() => {
    if (!workspaceOpen) {
      return;
    }

    const trimmedSearch = workspaceSearch.trim();

    const cachedItems = cachedDefaultWorkspaceItems;

    if (!trimmedSearch && cachedItems) {
      setWorkspaceItems(cachedItems);
      setCurrentWorkspaceId((currentId) =>
        resolveWorkspaceId(cachedItems, currentId),
      );
      setWorkspaceLoading(false);
      setWorkspaceError(null);
      return;
    }

    let isActive = true;
    const timeoutId = window.setTimeout(async () => {
      setWorkspaceLoading(true);
      setWorkspaceError(null);

      try {
        const nextItems = trimmedSearch
          ? mapWorkspaceItems(
              (
                await workspaceApi.getWorkspaces({
                  keyword: trimmedSearch,
                  page: 0,
                  size: 100,
                })
              ).content,
            )
          : await getDefaultWorkspaceItems();

        if (!isActive) {
          return;
        }

        setWorkspaceItems(nextItems);
        if (!trimmedSearch) {
          cachedDefaultWorkspaceItems = nextItems;
        }
        setCurrentWorkspaceId((currentId) =>
          resolveWorkspaceId(nextItems, currentId),
        );
      } catch {
        if (isActive) {
          setWorkspaceItems([]);
          setWorkspaceError("Không tải được danh sách đơn vị.");
        }
      } finally {
        if (isActive) {
          setWorkspaceLoading(false);
        }
      }
    }, 250);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [workspaceOpen, workspaceSearch]);

  const currentWorkspace =
    workspaceItems.find((item) => item.id === currentWorkspaceId) ?? null;

  const openWorkspace = (itemId: string) => {
    setCurrentWorkspaceId(itemId);
    closeWorkspaceDialog();
  };

  const closeWorkspaceDialog = () => {
    if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }

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

          <DropdownMenu
            open={accountMenuOpen}
            onOpenChange={setAccountMenuOpen}
          >
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
                onSelect={() => {
                  setAccountMenuOpen(false);
                  window.setTimeout(() => {
                    setWorkspaceOpen(true);
                  }, 0);
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
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => authApi.logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog
            open={workspaceOpen}
            onOpenChange={(open) => {
              if (open) {
                setWorkspaceOpen(true);
                return;
              }

              closeWorkspaceDialog();
            }}
          >
            <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0 sm:rounded-3xl">
              <DialogHeader className="border-b bg-muted/30 px-6 py-5 text-left">
                <DialogTitle className="text-xl">Chọn workspace</DialogTitle>
                <DialogDescription>
                  Chọn workspace hoặc tổ chức bạn muốn sử dụng.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 px-6 py-5">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    value={workspaceSearch}
                    onChange={(event) => setWorkspaceSearch(event.target.value)}
                    placeholder="Tìm workspace"
                    className="h-10 pl-10"
                  />
                </div>

                <ScrollArea className="h-[420px] rounded-2xl border border-border/70 bg-background">
                  <div className="space-y-1 p-3">
                    {workspaceLoading ? (
                      <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-border/70 text-sm text-muted-foreground">
                        Đang tải danh sách workspace...
                      </div>
                    ) : workspaceError ? (
                      <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-destructive/30 text-sm text-destructive">
                        {workspaceError}
                      </div>
                    ) : workspaceItems.length > 0 ? (
                      workspaceItems.map((item) => {
                        const isActive = currentWorkspace?.id === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => openWorkspace(item.id)}
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
                                    Tổng diện tích vùng trồng:{" "}
                                    {item.totalAcreage}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    Cây trồng chính: {item.mainCropName}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {isActive && (
                              <Check className="h-4 w-4 text-foreground" />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-border/70 text-sm text-muted-foreground">
                        Không tìm thấy đơn vị phù hợp
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="flex items-center justify-between gap-3 border-t pt-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                    onClick={() => {
                      setWorkspaceOpen(false);
                      setLocation("/workspace");
                    }}
                  >
                    <span className="text-lg leading-none">+</span>
                    Tạo workspace
                  </button>
                  <button
                    type="button"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={closeWorkspaceDialog}
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
