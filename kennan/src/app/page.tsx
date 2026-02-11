import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects } from "@/data/projects";

export default function Home() {
  return (
    <div className="page-shell">
      {/* Hero Section */}
      <section className="section-pad">
        <div className="max-wrap grid gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8 fade-up">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--ink-muted)]">
              Mimari Stüdyo
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
              NAMLI KONUTLARI
            </h1>
            <p className="max-w-xl text-lg text-[color:var(--ink-muted)]">
              Zamana dirençli mekânlar tasarlıyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/projeler" className="btn-primary">
                Projeleri Gör
              </Link>
              <Link href="#hakkinda" className="btn-ghost">
                Hakkımızda
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

      {/* Yaklaşım Section */}
      <section id="yaklasim" className="section-pad mt-16">
        <div className="max-wrap grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
              Yaklaşım
            </p>
            <h2 className="text-3xl font-semibold text-[color:var(--ink)]">
              Mimariyi estetik ve işlevsellikle buluşturuyoruz.
            </h2>
            <p className="text-base text-[color:var(--ink-muted)]">
              Alanın ruhunu ortaya çıkaran yalın mekânlar üretiriz. Her projede
              doğal ışık, malzeme dengesi ve mekânsal akışı birlikte ele
              alıyoruz.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {["Konut Tasarımı", "İç Mekân", "Kentsel Tasarım"].map((item) => (
              <div key={item} className="card p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
                  Servis
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[color:var(--ink)]">
                  {item}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
                  Her ölçekte zarif, fonksiyonel ve zamansız mekânlar.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-pad mt-16">
        <div className="max-wrap space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
                Öne Çıkan Projeler
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[color:var(--ink)]">
                Zamansız detaylar, güçlü hikâyeler.
              </h2>
            </div>
            <Link href="/projeler" className="btn-ghost text-xs">
              Tüm Projeler
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

      {/* Hakkımızda Section */}
      <section id="hakkinda" className="section-pad mt-16">
        <div className="max-wrap">
          <div className="card p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
                  Hakkımızda
                </p>
                <h2 className="text-3xl font-semibold text-[color:var(--ink)]">
                  Zamana dirençli mekânlar tasarlayan bir stüdyo.
                </h2>
                <p className="text-base text-[color:var(--ink-muted)]">
                  Namlı Konutları, 2010 yılından bu yana konut, ticari ve kentsel 
                  projelerde estetik ile işlevselliği bir araya getiren bir mimarlık 
                  stüdyosudur. Her projede sürdürülebilirlik, kullanıcı deneyimi ve 
                  zamansız tasarım ilkelerini önceliklendiririz.
                </p>
                <p className="text-base text-[color:var(--ink-muted)]">
                  Müşterilerimizle kurduğumuz yakın iş birliği sayesinde, her projeyi 
                  özgün ihtiyaçlara göre şekillendiriyor; mekânların sadece bugün değil, 
                  gelecek nesiller için de değerli olmasını sağlıyoruz.
                </p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-4xl font-semibold text-[color:var(--accent)]">15+</p>
                    <p className="text-sm text-[color:var(--ink-muted)]">Yıllık Deneyim</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-semibold text-[color:var(--accent)]">200+</p>
                    <p className="text-sm text-[color:var(--ink-muted)]">Tamamlanan Proje</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-semibold text-[color:var(--accent)]">12</p>
                    <p className="text-sm text-[color:var(--ink-muted)]">Mimar & Tasarımcı</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-semibold text-[color:var(--accent)]">8</p>
                    <p className="text-sm text-[color:var(--ink-muted)]">Ödül & Tanınırlık</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[color:var(--line)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)] mb-3">
                    Değerlerimiz
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Estetik", "Sürdürülebilirlik", "İşlevsellik", "Yenilik", "Detay"].map((value) => (
                      <span 
                        key={value}
                        className="px-4 py-2 text-sm rounded-full border border-[color:var(--line)] text-[color:var(--ink-muted)]"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
