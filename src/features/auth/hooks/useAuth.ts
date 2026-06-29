import * as React from "react"

import { authApi } from "../api/auth.api"
import type { AuthMeResponse } from "../types/auth.type"

const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
}

type AuthState = {
  user: AuthMeResponse | null
  isLoading: boolean
  error: Error | null
}

export function useAuth() {
  const [state, setState] = React.useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })

  React.useEffect(() => {
    let active = true
    const token = authApi.getToken()

    if (!token) {
      setState({
        user: null,
        isLoading: false,
        error: null,
      })
      return
    }

    setState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: null,
    }))

    void authApi
      .getCurrentUser(token)
      .then((user) => {
        if (!active) {
          return
        }

        setState({
          user,
          isLoading: false,
          error: null,
        })
      })
      .catch((error: unknown) => {
        if (!active) {
          return
        }

        const normalizedError =
          error instanceof Error ? error : new Error("Failed to load auth user")

        setState({
          user: null,
          isLoading: false,
          error: normalizedError,
        })
      })

    return () => {
      active = false
    }
  }, [])

  return {
    user: state.user,
    isAuthenticated: Boolean(state.user),
    mustChangePassword: state.user?.mustChangePassword ?? false,
    token: authApi.getToken(),
    isLoading: state.isLoading,
    isFetching: state.isLoading,
    error: state.error,
    refetch: async () => {
      const token = authApi.getToken()

      if (!token) {
        setState({
          user: null,
          isLoading: false,
          error: null,
        })
        return null
      }

      setState((currentState) => ({
        ...currentState,
        isLoading: true,
        error: null,
      }))

      try {
        const user = await authApi.getCurrentUser(token)
        setState({
          user,
          isLoading: false,
          error: null,
        })
        return user
      } catch (error) {
        const normalizedError =
          error instanceof Error ? error : new Error("Failed to load auth user")
        setState({
          user: null,
          isLoading: false,
          error: normalizedError,
        })
        throw normalizedError
      }
    },
  }
}

export { authKeys }

