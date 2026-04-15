// "use client";

// import { useMemo, useState } from "react";

// /* =========================
//    TYPES
// ========================= */

// interface AvailabilityDay {
//   day: string;
//   isAvailable: boolean;
//   startTime: string;
//   endTime: string;
// }

// /* =========================
//    CONSTANTS
// ========================= */

// const DAYS = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// /* =========================
//    PAGE
// ========================= */

// export default function AvailabilityPage() {
//   const [availability, setAvailability] = useState<AvailabilityDay[]>(
//     DAYS.map((day) => ({
//       day,
//       isAvailable: false,
//       startTime: "09:00",
//       endTime: "17:00",
//     })),
//   );

//   /* =========================
//      HANDLERS
//   ========================= */

//   const toggleDay = (day: string) => {
//     setAvailability((prev) =>
//       prev.map((item) =>
//         item.day === day ? { ...item, isAvailable: !item.isAvailable } : item,
//       ),
//     );
//   };

//   const handleTimeChange = (
//     day: string,
//     field: "startTime" | "endTime",
//     value: string,
//   ) => {
//     setAvailability((prev) =>
//       prev.map((item) =>
//         item.day === day ? { ...item, [field]: value } : item,
//       ),
//     );
//   };

//   const handleSave = () => {
//     const doctorId = localStorage.getItem("userId");

//     const payload = {
//       doctorId,
//       availability,
//     };

//     console.log("SAVE AVAILABILITY:", payload);
//   };

//   /* =========================
//      COMPUTED STATS
//   ========================= */

//   const activeDays = useMemo(
//     () => availability.filter((d) => d.isAvailable).length,
//     [availability],
//   );

//   /* =========================
//      UI
//   ========================= */

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-white">
//       <div className="max-w-4xl mx-auto p-6 space-y-8">
//         {/* HEADER */}
//         <div className="bg-white/70 backdrop-blur border border-blue-100 rounded-2xl p-5 shadow-sm">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Doctor Availability
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Set your weekly working schedule for patient appointments
//           </p>

//           {/* STATS */}
//           <div className="mt-4 flex gap-3">
//             <Stat label="Total Days" value={7} />
//             <Stat label="Active Days" value={activeDays} />
//           </div>
//         </div>

//         {/* LIST */}
//         <div className="bg-white border border-blue-100 rounded-2xl shadow-sm divide-y">
//           {availability.map((item) => (
//             <div
//               key={item.day}
//               className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 hover:bg-slate-50 transition"
//             >
//               {/* LEFT SIDE */}
//               <div className="flex items-center gap-3">
//                 <input
//                   id={`check-${item.day}`}
//                   type="checkbox"
//                   checked={item.isAvailable}
//                   onChange={() => toggleDay(item.day)}
//                   className="w-5 h-5 accent-sky-600 cursor-pointer"
//                 />

//                 <label
//                   htmlFor={`check-${item.day}`}
//                   className="font-medium text-gray-800 cursor-pointer"
//                 >
//                   {item.day}
//                 </label>

//                 {item.isAvailable && (
//                   <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
//                     Active
//                   </span>
//                 )}
//               </div>

//               {/* RIGHT SIDE */}
//               {item.isAvailable ? (
//                 <div className="flex items-center gap-3 flex-wrap">
//                   {/* START */}
//                   <TimeBox
//                     label="Start"
//                     value={item.startTime}
//                     onChange={(val) =>
//                       handleTimeChange(item.day, "startTime", val)
//                     }
//                     id={`start-${item.day}`}
//                   />

//                   <span className="text-gray-400">—</span>

//                   {/* END */}
//                   <TimeBox
//                     label="End"
//                     value={item.endTime}
//                     onChange={(val) =>
//                       handleTimeChange(item.day, "endTime", val)
//                     }
//                     id={`end-${item.day}`}
//                   />
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-400 italic">Not available</p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* SAVE BUTTON (sticky modern style feel) */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleSave}
//             className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl shadow-sm transition"
//           >
//             Save Availability
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================
//    COMPONENTS
// ========================= */

