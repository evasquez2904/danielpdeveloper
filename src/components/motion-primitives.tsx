"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeVariants, revealVariants, staggerVariants } from "@/lib/motion";

// El único sitio donde se decide qué pasa con movimiento reducido: todo se
// vuelve fundido, sin desplazamiento.
function useVariants() {
  const reduced = useReducedMotion();
  return reduced
    ? { group: fadeVariants, item: fadeVariants }
    : { group: staggerVariants, item: revealVariants };
}

const VIEWPORT = { once: true, amount: 0.2 } as const;

interface MotionBlockProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Reveal({ children, className, id }: MotionBlockProps) {
  const { item } = useVariants();
  return (
    <motion.div
      id={id}
      className={className}
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, id }: MotionBlockProps) {
  const { group } = useVariants();
  return (
    <motion.div
      id={id}
      className={className}
      variants={group}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: MotionBlockProps) {
  const { item } = useVariants();
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
