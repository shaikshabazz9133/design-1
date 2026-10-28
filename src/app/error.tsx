"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-start justify-center px-5 pt-28 sm:px-8">
      <p className="font-label text-[11px] uppercase tracking-[0.18em] text-pine">Error</p>
      <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] text-ink">Something didn&apos;t go <span className="italic text-pine">as planned.</span></h1>
      <p className="mt-6 max-w-md font-sans text-lg text-mute">Please try again. If it keeps happening, we&apos;re happy to help by email or phone.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="min-h-13 rounded-full bg-pine px-7 font-sans font-medium text-white transition-colors hover:bg-forest">Try again</button>
        <Link href="/" className="inline-flex min-h-13 items-center px-7 font-sans font-medium ring-1 ring-inset ring-ink/20 transition-colors hover:bg-ink hover:text-white">Back home</Link>
      </div>
    </section>
  );
}
