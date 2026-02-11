"use client";

import { use, useEffect, useState } from "react";
import AuthGuard from "@/components/admin/AuthGuard";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project } from "@/data/projects";

function EditProjectContent({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((projects: Project[]) => {
        const found = projects.find((p) => p.id === slug);
        if (found) {
          setProject(found);
        } else {
          setError("Proje bulunamadı");
        }
      })
      .catch(() => setError("Veri yüklenemedi"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <p className="text-lg font-semibold text-[var(--ink)]">
          {error || "Proje bulunamadı"}
        </p>
        <a
          href="/admin"
          className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline"
        >
          Panele Dön
        </a>
      </div>
    );
  }

  return (
    <ProjectForm
      title={`Düzenle: ${project.name}`}
      initialData={project}
    />
  );
}

export default function EditProjePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <AuthGuard>
      <EditProjectContent slug={slug} />
    </AuthGuard>
  );
}
