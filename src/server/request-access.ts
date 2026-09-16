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
    return { ok: true, email: "" };
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
    ? { ok: true, email: request.email }
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

// Una solicitud son los tres repos, así que cada comando es una línea sola que
// los recorre — pegar tres veces era la parte manual que sobraba.
function compose(request: AccessRequest): string {
  const repos = site.projects.items.map((project) => project.repo).join(" ");
  const loop = (verb: string) =>
    `for r in ${repos}; do gh api -X ${verb} repos/$r/collaborators/${request.github}${
      verb === "PUT" ? " -f permission=pull" : ""
    }; done`;

  return [
    `${request.name} — ${request.company}`,
    `${request.email} · github.com/${request.github}`,
    request.message ? `\n"${request.message}"` : "",
    "\nDarle lectura a los tres:",
    loop("PUT"),
    "\nRevocar cuando cierre el proceso:",
    loop("DELETE"),
  ]
    .filter((line) => line !== "")
    .join("\n");
}
