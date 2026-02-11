"use client";

import { useState, useRef, useCallback } from "react";

interface ImageUploaderProps {
  /** Yüklenen dosyaların URL'leri */
  value: string[];
  /** URL listesi değiştiğinde */
  onChange: (urls: string[]) => void;
  /** Proje slug'ı (uploads alt klasörü) */
  subfolder?: string;
  /** Maksimum dosya sayısı */
  max?: number;
  /** Tek dosya mı? */
  single?: boolean;
  /** Label */
  label?: string;
  /** Açıklama */
  hint?: string;
}

export default function ImageUploader({
  value,
  onChange,
  subfolder,
  max = 20,
  single = false,
  label,
  hint,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      setError("");
      const fileArray = Array.from(files);

      // Tip kontrolü
      const invalid = fileArray.find((f) => !f.type.startsWith("image/"));
      if (invalid) {
        setError(`Sadece görsel dosyaları yüklenebilir (${invalid.name})`);
        return;
      }

      // Boyut kontrolü
      const tooBig = fileArray.find((f) => f.size > 10 * 1024 * 1024);
      if (tooBig) {
        setError(`Dosya çok büyük: ${tooBig.name} (max 10MB)`);
        return;
      }

      // Max kontrolü
      const remaining = single ? 1 : max - value.length;
      if (fileArray.length > remaining) {
        setError(`En fazla ${remaining} dosya daha eklenebilir`);
        return;
      }

      setUploading(true);

      try {
        const formData = new FormData();
        fileArray.slice(0, remaining).forEach((f) => formData.append("files", f));
        if (subfolder) formData.append("subfolder", subfolder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Yükleme başarısız");
          return;
        }

        const data = await res.json();
        if (single) {
          onChange(data.urls.slice(0, 1));
        } else {
          onChange([...value, ...data.urls]);
        }
      } catch {
        setError("Yükleme hatası");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange, subfolder, max, single]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleRemove(index: number) {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  }

  function handleUrlAdd() {
    const url = prompt("Görsel URL'si girin:");
    if (url && url.trim()) {
      if (single) {
        onChange([url.trim()]);
      } else {
        onChange([...value, url.trim()]);
      }
    }
  }

  const canAdd = single ? value.length < 1 : value.length < max;

  return (
    <div className="space-y-3">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-[var(--ink)]">
          {label}
          {hint && (
            <span className="ml-2 font-normal text-[var(--ink-muted)]">
              {hint}
            </span>
          )}
        </label>
      )}

      {/* Drop Zone */}
      {canAdd && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition ${
            dragOver
              ? "border-[var(--accent)] bg-[var(--accent)]/5"
              : "border-[var(--line)] bg-white/50 hover:border-[var(--accent)]/50 hover:bg-white/70"
          }`}
        >
          {uploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
              <span className="text-sm text-[var(--ink-muted)]">
                Yükleniyor...
              </span>
            </div>
          ) : (
            <>
              <div className="mb-2 text-2xl text-[var(--ink-muted)]">
                &#x1F4F7;
              </div>
              <p className="text-sm font-medium text-[var(--ink)]">
                Sürükle & bırak veya tıkla
              </p>
              <p className="mt-1 text-xs text-[var(--ink-muted)]">
                JPG, PNG, WebP — Max 10MB
              </p>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={!single}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFiles(e.target.files);
                e.target.value = "";
              }
            }}
            className="hidden"
          />
        </div>
      )}

      {/* URL ile ekleme butonu */}
      {canAdd && (
        <button
          type="button"
          onClick={handleUrlAdd}
          className="text-xs font-medium text-[var(--accent)] hover:underline"
        >
          veya URL ile ekle
        </button>
      )}

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Preview Grid */}
      {value.length > 0 && (
        <div
          className={`grid gap-3 ${
            single ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {value.map((url, i) => (
            <div key={`${url}-${i}`} className="group relative">
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--paper-strong)]">
                <img
                  src={url}
                  alt={`Görsel ${i + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "";
                    (e.target as HTMLImageElement).alt = "Yüklenemedi";
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 shadow transition group-hover:opacity-100"
                title="Kaldır"
              >
                ×
              </button>
              <p className="mt-1 truncate text-xs text-[var(--ink-muted)]">
                {url.startsWith("/uploads") ? url.split("/").pop() : "Harici URL"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
