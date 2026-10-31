export type Status = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Application {
  id: number;
  company: string;
  position: string;
  date: string; // format YYYY-MM-DD
  status: Status;
  notes: string;
}

export const STATUSES: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

export const applications: Application[] = [
  {
    id: 1,
    company: "Tokopedia",
    position: "Frontend Developer Intern",
    date: "2026-10-02",
    status: "Interview",
    notes: "Interview HR tanggal 8 Nov, siapkan portofolio.",
  },
  {
    id: 2,
    company: "Gojek",
    position: "QA Engineer Intern",
    date: "2026-10-05",
    status: "Applied",
    notes: "Lamar lewat MagangHub.",
  },
  {
    id: 3,
    company: "Traveloka",
    position: "UI/UX Researcher Intern",
    date: "2026-09-28",
    status: "Rejected",
    notes: "Belum rezeki, coba lagi periode berikutnya.",
  },
  {
    id: 4,
    company: "Bukalapak",
    position: "Web Developer Intern",
    date: "2026-09-20",
    status: "Offer",
    notes: "Tawaran 6 bulan, balas sebelum 10 Nov.",
  },
  {
    id: 5,
    company: "Telkom Indonesia",
    position: "Software Engineer Intern",
    date: "2026-10-10",
    status: "Applied",
    notes: "Menunggu hasil seleksi administrasi.",
  },
  {
    id: 6,
    company: "Pertamina",
    position: "IT Support Intern",
    date: "2026-10-12",
    status: "Interview",
    notes: "Tes teknis online minggu depan.",
  },
];