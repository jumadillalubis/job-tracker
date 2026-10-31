"use client";

import { useState } from "react";
import { Application, STATUSES, Status } from "@/lib/data";

export default function ApplicationForm({
  onAdd,
}: {
  onAdd: (application: Application) => void;
}) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<Status>("Applied");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!company.trim() || !position.trim()) {
      setError("Perusahaan dan posisi wajib diisi.");
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, position, date, status, notes }),
    });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Gagal menambah lamaran.");
      return;
    }

    const created: Application = await res.json();
    onAdd(created);

    setCompany("");
    setPosition("");
    setDate("");
    setStatus("Applied");
    setNotes("");
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 bg-white p-4"
    >
      <h2 className="font-semibold text-gray-900">Tambah lamaran</h2>

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
        rows={2}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Menyimpan..." : "Tambah"}
      </button>
    </form>
  );
}