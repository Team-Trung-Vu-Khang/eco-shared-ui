export type WorkspaceStatus = "active" | "inactive" | "archived"

export interface PaginationResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export interface WorkspaceOrganizationType {
  id: number
  code: string
  name: string
  type: string
}

export interface WorkspaceBusinessLine {
  id: number
  code: string
  name: string
}

export interface Workspace {
  id: number
  organizationType: WorkspaceOrganizationType
  code: string
  name: string
  brandName: string
  taxCode: string
  taxAuthority: string
  taxAddress: string
  issueDate: string
  businessLines: WorkspaceBusinessLine[]
  representative: string
  foundedDate: string
  website: string
  province: string
  district: string
  ward: string
  address: string
  latitude: number
  longitude: number
  imageUrl: string
  description: string
  status: WorkspaceStatus
  metadataJson: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface GetWorkspacesParams {
  keyword?: string
  status?: WorkspaceStatus
  businessLine?: string
  organizationTypeId?: number
  page?: number
  size?: number
}
