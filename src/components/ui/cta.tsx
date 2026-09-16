import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "invert";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-bg hover:brightness-110",
  ghost: "border border-edge text-fg hover:border-fg-3",
  invert: "bg-fg text-bg hover:brightness-95",
};

const SIZES = {
  md: "h-11 px-5",
  lg: "h-14 px-7",
} as const;

interface CtaShape {
  variant?: Variant;
  size?: keyof typeof SIZES;
  className?: string;
  children: ReactNode;
}

function ctaClass({ variant = "primary", size = "md", className }: CtaShape) {
  return cn(
    "label inline-flex shrink-0 items-center justify-center gap-3 font-bold transition-[filter,border-color,background-color] duration-150",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type CtaButtonProps = CtaShape & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function CtaButton({ variant, size, className, children, ...props }: CtaButtonProps) {
  return (
    <button type="button" {...props} className={ctaClass({ variant, size, className, children })}>
      {children}
    </button>
  );
}

type CtaLinkProps = CtaShape & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">;

export function CtaLink({ variant, size, className, children, ...props }: CtaLinkProps) {
  return (
    <a {...props} className={ctaClass({ variant, size, className, children })}>
      {children}
    </a>
  );
}
