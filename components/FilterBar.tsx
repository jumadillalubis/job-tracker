import { STATUSES, Status } from "@/lib/data";

export type StatusFilter = Status | "Semua";

export default function FilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
}) {
  const options: StatusFilter[] = ["Semua", ...STATUSES];

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <input
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 md:max-w-xs"
        placeholder="Cari perusahaan atau posisi..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="grid w-full grid-cols-5 gap-1 rounded-xl bg-gray-100 p-1 md:w-96">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onStatusChange(option)}
            className={`rounded-lg py-1.5 text-center text-sm font-medium transition ${
              statusFilter === option
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}