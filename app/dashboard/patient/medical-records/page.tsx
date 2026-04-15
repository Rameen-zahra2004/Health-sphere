// "use client";

// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
// import {
//   fetchMyRecords,
//   deleteRecord,
// } from "@/app/Redux/slices/medicalRecordSlice";

// export default function Page() {
//   const dispatch = useAppDispatch();

//   const { records = [] } = useAppSelector((state) => state.medicalRecords);

//   useEffect(() => {
//     dispatch(fetchMyRecords());
//   }, [dispatch]);

//   const safeRecords = Array.isArray(records) ? records : [];

//   return (
//     <div className="space-y-4">
//       <h1 className="text-xl font-bold">Medical Records</h1>

//       {safeRecords.map((r) => (
//         <div key={r._id} className="border p-3 rounded">
//           <h3>{r.disease}</h3>
//           <p>{r.symptoms}</p>
//           <p>{r.description}</p>

//           <button
//             onClick={() => dispatch(deleteRecord(r._id))}
//             className="text-red-500"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/Redux/hooks";
import {
  fetchMyRecords,
  deleteRecord,
} from "@/app/Redux/slices/medicalRecordSlice";

export default function MedicalRecordsPage() {
  const dispatch = useAppDispatch();

  const records = useAppSelector((state) => state.medicalRecords.records);

  useEffect(() => {
    dispatch(fetchMyRecords());
  }, [dispatch]);

  const safeRecords = Array.isArray(records) ? records : [];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 text-sm">
            Your complete health history and reports
          </p>
        </div>

        {/* EMPTY STATE */}
        {safeRecords.length === 0 ? (
          <div className="bg-white border rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-500">No medical records found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {safeRecords.map((r) => (
              <div
                key={r._id}
                className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                {/* TITLE */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {r.disease}
                </h3>

                {/* DETAILS */}
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Symptoms:</span> {r.symptoms}
                </p>

                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Description:</span>{" "}
                  {r.description}
                </p>

                {/* ACTIONS */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => dispatch(deleteRecord(r._id))}
                    className="
                      text-red-600 text-sm font-medium
                      hover:text-red-700
                      transition
                    "
                  >
                    Delete Record
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
