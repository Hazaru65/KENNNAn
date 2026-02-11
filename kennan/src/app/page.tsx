import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects } from "@/data/projects";

export default function Home() {
  return (
    <div className="page-shell">
      <section className="section-pad">
        <div className="max-wrap grid gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8 fade-up">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--ink-muted)]">
              Mimari Studyo
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              NAMLI KONUTLARI
            </h1>
            <p className="max-w-xl text-lg text-[color:var(--ink-muted)]">
              Zamana direnci mekanlar tasarliyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/projeler" className="btn-primary">
                Projeleri Gor
              </Link>
              <Link href="#hakkinda" className="btn-ghost">
                Yaklasimimiz
              </Link>
            </div>
          </div>
          <div className="card relative h-[420px] overflow-hidden fade-up">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1600&auto=format&fit=crop)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
          </div>
        </div>
      </section>

      <section id="hakkinda" className="section-pad mt-16">
        <div className="max-wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
              Yaklasim
            </p>
            <h2 className="text-3xl font-semibold text-[color:var(--ink)]">
              Mimariyi estetik ve islevsellikle bulusturuyoruz.
            </h2>
            <p className="text-base text-[color:var(--ink-muted)]">
              Alanin ruhunu ortaya cikaran yalin mekanlar uretiriz. Her projede
              dogal isik, malzeme dengesi ve mekansal akisi birlikte ele
              aliyoruz.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {["Konut Tasarimi", "Ic Mekan", "Kentsel Tasarim"].map((item) => (
              <div key={item} className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
                  Servis
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[color:var(--ink)]">
                  {item}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                  Her olcekte zarif, fonksiyonel ve zamansiz mekanlar.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad mt-16">
        <div className="max-wrap space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
                One Cikan Projeler
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[color:var(--ink)]">
                Zamansiz detaylar, guclu hikayeler.
              </h2>
            </div>
            <Link href="/projeler" className="btn-ghost text-xs">
              Tum Projeler
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
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
      </section>
    </div>
  );
}
