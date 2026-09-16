"use client";

import { useState } from "react";
import { MotionConfig } from "motion/react";
import type { Project } from "@/content/site";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";
import { Method } from "@/components/sections/method";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";
import { ProjectDialog } from "@/components/project-dialog";
import { AccessDialog } from "@/components/access-dialog";

// La fila y la ficha comparten layoutId, y cuatro CTA repartidos por la página
// abren el mismo formulario: los dos diálogos viven aquí, en un solo árbol.
export function SiteShell() {
  const [project, setProject] = useState<Project | null>(null);
  const [accessOpen, setAccessOpen] = useState(false);
  const [accessSession, setAccessSession] = useState(0);

  function openAccess() {
    setProject(null);
    // Remonta el formulario: `useActionState` no tiene forma de reiniciarse.
    setAccessSession((session) => session + 1);
    setAccessOpen(true);
  }

  // El bloque CSS de movimiento reducido no alcanza a Motion, que escribe los
  // transforms desde JS. Esto sí.
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader onRequestAccess={openAccess} />

      <main>
        <Hero onRequestAccess={openAccess} />
        <Marquee />
        <Projects onOpen={setProject} />
        <Method />
        <Contact onRequestAccess={openAccess} />
      </main>

      <SiteFooter />

      <ProjectDialog
        project={project}
        onClose={() => setProject(null)}
        onNavigate={setProject}
        onRequestAccess={openAccess}
      />

      <AccessDialog
        key={accessSession}
        open={accessOpen}
        onClose={() => setAccessOpen(false)}
      />
    </MotionConfig>
  );
}
