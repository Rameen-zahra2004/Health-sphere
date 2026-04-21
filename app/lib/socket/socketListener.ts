"use client";

import { AppDispatch } from "@/app/Redux/store/store";
import { getSocket } from "@/app/lib/socket/socket";

import {
  socketAppointmentCreated,
  socketAppointmentUpdated,
  socketAppointmentCancelled,
  socketAppointmentCompleted,
} from "@/app/Redux/slices/appointmentSlice";

export const initAppointmentSocketListeners = (dispatch: AppDispatch) => {
  const socket = getSocket();

  // Avoid duplicate listeners (VERY IMPORTANT)
  socket.off("appointment-created");
  socket.off("appointment-updated");
  socket.off("appointment-cancelled");
  socket.off("appointment-completed");

  socket.on("appointment-created", (data) => {
    dispatch(socketAppointmentCreated(data));
  });

  socket.on("appointment-updated", (data) => {
    dispatch(socketAppointmentUpdated(data));
  });

  socket.on("appointment-cancelled", (id) => {
    dispatch(socketAppointmentCancelled(id));
  });

  socket.on("appointment-completed", (data) => {
    dispatch(socketAppointmentCompleted(data));
  });
};