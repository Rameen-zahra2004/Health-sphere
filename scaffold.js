import * as fs from "node:fs";
import * as path from "node:path";

const pages = [
  "app/(public)/home/page.tsx",
  "app/(public)/about/page.tsx",
  "app/(public)/contact/page.tsx",
  "app/(public)/services/page.tsx",
  "app/(public)/blog/page.tsx",
  "app/(public)/faq/page.tsx",
  "app/(public)/privacy-policy/page.tsx",
  "app/(public)/terms/page.tsx",
  "app/(auth)/login/page.tsx",
  "app/(auth)/register/page.tsx",
  "app/(auth)/forgot-password/page.tsx",
  "app/(auth)/verify-email/page.tsx",
  "app/(auth)/reset-password/page.tsx",
  "app/(patient)/dashboard/page.tsx",
  "app/(patient)/profile/page.tsx",
  "app/(patient)/appointments/page.tsx",
  "app/(patient)/appointments/book/page.tsx",
  "app/(patient)/appointments/history/page.tsx",
  "app/(patient)/appointments/[id]/page.tsx",
  "app/(patient)/doctors/page.tsx",
  "app/(patient)/doctor/[id]/page.tsx",
  "app/(patient)/prescriptions/page.tsx",
  "app/(patient)/medical-records/page.tsx",
  "app/(patient)/reports/page.tsx",
  "app/(patient)/billing/page.tsx",
  "app/(patient)/notifications/page.tsx",
  "app/(patient)/chat/page.tsx",
  "app/(patient)/ai/symptom-checker/page.tsx",
  "app/(patient)/ai/report-analysis/page.tsx",
  "app/(patient)/ai/health-insights/page.tsx",
  "app/(doctor)/dashboard/page.tsx",
  "app/(doctor)/profile/page.tsx",
  "app/(doctor)/schedule/page.tsx",
  "app/(doctor)/appointments/page.tsx",
  "app/(doctor)/patients/page.tsx",
  "app/(doctor)/prescriptions/page.tsx",
  "app/(doctor)/chat/page.tsx",
  "app/(doctor)/reviews/page.tsx",
  "app/(admin)/dashboard/page.tsx",
  "app/(admin)/analytics/page.tsx",
  "app/(admin)/doctors/page.tsx",
  "app/(admin)/patients/page.tsx",
  "app/(admin)/appointments/page.tsx",
  "app/(admin)/departments/page.tsx",
  "app/(admin)/payments/page.tsx",
  "app/(admin)/reports/page.tsx",
  "app/(admin)/settings/page.tsx",
  "app/(shared)/search/page.tsx",
  "app/(shared)/notifications/page.tsx",
  "app/(shared)/support/page.tsx",
];

for (const p of pages) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const title = p.replace(/^app\//, "").replace("/page.tsx", "");
  const label = title.replace(/[()]/g, "").replace(/\//g, " / ");
  const content = `export default function Page() {
  return (
    <main className="min-h-screen p-6 sm:p-10">
      <h1 className="text-2xl font-bold capitalize">${label}</h1>
      <p className="mt-2 text-sm opacity-70">Scaffolded page — ${title}</p>
    </main>
  );
}
`;
  fs.writeFileSync(p, content);
  console.log("created:", p);
}

// Route group layouts
const layouts = [
  ["app/(public)/layout.tsx", "public"],
  ["app/(auth)/layout.tsx", "auth"],
  ["app/(patient)/layout.tsx", "patient"],
  ["app/(doctor)/layout.tsx", "doctor"],
  ["app/(admin)/layout.tsx", "admin"],
  ["app/(shared)/layout.tsx", "shared"],
];

for (const [p, group] of layouts) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  const content = `export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
  fs.writeFileSync(p, content);
  console.log("created layout:", p);
}

// i18n
fs.mkdirSync("app/i18n", { recursive: true });
fs.writeFileSync(
  "app/i18n/index.ts",
  `export const locales = ['en', 'ur'] as const;
export type Locale = (typeof locales)[number];

export const dictionary: Record<Locale, Record<string, string>> = {
  en: {
    appName: 'HealthSphere',
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    services: 'Services',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    appointments: 'Appointments',
    doctors: 'Doctors',
    patients: 'Patients',
    prescriptions: 'Prescriptions',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',
    search: 'Search',
    notifications: 'Notifications',
    support: 'Support',
    chat: 'Chat',
    billing: 'Billing',
    profile: 'Profile',
    schedule: 'Schedule',
    reviews: 'Reviews',
    analytics: 'Analytics',
    departments: 'Departments',
    payments: 'Payments',
    medicalRecords: 'Medical Records',
    symptomChecker: 'Symptom Checker',
    reportAnalysis: 'Report Analysis',
    healthInsights: 'Health Insights',
  },
  ur: {
    appName: 'ہیلتھ اسفیئر',
    home: 'ہوم',
    about: 'ہمارے بارے میں',
    contact: 'رابطہ',
    services: 'خدمات',
    login: 'لاگ ان',
    register: 'رجسٹر',
    dashboard: 'ڈیش بورڈ',
    appointments: 'ملاقاتیں',
    doctors: 'ڈاکٹرز',
    patients: 'مریض',
    prescriptions: 'نسخے',
    reports: 'رپورٹس',
    settings: 'ترتیبات',
    logout: 'لاگ آؤٹ',
    search: 'تلاش',
    notifications: 'اطلاعات',
    support: 'سپورٹ',
    chat: 'چیٹ',
    billing: 'بلنگ',
    profile: 'پروفائل',
    schedule: 'شیڈول',
    reviews: 'جائزے',
    analytics: 'تجزیات',
    departments: 'شعبے',
    payments: 'ادائیگیاں',
    medicalRecords: 'طبی ریکارڈ',
    symptomChecker: 'علامات چیکر',
    reportAnalysis: 'رپورٹ تجزیہ',
    healthInsights: 'صحت کی بصیرت',
  },
};
`,
);
console.log("created: app/i18n/index.ts");

// providers.tsx
fs.writeFileSync(
  "app/providers.tsx",
  `"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
// import { store } from './Frontend/Redux/Store/store';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute cache
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReduxProvider store={store}> */}
        {children}
      {/* </ReduxProvider> */}
    </QueryClientProvider>
  );
}
`,
);
console.log("created: app/providers.tsx");

// dark mode hook
fs.mkdirSync("app/hooks", { recursive: true });
fs.writeFileSync(
  "app/hooks/useDarkMode.ts",
  `"use client";
