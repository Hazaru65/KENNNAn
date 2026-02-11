"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import { fetchProjects, type Project } from "@/data/projects";

type ProjectDetailProps = {
  params: Promise<{ slug: string }>;
};

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProjects().then((projects) => {
      const found = projects.find((item) => item.id === resolvedParams.slug);
      setProject(found || null);
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

  return (
    <div className="section-pad pt-10 pb-20">
      <div className="max-wrap space-y-12">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-[color:var(--line)]">
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
              Proje Detayı
            </p>
            <h1 className="text-4xl font-semibold text-[color:var(--ink)]">
              {project.name}
            </h1>
            <div className="grid gap-3 text-sm text-[color:var(--ink-muted)]">
              <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-2">
                <span>Konum</span>
                <span className="font-semibold text-[color:var(--ink)]">
                  {project.location}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-2">
                <span>Yıl</span>
                <span className="font-semibold text-[color:var(--ink)]">
                  {project.year}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-2">
                <span>Metrekare</span>
                <span className="font-semibold text-[color:var(--ink)]">
                  {project.area}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-2">
                <span>Rol</span>
                <span className="font-semibold text-[color:var(--ink)]">
                  {project.role}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-[color:var(--line)] pb-2">
                <span>Yazılımlar</span>
                <span className="font-semibold text-[color:var(--ink)]">
                  {project.software}
                </span>
              </div>
            </div>
            <Link href={`/projeler/${project.id}/gezinti`} className="btn-primary">
              3B Gezintiye Başla
            </Link>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-[color:var(--ink-muted)]">
            <h2 className="text-3xl font-semibold text-[color:var(--ink)]">
              Proje Hikâyesi
            </h2>
            {project.story.map((paragraph) => (
              <p key={paragraph} className="text-base leading-7">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="card p-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
              Hedefler
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--ink-muted)]">
              <li>Doğal ışık ve rüzgârın yolculuğunu optimize etmek.</li>
              <li>Kullanıcının günlük ritmine uyumlu akıllı mekân kurgusu.</li>
              <li>Malzeme paletinde zamansız ve doğal tonlar.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
                Görseller
              </p>
              <h2 className="text-3xl font-semibold text-[color:var(--ink)]">
                Mekânın doğal akışına yakından bakış.
              </h2>
            </div>
            <button
              type="button"
              className="btn-ghost text-xs"
              onClick={() => setOpen(true)}
            >
              Tümünü Gör
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {project.gallery.slice(0, 4).map((image, index) => (
              <button
                type="button"
                key={image}
                className="relative h-72 overflow-hidden rounded-3xl border border-[color:var(--line)]"
                onClick={() => {
                  setActiveIndex(index);
                  setOpen(true);
                }}
              >
                <Image
                  src={image}
                  alt={`${project.name} görsel ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </section>
      </div>
      {open ? (
        <Lightbox
          images={project.gallery}
          currentIndex={activeIndex}
          onClose={() => setOpen(false)}
          onNext={() =>
            setActiveIndex((prev) => (prev + 1) % project.gallery.length)
          }
          onPrev={() =>
            setActiveIndex(
              (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
            )
          }
        />
      ) : null}
    </div>
  );
}
