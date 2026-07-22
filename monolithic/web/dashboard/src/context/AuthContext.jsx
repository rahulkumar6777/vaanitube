import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../lib/api.js";
import { getTokenExpiryMs, getUserFromToken } from "../lib/jwt.js";

const AuthContext = createContext(null);
const REFRESH_BEFORE_EXPIRY_MS = 60 * 1000;
let inFlightRefreshPromise = null;

const readAccessToken = (payload) => payload?.AccessToken || payload?.accessToken || null;

const requestRefreshToken = () => {
  if (!inFlightRefreshPromise) {
    inFlightRefreshPromise = authApi.refreshToken().finally(() => {
      inFlightRefreshPromise = null;
    });
  }

  return inFlightRefreshPromise;
};

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [status, setStatus] = useState("checking");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [authError, setAuthError] = useState("");

  const user = useMemo(() => getUserFromToken(accessToken), [accessToken]);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setIsRefreshing(false);
    setStatus("unauthenticated");
  }, []);

  const refreshAccessToken = useCallback(async ({ showChecking = false } = {}) => {
    if (showChecking) {
      setStatus("checking");
    }

    setIsRefreshing(true);

    try {
      const payload = await requestRefreshToken();
      const nextAccessToken = readAccessToken(payload);

      if (!nextAccessToken) {
        throw new Error("Refresh response did not include access token");
      }

      setAccessToken(nextAccessToken);
      setStatus("authenticated");
      setAuthError("");
      return nextAccessToken;
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const bootstrapSession = useCallback(async () => {
    try {
      await refreshAccessToken({ showChecking: true });
    } catch (_error) {
      clearSession();
    }
  }, [clearSession, refreshAccessToken]);

  useEffect(() => {
    bootstrapSession();
  }, [bootstrapSession]);

  useEffect(() => {
    if (!accessToken) {
      return undefined;
    }

    const expiryMs = getTokenExpiryMs(accessToken);
    if (!expiryMs) {
      return undefined;
    }

    const delayMs = Math.max(expiryMs - Date.now() - REFRESH_BEFORE_EXPIRY_MS, 0);
    const refreshTimer = window.setTimeout(async () => {
      try {
        await refreshAccessToken();
      } catch (_error) {
        clearSession();
      }
    }, delayMs);

    return () => window.clearTimeout(refreshTimer);
  }, [accessToken, clearSession, refreshAccessToken]);

  const login = useCallback(async ({ email, password }) => {
    setStatus("checking");
    setAuthError("");

    try {
      const payload = await authApi.login({ email, password });
      const nextAccessToken = readAccessToken(payload);

      if (!nextAccessToken) {
        throw new Error("Login response did not include access token");
      }

      setAccessToken(nextAccessToken);
      setStatus("authenticated");
      return nextAccessToken;
    } catch (error) {
      clearSession();
      setAuthError(error.message);
      throw error;
    }
  }, [clearSession]);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      accessToken,
      authError,
      isAuthReady: status !== "checking",
      isAuthenticated: status === "authenticated",
      isChecking: status === "checking",
      isRefreshing,
      login,
      logout,
      refreshAccessToken,
      status,
      user,
    }),
    [accessToken, authError, isRefreshing, login, logout, refreshAccessToken, status, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
