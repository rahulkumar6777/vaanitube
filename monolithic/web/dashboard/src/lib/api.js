const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const normalizeError = async (response) => {
  let payload = null;

  try {
    payload = await response.json();
  } catch (_error) {
    payload = null;
  }

  const message = payload?.message || payload?.error || "Something went wrong";
  const error = new Error(message);
  error.status = response.status;
  error.payload = payload;
  return error;
};

export const apiFetch = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});

  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    throw await normalizeError(response);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const authApi = {
  login: (payload) =>
    apiFetch("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  refreshToken: () =>
    apiFetch("/v1/auth/refresh/token", {
      method: "GET",
    }),

  initViewerSignup: (payload) =>
    apiFetch("/v1/auth/register/viewer-init", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  initCreatorSignup: (payload) =>
    apiFetch("/v1/auth/register/creator-init", {
      method: "POST",
      body: payload,
    }),

  verifySignup: (payload) =>
    apiFetch("/v1/auth/register/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
