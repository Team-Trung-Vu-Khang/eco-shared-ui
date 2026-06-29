import { useQuery } from "@tanstack/react-query"

import { authApi } from "../api/auth.api"

const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
}

export function useAuth() {
  const token = authApi.getToken()

  const currentUserQuery = useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => authApi.getCurrentUser(),
    enabled: Boolean(token),
    retry: false,
  })

  return {
    user: currentUserQuery.data ?? null,
    isAuthenticated: Boolean(token && currentUserQuery.data),
    mustChangePassword: currentUserQuery.data?.mustChangePassword ?? false,
    token,
    isLoading: currentUserQuery.isLoading,
    isFetching: currentUserQuery.isFetching,
    error: currentUserQuery.error,
    refetch: currentUserQuery.refetch,
  }
}

export { authKeys }
