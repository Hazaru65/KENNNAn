"use client";

import AuthGuard from "@/components/admin/AuthGuard";
import ProjectForm from "@/components/admin/ProjectForm";

export default function YeniProjePage() {
  return (
    <AuthGuard>
      <ProjectForm title="Yeni Proje Ekle" />
    </AuthGuard>
  );
}
