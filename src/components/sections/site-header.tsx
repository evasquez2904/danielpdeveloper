"use client";

import { site } from "@/content/site";
import { CtaButton } from "@/components/ui/cta";

interface SiteHeaderProps {
  onRequestAccess: () => void;
}

export function SiteHeader({ onRequestAccess }: SiteHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-line px-6 md:h-22 md:px-16">
      <div className="flex items-center gap-3">
        <span className="block size-4 bg-accent md:size-[18px]" />
        <span className="text-sm font-bold tracking-tight md:text-[15px]">
          {site.identity.name}
        </span>
      </div>

      <nav className="flex items-center gap-8">
        {site.nav.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="label hidden text-fg-2 transition-colors duration-150 hover:text-fg md:block"
          >
            {link.label}
          </a>
        ))}
        <CtaButton onClick={onRequestAccess}>{site.nav.cta}</CtaButton>
      </nav>
    </header>
  );
}
