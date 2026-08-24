import * as React from "react";

import { authApi } from "../api/auth.api";
import type { AuthMeResponse } from "../types/auth.type";

let cachedAuthToken: string | null = null;
let cachedAuthUser: AuthMeResponse | null = null;
let cachedAuthPromise: Promise<AuthMeResponse> | null = null;

const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current-user"] as const,
};

type AuthState = {
  user: AuthMeResponse | null;
  isLoading: boolean;
  error: Error | null;
};

async function loadCurrentUser(token: string, force = false) {
  if (!force && cachedAuthToken === token && cachedAuthUser) {
    return cachedAuthUser;
  }

  if (!force && cachedAuthToken === token && cachedAuthPromise) {
    return cachedAuthPromise;
  }

  const request = authApi
    .getCurrentUser(token)
    .then((user) => {
      cachedAuthToken = token;
      cachedAuthUser = user;
      return user;
    })
    .catch((error) => {
      cachedAuthToken = null;
      cachedAuthUser = null;
      throw error;
    });

  if (!force) {
    cachedAuthToken = token;
    cachedAuthPromise = request.finally(() => {
      cachedAuthPromise = null;
    });
    return cachedAuthPromise;
  }

  return request;
}

export function useAuth() {
  const [state, setState] = React.useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  React.useEffect(() => {
    let active = true;
    const token = authApi.getToken();

    if (!token) {
      setState({
        user: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    setState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: null,
    }));

    void loadCurrentUser(token)
      .then((user) => {
        if (!active) {
          return;
        }

        setState({
          user,
          isLoading: false,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }

        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Failed to load auth user");
        cachedAuthToken = null;
        cachedAuthUser = null;
        cachedAuthPromise = null;

        setState({
          user: null,
          isLoading: false,
          error: normalizedError,
        });
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    user: state.user,
    isAuthenticated: Boolean(state.user),
    mustChangePassword: state.user?.mustChangePassword ?? false,
    token: authApi.getToken(),
    isLoading: state.isLoading,
    isFetching: state.isLoading,
    error: state.error,
    refetch: async () => {
      const token = authApi.getToken();

      if (!token) {
        cachedAuthToken = null;
        cachedAuthUser = null;
        cachedAuthPromise = null;
        setState({
          user: null,
          isLoading: false,
          error: null,
        });
        return null;
      }

      setState((currentState) => ({
        ...currentState,
        isLoading: true,
        error: null,
      }));

      try {
        const user = await loadCurrentUser(token, true);
        cachedAuthToken = token;
        cachedAuthUser = user;
        cachedAuthPromise = null;
        setState({
          user,
          isLoading: false,
          error: null,
        });
        return user;
      } catch (error) {
        const normalizedError =
          error instanceof Error
            ? error
            : new Error("Failed to load auth user");
        cachedAuthToken = null;
        cachedAuthUser = null;
        cachedAuthPromise = null;
        setState({
          user: null,
          isLoading: false,
          error: normalizedError,
        });
        throw normalizedError;
      }
    },
  };
}

export { authKeys };
