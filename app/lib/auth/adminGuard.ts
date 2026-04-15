
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  exp: number;
  role: string;
};

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    const isExpired = decoded.exp * 1000 < Date.now();

    return !isExpired && decoded.role === "admin";
  } catch {
    return false;
  }
}