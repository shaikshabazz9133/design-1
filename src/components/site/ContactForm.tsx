"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";
import { useContactForm } from "@/components/ui/hooks";
import { BUDGETS, PROJECT_TYPES } from "@/lib/contact";
import { EASE_OUT } from "@/components/motion/primitives";

const label = "block font-label text-[10px] uppercase tracking-[0.16em] text-mute";
const input =
  "mt-2 block w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 font-sans text-lg text-ink placeholder:text-mute/50 transition-colors focus:border-pine focus:outline-none aria-[invalid=true]:border-[#a5402a]";

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p id={id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 font-sans text-sm text-[#a5402a]">
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function ContactForm({ email }: { email: string }) {
  const { values, errors, status, onSubmit, reset, field } = useContactForm();

  if (status.state === "success") {
    return (
      <motion.div role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_OUT }} className="border-t-2 border-pine bg-shell p-8 sm:p-12">
        <span className="grid h-14 w-14 place-items-center bg-pine text-white"><Check size={24} aria-hidden /></span>
        <h3 className="mt-8 font-display text-[2.6rem] leading-none">Tak, {values.name.split(" ")[0]} — that all looks good.</h3>
        <p className="mt-4 font-label text-[11px] uppercase tracking-[0.16em] text-pine">Reference {status.reference}</p>
        <p className="mt-5 font-sans text-[17px] leading-relaxed text-mute">
          Please note: this demonstration site has no email service connected, so your message hasn&apos;t been sent anywhere. To reach the studio, email{" "}
          <a href={`mailto:${email}`} className="font-medium text-ink underline decoration-pine underline-offset-4">{email}</a>.
        </p>
        <button type="button" onClick={reset} className="mt-8 min-h-12 rounded-full bg-pine px-6 font-sans font-medium text-white transition-colors hover:bg-forest">Write another message</button>
      </motion.div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <div>
        <label htmlFor="contact-name" className={label}>Name *</label>
        <input {...field("name")} value={values.name} autoComplete="name" placeholder="Sofie Hansen" className={input} />
        <FieldError id="contact-name-error" message={errors.name} />
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>Email *</label>
        <input {...field("email")} value={values.email} type="email" autoComplete="email" placeholder="sofie@example.com" className={input} />
        <FieldError id="contact-email-error" message={errors.email} />
      </div>
      <div>
        <label htmlFor="contact-phone" className={label}>Phone <span className="text-mute/60">(optional)</span></label>
        <input {...field("phone")} value={values.phone} type="tel" autoComplete="tel" placeholder="+45 …" className={input} />
        <FieldError id="contact-phone-error" message={errors.phone} />
      </div>
      <div>
        <label htmlFor="contact-projectType" className={label}>Type of project *</label>
        <select {...field("projectType")} value={values.projectType} className={`${input} cursor-pointer`}>
          <option value="" disabled>Choose one</option>
          {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <FieldError id="contact-projectType-error" message={errors.projectType} />
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={label}>Budget</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} checked={values.budget === b} onChange={field("budget").onChange} className="peer sr-only" />
              <span className="inline-flex min-h-11 items-center rounded-full px-4 font-sans text-sm font-light text-ink ring-1 ring-inset ring-ink/20 transition-colors hover:ring-ink peer-checked:bg-pine peer-checked:text-white peer-checked:ring-pine peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pine">{b}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={label}>Tell us about your home *</label>
        <textarea {...field("message")} value={values.message} rows={5} placeholder="The rooms, the light, how you'd like it to feel…" className={`${input} resize-y`} />
        <div className="flex gap-4">
          <FieldError id="contact-message-error" message={errors.message} />
          <span className="ml-auto mt-2 font-sans text-xs text-mute">{values.message.length}/2000</span>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 font-sans text-[15px] leading-relaxed text-mute">
          <input {...field("consent")} type="checkbox" checked={values.consent} className="mt-1 h-5 w-5 shrink-0 accent-pine" />
          I agree that Linnea Studio may contact me about this enquiry.
        </label>
        <FieldError id="contact-consent-error" message={errors.consent} />
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input {...field("company")} value={values.company} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={submitting} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-pine px-8 font-sans text-base font-medium text-white transition-colors duration-500 hover:bg-forest disabled:cursor-wait disabled:opacity-80">
          {submitting ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Send size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />}
          {submitting ? "Sending…" : "Send enquiry"}
        </button>
        {status.state === "error" && <p role="alert" className="font-sans text-sm text-[#a5402a]">{status.message}</p>}
      </div>
    </form>
  );
}
