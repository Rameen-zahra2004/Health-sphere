"use client";

import { createContext, useContext, useEffect } from "react";
import { initSocket, disconnectSocket } from "@/app/lib/socket/socket";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // init socket once app loads
    initSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider value={null}>{children}</SocketContext.Provider>
  );
}
