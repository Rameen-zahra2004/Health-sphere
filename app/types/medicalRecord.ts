export interface MedicalRecord {
  _id: string;
  patient: string; // patient ID
  disease: string;
  symptoms: string;
  description: string;
  createdAt: string;
  updatedAt?: string; // ✅ optional but recommended for production
}

export interface MedicalRecordPayload {
  disease: string;
  symptoms: string;
  description: string;
}