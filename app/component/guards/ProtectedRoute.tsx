"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

type Props = {
  children: React.ReactNode;
  allowedRole?: string | string[];
};

export default function ProtectedRoute({
  children,
  allowedRole = "doctor",
}: Props) {
  const router = useRouter();

  /* =========================
     MEMOIZED ROLE LIST
  ========================= */
  const allowedRoles = useMemo(() => {
    return Array.isArray(allowedRole) ? allowedRole : [allowedRole];
  }, [allowedRole]);

  /* =========================
     SAFE TOKEN READ
  ========================= */
  const { token, role } = useMemo(() => {
    if (typeof window === "undefined") {
      return { token: null, role: null };
    }

    return {
      token: localStorage.getItem("accessToken"),
      role: localStorage.getItem("role"),
    };
  }, []);

  /* =========================
     AUTH CHECK
  ========================= */
  useEffect(() => {
    if (!token) {
      router.replace("/login");
      return;
    }

    if (!role || !allowedRoles.includes(role)) {
      router.replace("/unauthorized");
    }
  }, [token, role, allowedRoles, router]);

  /* =========================
     RENDER GUARD
  ========================= */
  if (!token || !role || !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
}
