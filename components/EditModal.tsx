"use client";

import { useState } from "react";
import { Application, STATUSES, Status } from "@/lib/data";

export default function EditModal({
  application,
  onSaved,
  onClose,
}: {
  application: Application;
  onSaved: (updated: Application) => void;
  onClose: () => void;
}) {
  const [company, setCompany] = useState(application.company);
  const [position, setPosition] = useState(application.position);
  const [date, setDate] = useState(application.date);
  const [status, setStatus] = useState<Status>(application.status);
  const [notes, setNotes] = useState(application.notes);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!company.trim() || !position.trim()) {
      setError("Perusahaan dan posisi wajib diisi.");
      return;
    }

    setSaving(true);
    const res = await fetch(`/api/applications?id=${application.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, position, date, status, notes }),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal menyimpan perubahan.");
      return;
    }

    onSaved(await res.json());
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 className="text-lg font-semibold text-gray-900">Edit lamaran</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Perusahaan"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Posisi"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <input
            type="date"
            className={inputClass}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className={inputClass}
          placeholder="Catatan (opsional)"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {error && <p className="text-sm text-rose-600">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}