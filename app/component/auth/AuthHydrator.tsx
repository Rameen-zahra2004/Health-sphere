"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/app/Redux/hooks";
import { setCredentials } from "@/app/Redux/slices/authSlice";
import api from "@/app/lib/api/api";

export default function AuthHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(
          setCredentials({
            token,
            user: res.data.user, // ✅ FULL VALID USER
          }),
        );
      } catch {
        localStorage.removeItem("token");
      }
    };

    initAuth();
  }, [dispatch]);

  return null;
}
