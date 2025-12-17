"use client";

export type WishPayload = {
  wish: string;
  createdAt: number;
};

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(b64url: string) {
  const base64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 ? "=".repeat(4 - (base64.length % 4)) : "";
  const raw = atob(base64 + pad);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export function encodeWish(wish: string) {
  const payload: WishPayload = { wish, createdAt: Date.now() };
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  return toBase64Url(bytes);
}

export function decodeWish(token: string): WishPayload | null {
  try {
    const bytes = fromBase64Url(token);
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json) as WishPayload;
    if (!parsed || typeof parsed.wish !== "string" || typeof parsed.createdAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}


