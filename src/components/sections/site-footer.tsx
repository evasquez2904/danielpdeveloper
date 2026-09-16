import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="px-6 pt-14 pb-6 md:px-16 md:pt-20">
      <p className="display text-[40px] text-ghost sm:text-[64px] lg:text-[92px] xl:text-[118px]">
        {site.identity.name}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-5 md:mt-8">
        <span className="label text-[10px] text-fg-3">{site.footer.copyright}</span>
        <span className="label text-[10px] text-fg-3">{site.footer.colophon}</span>
      </div>
    </footer>
  );
}
