"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Post } from "@/lib/types";
import { PostCard } from "./cards";
import { Leaf } from "./ui";

export function JournalExplorer({ posts, categories, base }: { posts: Post[]; categories: string[]; base: string }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => (category === "All" || p.category === category) && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)));
  }, [posts, category, query]);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button key={c} type="button" aria-pressed={c === category} onClick={() => setCategory(c)} className={`min-h-11 rounded-full px-4 font-sans text-[15px] transition-colors ${c === category ? "bg-sage-deep text-snow" : "bg-linen text-ink hover:bg-sand"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative lg:w-80">
          <label htmlFor="search" className="sr-only">Search the journal</label>
          <Search size={17} aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
          <input id="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles" className="h-12 w-full rounded-full bg-linen pl-11 pr-11 font-sans text-[15px] text-ink ring-1 ring-transparent placeholder:text-mute/70 focus:bg-snow focus:outline-none focus:ring-sage-deep" />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full hover:bg-sand"><X size={16} aria-hidden /></button>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{results.length} articles found</p>

      <AnimatePresence mode="wait">
        {results.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-10 rounded-[2rem] bg-linen px-6 py-20 text-center">
            <Leaf className="mx-auto h-10 w-10 text-sage-deep" />
            <p className="mt-5 font-display text-2xl font-light">Nothing found for “{query || category}”.</p>
            <p className="mt-2 font-sans text-mute">Try a different word, or browse all articles.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-7 min-h-12 rounded-full bg-sage-deep px-6 font-sans font-medium text-snow hover:bg-ink">Show all articles</button>
          </motion.div>
        ) : (
          <motion.ul key={`${category}-${query}`} className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <motion.li key={p.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.07, ease: EASE_OUT }}>
                <PostCard post={p} base={base} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
