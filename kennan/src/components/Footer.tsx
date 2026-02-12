import Link from "next/link";

const social = [
  { label: "Instagram", href: "https://www.instagram.com/kenan_nml/" },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="border-t border-[color:var(--line)] bg-white/80">
      <div className="max-wrap section-pad py-12">
        <div className="flex flex-col items-center text-center gap-6">
          <h3 className="text-lg font-semibold tracking-[0.3em]">N&ML</h3>
          <p className="text-sm text-[color:var(--ink-muted)] max-w-md">
            Mekânlarınıza değer katan mimari çözümler için bizimle iletişime geçin.
          </p>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
            kenannemli95@gmail.com
            <span className="mx-2 text-[color:var(--line)]">/</span>
            +90 544 475 93 65
          </div>
          <div className="pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
              Sosyal
            </h4>
            <div className="mt-3 flex gap-6 text-sm font-semibold uppercase tracking-[0.18em]">
              {social.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
