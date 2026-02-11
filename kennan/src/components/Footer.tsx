import Link from "next/link";

const social = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="border-t border-[color:var(--line)] bg-white/80">
      <div className="max-wrap section-pad grid gap-8 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-[0.3em]">NAMLI</h3>
          <p className="text-sm text-[color:var(--ink-muted)]">
            Mekânlarınıza değer katan mimari çözümler için bizimle iletişime
            geçin.
          </p>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
            info@namlikonutlari.com
            <span className="mx-2 text-[color:var(--line)]">/</span>
            +90 555 000 00 00
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--ink-muted)]">
              Sosyal
          </h4>
          <div className="mt-4 flex flex-col gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
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
        <div className="space-y-2 text-sm text-[color:var(--ink-muted)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]">
              Notlar
          </p>
          <p>Proje görselleri ve metinleri placeholder olarak sunulmuştur.</p>
          <p className="text-xs">
            © 2026 Namlı Konutları. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
