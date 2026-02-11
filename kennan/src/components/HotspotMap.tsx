"use client";

type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type HotspotMapProps = {
  image: string;
  hotspots: Hotspot[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function HotspotMap({
  image,
  hotspots,
  activeId,
  onSelect,
}: HotspotMapProps) {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/80">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      {hotspots.map((spot) => (
        <button
          key={spot.id}
          type="button"
          onClick={() => onSelect(spot.id)}
          className={`absolute flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
            activeId === spot.id
              ? "border-[color:var(--accent)] bg-white text-[color:var(--accent)]"
              : "border-white/80 bg-black/30 text-white"
          }`}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
        >
          {spot.label}
        </button>
      ))}
    </div>
  );
}
