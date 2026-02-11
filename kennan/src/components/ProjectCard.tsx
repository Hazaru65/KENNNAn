import Link from "next/link";

type ProjectCardProps = {
  name: string;
  location: string;
  year: string;
  image: string;
  href: string;
};

export default function ProjectCard({
  name,
  location,
  year,
  image,
  href,
}: ProjectCardProps) {
  return (
    <article className="card group overflow-hidden">
      <div className="relative h-56 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="space-y-3 px-6 py-6">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--ink-muted)]">
          <span>{location}</span>
          <span>{year}</span>
        </div>
        <h3 className="text-xl font-semibold text-[color:var(--ink)]">{name}</h3>
        <Link href={href} className="btn-ghost text-xs">
          Detaya Git
        </Link>
      </div>
    </article>
  );
}
