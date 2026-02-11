import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Namlı Konutları — Yönetim Paneli",
  description: "Proje yönetim paneli",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell min-h-screen bg-[#f4f1ed]">
      {children}
    </div>
  );
}
