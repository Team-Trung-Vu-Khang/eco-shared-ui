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

export interface WorkspaceCrop {
  id: number
  code: string
  name: string
}

export interface Workspace {
  id: number
  displayOrder: number
  organizationType: WorkspaceOrganizationType | null
  code: string
  name: string
  brandName: string | null
  taxCode: string | null
  taxAuthority: string | null
  taxAddress: string | null
  issueDate: string | null
  businessLines: WorkspaceBusinessLine[] | null
  totalAcreage: number | null
  mainCrop: WorkspaceCrop | null
  representative: string | null
  foundedDate: string | null
  website: string | null
  province: string | null
  district: string | null
  ward: string | null
  address: string | null
  latitude: number | null
  longitude: number | null
  imageUrl: string | null
  description: string | null
  status: WorkspaceStatus
  metadataJson: Record<string, unknown> | null
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
