"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        router.replace("/admin");
      } else {
        setError(data.error || "Giriş başarısız");
      }
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
            Namlı Konutları
          </h1>
          <p className="mt-1 text-sm text-[var(--ink-muted)]">
            Yönetim Paneli
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 backdrop-blur shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-[var(--ink)]"
              >
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin şifresini girin"
                required
                autoFocus
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] px-4 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg disabled:opacity-60"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--ink-muted)]">
          Siteye dönmek için{" "}
          <a
            href="/"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            buraya tıklayın
          </a>
        </p>
      </div>
    </div>
  );
}
