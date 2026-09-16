"use client";

import { motion } from "motion/react";
import type { Project } from "@/content/site";
import { LiveDot } from "@/components/ui/live-dot";
import { ArrowRight } from "@/components/ui/icons";
import { morph } from "@/lib/motion";

interface ProjectRowProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectRow({ project, onOpen }: ProjectRowProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group block w-full cursor-pointer border-t border-line px-6 py-6 text-left transition-colors duration-200 last:border-b hover:bg-accent md:px-16 md:py-8"
    >
      {/* Un solo índice y un solo «en vivo»: en móvil el nombre ocupa la fila
          entera y los empuja arriba; en escritorio `order` los recoloca. */}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3.5">
        <span className="label order-1 w-8 shrink-0 text-fg-3 group-hover:text-accent-ink">
          {project.index}
        </span>
        <LiveDot className="order-2 ml-auto group-hover:text-bg md:order-3" />
        <motion.span
          layoutId={`project-name-${project.slug}`}
          transition={morph}
          className="display order-3 w-full text-[40px] leading-none group-hover:text-bg sm:text-[52px] md:order-2 md:w-auto md:text-[68px] md:transition-transform md:duration-200 md:group-hover:translate-x-3.5"
        >
          {project.name}
        </motion.span>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-7 gap-y-2.5">
        <span className="hidden w-8 shrink-0 md:block" />
        <p className="w-full text-sm leading-snug text-fg-2 group-hover:text-accent-ink md:w-[26rem]">
          {project.summary}
        </p>
        <span className="label hidden text-[10px] text-fg-3 group-hover:text-accent-ink lg:block">
          {project.stack.slice(0, 4).join(" / ")}
        </span>
        <span className="ml-auto font-mono text-xs text-accent group-hover:font-bold group-hover:text-bg">
          {project.urlLabel}
        </span>
        <ArrowRight className="size-4 shrink-0 text-fg-3 group-hover:text-bg" />
      </div>
    </button>
  );
}
