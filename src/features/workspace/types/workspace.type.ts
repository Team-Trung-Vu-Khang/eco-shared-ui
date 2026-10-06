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

export interface WorkspaceOwner {
  id: number
  code: string
  fullName: string
  email: string | null
  phoneNumber: string | null
}

/** Feature hỗ trợ lọc quyền + load hồ sơ (không phân biệt hoa thường) */
export type WorkspaceFeature = "factory" | "farm" | (string & {})

export interface WorkspaceMetadata {
  source?: string
  factoryDisplayName?: string
  farmDisplayName?: string
  [key: string]: unknown
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
  owner: WorkspaceOwner | null
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
  metadataJson: WorkspaceMetadata | null
  createdAt: string
  updatedAt: string
  /** Hồ sơ theo feature, chỉ có khi truyền `feature` (vd: factory → hồ sơ nhà máy) */
  featureProfile: Record<string, unknown> | null
}

export interface GetWorkspacesParams {
  keyword?: string
  status?: WorkspaceStatus
  businessLine?: string
  organizationTypeId?: number
  /** Lọc theo tài khoản chủ sở hữu (mevi_users.id) */
  ownerUserId?: number
  /** Lọc workspace user được dùng feature và load kèm featureProfile */
  feature?: WorkspaceFeature
  page?: number
  size?: number
}

export interface UpdateWorkspaceRequest {
  organizationTypeId?: number | null
  code?: string
  name?: string
  brandName?: string | null
  taxCode?: string | null
  taxAuthority?: string | null
  taxAddress?: string | null
  issueDate?: string | null
  businessLines?: WorkspaceBusinessLine[] | null
  representative?: string | null
  /** Tài khoản chủ sở hữu (mevi_users.id) */
  ownerUserId?: number | null
  foundedDate?: string | null
  website?: string | null
  province?: string | null
  district?: string | null
  ward?: string | null
  address?: string | null
  latitude?: number | null
  longitude?: number | null
  imageUrl?: string | null
  description?: string | null
  totalAcreage?: number | null
  mainCropId?: number | null
  status?: WorkspaceStatus
  displayOrder?: number
  metadataJson?: WorkspaceMetadata | null
}
