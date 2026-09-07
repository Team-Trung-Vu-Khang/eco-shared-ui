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

const SELECTED_WORKSPACE_ID_KEY = "admin_selected_workspace";
const SELECTED_WORKSPACE_ITEM_KEY = "admin_selected_workspace_item";

function readSessionStorage(key: string) {
  if (typeof window === "undefined") {
    return null;
  }
  return window.sessionStorage.getItem(key);
}

// Fallback used when the selected workspace isn't part of the default
// (first 100) list — e.g. found via search — so there's no local list to
// look it up in if the `getCurrentWorkspace` API call is slow or fails.
function readCachedWorkspaceItem(workspaceId: string | null): WorkspaceItem | null {
  if (!workspaceId) return null;
  const raw = readSessionStorage(SELECTED_WORKSPACE_ITEM_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as WorkspaceItem;
    return parsed.id === workspaceId ? parsed : null;
  } catch {
    return null;
  }
}

function writeCachedWorkspaceItem(item: WorkspaceItem) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    SELECTED_WORKSPACE_ITEM_KEY,
    JSON.stringify(item),
  );
}

function resolveWorkspaceId(
  items: WorkspaceItem[],
  currentId: string | null,
): string | null {
  // Keep an already-selected id even if it's outside the default page —
  // it may belong to a workspace found via search, which gets hydrated
  // separately by fetching /api/center/workspaces/current.
  if (currentId) {
    return currentId;
  }
  const savedWorkspaceId = readSessionStorage(SELECTED_WORKSPACE_ID_KEY);
  return savedWorkspaceId || items[0]?.id || null;
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
  >(() => readSessionStorage(SELECTED_WORKSPACE_ID_KEY));

  // Seed from the cached item so a workspace found via search (not part of
  // the default 100 list) still renders immediately after a reload, instead
  // of showing blank until — or if — the API call below resolves.
  const [currentWorkspace, setCurrentWorkspace] =
    React.useState<WorkspaceItem | null>(() =>
      readCachedWorkspaceItem(readSessionStorage(SELECTED_WORKSPACE_ID_KEY)),
    );

  React.useEffect(() => {
    if (currentWorkspaceId) {
      window.sessionStorage.setItem(
        SELECTED_WORKSPACE_ID_KEY,
        currentWorkspaceId,
      );
    }
  }, [currentWorkspaceId]);

  // Always trust the API for the currently selected workspace's details —
  // it may not be part of the default (first 100) list, e.g. found via
  // search — instead of looking it up locally in `workspaces`. If the call
  // fails, keep whatever was last cached/known rather than blanking it out.
  React.useEffect(() => {
    if (!currentWorkspaceId) {
      setCurrentWorkspace(null);
      return;
    }

    let isActive = true;

    workspaceApi
      .getCurrentWorkspace(currentWorkspaceId)
      .then((workspace) => {
        if (!isActive) return;
        const [item] = mapWorkspaceItems([workspace]);
        if (item) {
          writeCachedWorkspaceItem(item);
        }
        setCurrentWorkspace(item ?? null);
      })
      .catch(() => {
        if (!isActive) return;
        setCurrentWorkspace(
          (prev) => prev ?? readCachedWorkspaceItem(currentWorkspaceId),
        );
      });

    return () => {
      isActive = false;
    };
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
    writeCachedWorkspaceItem(workspace);
    setCurrentWorkspace(workspace);
    setCurrentWorkspaceId(workspace.id);
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
