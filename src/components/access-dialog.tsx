"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { site } from "@/content/site";
import { requestAccess } from "@/server/request-access";
import { HONEYPOT, type AccessResult } from "@/lib/access-request";
import { Modal } from "@/components/ui/modal";
import { CtaButton } from "@/components/ui/cta";
import { ArrowRight, Check, Close } from "@/components/ui/icons";
import { veilTransition } from "@/lib/motion";
import { cn, fill } from "@/lib/utils";

const TITLE_ID = "solicitud-de-acceso";

interface AccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AccessDialog({ open, onClose }: AccessDialogProps) {
  const [state, formAction, pending] = useActionState<AccessResult | null, FormData>(
    requestAccess,
    null,
  );

  return (
    <Modal open={open} onClose={onClose} labelledBy={TITLE_ID}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={veilTransition}
        className="w-full sm:w-[620px]"
      >
        {state?.ok ? (
          <Sent result={state} onClose={onClose} />
        ) : (
          <Form action={formAction} pending={pending} state={state} onClose={onClose} />
        )}
      </motion.div>
    </Modal>
  );
}

interface FormProps {
  action: (formData: FormData) => void;
  pending: boolean;
  state: AccessResult | null;
  onClose: () => void;
}

function Form({ action, pending, state, onClose }: FormProps) {
  const { access, projects } = site;
  const errors = state && !state.ok ? state.errors : {};
  const values = state && !state.ok ? state.values : null;

  // `defaultValue` solo se aplica al montar, así que cada intento recibe una
  // clave distinta y los campos vuelven a nacer con lo que el visitante escribió.
  const attempt = values ? JSON.stringify(values) : "nuevo";

  return (
    // `noValidate`: la validación nativa del navegador contesta en inglés y
    // corta antes de llegar al servidor. El esquema zod es el único juez.
    <form action={action} noValidate className="relative border border-edge bg-raised">
      <span className="absolute inset-x-0 top-0 block h-1.5 bg-accent" />

      <div className="p-6 pt-9 md:p-11 md:pt-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="label text-[10px] font-bold text-accent">{access.kicker}</p>
            <h2 id={TITLE_ID} className="display mt-3.5 text-[34px] md:text-[46px]">
              {access.title}
            </h2>
            <p className="mt-3.5 max-w-md text-sm leading-relaxed text-fg-2">{access.body}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={access.close}
            className="flex size-11 shrink-0 items-center justify-center border border-edge text-fg transition-colors duration-150 hover:border-fg-3"
          >
            <Close className="size-4" />
          </button>
        </div>

        <div key={attempt} className="contents">
          <div className="mt-7 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <Field
              name="name"
              field={access.fields.name}
              error={errors.name}
              value={values?.name}
            />
            <Field
              name="email"
              type="email"
              field={access.fields.email}
              error={errors.email}
              value={values?.email}
            />
            <Field
              name="github"
              field={access.fields.github}
              error={errors.github}
              value={values?.github}
              mono
              prefix="@"
            />
            <Field
              name="company"
              field={access.fields.company}
              error={errors.company}
              value={values?.company}
            />
          </div>

          <div className="mt-5">
            <p className="label mb-3 text-[10px] text-fg-3">{access.includedLabel}</p>
            <ul className="flex flex-col gap-2 sm:flex-row">
              {projects.items.map((project) => (
                <li
                  key={project.slug}
                  className="label flex h-12 flex-1 items-center gap-2.5 border border-edge bg-accent-soft px-3.5 text-[11px] text-fg"
                >
                  <Check className="size-3.5 shrink-0 text-accent" />
                  {project.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="label mb-2.5 block text-[10px] text-fg-3">
              {access.fields.message.label}
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              defaultValue={values?.message}
              placeholder={access.fields.message.placeholder}
              className="w-full resize-none border border-edge bg-bg px-3.5 py-3 text-sm leading-relaxed text-fg"
            />
          </div>
        </div>

        <input
          type="text"
          name={HONEYPOT}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="sr-only"
        />

        <CtaButton
          type="submit"
          size="lg"
          disabled={pending}
          className="mt-7 w-full disabled:opacity-70"
        >
          {pending ? access.submitting : access.submit}
          {!pending && <ArrowRight className="size-4" />}
        </CtaButton>

        {errors.form && <Error message={errors.form} center />}

        <p className="mt-3.5 text-center text-xs leading-snug text-fg-3">{access.legal}</p>
      </div>
    </form>
  );
}

interface FieldProps {
  name: string;
  field: { label: string; placeholder: string };
  error?: string;
  value?: string;
  type?: string;
  mono?: boolean;
  prefix?: string;
}

function Field({ name, field, error, value, type = "text", mono, prefix }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="label mb-2.5 block text-[10px] text-fg-3">
        {field.label}
      </label>
      <div
        className={cn(
          "flex h-12 items-center gap-1 border bg-bg px-3.5",
          error ? "border-accent" : "border-edge",
        )}
      >
        {prefix && <span className="font-mono text-sm text-fg-3">{prefix}</span>}
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={value}
          placeholder={field.placeholder}
          aria-invalid={error ? true : undefined}
          className={cn(
            "h-full w-full bg-transparent text-sm text-fg outline-none",
            mono && "font-mono",
          )}
        />
      </div>
      {error && <Error message={error} />}
    </div>
  );
}

function Error({ message, center }: { message: string; center?: boolean }) {
  return (
    <p
      aria-live="polite"
      className={cn("mt-2 text-xs text-accent", center && "text-center")}
    >
      {message}
    </p>
  );
}

interface SentProps {
  result: Extract<AccessResult, { ok: true }>;
  onClose: () => void;
}

function Sent({ result, onClose }: SentProps) {
  const { sent } = site;
  const names = site.projects.items.map((project) => project.name).join(" / ");

  return (
    <div className="flex flex-col bg-accent p-6 text-bg md:p-11">
      <div className="flex items-center gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center bg-bg text-accent">
          <Check className="size-5" />
        </span>
        <span className="label font-bold">{sent.kicker}</span>
      </div>

      <h2 id={TITLE_ID} className="display mt-6 text-[48px] md:text-[72px]">
        {sent.titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>

      <p className="mt-5 text-[15px] leading-relaxed text-accent-ink">
        {fill(sent.body, { email: result.email })}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-bg/30 pt-5">
        <span className="label text-[10px] text-accent-ink">
          {sent.requestedLabel} — {names}
        </span>
        <CtaButton variant="invert" onClick={onClose}>
          {sent.back}
        </CtaButton>
      </div>
    </div>
  );
}
