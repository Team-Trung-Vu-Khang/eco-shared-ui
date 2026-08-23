import * as React from "react";
import { Building2, ExternalLink, Check, Menu, Search } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SUPER_ADMIN_ROLE } from "./sidebar/types";
import {
  workspaceApi,
  useWorkspace,
  mapWorkspaceItems,
} from "@/features/workspace";
import type { WorkspaceItem } from "@/features/workspace";
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
import { useIsMobile } from "@/hooks/use-mobile";

export function AdminHeader({
  isEcoSystemAdmin = false,
  onToggleSidebar,
}: {
  isEcoSystemAdmin?: boolean;
  onToggleSidebar?: () => void;
}) {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [, setLocation] = useLocation();

  const {
    workspaces: defaultWorkspaces,
    isLoading: defaultLoading,
    error: defaultError,
    currentWorkspaceId,
    currentWorkspace,
    setCurrentWorkspaceId,
    selectWorkspace,
  } = useWorkspace();

  const [workspaceOpen, setWorkspaceOpen] = React.useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = React.useState(false);
  const [workspaceSearch, setWorkspaceSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<WorkspaceItem[]>([]);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [searchError, setSearchError] = React.useState<string | null>(null);

  const isSearchActive = React.useMemo(
    () => Boolean(workspaceSearch.trim()),
    [workspaceSearch],
  );
  const workspaceItems = isSearchActive ? searchResults : defaultWorkspaces;
  const workspaceLoading = isSearchActive ? searchLoading : defaultLoading;
  const workspaceError = isSearchActive ? searchError : defaultError;

  const isSuperAdmin = React.useMemo(() => {
    const roleList = (user?.roles ||
      (Array.isArray(user?.role)
        ? user.role
        : user?.role
          ? [user.role]
          : [])) as Array<string>;

    return roleList.includes(SUPER_ADMIN_ROLE);
  }, [user]);

  const displayName = user?.name || "";
  const avatarFallback = (displayName || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  React.useEffect(() => {
    if (!workspaceOpen) {
      return;
    }

    const trimmedSearch = workspaceSearch.trim();

    if (!trimmedSearch) {
      return;
    }

    let isActive = true;
    const timeoutId = window.setTimeout(async () => {
      setSearchLoading(true);
      setSearchError(null);

      try {
        const nextItems = mapWorkspaceItems(
          (
            await workspaceApi.getWorkspaces({
              keyword: trimmedSearch,
              page: 0,
              size: 100,
            })
          ).content,
        );

        if (!isActive) {
          return;
        }

        setSearchResults(nextItems);
      } catch {
        if (isActive) {
          setSearchResults([]);
          setSearchError("Không tải được danh sách đơn vị.");
        }
      } finally {
        if (isActive) {
          setSearchLoading(false);
        }
      }
    }, 250);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [workspaceOpen, workspaceSearch]);

  const activeWorkspace = React.useMemo(() => {
    return (
      currentWorkspace ||
      workspaceItems.find((item) => item.id === currentWorkspaceId) ||
      null
    );
  }, [currentWorkspace, workspaceItems, currentWorkspaceId]);

  const phoneNumber = user?.phoneNumber || "";

  const openWorkspace = (itemId: string) => {
    const selected = workspaceItems.find((item) => item.id === itemId);
    if (selected) {
      selectWorkspace(selected);
    } else {
      setCurrentWorkspaceId(itemId);
    }
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
      <div className="flex min-h-16 items-center gap-3 px-4 py-1 sm:px-6">
        {isMobile && onToggleSidebar && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="shrink-0 shadow-sm"
            onClick={onToggleSidebar}
            aria-label="Open sidebar"
            data-testid="open-sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <DropdownMenu open={accountMenuOpen} onOpenChange={setAccountMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="ml-auto h-auto gap-2 rounded-full px-2 py-1.5 sm:gap-3"
              data-testid="user-menu"
            >
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage src="" alt={displayName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {avatarFallback || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex max-w-[11rem] flex-col items-start text-left">
                <span className="truncate text-[13px] font-medium leading-tight sm:text-sm">
                  {displayName || "Người dùng"}
                </span>
                <span className="truncate text-[11px] text-muted-foreground sm:text-xs">
                  {phoneNumber || "Chưa có số điện thoại"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!isEcoSystemAdmin && (
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
                      {activeWorkspace?.organizationName ?? "Đơn vị / Tổ chức"}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {activeWorkspace?.representativeName ??
                      "Nhấn để mở popup chọn đơn vị"}
                  </p>
                </div>
              </DropdownMenuItem>
            )}
            {!isEcoSystemAdmin && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onSelect={() => {
                window.open(
                  "https://mevi-center.otechz.com/dashboard",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Mevi Center
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem
              className="text-destructive"
              onClick={() => authApi.logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem> */}
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
                      const isActive = activeWorkspace?.id === item.id;

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
                                  Tổng diện tích vùng trồng: {item.totalAcreage}
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
                {isSuperAdmin && (
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
                )}
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
    </header>
  );
}
