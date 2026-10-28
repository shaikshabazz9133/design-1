import Image from "next/image";
import { Plus } from "lucide-react";
import { ImageReveal, Reveal, SplitText } from "@/components/motion/primitives";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";
import { Button, container, Eyebrow, Heading } from "./ui";

/** Closing invitation: photograph beside a short pitch on a warm sand panel. */
export function CtaBand({ title = "Let’s create a calmer home together", accent = ["calmer"] }: { title?: string; accent?: string[] }) {
  return (
    <section className={`${container} py-12 sm:py-16`}>
      <div className="grid overflow-hidden bg-sand-light lg:grid-cols-2">
        <ImageReveal className="relative min-h-[18rem] lg:min-h-[26rem]">
          <Image src={unsplash("1597665863042-47e00964d899")} alt="Calm living room with patterned rug and soft daylight" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
        </ImageReveal>
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
          <Reveal y={8}><Eyebrow>Next step</Eyebrow></Reveal>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,3.6vw,3.25rem)] leading-[1.08] text-ink">
            <SplitText text={title} accentWords={accent} accentClassName="italic text-pine" stagger={0.04} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-md font-sans text-[16px] font-light leading-relaxed text-mute">
              Book a 90-minute home visit with a senior designer. We&apos;ll listen, look at the light and leave you with a clear plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Book a home visit</Button>
              <Button href="/projects" variant="outline">See our work</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** FAQ list on a shell band: hairline rows, a plus that turns into a cross. */
export function FaqSection({ title = "Good questions", accent = ["questions"], eyebrow = "FAQ", defaultOpen = 0 }: { title?: string; accent?: string[]; eyebrow?: string; defaultOpen?: number }) {
  return (
    <section className="bg-shell py-16 sm:py-20" aria-labelledby="faq">
      <div className={`${container} grid gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-4" id="faq">
          <Heading eyebrow={eyebrow} title={title} accent={accent} intro="Anything else? Write to us — we answer every email within two working days." />
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Accordion
            items={site.faqs}
            defaultOpen={defaultOpen}
            className="border-t border-ink/10"
            itemClassName="border-b border-ink/10"
            buttonClassName="group min-h-16 py-5"
            questionClassName="font-display text-[1.4rem] font-normal leading-snug transition-colors group-hover:text-pine"
            panelClassName="max-w-2xl pb-6 font-sans text-[15px] font-light leading-relaxed text-mute"
            icon={<Plus size={18} strokeWidth={1.25} />}
            iconClassName="grid h-9 w-9 place-items-center rounded-full ring-1 ring-inset ring-ink/15 text-pine transition-all duration-500 ease-luxe"
            iconOpenClassName="rotate-45 bg-pine text-white ring-pine"
          />
        </div>
      </div>
    </section>
  );
}
