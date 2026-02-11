"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import type { Project } from "@/data/projects";

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data);
    } catch {
      console.error("Projeler yüklenemedi");
    }
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" projesini silmek istediğinize emin misiniz?`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Silme başarısız");
      }
    } catch {
      alert("Silme hatası");
    }
    setDeleting(null);
  }

  async function handleLogout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.replace("/admin/login");
  }

  const categoryColors: Record<string, string> = {
    Konut: "bg-blue-100 text-blue-700",
    Ticari: "bg-emerald-100 text-emerald-700",
    "İç Mekân": "bg-purple-100 text-purple-700",
    Kentsel: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="border-b border-[var(--line)] bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-[var(--ink)]">
              Yönetim Paneli
            </h1>
            <p className="text-xs text-[var(--ink-muted)]">
              Namlı Konutları
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition hover:bg-[var(--paper-strong)]"
            >
              Siteyi Gör
            </a>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              Çıkış
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Title + Add button */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--ink)]">
              Projeler
            </h2>
            <p className="text-sm text-[var(--ink-muted)]">
              {projects.length} proje kayıtlı
            </p>
          </div>
          <a
            href="/admin/projeler/yeni"
            className="rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] px-4 py-2 text-sm font-semibold text-white transition hover:shadow-lg"
          >
            + Yeni Proje
          </a>
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/50 p-12 text-center">
            <p className="text-[var(--ink-muted)]">
              Henüz proje eklenmemiş.
            </p>
            <a
              href="/admin/projeler/yeni"
              className="mt-4 inline-block rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
            >
              İlk Projeyi Ekle
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group flex items-center gap-4 rounded-xl border border-[var(--line)] bg-white/80 p-4 backdrop-blur transition hover:shadow-md"
              >
                {/* Number */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--paper-strong)] text-xs font-bold text-[var(--ink-muted)]">
                  {index + 1}
                </span>

                {/* Thumbnail */}
                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--paper-strong)]">
                  {project.thumbnail && (
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[var(--ink)] truncate">
                    {project.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-[var(--ink-muted)]">
                    <span>{project.location}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                    <span>·</span>
                    <span>{project.area}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    categoryColors[project.category] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {project.category}
                </span>

                {/* Gallery count */}
                <span className="shrink-0 text-xs text-[var(--ink-muted)]">
                  {project.gallery.length} görsel
                </span>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2 opacity-0 transition group-hover:opacity-100">
                  <a
                    href={`/admin/projeler/${project.id}`}
                    className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink)] transition hover:bg-[var(--paper-strong)]"
                  >
                    Düzenle
                  </a>
                  <a
                    href={`/projeler/${project.id}`}
                    target="_blank"
                    className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition hover:bg-[var(--paper-strong)]"
                  >
                    Önizle
                  </a>
                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    disabled={deleting === project.id}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {deleting === project.id ? "..." : "Sil"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
