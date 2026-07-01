export type AuthProvider = string

export interface AuthMeResponse {
  userId: string
  username: string
  email: string
  name: string
  phoneNumber: string
  provider: AuthProvider
  sessionId: string
  mustChangePassword: boolean
  [key: string]: unknown
}

export interface AuthEnv {
  callbackPath: string
  postLogoutRedirectUri: string
  provider: AuthProvider
}

export interface AuthPaths {
  login: string
  me: string
  logout: string
}

export interface AuthApiEndpoints {
  me: string
}

export interface AuthApiConfig {
  baseURL: string
  endpoints?: Partial<AuthApiEndpoints>
  getAccessToken?: () => string | null | undefined
  onUnauthorized?: () => void
}
