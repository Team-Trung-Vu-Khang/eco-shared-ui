import { apiClient } from "@/config/axios"

import type {
  GetWorkspacesParams,
  PaginationResponse,
  UpdateWorkspaceRequest,
  Workspace,
  WorkspaceFeature,
} from "../types/workspace.type"

export const workspaceApi = {
  async getWorkspaces(params: GetWorkspacesParams = {}) {
    const response = await apiClient.get<PaginationResponse<Workspace>>(
      "/api/center/workspaces",
      {
        params,
      },
    )

    return response.data
  },

  /** `feature` → load kèm featureProfile (403 nếu user không có role feature đó tại workspace) */
  async getCurrentWorkspace(
    workspaceId: string | number,
    feature?: WorkspaceFeature,
  ) {
    const response = await apiClient.get<Workspace>(
      "/api/center/workspaces/current",
      {
        params: feature ? { feature } : undefined,
        headers: {
          "X-Workspace-Id": String(workspaceId),
        },
      },
    )

    return response.data
  },

  async updateCurrentWorkspace(
    workspaceId: string | number,
    payload: UpdateWorkspaceRequest,
  ) {
    const response = await apiClient.put<Workspace>(
      "/api/center/workspaces/current",
      payload,
      {
        headers: {
          "X-Workspace-Id": String(workspaceId),
        },
      },
    )

    return response.data
  },
}