// function Stat({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="bg-white border border-blue-100 rounded-xl px-4 py-2 shadow-sm">
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="text-lg font-semibold text-sky-700">{value}</p>
//     </div>
//   );
// }

// function TimeBox({
//   label,
//   value,
//   onChange,
//   id,
// }: {
//   label: string;
//   value: string;
//   onChange: (val: string) => void;
//   id: string;
// }) {
//   return (
//     <div className="flex flex-col">
//       <label htmlFor={id} className="text-xs text-gray-500 mb-1">
//         {label}
//       </label>
//       <input
//         id={id}
//         type="time"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="border border-blue-100 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-sky-200 outline-none"
//       />
//     </div>
//   );
// }
"use client";

import { useMemo, useState } from "react";

/* =========================
   TYPES
========================= */

interface AvailabilityDay {
  day: string;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

/* =========================
   CONSTANTS
========================= */

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/* =========================
   PAGE
========================= */

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState<AvailabilityDay[]>(
    DAYS.map((day) => ({
      day,
      isAvailable: false,
      startTime: "09:00",
      endTime: "17:00",
    })),
  );

  const toggleDay = (day: string) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, isAvailable: !item.isAvailable } : item,
      ),
    );
  };

  const handleTimeChange = (
    day: string,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setAvailability((prev) =>
      prev.map((item) =>
        item.day === day ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSave = () => {
    const doctorId = localStorage.getItem("userId");

    const payload = {
      doctorId,
      availability,
    };

    console.log("SAVE AVAILABILITY:", payload);
  };

  const activeDays = useMemo(
    () => availability.filter((d) => d.isAvailable).length,
    [availability],
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-6 shadow-sm">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 blur-3xl opacity-40 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 blur-3xl opacity-40 rounded-full" />

          <h1 className="text-3xl font-bold text-slate-800">
            Doctor Availability
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Configure your weekly schedule for patient appointments
          </p>

          {/* STATS */}
          <div className="mt-5 flex gap-3 flex-wrap">
            <Stat label="Total Days" value={7} />
            <Stat label="Active Days" value={activeDays} />
            <Stat label="Inactive Days" value={7 - activeDays} />
          </div>
        </div>

        {/* LIST */}
        <div className="bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-sm divide-y overflow-hidden">
          {availability.map((item) => (
            <div
              key={item.day}
              className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 hover:bg-white/80 transition"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <input
                  id={`check-${item.day}`}
                  type="checkbox"
                  checked={item.isAvailable}
                  onChange={() => toggleDay(item.day)}
                  className="w-5 h-5 accent-blue-600 cursor-pointer"
                />

                <label
                  htmlFor={`check-${item.day}`}
                  className="font-medium text-slate-800 cursor-pointer"
                >
                  {item.day}
                </label>

                {item.isAvailable ? (
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-500 border">
                    Inactive
                  </span>
                )}
              </div>

              {/* RIGHT */}
              {item.isAvailable ? (
                <div className="flex items-center gap-3 flex-wrap">
                  <TimeBox
                    label="Start"
                    value={item.startTime}
                    onChange={(val) =>
                      handleTimeChange(item.day, "startTime", val)
                    }
                    id={`start-${item.day}`}
                  />

                  <span className="text-slate-400">→</span>

                  <TimeBox
                    label="End"
                    value={item.endTime}
                    onChange={(val) =>
                      handleTimeChange(item.day, "endTime", val)
                    }
                    id={`end-${item.day}`}
                  />
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  Not available for appointments
                </p>
              )}
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-2xl text-white font-medium bg-linear-to-r from-blue-500 to-indigo-600 shadow-md hover:shadow-xl hover:scale-105 transition"
          >
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/80 backdrop-blur border border-blue-100 rounded-2xl px-4 py-3 shadow-sm min-w-30 ">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-xl font-bold text-blue-600">{value}</p>
    </div>
  );
}

function TimeBox({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  id: string;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-xs text-slate-500 mb-1">
        {label}
      </label>
      <input
        id={id}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-blue-100 bg-white/70 backdrop-blur focus:ring-2 focus:ring-blue-300 outline-none transition"
      />
    </div>
  );
}