import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = stored === 'dark' || (!stored && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  return { isDark, toggle };
}
`,
);
console.log("created: app/hooks/useDarkMode.ts");

// useTranslation hook
fs.writeFileSync(
  "app/hooks/useTranslation.ts",
  `"use client";
import { useState } from 'react';
import { dictionary, Locale } from '../i18n';

export function useTranslation(defaultLocale: Locale = 'en') {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const t = (key: string): string => dictionary[locale][key] ?? key;
  return { t, locale, setLocale };
}
`,
);
console.log("created: app/hooks/useTranslation.ts");

// backend modules
const modules = [
  "auth",
  "users",
  "doctors",
  "patients",
  "appointments",
  "prescriptions",
  "payments",
  "ai",
  "notifications",
  "reports",
];
for (const mod of modules) {
  const dir = `backend/modules/${mod}`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    `${dir}/index.ts`,
    `// ${mod} module barrel\nexport const moduleName = '${mod}';\n`,
  );
  fs.writeFileSync(
    `${dir}/routes.ts`,
    `import { Router } from 'express';\nconst router = Router();\n// TODO: add ${mod} routes\nexport default router;\n`,
  );
  fs.writeFileSync(
    `${dir}/controller.ts`,
    `import { Request, Response } from 'express';\n// TODO: implement ${mod} controller\n`,
  );
  fs.writeFileSync(
    `${dir}/service.ts`,
    `// TODO: implement ${mod} service logic\n`,
  );
  console.log("created module:", dir);
}

// backend/modules/index.ts barrel
fs.writeFileSync(
  "backend/modules/index.ts",
  modules.map((m) => `export * as ${m} from './${m}';`).join("\n") + "\n",
);
console.log("created: backend/modules/index.ts");

// payments route
fs.writeFileSync(
  "backend/routes/paymentsRoutes.ts",
  `import { Router } from 'express';
const router = Router();

// POST /api/payments/create
router.post('/create', (_req, res) => {
  res.status(201).json({ success: true, message: 'Payment intent created' });
});

export default router;
`,
);
console.log("created: backend/routes/paymentsRoutes.ts");

// prescriptions route
fs.writeFileSync(
  "backend/routes/prescriptionsRoutes.ts",
  `import { Router } from 'express';
const router = Router();

// GET /api/prescriptions
router.get('/', (_req, res) => {
  res.json({ success: true, data: [] });
});

export default router;
`,
);
console.log("created: backend/routes/prescriptionsRoutes.ts");

// notifications route
fs.writeFileSync(
  "backend/routes/notificationsRoutes.ts",
  `import { Router } from 'express';
const router = Router();

// GET /api/notifications
router.get('/', (_req, res) => {
  res.json({ success: true, data: [] });
});

export default router;
`,
);
console.log("created: backend/routes/notificationsRoutes.ts");

// reports route
fs.writeFileSync(
  "backend/routes/reportsRoutes.ts",
  `import { Router } from 'express';
const router = Router();

// GET /api/reports
router.get('/', (_req, res) => {
  res.json({ success: true, data: [] });
});

export default router;
`,
);
console.log("created: backend/routes/reportsRoutes.ts");

// error page
fs.mkdirSync("app/(shared)/error", { recursive: true });
fs.writeFileSync(
  "app/(shared)/error/page.tsx",
  `"use client";
export default function ErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-red-500">Something went wrong</h1>
      <p className="mt-4 text-sm opacity-70">Please try again or contact support.</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go Home
      </a>
    </main>
  );
}
`,
);
console.log("created: app/(shared)/error/page.tsx");

// global error.tsx
fs.writeFileSync(
  "app/error.tsx",
  `"use client";
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-950">
        <h1 className="text-3xl font-bold text-red-500">Application Error</h1>
        <p className="mt-2 text-sm opacity-70">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
`,
);
console.log("created: app/error.tsx");

// not-found.tsx
fs.writeFileSync(
  "app/not-found.tsx",
  `export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-lg opacity-70">Page not found</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go Home
      </a>
    </main>
  );
}
`,
);
console.log("created: app/not-found.tsx");

// loading.tsx
fs.writeFileSync(
  "app/loading.tsx",
  `export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600" />
    </div>
  );
}
`,
);
console.log("created: app/loading.tsx");

console.log("\n✅ Scaffold complete!");
