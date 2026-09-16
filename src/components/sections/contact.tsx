"use client";

import { sectionIds, site } from "@/content/site";
import { CtaButton } from "@/components/ui/cta";

interface ContactProps {
  onRequestAccess: () => void;
}

export function Contact({ onRequestAccess }: ContactProps) {
  const { contact, identity } = site;

  const links = [
    { label: identity.email, href: `mailto:${identity.email}` },
    { label: `github.com/${identity.github}`, href: `https://github.com/${identity.github}` },
    {
      label: `linkedin.com/in/${identity.linkedin}`,
      href: `https://linkedin.com/in/${identity.linkedin}`,
    },
  ];

  return (
    <section
      id={sectionIds.contact}
      className="bg-accent px-6 py-14 text-bg md:px-16 md:py-16"
    >
      <h2 className="display max-w-4xl text-[40px] sm:text-[60px] lg:text-[76px] xl:text-[92px]">
        {contact.title}
      </h2>

      <div className="mt-10 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="max-w-md text-base leading-relaxed text-accent-ink">{contact.body}</p>
          <CtaButton variant="invert" size="lg" className="mt-6" onClick={onRequestAccess}>
            {contact.cta}
          </CtaButton>
        </div>

        <ul className="flex flex-col gap-2.5 font-mono text-xs font-medium md:text-right">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
