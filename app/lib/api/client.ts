
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api`
    : "http://localhost:4000/api";

/* ================= ERROR CLASS ================= */

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/* ================= TYPES ================= */

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  skipAuth?: boolean;
  validate?: (data: unknown) => boolean;
};

/* ================= UNAUTHORIZED HANDLER ================= */

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

/* ================= RESPONSE PARSER ================= */

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!response.ok) {
    let details: unknown;
    let message = `Request failed with status ${response.status}`;

    if (isJson) {
      const data = await response.json().catch(() => null);
      details = data;

      if (
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof (data as { message?: unknown }).message === "string"
      ) {
        message = (data as { message: string }).message;
      }
    } else {
      const text = await response.text().catch(() => "");
      if (text) message = text;
      details = text || undefined;
    }

    throw new ApiError(message, response.status, details);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  if (isJson) {
    return response.json() as Promise<T>;
  }

  return (await response.text()) as unknown as T;
}

/* ================= CORE REQUEST ================= */

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;

  const headers = new Headers(options.headers || {});

  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  /* ===== TOKEN ===== */
  if (!options.skipAuth && typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: options.credentials ?? "include",
    body:
      options.body === undefined
        ? undefined
        : typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body),
  });

  /* ===== HANDLE 401 ===== */
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    unauthorizedHandler?.();
  }

  const data = await parseResponse<T>(response);

  if (options.validate && !options.validate(data)) {
    throw new ApiError("Invalid response format", 500, data);
  }

  return data;
}

/* ================= SHORTCUT METHODS ================= */

export const apiGet = <T>(path: string, options?: RequestOptions) =>
  apiRequest<T>(path, { ...options, method: "GET" });

export const apiPost = <T>(path: string, body?: unknown, options?: RequestOptions) =>
  apiRequest<T>(path, { ...options, method: "POST", body });

export const apiPut = <T>(path: string, body?: unknown, options?: RequestOptions) =>
  apiRequest<T>(path, { ...options, method: "PUT", body });

export const apiPatch = <T>(path: string, body?: unknown, options?: RequestOptions) =>
  apiRequest<T>(path, { ...options, method: "PATCH", body });

export const apiDelete = <T>(path: string, options?: RequestOptions) =>
  apiRequest<T>(path, { ...options, method: "DELETE" });