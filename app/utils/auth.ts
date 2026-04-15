export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getRole = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const isDoctor = (): boolean => {
  return getToken() !== null && getRole() === "doctor";
};

export const isPatient = (): boolean => {
  return getToken() !== null && getRole() === "patient";
};

export const isAdmin = (): boolean => {
  return getToken() !== null && getRole() === "admin";
};