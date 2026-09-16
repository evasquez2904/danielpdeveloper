"use server";

import { Resend } from "resend";
import { site } from "@/content/site";
import {
  accessRequestSchema,
  HONEYPOT,
  readValues,
  type AccessRequest,
  type AccessResult,
  type FieldErrors,
} from "@/lib/access-request";

// `onboarding@resend.dev` entrega solo a la dirección de la cuenta de Resend,
// y el único destinatario es el dueño del sitio. Por eso no hace falta dominio.
const FROM = "Landing <onboarding@resend.dev>";

export async function requestAccess(
  _previous: AccessResult | null,
  formData: FormData,
): Promise<AccessResult> {
  // Un bot rellena el campo trampa. Le contestamos que sí y no enviamos nada.
  if (formData.get(HONEYPOT)) {
    return { ok: true, email: "", repos: [] };
  }

  const values = readValues(formData);
  const parsed = accessRequestSchema.safeParse({
    ...values,
    message: values.message || undefined,
  });

  if (!parsed.success) {
    const errors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in errors)) {
        errors[field as keyof FieldErrors] = issue.message;
      }
    }
    return { ok: false, errors, values };
  }

  const request = parsed.data;
  const delivered = await deliver(request);

  return delivered
    ? { ok: true, email: request.email, repos: request.repos }
    : { ok: false, errors: { form: site.access.errors.failed }, values };
}

async function deliver(request: AccessRequest): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ACCESS_REQUEST_TO;
  const body = compose(request);

  // Sin clave el correo se imprime: basta para recorrer el flujo en local.
  if (!apiKey || !to) {
    console.info(`\n[solicitud de acceso]\n${body}\n`);
    return true;
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM,
    to: [to],
    replyTo: request.email,
    subject: `Acceso: ${request.name} — ${request.company}`,
    text: body,
  });

  if (error) {
    console.error("[solicitud de acceso] Resend:", error);
    return false;
  }

  return true;
}

function compose(request: AccessRequest): string {
  const wanted = site.projects.items.filter((project) =>
    request.repos.includes(project.slug),
  );

  const commands = wanted
    .map(
      (project) =>
        `gh api -X PUT repos/${project.repo}/collaborators/${request.github} -f permission=pull`,
    )
    .join("\n");

  return [
    `${request.name} — ${request.company}`,
    `${request.email} · github.com/${request.github}`,
    "",
    request.message ? `"${request.message}"\n` : "",
    `Pide: ${wanted.map((project) => project.name).join(", ")}`,
    "",
    "Para darle acceso de lectura:",
    commands,
  ]
    .filter((line) => line !== "")
    .join("\n");
}
