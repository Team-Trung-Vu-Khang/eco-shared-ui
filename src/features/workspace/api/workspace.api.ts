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
}
