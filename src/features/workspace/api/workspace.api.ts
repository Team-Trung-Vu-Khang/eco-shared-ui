import { apiClient } from "@/config/axios"

import type {
  GetWorkspacesParams,
  PaginationResponse,
  Workspace,
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

  async getCurrentWorkspace(workspaceId: string | number) {
    const response = await apiClient.get<Workspace>(
      "/api/center/workspaces/current",
      {
        headers: {
          "X-Workspace-Id": String(workspaceId),
        },
      },
    )

    return response.data
  },
}
