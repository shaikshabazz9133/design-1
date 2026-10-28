import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { LocalTime } from "@/components/motion/extras";
import { Button, container, Eyebrow } from "@/components/site/ui";
import { Reveal, SplitText } from "@/components/motion/primitives";
import { directionsHref, MapEmbed } from "@/components/ui/MapEmbed";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a home visit or consultation with Linnea Studio in Frederiksberg, Copenhagen.",
};

export default function ContactPage() {
  const { brand } = site;
  const rows = [
    { title: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { title: "Phone", value: brand.phone, href: `tel:${brand.phoneHref}` },
    { title: "Studio", value: brand.address.join(", "), href: directionsHref(brand.map.lat, brand.map.lon) },
  ];

  return (
    <>
      <section className={`${container} pb-16 pt-28 sm:pt-32`}>
        <div className="flex items-start justify-between gap-6">
          <Reveal y={8}><Eyebrow>Contact</Eyebrow></Reveal>
          <Reveal y={8} className="font-label text-[11px] uppercase tracking-[0.16em] text-mute">CPH <LocalTime timeZone="Europe/Copenhagen" className="text-ink" /></Reveal>
        </div>
        <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.6rem,5.2vw,4.75rem)] leading-[1.04]">
          <SplitText text="Let’s talk about your home" immediate delay={0.1} accentWords={["home"]} accentClassName="italic text-pine" />
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-14 border-t border-ink/10 pt-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal delay={0.4}>
              <p className="max-w-sm font-sans text-[17px] font-light leading-relaxed text-mute">Tell us a little about your project. We&apos;ll reply within two working days to arrange a home visit or video call.</p>
            </Reveal>
            <Reveal delay={0.5}>
              <ul className="mt-8 border-t border-ink/10">
                {rows.map(({ title, value, href }) => (
                  <li key={title} className="border-b border-ink/10">
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center gap-4 py-5">
                      <span className="min-w-0 flex-1">
                        <span className="block font-label text-[10px] uppercase tracking-[0.16em] text-mute">{title}</span>
                        <span className="mt-1 block break-words font-sans text-[16px] font-light transition-colors group-hover:text-pine">{value}</span>
                      </span>
                      <ArrowUpRight size={18} className="shrink-0 text-mute transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pine" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ContactForm email={brand.email} />
          </div>
        </div>
      </section>

      <section className="bg-forest text-white" aria-labelledby="visit">
        <div className="grid lg:grid-cols-12">
          <div className="px-5 py-14 sm:px-12 sm:py-16 lg:col-span-5">
            <Eyebrow className="text-white/60 [&>span:first-child]:bg-sand">Visit</Eyebrow>
            <h2 id="visit" className="mt-6 font-display text-[clamp(2.2rem,3.4vw,3rem)] leading-[1.1]">Visit the studio</h2>
            <p className="mt-5 max-w-md font-sans text-[17px] leading-relaxed text-white/65">Our material library is open by appointment — come and touch the oak, linen and stone for yourself.</p>
            <dl className="mt-10 border-t border-white/15">
              {brand.hours.map((h) => (
                <div key={h.days} className="flex items-center justify-between gap-4 border-b border-white/15 py-4 font-sans text-[15px]">
                  <dt>{h.days}</dt>
                  <dd className="text-right font-label text-[12px] text-white/60">{h.time}</dd>
                </div>
              ))}
            </dl>
            <Button href={directionsHref(brand.map.lat, brand.map.lon)} variant="light" className="mt-10">Get directions</Button>
          </div>
          <div className="relative min-h-[24rem] lg:col-span-7">
            <MapEmbed {...brand.map} className="absolute inset-0 grayscale contrast-[1.05]" />
          </div>
        </div>
      </section>
    </>
  );
}
