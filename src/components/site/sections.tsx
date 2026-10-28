import Image from "next/image";
import { Reveal, SplitText } from "@/components/motion/primitives";
import { unsplash } from "@/lib/content/helpers";
import { Button, container, FloatingLeaf } from "./ui";

export function CtaBand({ title = "Let's create a calmer home together", accent = ["calmer"] }: { title?: string; accent?: string[] }) {
  return (
    <section className={`${container} py-20 sm:py-28`}>
      <div className="relative grid overflow-hidden rounded-[2.5rem] bg-sage-deep text-snow lg:grid-cols-2">
        <FloatingLeaf className="absolute -left-8 bottom-6 h-36 w-24 -rotate-[25deg] text-snow/10" slow />
        <div className="relative p-8 sm:p-14 lg:p-16">
          <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-light leading-[1.05] tracking-[-0.02em]">
            <SplitText text={title} accentWords={accent} accentClassName="italic text-sage" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md font-sans text-[17px] leading-relaxed text-snow/80">
              Book a 90-minute home visit with a senior designer. We&apos;ll listen, look at the light and leave you with a clear plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="light">Book a home visit</Button>
              <Button href="/projects" variant="ghost" className="text-snow! ring-snow/40! hover:bg-snow! hover:text-ink!">See our work</Button>
            </div>
          </Reveal>
        </div>
        <div className="relative min-h-[16rem] lg:min-h-full">
          <Image src={unsplash("1597665863042-47e00964d899")} alt="Calm living room with patterned rug and soft daylight" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
