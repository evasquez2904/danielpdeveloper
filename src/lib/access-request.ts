import { z } from "zod";
import { site } from "@/content/site";

const slugs = site.projects.items.map((project) => project.slug) as [string, ...string[]];
const messages = site.access.errors;

// GitHub: alfanumérico y guiones, sin guion inicial ni final, 39 como máximo.
const githubUsername = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;

export const accessRequestSchema = z.object({
  name: z.string().trim().min(2, messages.name),
  email: z.email(messages.email),
  github: z.string().trim().regex(githubUsername, messages.github),
  company: z.string().trim().min(2, messages.company),
  repos: z.array(z.enum(slugs)).min(1, messages.repos),
  message: z.string().trim().max(1000).optional(),
});

export type AccessRequest = z.infer<typeof accessRequestSchema>;

export type FieldErrors = Partial<Record<keyof AccessRequest | "form", string>>;

/** React vacía el formulario al despachar la acción: hay que devolverlo lleno. */
export interface SubmittedValues {
  name: string;
  email: string;
  github: string;
  company: string;
  message: string;
  repos: readonly string[];
}

export type AccessResult =
  | { ok: true; email: string; repos: readonly string[] }
  | { ok: false; errors: FieldErrors; values: SubmittedValues };

export function readValues(formData: FormData): SubmittedValues {
  const text = (field: string) => String(formData.get(field) ?? "");
  return {
    name: text("name"),
    email: text("email"),
    github: text("github"),
    company: text("company"),
    message: text("message"),
    repos: formData.getAll("repos").map(String),
  };
}

/** El campo trampa: un bot lo rellena, una persona no lo ve. */
export const HONEYPOT = "website";
