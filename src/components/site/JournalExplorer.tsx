"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Post } from "@/lib/types";
import { PostCard } from "./cards";
import { Mark } from "./ui";

export function JournalExplorer({ posts, categories, base }: { posts: Post[]; categories: string[]; base: string }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => (category === "All" || p.category === category) && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)));
  }, [posts, category, query]);

  return (
    <>
      <div className="flex flex-col gap-4 border-y border-ink/10 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-x-6 gap-y-1">
          {["All", ...categories].map((c) => (
            <button key={c} type="button" aria-pressed={c === category} onClick={() => setCategory(c)} className={`relative min-h-11 font-sans text-[15px] transition-colors ${c === category ? "text-ink" : "text-mute hover:text-ink"}`}>
              {c}
              <span aria-hidden className={`absolute inset-x-0 bottom-1.5 h-px origin-left bg-pine transition-transform duration-500 ease-curtain ${c === category ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          ))}
        </div>
        <div className="relative lg:w-80">
          <label htmlFor="search" className="sr-only">Search the journal</label>
          <Search size={16} aria-hidden className="absolute left-0 top-1/2 -translate-y-1/2 text-mute" />
          <input id="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles" className="h-12 w-full border-b border-ink/20 bg-transparent pl-7 pr-10 font-sans text-[15px] text-ink placeholder:text-mute/70 focus:border-pine focus:outline-none" />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-0 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center hover:text-pine"><X size={16} aria-hidden /></button>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{results.length} articles found</p>

      <AnimatePresence mode="wait">
        {results.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-10 bg-shell px-6 py-20 text-center">
            <Mark className="mx-auto h-8 w-8 text-pine" />
            <p className="mt-6 font-display text-3xl">Nothing found for “{query || category}”.</p>
            <p className="mt-2 font-sans text-mute">Try a different word, or browse all articles.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-8 min-h-12 rounded-full bg-pine px-6 font-sans font-medium text-white transition-colors hover:bg-forest">Show all articles</button>
          </motion.div>
        ) : (
          <motion.ul key={`${category}-${query}`} className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <motion.li key={p.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.07, ease: EASE_OUT }}>
                <PostCard post={p} base={base} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
