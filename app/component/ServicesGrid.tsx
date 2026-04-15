// "use client";

// import { memo } from "react";

// /**
//  * ===============================
//  * Types
//  * ===============================
//  */
// export interface Service {
//   id: number;
//   title: string;
//   desc: string;
//   icon: string;
// }

// /**
//  * ===============================
//  * Static Data (can move to API later)
//  * ===============================
//  */
// const services: Service[] = [
//   {
//     id: 1,
//     title: "General Checkup",
//     desc: "Routine health examinations to keep you fit and healthy.",
//     icon: "🩺",
//   },
//   {
//     id: 2,
//     title: "Cardiology",
//     desc: "Expert heart care and cardiovascular treatments.",
//     icon: "❤️",
//   },
//   {
//     id: 3,
//     title: "Dermatology",
//     desc: "Skin treatments for all types of conditions.",
//     icon: "🧴",
//   },
//   {
//     id: 4,
//     title: "Pediatrics",
//     desc: "Specialized healthcare for infants and children.",
//     icon: "👶",
//   },
//   {
//     id: 5,
//     title: "Dental Care",
//     desc: "Complete oral and dental health services.",
//     icon: "🦷",
//   },
//   {
//     id: 6,
//     title: "Orthopedics",
//     desc: "Treatment for bones, joints, and musculoskeletal issues.",
//     icon: "🦴",
//   },
// ];

// /**
//  * ===============================
//  * Service Card
//  * ===============================
//  */
// const ServiceCard = memo(({ service }: { service: Service }) => {
//   return (
//     <article
//       className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 border border-gray-100 group"
//       aria-labelledby={`service-${service.id}`}
//     >
//       {/* Icon */}
//       <div className="text-4xl mb-4 transition-transform group-hover:scale-110">
//         {service.icon}
//       </div>

//       {/* Title */}
//       <h3
//         id={`service-${service.id}`}
//         className="text-lg font-semibold text-gray-900 mb-2"
//       >
//         {service.title}
//       </h3>

//       {/* Description */}
//       <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
//     </article>
//   );
// });

// ServiceCard.displayName = "ServiceCard";

// /**
//  * ===============================
//  * Services Grid
//  * ===============================
//  */
// export default function ServicesGrid() {
//   return (
//     <div
//       className="
//         grid gap-6
//         sm:grid-cols-2
//         md:grid-cols-3
//         lg:grid-cols-3
//         xl:grid-cols-4
//       "
//     >
//       {services.map((service) => (
//         <ServiceCard key={service.id} service={service} />
//       ))}
//     </div>
//   );
// }
"use client";

import { memo } from "react";
import Link from "next/link";

/**
 * ===============================
 * Types
 * ===============================
 */
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}

/**
 * ===============================
 * Static Services Data
 * ===============================
 */
const services: Service[] = [
  {
    id: 1,
    title: "General Checkup",
    description:
      "Routine health evaluations to monitor your overall well-being and detect issues early.",
    icon: "🩺",
    highlights: ["Vitals Monitoring", "Preventive Care", "Health Advice"],
  },
  {
    id: 2,
    title: "Cardiology",
    description:
      "Comprehensive heart care with expert diagnosis and treatment plans.",
    icon: "❤️",
    highlights: ["ECG Tests", "Heart Specialist", "Cardiac Care"],
  },
  {
    id: 3,
    title: "Dermatology",
    description: "Advanced treatments for skin, hair, and nail conditions.",
    icon: "🧴",
    highlights: ["Acne Treatment", "Skin Care", "Allergy Solutions"],
  },
  {
    id: 4,
    title: "Pediatrics",
    description:
      "Dedicated healthcare services for infants, children, and adolescents.",
    icon: "👶",
    highlights: ["Child Growth", "Vaccination", "Pediatric Care"],
  },
  {
    id: 5,
    title: "Dental Care",
    description: "Complete oral health services with modern dental solutions.",
    icon: "🦷",
    highlights: ["Teeth Cleaning", "Braces", "Oral Surgery"],
  },
  {
    id: 6,
    title: "Orthopedics",
    description:
      "Expert care for bones, joints, and musculoskeletal conditions.",
    icon: "🦴",
    highlights: ["Joint Pain", "Fracture Care", "Physiotherapy"],
  },
];

/**
 * ===============================
 * Service Card
 * ===============================
 */
const ServiceCard = memo(({ service }: { service: Service }) => {
  return (
    <article className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between">
      {/* Top */}
      <div>
        {/* Icon */}
        <div className="text-4xl mb-4 group-hover:scale-110 transition">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>

        {/* Highlights */}
        <ul className="space-y-1 mb-4">
          {service.highlights.map((item, i) => (
            <li
              key={i}
              className="text-xs text-gray-500 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <Link
        href="/contact"
        className="mt-auto inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        Learn More →
      </Link>
    </article>
  );
});

ServiceCard.displayName = "ServiceCard";

/**
 * ===============================
 * Services Grid
 * ===============================
 */
export default function ServicesGrid() {
  return (
    <section
      aria-label="Our healthcare services"
      className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
}
