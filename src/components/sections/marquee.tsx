import { site } from "@/content/site";

// Dos copias idénticas: el keyframe desplaza -50 %, así que el bucle no tiene
// costura. `prefers-reduced-motion` la para desde globals.css.
export function Marquee() {
  const line = `${site.marquee.join(" — ")} — `;

  return (
    <div className="flex h-14 items-center overflow-hidden bg-accent text-bg md:h-18">
      <div className="flex shrink-0 animate-marquee motion-reduce:animate-none">
        <span className="label shrink-0 pr-4 text-[11px] font-bold md:text-xs">{line}</span>
        <span
          aria-hidden
          className="label shrink-0 pr-4 text-[11px] font-bold md:text-xs"
        >
          {line}
        </span>
      </div>
    </div>
  );
}
