import { z } from "zod";
import { site } from "@/content/site";

const messages = site.access.errors;

// GitHub: alfanumérico y guiones, sin guion inicial ni final, 39 como máximo.
const githubUsername = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;

export const accessRequestSchema = z.object({
  name: z.string().trim().min(2, messages.name),
  email: z.email(messages.email),
  github: z.string().trim().regex(githubUsername, messages.github),
  company: z.string().trim().min(2, messages.company),
  message: z.string().trim().max(1000).optional(),
});

export type AccessRequest = z.infer<typeof accessRequestSchema>;

export type FieldErrors = Partial<Record<keyof AccessRequest | "form", string>>;

/** React vacía el formulario al despachar la acción: hay que devolverlo lleno. */
export type SubmittedValues = Record<
  "name" | "email" | "github" | "company" | "message",
  string
>;

export type AccessResult =
  | { ok: true; email: string }
  | { ok: false; errors: FieldErrors; values: SubmittedValues };

export function readValues(formData: FormData): SubmittedValues {
  const text = (field: string) => String(formData.get(field) ?? "");
  return {
    name: text("name"),
    email: text("email"),
    github: text("github"),
    company: text("company"),
    message: text("message"),
  };
}

/** El campo trampa: un bot lo rellena, una persona no lo ve. */
export const HONEYPOT = "website";
