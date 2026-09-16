"use client";

import { site } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/motion-primitives";
import { CtaButton, CtaLink } from "@/components/ui/cta";
import { ArrowRight } from "@/components/ui/icons";
import { fill } from "@/lib/utils";

interface HeroProps {
  onRequestAccess: () => void;
}

export function Hero({ onRequestAccess }: HeroProps) {
  const { hero, identity, nav } = site;

  return (
    <Stagger className="px-6 pt-14 pb-16 md:px-16 md:pt-24 md:pb-24">
      <StaggerItem>
        <p className="label text-fg-3">{fill(hero.eyebrow, { city: identity.city })}</p>
      </StaggerItem>

      <StaggerItem>
        <h1 className="display mt-6 text-[52px] sm:text-[78px] lg:text-[112px] xl:text-[140px] md:mt-8">
          {hero.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="inline-block bg-accent px-2 text-bg md:px-3.5">
            {hero.titleHighlight}
          </span>
        </h1>
      </StaggerItem>

      <div className="mt-10 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between md:gap-16">
        <StaggerItem>
          <p className="max-w-lg text-base leading-relaxed text-fg-2 md:text-[17px]">
            {hero.body}
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <CtaButton size="lg" onClick={onRequestAccess}>
              {hero.ctaPrimary}
              <ArrowRight className="size-4" />
            </CtaButton>
            <CtaLink size="lg" variant="ghost" href={nav.links[0].href}>
              {hero.ctaSecondary}
            </CtaLink>
          </div>
        </StaggerItem>
      </div>
    </Stagger>
  );
}
