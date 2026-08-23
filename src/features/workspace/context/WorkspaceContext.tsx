import * as React from "react";
import { workspaceApi } from "../api/workspace.api";
import type { Workspace } from "../types/workspace.type";

export type WorkspaceItem = {
  id: string;
  organizationName: string;
  organizationGroup: string;
  representativeName: string;
  taxCode: string;
  businessLineName: string;
  mainCropName: string;
  totalAcreage: number;
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

export interface WorkspaceContextType {
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

let cachedDefaultWorkspaceItems: WorkspaceItem[] | null = null;
let cachedDefaultWorkspacePromise: Promise<WorkspaceItem[]> | null = null;

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

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaces, setWorkspaces] = React.useState<WorkspaceItem[]>(
    cachedDefaultWorkspaceItems || [],
  );
  const [isLoading, setIsLoading] = React.useState(
    !cachedDefaultWorkspaceItems,
  );
  const [error, setError] = React.useState<string | null>(null);
  const [currentWorkspaceId, setCurrentWorkspaceId] = React.useState<
    string | null
  >(() => readSessionStorage("admin_selected_workspace"));

  const currentWorkspace = React.useMemo(() => {
    return workspaces.find((item) => item.id === currentWorkspaceId) ?? null;
  }, [workspaces, currentWorkspaceId]);

  React.useEffect(() => {
    if (currentWorkspaceId) {
      window.sessionStorage.setItem(
        "admin_selected_workspace",
        currentWorkspaceId,
      );
    }
  }, [currentWorkspaceId]);

  const loadWorkspaces = React.useCallback(async (isRefetch = false) => {
    if (isRefetch) {
      cachedDefaultWorkspaceItems = null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const items = await getDefaultWorkspaceItems();
      setWorkspaces(items);
      setCurrentWorkspaceId((currentId) =>
        resolveWorkspaceId(items, currentId),
      );
      return items;
    } catch {
      setError("Không tải được danh sách đơn vị.");
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let isActive = true;
    const initialize = async () => {
      try {
        const nextItems = await getDefaultWorkspaceItems();
        if (!isActive) return;
        setWorkspaces(nextItems);
        setCurrentWorkspaceId((currentId) =>
          resolveWorkspaceId(nextItems, currentId),
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
  }, []);

  React.useEffect(() => {
    if (isLoading || error || workspaces.length > 0) {
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await workspaceApi.getWorkspaces({
          page: 0,
          size: 100,
        });
        const items = mapWorkspaceItems(response.content);
        if (items.length > 0) {
          cachedDefaultWorkspaceItems = items;
          setWorkspaces(items);
          setCurrentWorkspaceId((currentId) =>
            resolveWorkspaceId(items, currentId),
          );
        }
      } catch {
        // Silently ignore polling errors
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [workspaces.length, isLoading, error]);

  const selectWorkspace = React.useCallback((workspace: WorkspaceItem) => {
    setCurrentWorkspaceId(workspace.id);
    setWorkspaces((prev) => {
      if (prev.some((item) => item.id === workspace.id)) {
        return prev;
      }
      return [workspace, ...prev];
    });
  }, []);

  const refetchWorkspaces = React.useCallback(() => {
    return loadWorkspaces(true);
  }, [loadWorkspaces]);

  const value = React.useMemo(
    () => ({
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
