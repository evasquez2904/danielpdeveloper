"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { veilTransition } from "@/lib/motion";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Un contador y no un guardar/restaurar por modal: al abrir el formulario desde
// la ficha los dos se solapan un instante, y el que se cierra soltaba el scroll
// del que acababa de abrirse.
let locks = 0;

function lockScroll() {
  if (locks++ === 0) document.body.style.overflow = "hidden";
}

function unlockScroll() {
  if (--locks === 0) document.body.style.overflow = "";
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id del elemento que da nombre al diálogo. */
  labelledBy: string;
  children: ReactNode;
}

export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const panel = useRef<HTMLDivElement>(null);
  const restore = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restore.current = document.activeElement as HTMLElement | null;
    lockScroll();

    const focusFirst = window.setTimeout(() => {
      panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panel.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      restore.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            className="fixed inset-0 bg-bg/85"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={veilTransition}
          />
          <div
            className="relative flex min-h-full items-center justify-center p-4 sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelledBy}
              className="w-full max-w-fit"
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
