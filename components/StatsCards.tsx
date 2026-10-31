import { Application, STATUSES, Status } from "@/lib/data";

const STYLES: Record<Status, { card: string; badge: string; desc: string }> = {
  Applied: {
    card: "bg-blue-50 text-blue-700 border-blue-200",
    badge: "bg-blue-100",
    desc: "Menunggu respons awal HR",
  },
  Interview: {
    card: "bg-amber-50 text-amber-700 border-amber-200",
    badge: "bg-amber-100",
    desc: "User / HR interview aktif",
  },
  Offer: {
    card: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badge: "bg-emerald-100",
    desc: "Siap dikonfirmasi kontrak",
  },
  Rejected: {
    card: "bg-rose-50 text-rose-700 border-rose-200",
    badge: "bg-rose-100",
    desc: "Evaluasi & perbaiki CV",
  },
};

export default function StatsCards({
  applications,
}: {
  applications: Application[];
}) {
  const total = applications.length;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Total Lamaran
        </p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-semibold text-gray-900">{total}</p>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            100% total
          </span>
        </div>
        <p className="mt-2 text-xs text-gray-400">Total terkirim periode ini</p>
      </div>

      {STATUSES.map((status) => {
        const count = applications.filter((a) => a.status === status).length;
        const percent = total ? ((count / total) * 100).toFixed(1) : "0";
        const style = STYLES[status];

        return (
          <div
            key={status}
            className={`rounded-xl border p-4 shadow-sm ${style.card}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide">
              {status}
            </p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-semibold">{count}</p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${style.badge}`}
              >
                {percent}%
              </span>
            </div>
            <p className="mt-2 text-xs opacity-80">{style.desc}</p>
          </div>
        );
      })}
    </div>
  );
}