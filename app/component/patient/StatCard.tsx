import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export default function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-slate-100 text-slate-700">{icon}</div>

        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="text-lg font-semibold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}
