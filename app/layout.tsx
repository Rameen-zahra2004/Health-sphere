import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HealthSphere",
    template: "%s | HealthSphere",
  },
  description:
    "HealthSphere is a modern AI-powered healthcare platform for patients, doctors, and administrators. Manage appointments, records, and healthcare workflows seamlessly.",
  keywords: [
    "healthcare",
    "doctor appointment system",
    "patient management",
    "AI healthcare",
    "hospital system",
  ],
  authors: [{ name: "HealthSphere Team" }],
  metadataBase: new URL("https://healthsphere.app"),

  openGraph: {
    title: "HealthSphere",
    description:
      "AI-powered healthcare platform for modern hospitals and clinics.",
    type: "website",
    locale: "en_US",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Prevent theme flash (dark mode safety) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>

      <body
        className={`${inter.variable} font-sans antialiased bg-linear-to-br from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        {/* GLOBAL APP PROVIDERS */}
        <Providers>
          {/* MAIN APP WRAPPER */}
          <div className="min-h-screen flex flex-col">
            {/* PAGE CONTENT */}
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
