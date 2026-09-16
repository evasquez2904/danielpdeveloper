"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { site, type Project } from "@/content/site";
import { Modal } from "@/components/ui/modal";
import { CtaButton, CtaLink } from "@/components/ui/cta";
import { LiveDot } from "@/components/ui/live-dot";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Close, Copy, Lock } from "@/components/ui/icons";
import { morph, veilTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const TITLE_ID = "ficha-de-proyecto";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
  onNavigate: (project: Project) => void;
  onRequestAccess: () => void;
}

export function ProjectDialog({
  project,
  onClose,
  onNavigate,
  onRequestAccess,
}: ProjectDialogProps) {
  // El proyecto se conserva mientras dura la animación de salida.
  const [shown, setShown] = useState(project);
  if (project && project !== shown) setShown(project);

  const items = site.projects.items;
  const position = shown ? items.findIndex((item) => item.slug === shown.slug) : 0;
  const previous = items[(position - 1 + items.length) % items.length];
  const next = items[(position + 1) % items.length];

  const { dialog } = site;

  return (
    <Modal open={project !== null} onClose={onClose} labelledBy={TITLE_ID}>
      {shown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={veilTransition}
          className="relative w-full border border-edge bg-raised lg:w-[1000px]"
        >
          <span className="absolute inset-x-0 top-0 block h-1.5 bg-accent" />

          <div className="p-6 pt-9 md:p-11 md:pt-12">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="label font-bold text-accent">{shown.index}</span>
                  <span className="label text-fg-3">{shown.domain}</span>
                  <LiveDot />
                  <span className="label hidden text-fg-3 sm:block">{shown.host}</span>
                </div>
                <motion.h2
                  id={TITLE_ID}
                  layoutId={`project-name-${shown.slug}`}
                  transition={morph}
                  className="display mt-3.5 text-[38px] sm:text-[56px] md:text-[78px]"
                >
                  {shown.name}
                </motion.h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={dialog.close}
                className="flex size-11 shrink-0 items-center justify-center border border-edge text-fg transition-colors duration-150 hover:border-fg-3"
              >
                <Close className="size-4" />
              </button>
            </div>

            <div className="my-7 h-px bg-line md:my-8" />

            <div className="flex flex-col gap-9 lg:flex-row lg:gap-10">
              <div className="lg:w-[556px]">
                <p className="label text-[10px] font-bold text-accent">{dialog.problemLabel}</p>
                {shown.brief.problem.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="mt-3.5 text-[15px] leading-relaxed text-fg-2"
                  >
                    {paragraph}
                  </p>
                ))}

                <p className="label mt-7 text-[10px] font-bold text-accent">
                  {dialog.decisionLabel}
                </p>
                <p className="mt-3.5 text-[15px] leading-relaxed text-fg-2">
                  {shown.brief.decision}
                </p>
              </div>

              <div className="flex flex-col lg:w-[316px]">
                <p className="label text-[10px] font-bold text-fg-3">{dialog.demoLabel}</p>
                <CtaLink
                  href={shown.url}
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                  className="mt-3 justify-between px-4 font-mono text-xs font-medium normal-case tracking-normal text-accent"
                >
                  {shown.urlLabel}
                  <ArrowUpRight className="size-3.5" />
                </CtaLink>

                <p className="label mt-6 text-[10px] font-bold text-fg-3">
                  {dialog.credentialsLabel}
                </p>
                <div className="mt-3 bg-fg text-bg">
                  <CopyField
                    value={shown.demo.email}
                    label={dialog.copyEmail}
                    copiedLabel={dialog.copied}
                  />
                  <CopyField
                    value={shown.demo.password}
                    label={dialog.copyPassword}
                    copiedLabel={dialog.copied}
                    bold
                  />
                </div>
                <p className="mt-3 text-xs leading-snug text-fg-3">{shown.demo.note}</p>

                <p className="label mt-6 text-[10px] font-bold text-fg-3">{dialog.stackLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {shown.stack.map((item) => (
                    <li
                      key={item}
                      className="label border border-edge px-2 py-1.5 text-[10px] tracking-[0.06em] text-fg-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <CtaButton size="lg" className="mt-8 lg:mt-auto" onClick={onRequestAccess}>
                  <Lock className="size-3.5" />
                  {dialog.cta}
                </CtaButton>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
              <button
                type="button"
                onClick={() => onNavigate(previous)}
                className="label flex items-center gap-2.5 text-fg-2 transition-colors duration-150 hover:text-fg"
              >
                <ArrowLeft className="size-3.5" />
                {previous.name}
              </button>

              <span className="label hidden text-[10px] text-fg-3 sm:block">
                {dialog.escHint}
              </span>

              <button
                type="button"
                onClick={() => onNavigate(next)}
                className="label flex items-center gap-2.5 text-fg-2 transition-colors duration-150 hover:text-fg"
              >
                {next.name}
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </Modal>
  );
}

interface CopyFieldProps {
  value: string;
  label: string;
  copiedLabel: string;
  bold?: boolean;
}

function CopyField({ value, label, copiedLabel, bold }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex h-12 items-center justify-between gap-2 border-b border-bg/10 px-3.5 last:border-b-0">
      <span className={cn("truncate font-mono text-[11.5px]", bold && "font-bold")}>
        {value}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? copiedLabel : label}
        className="flex size-7 shrink-0 items-center justify-center text-bg/70 transition-colors duration-150 hover:text-bg"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}
