
import api from "@/app/lib/api/api";
import { LoginCredentials, RegisterCredentials } from "@/app/types/auth";

export const authService = {
  login: async (data: LoginCredentials) => {
    const res = await api.post("/auth/login", data);

    const result = res.data;

    const token = result?.token || result?.accessToken;

    if (!token) {
      console.error("❌ Token missing in response", result);
    } else {
      localStorage.setItem("accessToken", token); // ✅ ONLY ONE KEY
    }

    return result;
  },

  register: async (data: RegisterCredentials) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role ?? "patient",
    };

    const res = await api.post("/auth/register", payload);
    return res.data;
  },

  me: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};
