"use client";

type FilterOption = "Tüm" | "Konut" | "Ticari" | "İç Mekân" | "Kentsel";

type ProjectFilterProps = {
  current: FilterOption;
  onChange: (value: FilterOption) => void;
};

const options: FilterOption[] = [
  "Tüm",
  "Konut",
  "Ticari",
  "İç Mekân",
  "Kentsel",
];

export default function ProjectFilter({ current, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-colors ${
            current === option
              ? "border-[color:var(--ink)] bg-[color:var(--ink)] text-[#fdf8f3]"
              : "border-[color:var(--line)] bg-white/70 text-[color:var(--ink)] hover:border-[color:var(--ink)]"
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
