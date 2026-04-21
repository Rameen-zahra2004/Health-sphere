const userSocketMap = new Map<string, string>(); 
// userId -> socketId

/* =========================
   ADD USER
========================= */
export const addUser = (userId: string, socketId: string) => {
  userSocketMap.set(userId, socketId);
};

/* =========================
   REMOVE USER
========================= */
export const removeUser = (socketId: string) => {
  for (const [userId, id] of userSocketMap.entries()) {
    if (id === socketId) {
      userSocketMap.delete(userId);
      break;
    }
  }
};

/* =========================
   GET SOCKET BY USER
========================= */
export const getUserSocket = (userId: string) => {
  return userSocketMap.get(userId);
};