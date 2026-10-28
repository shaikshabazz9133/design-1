"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { EASE_CURTAIN, EASE_OUT } from "@/components/motion/primitives";
import { isActivePath, useMobileMenu, useScrollHeader } from "@/components/ui/hooks";
import type { Brand } from "@/lib/types";
import { Mark } from "./ui";

const base = "";
const links = [
  { href: `${base}/projects`, label: "Projects" },
  { href: `${base}/services`, label: "Services" },
  { href: `${base}/about`, label: "About" },
  { href: `${base}/process`, label: "Process" },
  { href: `${base}/testimonials`, label: "Stories" },
  { href: `${base}/journal`, label: "Journal" },
];
const all = [{ href: "/", label: "Home" }, ...links, { href: `${base}/contact`, label: "Contact" }];

/** Label that rolls up to a copy of itself on hover. */
function Roll({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-curtain group-hover:-translate-y-full">{children}</span>
      <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-curtain group-hover:translate-y-0">{children}</span>
    </span>
  );
}

export function Header({ brand }: { brand: Pick<Brand, "email" | "phone" | "phoneHref"> }) {
  const { open, setOpen, toggle, pathname } = useMobileMenu();
  const { scrolled, hidden } = useScrollHeader();

  return (
    <>
      <a href="#main" className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-pine px-5 py-3 font-sans text-sm text-white transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-curtain ${hidden && !open ? "-translate-y-full" : ""}`}>
        <div className={`transition-all duration-500 ${scrolled || open ? "border-b border-ink/[0.07] bg-white/90 backdrop-blur-lg" : "border-b border-transparent bg-white"}`}>
          <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
            <Link href="/" className="group relative z-[60] flex items-center gap-2.5 text-ink" aria-label="Linnea Studio — home">
              <Mark className="h-6 w-6 text-pine transition-transform duration-700 ease-luxe group-hover:rotate-90" />
              <span className="font-display text-[1.75rem] font-normal leading-none">Linnea</span>
              <span className="mt-1 font-label text-[10px] uppercase tracking-[0.28em] text-mute">Studio</span>
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {links.map((l) => {
                  const active = isActivePath(pathname, l.href);
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        className={`group relative flex flex-col items-center py-2 font-sans text-[14px] tracking-[0.02em] transition-colors ${active ? "text-pine" : "text-ink/70 hover:text-pine"}`}
                      >
                        <Roll>{l.label}</Roll>
                        {active && <motion.span layoutId="nav-mark" className="absolute -bottom-0.5 h-px w-full bg-sand" transition={{ type: "spring", stiffness: 320, damping: 30 }} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="relative z-[60] flex items-center gap-3">
              <Link href={`${base}/contact`} className="group hidden min-h-11 items-center rounded-full bg-pine px-5 font-sans text-[14px] text-white transition-colors duration-300 hover:bg-forest sm:inline-flex">
                <Roll>Book a visit</Roll>
              </Link>
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-11 items-center gap-3 px-1 font-label text-[12px] uppercase tracking-[0.2em] text-ink lg:hidden"
              >
                <span aria-hidden>{open ? "Close" : "Menu"}</span>
                <span aria-hidden className="relative block h-3 w-6">
                  <span className={`absolute left-0 h-px w-6 bg-current transition-all duration-500 ease-curtain ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-px w-6 bg-current transition-all duration-500 ease-curtain ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile: an ink curtain drops over the page with oversized links. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white px-5 pb-8 pt-24 text-ink sm:px-8 lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.6, ease: EASE_CURTAIN, delay: 0.1 } }}
            transition={{ duration: 0.7, ease: EASE_CURTAIN }}
          >
            <nav aria-label="Mobile">
              <ul>
                {all.map((l, i) => {
                  const active = isActivePath(pathname, l.href);
                  return (
                    <li key={l.href} className="overflow-hidden border-b border-ink/[0.07]">
                      <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%", transition: { duration: 0.3 } }} transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease: EASE_OUT }}>
                        <Link
                          href={l.href}
                          onNavigate={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className="flex min-h-14 items-center justify-between py-1"
                        >
                          <span className={`font-display text-[2rem] leading-tight ${active ? "italic text-pine" : ""}`}>{l.label}</span>
                          <span className="font-label text-[11px] tracking-[0.14em] text-mute">{String(i + 1).padStart(2, "0")}</span>
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <motion.div className="mt-auto grid gap-1 pt-10 font-sans text-[15px] font-light text-mute" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.6 }}>
              <a href={`mailto:${brand.email}`} className="flex min-h-11 items-center hover:text-pine">{brand.email}</a>
              <a href={`tel:${brand.phoneHref}`} className="flex min-h-11 items-center hover:text-pine">{brand.phone}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
