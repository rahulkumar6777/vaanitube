export const API_BASE_URL = 'https://vaaanitube-api.deployhub.online/api';

type ApiFetchOptions = Omit<RequestInit, 'body' | 'headers'> & {
  headers?: Record<string, string>;
  body?: FormData | string;
};

const normalizeError = async (response: Response) => {
  let payload: { message?: string; error?: string } | null = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  const message = payload?.message || payload?.error || 'Something went wrong';
  const error = new Error(message) as Error & {
    status?: number;
    payload?: unknown;
  };
  error.status = response.status;
  error.payload = payload;
  return error;
};

const isFormData = (body: unknown): body is FormData => {
  return typeof FormData !== 'undefined' && body instanceof FormData;
};

export const apiFetch = async <T>(
  path: string,
  options: ApiFetchOptions = {},
) => {
  const headers = new Headers(options.headers || {});

  if (
    options.body &&
    !isFormData(options.body) &&
    !headers.has('Content-Type')
  ) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  } as RequestInit);

  if (!response.ok) {
    throw await normalizeError(response);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
};

export type AuthTokenResponse = {
  AccessToken?: string;
  accessToken?: string;
  message?: string;
  success?: boolean;
};

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    apiFetch<AuthTokenResponse>('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  refreshToken: () =>
    apiFetch<AuthTokenResponse>('/v1/auth/refresh/token', {
      method: 'GET',
    }),

  initViewerSignup: (payload: {
    fullName: string;
    email: string;
    phoneno: string;
    age: number;
    password: string;
  }) =>
    apiFetch<{ message?: string; success?: boolean }>(
      '/v1/auth/register/viewer-init',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    ),

  initCreatorSignup: (payload: FormData) =>
    apiFetch<{ message?: string; success?: boolean }>(
      '/v1/auth/register/creator-init',
      {
        method: 'POST',
        body: payload,
      },
    ),

  verifySignup: (payload: { email: string; otp: string }) =>
    apiFetch<{ message?: string; success?: boolean }>(
      '/v1/auth/register/verify',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    ),
};
