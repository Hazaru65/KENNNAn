"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HotspotMap from "@/components/HotspotMap";
import { projects } from "@/data/projects";

type TourPageProps = {
  params: { slug: string };
};

export default function TourPage({ params }: TourPageProps) {
  const project = useMemo(
    () => projects.find((item) => item.id === params.slug),
    [params.slug]
  );
  const [activeSceneId, setActiveSceneId] = useState(
    project?.tourScenes[0]?.id ?? ""
  );

  if (!project) {
    return (
      <div className="section-pad pt-12">
        <div className="max-wrap">
          <h1 className="text-3xl font-semibold">Proje bulunamadi.</h1>
          <Link href="/projeler" className="btn-ghost mt-6">
            Projelere Don
          </Link>
        </div>
      </div>
    );
  }

  const activeScene =
    project.tourScenes.find((scene) => scene.id === activeSceneId) ??
    project.tourScenes[0];

  const hotspots = project.tourScenes.map((scene, index) => ({
    id: scene.id,
    label: `${index + 1}`,
    x: 20 + index * 25,
    y: 30 + (index % 2) * 25,
  }));

  return (
    <div className="section-pad pt-10 pb-20">
      <div className="max-wrap space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
              3B Gezinti
            </p>
            <h1 className="text-4xl font-semibold text-[color:var(--ink)]">
              {project.name}
            </h1>
          </div>
          <Link href={`/projeler/${project.id}`} className="btn-ghost text-xs">
            Projeye Don
          </Link>
        </div>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[color:var(--ink)]">
              Ustten Baski Plan
            </h2>
            <HotspotMap
              image={project.topView}
              hotspots={hotspots}
              activeId={activeSceneId}
              onSelect={setActiveSceneId}
            />
            <p className="text-sm text-[color:var(--ink-muted)]">
              Noktalara tiklayarak mekanlar arasinda gezinebilirsiniz.
            </p>
          </div>
          <div className="space-y-4">
            <div className="card overflow-hidden">
              <div className="relative h-[420px]">
                <Image
                  src={activeScene.image}
                  alt={activeScene.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em]">
                    Sahne
                  </p>
                  <h3 className="text-2xl font-semibold">{activeScene.title}</h3>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 px-6 py-4">
                {activeScene.next?.map((nextId) => {
                  const nextScene = project.tourScenes.find(
                    (scene) => scene.id === nextId
                  );
                  if (!nextScene) return null;
                  return (
                    <button
                      key={nextId}
                      type="button"
                      className="rounded-full border border-[color:var(--line)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--ink)] transition-colors hover:border-[color:var(--ink)]"
                      onClick={() => setActiveSceneId(nextId)}
                    >
                      {nextScene.title}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
                <span>Bilgi Paneli</span>
                <span>360 Sanal Tur</span>
              </div>
              <p className="mt-3 text-sm text-[color:var(--ink-muted)]">
                Google Maps benzeri arayuz icin sade ikonlar ve yonlendirici
                hareketler kullanildi. Bu alan, 360 sahne icerikleri geldikce
                doldurulacak.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
