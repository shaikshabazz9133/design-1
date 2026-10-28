import Link from "next/link";
import { LocalTime } from "@/components/motion/extras";
import { site } from "@/lib/content/site";
import { Button, container, Mark } from "./ui";

const { brand, base } = site;

const groups = [
  { title: "Studio", links: [["About", "/about"], ["Process", "/process"], ["Stories", "/testimonials"], ["Journal", "/journal"]] },
  { title: "Services", links: site.services.slice(0, 5).map((s) => [s.title, `/services#${s.slug}`]) },
];

const colTitle = "font-label text-[12px] uppercase tracking-[0.22em] text-sand";

export function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className={`${container} pt-16 sm:pt-20`}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Linnea Studio — home">
              <Mark className="h-7 w-7 text-sand" />
              <span className="font-display text-[2rem] font-normal leading-none">Linnea</span>
              <span className="mt-1 font-label text-[10px] uppercase tracking-[0.28em] text-white/60">Studio</span>
            </Link>
            <p className="mt-6 max-w-sm font-display text-[1.65rem] leading-snug text-white/90">Calm, natural interiors for everyday life.</p>
            <Button href={`${base}/contact`} variant="light" className="mt-8">Book a home visit</Button>
          </div>
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title} className="lg:col-span-2">
              <p className={colTitle}>{g.title}</p>
              <ul className="mt-5 space-y-1">
                {g.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={`${base}${href}`} className="inline-flex min-h-9 items-center font-sans text-[15px] font-light text-white/75 transition-colors hover:text-white">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-3">
            <p className={colTitle}>Visit us</p>
            <address className="mt-5 font-sans text-[15px] font-light not-italic leading-7 text-white/75">
              {brand.address.map((l) => <span key={l} className="block">{l}</span>)}
              <a href={`mailto:${brand.email}`} className="mt-3 block break-all hover:text-white">{brand.email}</a>
              <a href={`tel:${brand.phoneHref}`} className="block hover:text-white">{brand.phone}</a>
            </address>
            <p className="mt-4 font-label text-[12px] uppercase tracking-[0.18em] text-white/50">
              Copenhagen · <LocalTime timeZone="Europe/Copenhagen" className="text-white/80" />
            </p>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 py-6 font-sans text-[13px] font-light text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {brand.founded}–2026 Linnea Studio ApS · Demonstration concept</p>
          <ul className="flex gap-6">
            {brand.socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
