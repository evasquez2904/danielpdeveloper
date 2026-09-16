import { site } from "@/content/site";
import { cn } from "@/lib/utils";

interface LiveDotProps {
  className?: string;
}

/** El punto hereda el color del texto, así una fila invertida lo arrastra sola. */
export function LiveDot({ className }: LiveDotProps) {
  return (
    <span
      className={cn("label flex shrink-0 items-center gap-2 text-[10px] text-live", className)}
    >
      <span className="block size-1.5 bg-current" />
      {site.projects.liveLabel}
    </span>
  );
}
