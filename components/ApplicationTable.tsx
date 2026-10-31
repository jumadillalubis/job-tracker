import { Application, STATUSES, Status } from "@/lib/data";

const BADGE: Record<Status, string> = {
  Applied: "border-blue-200 bg-blue-50 text-blue-700",
  Interview: "border-amber-200 bg-amber-50 text-amber-700",
  Offer: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

const AVATAR_COLORS = [
  "bg-emerald-100 text-emerald-700",
  "bg-blue-100 text-blue-700",
  "bg-orange-100 text-orange-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-cyan-100 text-cyan-700",
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getAvatarColor(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 1000;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ApplicationTable({
  applications,
  totalAll,
  onStatusChange,
  onDelete,
  onEdit,
}: {
  applications: Application[];
  totalAll: number;
  onStatusChange: (id: number, status: Status) => void;
  onDelete: (id: number) => void;
  onEdit: (application: Application) => void;
}) {
  if (applications.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
        Belum ada lamaran.
      </p>
    );
  }

  const th =
    "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500";

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className={th}>Perusahaan</th>
              <th className={th}>Posisi</th>
              <th className={th}>Tanggal</th>
              <th className={th}>Status</th>
              <th className={th}>Catatan</th>
              <th className={`${th} text-right`}>Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${getAvatarColor(app.company)}`}
                    >
                      {getInitials(app.company)}
                    </div>
                    <span className="font-medium text-gray-900">
                      {app.company}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{app.position}</td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                  {formatDate(app.date)}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      onStatusChange(app.id, e.target.value as Status)
                    }
                    className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium ${BADGE[app.status]}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="max-w-xs px-4 py-3 text-gray-500">
                  {app.notes}
                </td>
                                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(app)}
                      className="text-xs font-medium text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus lamaran ke ${app.company}?`)) {
                          onDelete(app.id);
                        }
                      }}
                      className="text-xs font-medium text-rose-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-100 px-4 py-3 text-xs text-gray-500">
        Menampilkan <b className="text-gray-900">{applications.length}</b> dari{" "}
        <b className="text-gray-900">{totalAll}</b> lamaran
      </div>
    </div>
  );
}