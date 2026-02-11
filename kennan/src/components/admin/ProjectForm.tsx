"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import type { Project } from "@/data/projects";

type FormData = Omit<Project, "id"> & { id?: string };

const STEPS = [
  "Temel Bilgiler",
  "Görseller",
  "Açıklama",
  "360° Tur",
  "Önizleme",
] as const;

const CATEGORIES: Project["category"][] = [
  "Konut",
  "Ticari",
  "İç Mekân",
  "Kentsel",
];

const EMPTY_FORM: FormData = {
  name: "",
  location: "",
  year: new Date().getFullYear().toString(),
  category: "Konut",
  heroImage: "",
  thumbnail: "",
  area: "",
  role: "",
  software: "",
  story: [""],
  gallery: [],
  topView: "",
  tourScenes: [],
  panoramaScenes: [],
};

interface ProjectFormProps {
  /** Düzenleme modunda mevcut veri */
  initialData?: Project;
  /** Form başlığı */
  title: string;
}

export default function ProjectForm({ initialData, title }: ProjectFormProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(
    initialData
      ? { ...initialData }
      : { ...EMPTY_FORM }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isEdit = !!initialData;

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Hikaye paragrafları yönetimi
  function updateStory(index: number, value: string) {
    const updated = [...form.story];
    updated[index] = value;
    setForm((prev) => ({ ...prev, story: updated }));
  }
  function addStoryParagraph() {
    setForm((prev) => ({ ...prev, story: [...prev.story, ""] }));
  }
  function removeStoryParagraph(index: number) {
    setForm((prev) => ({
      ...prev,
      story: prev.story.filter((_, i) => i !== index),
    }));
  }

  // Tour scenes yönetimi
  function addTourScene() {
    setForm((prev) => ({
      ...prev,
      tourScenes: [
        ...prev.tourScenes,
        { id: `sahne-${Date.now()}`, title: "", image: "", next: [] },
      ],
    }));
  }
  function updateTourScene(
    index: number,
    field: "id" | "title" | "image",
    value: string
  ) {
    const updated = [...form.tourScenes];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({ ...prev, tourScenes: updated }));
  }
  function removeTourScene(index: number) {
    setForm((prev) => ({
      ...prev,
      tourScenes: prev.tourScenes.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit() {
    setError("");
    setSaving(true);

    // Basic validation
    if (!form.name.trim()) {
      setError("Proje adı zorunlu");
      setStep(0);
      setSaving(false);
      return;
    }

    try {
      const url = isEdit
        ? `/api/projects/${initialData!.id}`
        : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Kaydetme başarısız");
        setSaving(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Bağlantı hatası");
    } finally {
      setSaving(false);
    }
  }

  // Input helper
  const inputClass =
    "w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20";
  const labelClass = "mb-1 block text-sm font-medium text-[var(--ink)]";

  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--ink)]">{title}</h1>
          <p className="text-sm text-[var(--ink-muted)]">
            Adım {step + 1} / {STEPS.length} — {STEPS[step]}
          </p>
        </div>
        <a
          href="/admin"
          className="rounded-lg border border-[var(--line)] px-3 py-1.5 text-xs font-medium text-[var(--ink-muted)] transition hover:bg-[var(--paper-strong)]"
        >
          Geri Dön
        </a>
      </div>

      {/* Step Indicator */}
      <div className="mb-8 flex gap-1">
        {STEPS.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`flex-1 rounded-full py-1.5 text-xs font-medium transition ${
              i === step
                ? "bg-[var(--accent)] text-white"
                : i < step
                ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                : "bg-[var(--paper-strong)] text-[var(--ink-muted)]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Card */}
      <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-6 backdrop-blur">
        {/* ============ STEP 0: Temel Bilgiler ============ */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Proje Adı *</label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="ör: Sahil Yalısı"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Konum</label>
                <input
                  className={inputClass}
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="ör: İzmir, Türkiye"
                />
              </div>
              <div>
                <label className={labelClass}>Yıl</label>
                <input
                  className={inputClass}
                  value={form.year}
                  onChange={(e) => updateField("year", e.target.value)}
                  placeholder="ör: 2024"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Kategori</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateField("category", cat)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      form.category === cat
                        ? "bg-[var(--accent)] text-white"
                        : "border border-[var(--line)] bg-white text-[var(--ink)] hover:bg-[var(--paper-strong)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Alan</label>
                <input
                  className={inputClass}
                  value={form.area}
                  onChange={(e) => updateField("area", e.target.value)}
                  placeholder="ör: 4.200 m2"
                />
              </div>
              <div>
                <label className={labelClass}>Rol</label>
                <input
                  className={inputClass}
                  value={form.role}
                  onChange={(e) => updateField("role", e.target.value)}
                  placeholder="ör: Mimari Tasarım"
                />
              </div>
              <div>
                <label className={labelClass}>Yazılım</label>
                <input
                  className={inputClass}
                  value={form.software}
                  onChange={(e) => updateField("software", e.target.value)}
                  placeholder="ör: Revit, Rhino"
                />
              </div>
            </div>
          </div>
        )}

        {/* ============ STEP 1: Görseller ============ */}
        {step === 1 && (
          <div className="space-y-6">
            <ImageUploader
              label="Hero Görsel"
              hint="(Proje detay sayfası üst banner)"
              value={form.heroImage ? [form.heroImage] : []}
              onChange={(urls) => updateField("heroImage", urls[0] || "")}
              subfolder={form.name ? form.name.toLowerCase().replace(/\s+/g, "-") : undefined}
              single
            />
            <ImageUploader
              label="Küçük Resim (Thumbnail)"
              hint="(Proje kartlarında görünen)"
              value={form.thumbnail ? [form.thumbnail] : []}
              onChange={(urls) => updateField("thumbnail", urls[0] || "")}
              subfolder={form.name ? form.name.toLowerCase().replace(/\s+/g, "-") : undefined}
              single
            />
            <ImageUploader
              label="Üst Görünüş (Top View)"
              hint="(Kat planı / vaziyet planı)"
              value={form.topView ? [form.topView] : []}
              onChange={(urls) => updateField("topView", urls[0] || "")}
              subfolder={form.name ? form.name.toLowerCase().replace(/\s+/g, "-") : undefined}
              single
            />
            <ImageUploader
              label="Galeri Görselleri"
              hint={`(${form.gallery.length}/20 yüklendi)`}
              value={form.gallery}
              onChange={(urls) => updateField("gallery", urls)}
              subfolder={form.name ? form.name.toLowerCase().replace(/\s+/g, "-") : undefined}
              max={20}
            />
          </div>
        )}

        {/* ============ STEP 2: Açıklama ============ */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className={labelClass}>Proje Hikâyesi</label>
              <button
                type="button"
                onClick={addStoryParagraph}
                className="text-xs font-medium text-[var(--accent)] hover:underline"
              >
                + Paragraf Ekle
              </button>
            </div>
            {form.story.map((paragraph, i) => (
              <div key={i} className="flex gap-2">
                <textarea
                  className={`${inputClass} min-h-[80px] resize-y`}
                  value={paragraph}
                  onChange={(e) => updateStory(i, e.target.value)}
                  placeholder={`${i + 1}. paragraf...`}
                  rows={3}
                />
                {form.story.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStoryParagraph(i)}
                    className="shrink-0 self-start rounded-lg border border-red-200 px-2 py-2.5 text-xs text-red-500 hover:bg-red-50"
                    title="Paragrafı sil"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <p className="text-xs text-[var(--ink-muted)]">
              Her paragraf, proje detay sayfasında ayrı bir bölüm olarak
              görüntülenir.
            </p>
          </div>
        )}

        {/* ============ STEP 3: 360° Tur ============ */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className={labelClass}>Tur Sahneleri</label>
                <p className="text-xs text-[var(--ink-muted)]">
                  Ziyaretçilerin gezebileceği sahneler (opsiyonel)
                </p>
              </div>
              <button
                type="button"
                onClick={addTourScene}
                className="text-xs font-medium text-[var(--accent)] hover:underline"
              >
                + Sahne Ekle
              </button>
            </div>

            {form.tourScenes.length === 0 && (
              <div className="rounded-xl border border-dashed border-[var(--line)] p-8 text-center">
                <p className="text-sm text-[var(--ink-muted)]">
                  Henüz sahne eklenmemiş. 360° tur eklemek isterseniz sahne
                  ekleyin.
                </p>
              </div>
            )}

            {form.tourScenes.map((scene, i) => (
              <div
                key={scene.id}
                className="rounded-xl border border-[var(--line)] bg-[var(--paper)]/50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--ink)]">
                    Sahne {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTourScene(i)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Kaldır
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-[var(--ink-muted)]">
                      Sahne ID
                    </label>
                    <input
                      className={inputClass}
                      value={scene.id}
                      onChange={(e) =>
                        updateTourScene(i, "id", e.target.value)
                      }
                      placeholder="ör: salon"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[var(--ink-muted)]">
                      Başlık
                    </label>
                    <input
                      className={inputClass}
                      value={scene.title}
                      onChange={(e) =>
                        updateTourScene(i, "title", e.target.value)
                      }
                      placeholder="ör: Salon"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="mb-1 block text-xs text-[var(--ink-muted)]">
                    Görsel URL
                  </label>
                  <input
                    className={inputClass}
                    value={scene.image}
                    onChange={(e) =>
                      updateTourScene(i, "image", e.target.value)
                    }
                    placeholder="Görsel URL'si"
                  />
                </div>
              </div>
            ))}

            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <p className="text-xs text-blue-700">
                <strong>Not:</strong> 360° panorama sahneleri (PanoramaViewer
                için) daha gelişmiş bir yapıdır. Şimdilik basit tur sahneleri
                ekleyebilirsiniz. Panorama sahneleri JSON dosyasından manuel
                düzenlenebilir.
              </p>
            </div>
          </div>
        )}

        {/* ============ STEP 4: Önizleme ============ */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[var(--ink)]">
              Proje Özeti
            </h3>

            {/* Preview Card */}
            <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)]/50 p-4">
              <div className="flex gap-4">
                {form.thumbnail && (
                  <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={form.thumbnail}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-[var(--ink)]">
                    {form.name || "İsimsiz Proje"}
                  </h4>
                  <p className="text-sm text-[var(--ink-muted)]">
                    {form.location} · {form.year} · {form.category}
                  </p>
                  <p className="text-sm text-[var(--ink-muted)]">
                    {form.area} · {form.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[var(--ink-muted)]">Yazılım:</span>{" "}
                <span className="font-medium">{form.software || "—"}</span>
              </div>
              <div>
                <span className="text-[var(--ink-muted)]">Galeri:</span>{" "}
                <span className="font-medium">
                  {form.gallery.length} görsel
                </span>
              </div>
              <div>
                <span className="text-[var(--ink-muted)]">Hikâye:</span>{" "}
                <span className="font-medium">
                  {form.story.filter((s) => s.trim()).length} paragraf
                </span>
              </div>
              <div>
                <span className="text-[var(--ink-muted)]">Tur:</span>{" "}
                <span className="font-medium">
                  {form.tourScenes.length} sahne
                </span>
              </div>
            </div>

            {/* Story Preview */}
            {form.story.some((s) => s.trim()) && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-[var(--ink)]">
                  Hikâye Önizleme:
                </h4>
                <div className="space-y-2 rounded-lg bg-[var(--paper)] p-4 text-sm text-[var(--ink-muted)]">
                  {form.story
                    .filter((s) => s.trim())
                    .map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                </div>
              </div>
            )}

            {/* Save button */}
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="w-full rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] px-6 py-3 text-sm font-semibold text-white transition hover:shadow-lg disabled:opacity-60"
            >
              {saving
                ? "Kaydediliyor..."
                : isEdit
                ? "Değişiklikleri Kaydet"
                : "Projeyi Kaydet"}
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--paper-strong)] disabled:opacity-30"
        >
          Geri
        </button>
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="rounded-lg bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--ink)]/90"
          >
            İleri
          </button>
        ) : null}
      </div>
    </div>
  );
}
