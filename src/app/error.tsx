"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-5 pt-28 text-center">
      <span aria-hidden className="h-16 w-16 rounded-full bg-sage/50" />
      <h1 className="mt-8 font-display text-4xl font-light tracking-[-0.02em] text-ink sm:text-5xl">Something didn&apos;t grow as planned.</h1>
      <p className="mt-4 font-sans text-lg text-mute">Please try again. If it keeps happening, we&apos;re happy to help by email or phone.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="min-h-12 rounded-full bg-sage-deep px-6 font-sans font-medium text-snow hover:bg-ink">Try again</button>
        <Link href="/" className="inline-flex min-h-12 items-center rounded-full px-6 font-sans font-medium ring-1 ring-ink/20 hover:bg-ink hover:text-snow">Back home</Link>
      </div>
    </section>
  );
}
