"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";
import { projects } from "@/data/projects";

type FilterOption = "Tüm" | "Konut" | "Ticari" | "İç Mekân" | "Kentsel";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterOption>("Tüm");

  const items = useMemo(() => {
    if (filter === "Tüm") return projects;
    const categoryMap: Record<FilterOption, string> = {
      "Tüm": "",
      Konut: "Konut",
      Ticari: "Ticari",
      "İç Mekân": "İç Mekân",
      Kentsel: "Kentsel",
    };
    return projects.filter(
      (project) => project.category === categoryMap[filter]
    );
  }, [filter]);

  return (
    <div className="section-pad pt-12">
      <div className="max-wrap space-y-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
            Portfolyo
          </p>
          <h1 className="text-4xl font-semibold text-[color:var(--ink)]">
            Tüm Projeler
          </h1>
          <p className="max-w-2xl text-base text-[color:var(--ink-muted)]">
            Dönemlere, ölçeğe ve mekânsal deneyime göre seçilmiş projeler.
          </p>
        </div>
        <ProjectFilter current={filter} onChange={setFilter} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.name}
              location={project.location}
              year={project.year}
              image={project.thumbnail}
              href={`/projeler/${project.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
