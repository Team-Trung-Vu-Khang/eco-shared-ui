import { apiClient } from "@/config/axios"

import { AUTH_PATHS, AUTH_TOKEN_STORAGE_KEY } from "../constants/auth.constants"
import { authEnv } from "../config/auth.env"
import type { AuthMeResponse, AuthProvider } from "../types/auth.type"

export const authStorage = {
  getToken(): string | null {
    return sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  },
  setToken(token: string) {
    sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
  },
  clearToken() {
    sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
  },
}

export const authApi = {
  getToken() {
    return authStorage.getToken()
  },
  setToken(token: string) {
    authStorage.setToken(token)
  },
  clearToken() {
    authStorage.clearToken()
  },
  async getCurrentUser(token = authStorage.getToken()) {
    if (!token) {
      throw new Error("Missing auth token")
    }

    const response = await apiClient.get<AuthMeResponse>(AUTH_PATHS.me, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  },
  async logout() {
    const token = authStorage.getToken()

    if (!token) {
      window.location.replace(authEnv.postLogoutRedirectUri)
      return
    }

    try {
      await apiClient.post(AUTH_PATHS.logout, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          post_logout_redirect_uri: authEnv.postLogoutRedirectUri,
        },
      })
    } catch {
      // Ignore logout API failures and still continue to redirect.
    } finally {
      authStorage.clearToken()
      window.location.replace(authEnv.postLogoutRedirectUri)
    }
  },
  getDefaultProvider() {
    return authEnv.provider
  },
  getProviderLabel(provider: AuthProvider) {
    return provider
  },
}

