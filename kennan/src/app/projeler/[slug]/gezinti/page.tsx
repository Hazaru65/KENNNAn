"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { fetchProjects, type Project } from "@/data/projects";

// Dynamic import for PanoramaViewer (client-side only)
const PanoramaViewer = dynamic(() => import("@/components/PanoramaViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-[color:var(--paper-strong)] rounded-xl">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[color:var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[color:var(--ink-muted)]">360° görüntüleyici yükleniyor...</p>
      </div>
    </div>
  ),
});

type TourPageProps = {
  params: Promise<{ slug: string }>;
};

export default function TourPage({ params }: TourPageProps) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSceneId, setActiveSceneId] = useState("");

  useEffect(() => {
    fetchProjects().then((projects) => {
      const found = projects.find((item) => item.id === resolvedParams.slug);
      setProject(found || null);
      if (found?.panoramaScenes?.[0]) {
        setActiveSceneId(found.panoramaScenes[0].id);
      }
      setLoading(false);
    });
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[color:var(--accent)] border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section-pad pt-12">
        <div className="max-wrap">
          <h1 className="text-3xl font-semibold">Proje bulunamadı.</h1>
          <Link href="/projeler" className="btn-ghost mt-6">
            Projelere Dön
          </Link>
        </div>
      </div>
    );
  }

  // Check if panoramaScenes exist
  if (!project.panoramaScenes || project.panoramaScenes.length === 0) {
    return (
      <div className="section-pad pt-10 pb-20">
        <div className="max-wrap space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
                360° Sanal Tur
              </p>
              <h1 className="text-4xl font-semibold text-[color:var(--ink)]">
                {project.name}
              </h1>
            </div>
            <Link href={`/projeler/${project.id}`} className="btn-ghost text-xs">
              Projeye Dön
            </Link>
          </div>
          
          <div className="card p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[color:var(--paper-strong)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[color:var(--ink-muted)]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[color:var(--ink)] mb-3">
              360° Tur Hazırlanıyor
            </h2>
            <p className="text-[color:var(--ink-muted)] max-w-md mx-auto">
              Bu proje için sanal tur henüz eklenmedi. Yakında 360° panoramik görüntülerle mekânları gezebileceksiniz.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-pad pt-10 pb-20">
      <div className="max-wrap space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
              360° Sanal Tur
            </p>
            <h1 className="text-4xl font-semibold text-[color:var(--ink)]">
              {project.name}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/projeler/${project.id}`} className="btn-ghost text-xs">
              Projeye Dön
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-[color:var(--ink-muted)]">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
            </svg>
            <span>Sürükle: Etrafına bak</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span>Scroll: Yakınlaştır</span>
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>
            <span>Mekanlar: Listeden seçin</span>
          </div>
        </div>

        {/* Panorama Viewer */}
        <PanoramaViewer
          scenes={project.panoramaScenes}
          initialSceneId={activeSceneId}
          onSceneChange={setActiveSceneId}
        />

        {/* Project Info */}
        <div className="card p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-muted)] mb-1">
                Proje
              </p>
              <p className="font-medium text-[color:var(--ink)]">{project.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-muted)] mb-1">
                Konum
              </p>
              <p className="font-medium text-[color:var(--ink)]">{project.location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-muted)] mb-1">
                Mekân Sayısı
              </p>
              <p className="font-medium text-[color:var(--ink)]">{project.panoramaScenes.length} adet 360° sahne</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
