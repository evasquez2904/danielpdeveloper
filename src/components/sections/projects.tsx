"use client";

import { sectionIds, site, type Project } from "@/content/site";
import { ProjectRow } from "@/components/project-row";

interface ProjectsProps {
  onOpen: (project: Project) => void;
}

export function Projects({ onOpen }: ProjectsProps) {
  return (
    <section id={sectionIds.projects} className="pt-12 md:pt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-6 pb-6 md:px-16 md:pb-8">
        <p className="label font-bold text-accent">{site.projects.label}</p>
        <p className="label text-fg-3">{site.projects.hint}</p>
      </div>

      {site.projects.items.map((project) => (
        <ProjectRow key={project.slug} project={project} onOpen={onOpen} />
      ))}
    </section>
  );
}
