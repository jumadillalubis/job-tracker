"use client";

import { useEffect, useState } from "react";

const TARGET = 10;
const DEFAULT_NAME = "Nama Kamu";
const STORAGE_KEY = "job-tracker-name";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function Navbar({ total }: { total: number }) {
  const [name, setName] = useState(DEFAULT_NAME);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setName(saved);
    } catch {}
  }, []);

  function startEdit() {
    setDraft(name === DEFAULT_NAME ? "" : name);
    setEditing(true);
  }

  function save() {
    const finalName = draft.trim() || DEFAULT_NAME;
    setName(finalName);
    try {
      localStorage.setItem(STORAGE_KEY, finalName);
    } catch {}
    setEditing(false);
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-sm font-bold text-white">
            JT
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-gray-900">
              JobTracker{" "}
              <span className="ml-1 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-600">
                Magang Edition
              </span>
            </p>
            <p className="text-xs text-gray-400">
              Career Portal &amp; Application Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Target:{" "}
            <b className="text-gray-900">
              {total}/{TARGET} Lamaran
            </b>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-xs font-semibold text-white">
              {getInitials(name)}
            </div>
            <div className="hidden leading-tight sm:block">
              {editing ? (
                <input
                  autoFocus
                  value={draft}
                  maxLength={30}
                  placeholder="Nama kamu"
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={save}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") save();
                    if (e.key === "Escape") setEditing(false);
                  }}
                  className="w-36 rounded-md border border-indigo-300 px-2 py-0.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              ) : (
                <button
                  type="button"
                  onClick={startEdit}
                  title="Klik untuk ubah nama"
                  className="text-left text-sm font-medium text-gray-900 hover:text-indigo-600"
                >
                  {name} <span className="text-xs text-gray-300">✎</span>
                </button>
              )}
              <p className="text-xs text-gray-400">Pencari Magang</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}