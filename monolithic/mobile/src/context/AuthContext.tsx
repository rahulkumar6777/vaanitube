import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authApi, type AuthTokenResponse } from '../lib/api';
import { getTokenExpiryMs, getUserFromToken } from '../lib/jwt';
import type { AuthStatus, AuthUser } from '../types';

type LoginPayload = {
  email: string;
  password: string;
};

type AuthContextValue = {
  accessToken: string | null;
  authError: string;
  isAuthReady: boolean;
  isAuthenticated: boolean;
  isChecking: boolean;
  isRefreshing: boolean;
  login: (payload: LoginPayload) => Promise<string>;
  logout: () => void;
  refreshAccessToken: (options?: { showChecking?: boolean }) => Promise<string>;
  status: AuthStatus;
  user: AuthUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const REFRESH_BEFORE_EXPIRY_MS = 60 * 1000;
let inFlightRefreshPromise: Promise<AuthTokenResponse> | null = null;

const readAccessToken = (payload: AuthTokenResponse | null) => {
  return payload?.AccessToken || payload?.accessToken || null;
};

const requestRefreshToken = () => {
  if (!inFlightRefreshPromise) {
    inFlightRefreshPromise = authApi.refreshToken().finally(() => {
      inFlightRefreshPromise = null;
    });
  }

  return inFlightRefreshPromise;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>('checking');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [authError, setAuthError] = useState('');

  const user = useMemo(() => getUserFromToken(accessToken), [accessToken]);

  const clearSession = useCallback(() => {
    setAccessToken(null);
    setIsRefreshing(false);
    setStatus('unauthenticated');
  }, []);

  const refreshAccessToken = useCallback(
    async ({ showChecking = false }: { showChecking?: boolean } = {}) => {
      if (showChecking) {
        setStatus('checking');
      }

      setIsRefreshing(true);

      try {
        const payload = await requestRefreshToken();
        const nextAccessToken = readAccessToken(payload);

        if (!nextAccessToken) {
          throw new Error('Refresh response did not include access token');
        }

        setAccessToken(nextAccessToken);
        setStatus('authenticated');
        setAuthError('');
        return nextAccessToken;
      } finally {
        setIsRefreshing(false);
      }
    },
    [],
  );

  const bootstrapSession = useCallback(async () => {
    try {
      await refreshAccessToken({ showChecking: true });
    } catch {
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

    const delayMs = Math.max(
      expiryMs - Date.now() - REFRESH_BEFORE_EXPIRY_MS,
      0,
    );
    const refreshTimer = setTimeout(async () => {
      try {
        await refreshAccessToken();
      } catch {
        clearSession();
      }
    }, delayMs);

    return () => clearTimeout(refreshTimer);
  }, [accessToken, clearSession, refreshAccessToken]);

  const login = useCallback(
    async ({ email, password }: LoginPayload) => {
      setStatus('checking');
      setAuthError('');

      try {
        const payload = await authApi.login({ email, password });
        const nextAccessToken = readAccessToken(payload);

        if (!nextAccessToken) {
          throw new Error('Login response did not include access token');
        }

        setAccessToken(nextAccessToken);
        setStatus('authenticated');
        return nextAccessToken;
      } catch (error) {
        clearSession();
        const message = error instanceof Error ? error.message : 'Login failed';
        setAuthError(message);
        throw new Error(message);
      }
    },
    [clearSession],
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      accessToken,
      authError,
      isAuthReady: status !== 'checking',
      isAuthenticated: status === 'authenticated',
      isChecking: status === 'checking',
      isRefreshing,
      login,
      logout,
      refreshAccessToken,
      status,
      user,
    }),
    [
      accessToken,
      authError,
      isRefreshing,
      login,
      logout,
      refreshAccessToken,
      status,
      user,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
