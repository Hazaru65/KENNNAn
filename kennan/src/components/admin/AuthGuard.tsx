"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading" | "ok" | "unauthorized">("loading");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          setStatus("ok");
        } else {
          setStatus("unauthorized");
          router.replace("/admin/login");
        }
      })
      .catch(() => {
        setStatus("unauthorized");
        router.replace("/admin/login");
      });
  }, [pathname, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
          <span className="text-sm text-[var(--ink-muted)]">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthorized") {
    return null;
  }

  return <>{children}</>;
}
