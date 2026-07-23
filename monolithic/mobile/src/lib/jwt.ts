/* eslint-disable no-bitwise */
import type { AuthUser } from '../types';

const BASE64_ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BASE64_PADDING = new RegExp('=+$');

type JwtPayload = {
  _id?: string;
  role?: string;
  exp?: number;
};

const decodeBase64 = (input: string) => {
  let output = '';
  let value = 0;
  let bits = 0;

  for (const character of input.replace(BASE64_PADDING, '')) {
    const index = BASE64_ALPHABET.indexOf(character);

    if (index === -1) {
      continue;
    }

    value = (value << 6) | index;
    bits += 6;

    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((value >> bits) & 0xff);
    }
  }

  return output;
};

const safeAtob = (value: string) => {
  const globalWithAtob = globalThis as typeof globalThis & {
    atob?: (input: string) => string;
  };

  if (typeof globalWithAtob.atob === 'function') {
    return globalWithAtob.atob(value);
  }

  return decodeBase64(value);
};

export const decodeJwt = (token: string | null): JwtPayload | null => {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split('.');

    if (!payload) {
      return null;
    }

    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + ((4 - (normalizedPayload.length % 4)) % 4),
      '=',
    );

    return JSON.parse(safeAtob(paddedPayload)) as JwtPayload;
  } catch {
    return null;
  }
};

export const getTokenExpiryMs = (token: string | null) => {
  const payload = decodeJwt(token);
  return payload?.exp ? payload.exp * 1000 : null;
};

export const getUserFromToken = (token: string | null): AuthUser | null => {
  const payload = decodeJwt(token);

  if (!payload?._id) {
    return null;
  }

  return {
    id: payload._id,
    role: payload.role || 'viewer',
  };
};
