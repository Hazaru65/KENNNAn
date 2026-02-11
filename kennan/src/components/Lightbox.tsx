"use client";

import Image from "next/image";
import { useEffect } from "react";

type LightboxProps = {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full border border-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
      >
        Kapat
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-4 md:left-10 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
      >
        Önceki
      </button>
      <div className="relative w-full max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-white/20">
          <Image
            src={images[currentIndex]}
            alt="Proje görseli"
            width={1600}
            height={1000}
            className="h-[70vh] w-full object-cover"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onNext}
        className="absolute right-4 md:right-10 rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
      >
        Sonraki
      </button>
    </div>
  );
}
