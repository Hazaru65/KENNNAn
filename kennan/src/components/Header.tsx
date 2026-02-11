"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Projeler", href: "/projeler" },
  { label: "Hakkımızda", href: "/#hakkinda" },
  { label: "İletişim", href: "/#iletisim" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-white/80 backdrop-blur-md">
      <div className="max-wrap section-pad flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.35em] text-[color:var(--ink)]"
        >
          NAMLI
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-muted)] md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[color:var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--ink)]"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Menu"
        >
          <span className="h-0.5 w-4 bg-[color:var(--ink)] block" />
        </button>
      </div>
      {open ? (
        <div className="md:hidden border-t border-[color:var(--line)] bg-white/90">
          <div className="section-pad flex flex-col gap-4 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[color:var(--ink)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
