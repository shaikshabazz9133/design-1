import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { container, Eyebrow, FloatingLeaf } from "@/components/site/ui";
import { Reveal, SplitText } from "@/components/motion/primitives";
import { directionsHref, MapEmbed } from "@/components/ui/MapEmbed";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a home visit or consultation with Linnea Studio in Frederiksberg, Copenhagen.",
};

export default function ContactPage() {
  const { brand } = site;
  const cards = [
    { icon: Mail, title: "Email", value: brand.email, href: `mailto:${brand.email}` },
    { icon: Phone, title: "Phone", value: brand.phone, href: `tel:${brand.phoneHref}` },
    { icon: MapPin, title: "Studio", value: brand.address.join(", "), href: directionsHref(brand.map.lat, brand.map.lon) },
  ];

  return (
    <>
      <section className={`${container} relative pb-20 pt-32 sm:pt-40`}>
        <FloatingLeaf className="absolute right-6 top-28 hidden h-32 w-24 rotate-12 text-sage/50 lg:block" slow />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal y={10}><Eyebrow>Contact</Eyebrow></Reveal>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-light leading-[1.04] tracking-[-0.02em]">
              <SplitText text="Let's talk about your home" immediate delay={0.2} accentWords={["home"]} accentClassName="italic text-sage-deep" />
            </h1>
            <Reveal delay={0.4}>
              <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-mute">Tell us a little about your project. We&apos;ll reply within two working days to arrange a home visit or video call.</p>
            </Reveal>
            <Reveal delay={0.5}>
              <ul className="mt-10 space-y-3">
                {cards.map(({ icon: Icon, title, value, href }) => (
                  <li key={title}>
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center gap-4 rounded-[1.5rem] bg-linen p-4 transition-colors hover:bg-sand">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-snow text-sage-deep"><Icon size={19} aria-hidden /></span>
                      <span className="min-w-0 font-sans">
                        <span className="block text-sm text-mute">{title}</span>
                        <span className="block break-all text-[15px] font-medium sm:break-words">{value}</span>
                      </span>
                      <ArrowUpRight size={18} className="ml-auto shrink-0 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ContactForm email={brand.email} />
          </div>
        </div>
      </section>

      <section className={`${container} pb-16`} aria-labelledby="visit">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-linen lg:grid-cols-5">
          <div className="p-8 sm:p-12 lg:col-span-2">
            <h2 id="visit" className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-light tracking-[-0.02em]">Visit the studio</h2>
            <p className="mt-3 font-sans text-[17px] leading-relaxed text-mute">Our material library is open by appointment — come and touch the oak, linen and stone for yourself.</p>
            <dl className="mt-8 space-y-3">
              {brand.hours.map((h) => (
                <div key={h.days} className="flex items-center justify-between gap-4 rounded-2xl bg-snow px-4 py-3 font-sans text-[15px]">
                  <dt className="flex items-center gap-2"><Clock size={15} className="text-sage-deep" aria-hidden />{h.days}</dt>
                  <dd className="text-right text-mute">{h.time}</dd>
                </div>
              ))}
            </dl>
            <a href={directionsHref(brand.map.lat, brand.map.lon)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-sage-deep px-6 font-sans font-medium text-snow hover:bg-ink">
              Get directions <ArrowUpRight size={17} aria-hidden />
            </a>
          </div>
          <div className="relative min-h-[22rem] lg:col-span-3">
            <MapEmbed {...brand.map} className="absolute inset-0 saturate-[0.6] hue-rotate-[20deg]" />
          </div>
        </div>
      </section>
    </>
  );
}
