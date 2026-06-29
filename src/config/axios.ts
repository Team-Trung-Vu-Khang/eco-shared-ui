import axios from "axios";
import { apiEnv } from "../config/api.env";
import { authStorage } from "@/features/auth";

export const apiClient = axios.create({
  baseURL: apiEnv.apiBaseUrl,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
