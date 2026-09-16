import type { Transition, Variants } from "motion/react";

// La tabla de movimiento del diseño, en un solo sitio. Ningún componente
// declara una duración ni un easing propios.
//
// Solo se animan transform y opacity. Nunca width, height ni top.

export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const duration = {
  micro: 0.16,
  veil: 0.2,
  invert: 0.22,
  enter: 0.52,
} as const;

export const stagger = 0.07;

/** El morfo: la fila se transforma en la ficha. */
export const morph: Transition = { type: "spring", stiffness: 220, damping: 28 };

export const enterTransition: Transition = { duration: duration.enter, ease };

export const microTransition: Transition = { duration: duration.micro, ease };

export const veilTransition: Transition = { duration: duration.veil, ease };

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: enterTransition },
};

export const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
};

/** Con movimiento reducido todo pasa a fundido: sin desplazamiento ni escala. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.veil } },
};
