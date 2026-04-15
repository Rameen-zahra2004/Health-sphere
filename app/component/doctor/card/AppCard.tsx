import React from "react";

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppCard({ children, className }: AppCardProps) {
  return (
    <div
      className={`bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition ${className}`}
    >
      {children}
    </div>
  );
}
