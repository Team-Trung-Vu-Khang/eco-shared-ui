import * as React from "react";
import { workspaceApi } from "../api/workspace.api";
import type { Workspace, WorkspaceFeature } from "../types/workspace.type";

export type WorkspaceItem = {
  id: string;
  organizationName: string;
  organizationGroup: string;
  representativeName: string;
  taxCode: string;
  businessLineName: string;
  mainCropName: string;
  totalAcreage: number;
  /** SĐT tài khoản chủ workspace */
  ownerPhoneNumber?: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export function mapWorkspaceItems(items: Array<Workspace>): WorkspaceItem[] {
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
    ownerPhoneNumber: item.owner?.phoneNumber || undefined,
  }));
}

function readSessionStorage(key: string) {
  if (typeof window === "undefined") {
    return null;
  }
  return window.sessionStorage.getItem(key);
}

function resolveWorkspaceId(
  items: WorkspaceItem[],
  currentId: string | null,
  feature?: WorkspaceFeature,
): string | null {
  // Danh sách lọc theo feature rỗng → user không có workspace cho feature này,
  // bỏ id cũ (có thể thuộc feature khác) để tránh gọi /current lỗi.
  if (feature && items.length === 0) {
    return null;
  }
  // Keep an already-selected id even if it's outside the default page —
  // it may belong to a workspace found via search, which gets hydrated
  // separately by fetching /api/center/workspaces/current.
  if (currentId) {
    return currentId;
  }
  const savedWorkspaceId = readSessionStorage("admin_selected_workspace");
  return savedWorkspaceId || items[0]?.id || null;
}

export interface WorkspaceContextType {
  /** Feature đang lọc workspace (vd: factory), undefined = không lọc */
  feature?: WorkspaceFeature;
  workspaces: WorkspaceItem[];
  isLoading: boolean;
  error: string | null;
  currentWorkspaceId: string | null;
  currentWorkspace: WorkspaceItem | null;
  setCurrentWorkspaceId: React.Dispatch<React.SetStateAction<string | null>>;
  selectWorkspace: (workspace: WorkspaceItem) => void;
  refetchWorkspaces: () => Promise<WorkspaceItem[]>;
}

const WorkspaceContext = React.createContext<WorkspaceContextType | null>(null);

// Cache danh sách mặc định theo feature ("" = không lọc feature)
const cachedDefaultWorkspaceItems = new Map<string, WorkspaceItem[]>();
const cachedDefaultWorkspacePromises = new Map<
  string,
  Promise<WorkspaceItem[]>
>();

async function getDefaultWorkspaceItems(feature?: WorkspaceFeature) {
  const cacheKey = feature ?? "";
  const cachedItems = cachedDefaultWorkspaceItems.get(cacheKey);
  if (cachedItems) {
    return cachedItems;
  }

  let promise = cachedDefaultWorkspacePromises.get(cacheKey);
  if (!promise) {
    promise = workspaceApi
      .getWorkspaces({
        feature,
        page: 0,
        size: 100,
      })
      .then((response) => {
        const items = mapWorkspaceItems(response.content);
        cachedDefaultWorkspaceItems.set(cacheKey, items);
        return items;
      })
      .finally(() => {
        cachedDefaultWorkspacePromises.delete(cacheKey);
      });
    cachedDefaultWorkspacePromises.set(cacheKey, promise);
  }

  return promise;
}

export interface WorkspaceProviderProps {
  children: React.ReactNode;
  /** Lọc workspace theo feature (vd: factory → chỉ workspace user có quyền nhà máy) */
  feature?: WorkspaceFeature;
  /** Polling khi danh sách rỗng (chờ hệ thống khởi tạo workspace). Mặc định true */
  pollWhenEmpty?: boolean;
}

