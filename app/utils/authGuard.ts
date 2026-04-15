
export const isDoctorAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) return false;

  return role === "doctor";
};