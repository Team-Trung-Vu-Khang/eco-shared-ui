import type { AuthEnv } from "../types/auth.type";

export const authEnv: AuthEnv = {
  callbackPath: import.meta.env.VITE_AUTH_CALLBACK_PATH,
  postLogoutRedirectUri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
  provider: import.meta.env.VITE_AUTH_PROVIDER,
};
