export const decodeJwt = (token) => {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = atob(normalizedPayload);
    return JSON.parse(decodedPayload);
  } catch (_error) {
    return null;
  }
};

export const getTokenExpiryMs = (token) => {
  const payload = decodeJwt(token);
  return payload?.exp ? payload.exp * 1000 : null;
};

export const getUserFromToken = (token) => {
  const payload = decodeJwt(token);
  if (!payload?._id) {
    return null;
  }

  return {
    id: payload._id,
    role: payload.role || "viewer",
  };
};
