import axios from "axios";
import { Doctor, UpdateDoctorDTO } from "@/app/types/doctor";

const API = "/api/doctors";

export const doctorService = {
  getProfile: async (userId: string): Promise<Doctor> => {
    const res = await axios.get(`${API}/${userId}`);
    return res.data.data;
  },

  updateProfile: async (
    userId: string,
    data: UpdateDoctorDTO
  ): Promise<Doctor> => {
    const res = await axios.put(`${API}/${userId}`, data);
    return res.data.data;
  },

  getAllDoctors: async (): Promise<Doctor[]> => {
    const res = await axios.get(API);
    return res.data.data;
  },
};