export const getRoom = (role: string, userId: string) => {
  return `${role}-${userId}`;
};

/* =========================
   PREDEFINED ROOMS (OPTIONAL)
========================= */
export const ROOMS = {
  doctor: (id: string) => `doctor-${id}`,
  patient: (id: string) => `patient-${id}`,
  admin: (id: string) => `admin-${id}`,
};