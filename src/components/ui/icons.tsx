interface IconProps {
  className?: string;
}

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
};

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...stroke}>
      <path d="M2 8h11" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...stroke}>
      <path d="M14 8H3" />
      <path d="M7 4L3 8l4 4" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" className={className} {...stroke}>
      <path d="M4 10L10 4" />
      <path d="M4.6 4H10v5.4" />
    </svg>
  );
}

export function Close({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} {...stroke}>
      <path d="M4 4l8 8" />
      <path d="M12 4l-8 8" />
    </svg>
  );
}

export function Copy({ className }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" className={className} {...stroke} strokeWidth={1.4}>
      <rect x="4.5" y="4.5" width="7.5" height="7.5" />
      <path d="M9.5 2.5H2.5v7" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" className={className} {...stroke} strokeWidth={2}>
      <path d="M2.5 7.3l3 3 6-6.6" />
    </svg>
  );
}

export function Lock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 14 14" className={className} {...stroke} strokeWidth={1.6}>
      <rect x="2.5" y="6" width="9" height="6" />
      <path d="M4.75 6V4.25a2.25 2.25 0 0 1 4.5 0V6" />
    </svg>
  );
}

export function Menu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...stroke} strokeWidth={2}>
      <path d="M3 6h14" />
      <path d="M3 12h14" />
    </svg>
  );
}
