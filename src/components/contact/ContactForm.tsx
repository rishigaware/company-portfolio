"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { products } from "@/data/products";
import { downloads, services, solutions } from "@/data/offerings";

const initial: ContactState = { ok: false, message: "" };

function Field({ name, label, type = "text", error, textarea, defaultValue }: { name: string; label: string; type?: string; error?: string; textarea?: boolean; defaultValue?: string }) {
  const cls = `peer w-full rounded-2xl border bg-snow/[0.03] px-5 pb-3 pt-7 outline-none transition-colors placeholder-transparent focus:border-teal ${error ? "border-red-400" : "border-line"}`;
  return (
    <motion.div className="relative" variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
      {textarea ? (
        <textarea id={name} name={name} rows={5} placeholder={label} className={cls} aria-invalid={!!error} defaultValue={defaultValue} />
      ) : (
        <input id={name} name={name} type={type} placeholder={label} className={cls} aria-invalid={!!error} />
      )}
      <label htmlFor={name} className="pointer-events-none absolute left-5 top-2 text-xs text-mist transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal">
        {label}
      </label>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </motion.div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const params = useSearchParams();
  const product = params.get("product") ?? "";
  const type = params.get("type") === "demo" ? "demo" : "quote";
  // Prefill the message when arriving from a part, document, service or solution link.
  const part = params.get("part");
  const download = downloads.find((d) => d.slug === params.get("download"));
  const service = services.find((x) => x.slug === params.get("service"));
  const solution = solutions.find((x) => x.slug === params.get("solution"));
  const prefill = [
    part && `I'd like a quote for part no. ${part}.`,
    download && `Please send me: ${download.title}.`,
    service && `I'm interested in your ${service.name} service.`,
    solution && `Please send a proposal for the ${solution.name} solution.`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AnimatePresence mode="wait">
      {state.ok ? (
        <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center rounded-2xl border border-line bg-ink-2 p-12 text-center" role="status">
          <svg viewBox="0 0 52 52" className="h-20 w-20">
            <motion.circle cx="26" cy="26" r="24" fill="none" stroke="#2dd4bf" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
            <motion.path d="M15 27 l7 7 l15 -15" fill="none" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
          </svg>
          <p className="mt-6 text-xl">{state.message}</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          action={action}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="space-y-5 rounded-2xl border border-line bg-ink-2 p-6 md:p-10"
          noValidate
        >
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <motion.fieldset variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }} className="flex gap-3">
            <legend className="sr-only">Enquiry type</legend>
            {["quote", "demo", "support"].map((t) => (
              <label key={t} className="cursor-pointer">
                <input type="radio" name="type" value={t} defaultChecked={t === type} className="peer sr-only" />
                <span className="block rounded-full border border-line px-4 py-2 text-sm capitalize transition-colors peer-checked:border-teal peer-checked:bg-teal peer-checked:text-ink">
                  {t}
                </span>
              </label>
            ))}
          </motion.fieldset>
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="name" label="Full name" error={state.errors?.name} />
            <Field name="email" label="Work email" type="email" error={state.errors?.email} />
          </div>
          <Field name="company" label="Company" />
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
            <label htmlFor="product" className="mb-2 block text-sm text-mist">Product of interest</label>
            <select id="product" name="product" defaultValue={product} className="w-full rounded-2xl border border-line bg-ink-3 px-5 py-4 outline-none focus:border-teal">
              <option value="">Not sure yet</option>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name} ({p.category})</option>
              ))}
            </select>
          </motion.div>
          <Field name="message" label="How can we help?" textarea error={state.errors?.message} defaultValue={prefill || undefined} />
          {state.message && !state.ok && <p className="text-sm text-red-400" role="alert">{state.message}</p>}
          <motion.button
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            whileTap={{ scale: 0.97 }}
            disabled={pending}
            className="w-full rounded-full bg-teal py-4 font-medium text-ink transition-opacity disabled:opacity-60"
          >
            {pending ? "Sending…" : "Send enquiry"}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
