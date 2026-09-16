import { sectionIds, site } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/motion-primitives";

export function Method() {
  return (
    <section id={sectionIds.method} className="px-6 py-14 md:px-16 md:py-16">
      <p className="label font-bold text-accent">{site.method.label}</p>

      <Stagger className="mt-8 grid gap-10 md:mt-9 md:grid-cols-3 md:gap-12">
        {site.method.items.map((item) => (
          <StaggerItem key={item.title}>
            <h3 className="display text-[22px] leading-tight md:text-[26px]">{item.title}</h3>
            <p className="mt-3.5 text-sm leading-relaxed text-fg-2 md:mt-4">{item.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
