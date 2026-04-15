"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthenticated } from "@/app/lib/auth/adminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  /* ================= PROTECTION ================= */
  useEffect(() => {
    const isAllowed = isAdminAuthenticated();

    if (!isAllowed) {
      router.replace("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}