export function WorkspaceProvider({
  children,
  feature,
  pollWhenEmpty = true,
}: WorkspaceProviderProps) {
  const cacheKey = feature ?? "";
  const [workspaces, setWorkspaces] = React.useState<WorkspaceItem[]>(
    cachedDefaultWorkspaceItems.get(cacheKey) || [],
  );
  const [isLoading, setIsLoading] = React.useState(
    !cachedDefaultWorkspaceItems.has(cacheKey),
  );
  const [error, setError] = React.useState<string | null>(null);
  const [currentWorkspaceId, setCurrentWorkspaceId] = React.useState<
    string | null
  >(() => readSessionStorage("admin_selected_workspace"));

  const [currentWorkspace, setCurrentWorkspace] =
    React.useState<WorkspaceItem | null>(null);

  React.useEffect(() => {
    if (currentWorkspaceId) {
      window.sessionStorage.setItem(
        "admin_selected_workspace",
        currentWorkspaceId,
      );
    }
  }, [currentWorkspaceId]);

  // Always trust the API for the currently selected workspace's details —
  // it may not be part of the default (first 100) list, e.g. found via
  // search — instead of looking it up locally in `workspaces`.
  React.useEffect(() => {
    if (!currentWorkspaceId) {
      setCurrentWorkspace(null);
      return;
    }

    let isActive = true;

    workspaceApi
      .getCurrentWorkspace(currentWorkspaceId, feature)
      .then((workspace) => {
        if (!isActive) return;
        const [item] = mapWorkspaceItems([workspace]);
        setCurrentWorkspace(item ?? null);
      })
      .catch(() => {
        if (isActive) {
          setCurrentWorkspace(null);
        }
      });

    return () => {
      isActive = false;
    };
  }, [currentWorkspaceId, feature]);

  const loadWorkspaces = React.useCallback(async (isRefetch = false) => {
    if (isRefetch) {
      cachedDefaultWorkspaceItems.delete(cacheKey);
    }

    setIsLoading(true);
    setError(null);

    try {
      const items = await getDefaultWorkspaceItems(feature);
      setWorkspaces(items);
      setCurrentWorkspaceId((currentId) =>
        resolveWorkspaceId(items, currentId, feature),
      );
      return items;
    } catch {
      setError("Không tải được danh sách đơn vị.");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [cacheKey, feature]);

  React.useEffect(() => {
    let isActive = true;
    const initialize = async () => {
      try {
        const nextItems = await getDefaultWorkspaceItems(feature);
        if (!isActive) return;
        setWorkspaces(nextItems);
        setCurrentWorkspaceId((currentId) =>
          resolveWorkspaceId(nextItems, currentId, feature),
        );
      } catch {
        if (isActive) {
          setError("Không tải được danh sách đơn vị.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void initialize();
    return () => {
      isActive = false;
    };
  }, [feature]);

  React.useEffect(() => {
    if (!pollWhenEmpty || isLoading || error || workspaces.length > 0) {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await workspaceApi.getWorkspaces({
          feature,
          page: 0,
          size: 100,
        });
        const items = mapWorkspaceItems(response.content);
        if (items.length > 0) {
          cachedDefaultWorkspaceItems.set(cacheKey, items);
          setWorkspaces(items);
          setCurrentWorkspaceId((currentId) =>
            resolveWorkspaceId(items, currentId, feature),
          );
        }
      } catch {
        // Silently ignore polling errors
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [pollWhenEmpty, workspaces.length, isLoading, error, cacheKey, feature]);

  const selectWorkspace = React.useCallback((workspace: WorkspaceItem) => {
    setCurrentWorkspaceId(workspace.id);
  }, []);

  const refetchWorkspaces = React.useCallback(() => {
    return loadWorkspaces(true);
  }, [loadWorkspaces]);

  const value = React.useMemo(
    () => ({
      feature,
      workspaces,
      isLoading,
      error,
      currentWorkspaceId,
      currentWorkspace,
      setCurrentWorkspaceId,
      selectWorkspace,
      refetchWorkspaces,
    }),
    [
      feature,
      workspaces,
      isLoading,
      error,
      currentWorkspaceId,
      currentWorkspace,
      selectWorkspace,
      refetchWorkspaces,
    ],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkspace() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
