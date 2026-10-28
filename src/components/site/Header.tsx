"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Menu, Phone, X } from "lucide-react";
import { EASE_OUT } from "@/components/motion/primitives";
import { isActivePath, useMobileMenu, useScrollHeader } from "@/components/ui/hooks";
import type { Brand } from "@/lib/types";
import { Leaf } from "./ui";

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

export function Header({ brand }: { brand: Pick<Brand, "email" | "phone" | "phoneHref"> }) {
  const { open, setOpen, toggle, pathname } = useMobileMenu();
  const { scrolled, hidden } = useScrollHeader();

  return (
    <>
      <a href="#main" className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-ink px-5 py-3 font-sans text-sm text-snow transition-transform focus:translate-y-0">
        Skip to content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-500 ease-luxe sm:px-5 sm:pt-4 ${hidden && !open ? "-translate-y-[130%]" : ""}`}>
        <div
          className={`mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-all duration-500 ${
            scrolled ? "bg-snow/85 shadow-[0_12px_40px_-20px_rgba(43,46,41,0.35)] ring-1 ring-ink/5 backdrop-blur-xl" : "bg-snow/60 backdrop-blur-md"
          }`}
        >
          <Link href="/" className="group flex items-center gap-2 text-ink" aria-label="Linnea Studio — home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-sage/50 text-sage-deep transition-transform duration-500 group-hover:rotate-[-20deg]">
              <Leaf className="h-[18px] w-[18px]" />
            </span>
            <span className="font-display text-2xl font-normal italic tracking-[-0.01em]">
              linnea<span className="text-sage-deep">.</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => {
                const active = isActivePath(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex flex-col items-center px-3.5 py-2 font-sans text-[15px] transition-colors ${active ? "text-ink" : "text-mute hover:text-ink"}`}
                    >
                      {l.label}
                      {active && (
                        <motion.span layoutId="nav-dot" className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-sage-deep" transition={{ type: "spring", stiffness: 300, damping: 26 }} />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href={`${base}/contact`} className="hidden min-h-12 items-center rounded-full bg-sage-deep px-5 font-sans text-[15px] font-medium text-snow transition-colors hover:bg-ink sm:inline-flex">
              Book a visit
            </Link>
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-12 w-12 place-items-center rounded-full bg-sand text-ink transition-colors hover:bg-sage/60 lg:hidden"
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile: a bottom sheet keeps links within thumb reach. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div aria-hidden className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-[2rem] bg-snow px-6 pb-8 pt-3 shadow-[0_-20px_60px_-20px_rgba(43,46,41,0.4)] lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => info.offset.y > 120 && setOpen(false)}
            >
              <span aria-hidden className="mx-auto mb-5 block h-1.5 w-12 rounded-full bg-ink/15" />
              <nav aria-label="Mobile">
                <ul className="grid grid-cols-2 gap-2">
                  {all.map((l, i) => {
                    const active = isActivePath(pathname, l.href);
                    return (
                      <motion.li key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.035, ease: EASE_OUT }} className={l.label === "Contact" ? "col-span-2" : ""}>
                        <Link
                          href={l.href}
                          onNavigate={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-h-14 items-center rounded-2xl px-5 font-display text-lg transition-colors ${
                            l.label === "Contact" ? "justify-center bg-sage-deep text-snow" : active ? "bg-sage/40 text-ink" : "bg-linen text-ink hover:bg-sand"
                          }`}
                        >
                          {l.label === "Contact" ? "Book a visit" : l.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              <div className="mt-6 flex flex-col gap-2 font-sans text-sm text-mute">
                <a href={`mailto:${brand.email}`} className="flex min-h-11 items-center gap-3"><Mail size={16} aria-hidden /> {brand.email}</a>
                <a href={`tel:${brand.phoneHref}`} className="flex min-h-11 items-center gap-3"><Phone size={16} aria-hidden /> {brand.phone}</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
