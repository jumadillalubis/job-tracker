"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Application, STATUSES, Status } from "@/lib/data";

const CHART_COLORS: Record<Status, string> = {
  Applied: "#3b82f6",
  Interview: "#f59e0b",
  Offer: "#10b981",
  Rejected: "#f43f5e",
};

export default function StatusChart({
  applications,
}: {
  applications: Application[];
}) {
  const data = STATUSES.map((status) => ({
    status,
    jumlah: applications.filter((a) => a.status === status).length,
  }));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h2 className="mb-4 font-semibold text-gray-900">Lamaran per status</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="status" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Bar dataKey="jumlah" radius={[6, 6, 0, 0]}>
              {data.map((item) => (
                <Cell
                  key={item.status}
                  fill={CHART_COLORS[item.status as Status]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}