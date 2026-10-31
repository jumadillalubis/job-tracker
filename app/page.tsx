"use client";

import { useEffect, useState } from "react";
import type { Application, Status } from "@/lib/data";
import Navbar from "@/components/Navbar";
import StatsCards from "@/components/StatsCards";
import StatusChart from "@/components/StatusChart";
import ApplicationForm from "@/components/ApplicationForm";
import FilterBar, { StatusFilter } from "@/components/FilterBar";
import ApplicationTable from "@/components/ApplicationTable";
import EditModal from "@/components/EditModal";

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Semua");
  const [editing, setEditing] = useState<Application | null>(null);

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      });
  }, []);

  function handleAdd(application: Application) {
    setApplications((prev) => [application, ...prev]);
  }

  async function handleStatusChange(id: number, status: Status) {
    const res = await fetch(`/api/applications?id=${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) return;

    const updated: Application = await res.json();
    setApplications((prev) => prev.map((a) => (a.id === id ? updated : a)));
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/applications?id=${id}`, {
      method: "DELETE",
    });
    if (!res.ok) return;

    setApplications((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSaved(updated: Application) {
    setApplications((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
    setEditing(null);
  }

  const filtered = applications.filter((app) => {
    const matchStatus = statusFilter === "Semua" || app.status === statusFilter;
    const keyword = search.toLowerCase();
    const matchSearch =
      app.company.toLowerCase().includes(keyword) ||
      app.position.toLowerCase().includes(keyword);
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <Navbar total={applications.length} />

      <main className="w-full space-y-6 px-4 py-6 sm:px-6 md:py-10 lg:px-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              Musim Magang Semester Genap
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
              Job Tracker
            </h1>
            <p className="text-gray-500">
              Pantau lamaran magang kamu, jadwal interview, dan status
              penawaran secara terorganisir.
            </p>
          </div>
          <a
            href="#form-lamaran"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
          >
            + Tambah Lamaran Baru
          </a>
        </header>

        {loading ? (
          <p className="text-gray-500">Memuat data...</p>
        ) : (
          <>
            <StatsCards applications={applications} />
            <StatusChart applications={applications} />
            <div id="form-lamaran">
              <ApplicationForm onAdd={handleAdd} />
            </div>
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
            <ApplicationTable
              applications={filtered}
              totalAll={applications.length}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onEdit={setEditing}
            />
          </>
        )}
      </main>

      {editing && (
        <EditModal
          key={editing.id}
          application={editing}
          onSaved={handleSaved}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}