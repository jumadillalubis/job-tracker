import { NextResponse } from "next/server";
import { applications, Application, STATUSES } from "@/lib/data";

// Data disimpan di memori (cukup untuk demo)
let data: Application[] = [...applications];

export async function GET() {
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.company || !body.position) {
    return NextResponse.json(
      { error: "Company dan position wajib diisi" },
      { status: 400 }
    );
  }

  const newApplication: Application = {
    id: Date.now(),
    company: body.company,
    position: body.position,
    date: body.date || new Date().toISOString().slice(0, 10),
    status: STATUSES.includes(body.status) ? body.status : "Applied",
    notes: body.notes || "",
  };

  data = [newApplication, ...data];
  return NextResponse.json(newApplication, { status: 201 });
}

export async function PATCH(request: Request) {
  const id = Number(new URL(request.url).searchParams.get("id"));
  const body = await request.json();

  const index = data.findIndex((a) => a.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Lamaran tidak ditemukan" },
      { status: 404 }
    );
  }

  if (body.status !== undefined && !STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
  }
  if (body.company !== undefined && !String(body.company).trim()) {
    return NextResponse.json(
      { error: "Perusahaan tidak boleh kosong" },
      { status: 400 }
    );
  }
  if (body.position !== undefined && !String(body.position).trim()) {
    return NextResponse.json(
      { error: "Posisi tidak boleh kosong" },
      { status: 400 }
    );
  }

  const current = data[index];
  data[index] = {
    ...current,
    company: body.company?.trim() ?? current.company,
    position: body.position?.trim() ?? current.position,
    date: body.date || current.date,
    status: body.status ?? current.status,
    notes: body.notes ?? current.notes,
  };

  return NextResponse.json(data[index]);
}

export async function DELETE(request: Request) {
  const id = Number(new URL(request.url).searchParams.get("id"));

  if (!data.some((a) => a.id === id)) {
    return NextResponse.json(
      { error: "Lamaran tidak ditemukan" },
      { status: 404 }
    );
  }

  data = data.filter((a) => a.id !== id);
  return NextResponse.json({ success: true });
}