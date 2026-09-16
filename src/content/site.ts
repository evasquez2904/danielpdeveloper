// Todo el texto de la página vive aquí. Ningún componente escribe una cadena.
//
// PENDIENTE — los corchetes son marcadores. Búscalos con [ y reemplázalos:
//   identity.city · identity.email · identity.linkedin
//   projects.items[0].demo.email · .demo.password      (SGAU)
//   projects.items[2].url · .demo.email · .demo.password  (Jobs & Tools)

/** Los anclajes de las tres secciones. La navegación los reutiliza. */
export const sectionIds = {
  projects: "proyectos",
  method: "metodo",
  contact: "contacto",
} as const;

export const site = {
  // ─── Identidad ──────────────────────────────────────────────────────────
  identity: {
    name: "Daniel Vazquez",
    role: "Senior fullstack",
    city: "[CIUDAD]",
    email: "[TU CORREO]",
    github: "evasquez2904",
    linkedin: "[USUARIO LINKEDIN]",
  },

  // ─── Metadatos y SEO ────────────────────────────────────────────────────
  meta: {
    title: "Daniel Vazquez — Senior fullstack",
    description:
      "Tres sistemas en producción: padrón universitario, identificación en desastres y activos en obra. Demos abiertas con credenciales.",
    url: "https://danielpdeveloper.vercel.app",
    locale: "es",
  },

  // ─── Cabecera ───────────────────────────────────────────────────────────
  nav: {
    links: [
      { label: "Proyectos", href: `#${sectionIds.projects}` },
      { label: "Método", href: `#${sectionIds.method}` },
      { label: "Contacto", href: `#${sectionIds.contact}` },
    ],
    cta: "Solicitar acceso",
  },

  // ─── Hero ───────────────────────────────────────────────────────────────
  hero: {
    // La ciudad se inserta donde diga {city}.
    eyebrow: "Senior fullstack — TypeScript — {city}",
    titleLines: ["Sistemas", "que no pueden"],
    titleHighlight: "mentir",
    body: "Tres sistemas en producción: padrón universitario, identificación en desastres y activos en obra. Entra en los tres ahora con credenciales de demo. Los repos son privados — pide acceso y te lo doy el mismo día.",
    ctaPrimary: "Pedir acceso",
    ctaSecondary: "Ver los demos",
  },

  // ─── Marquesina ─────────────────────────────────────────────────────────
  marquee: [
    "TypeScript",
    "Postgres",
    "Drizzle",
    "tRPC",
    "Next.js",
    "Expo",
    "Docker",
    "pgvector",
    "BullMQ",
  ],

  // ─── Proyectos ──────────────────────────────────────────────────────────
  // Cada objeto alimenta tres vistas: la fila, la ficha y la casilla del
  // formulario. Añadir un cuarto proyecto es añadir un objeto aquí.
  projects: {
    label: "01 / Proyectos",
    hint: "Pulsa una fila — ficha y credenciales",
    liveLabel: "En vivo",
    items: [
      {
        slug: "sgau",
        index: "01",
        name: "SGAU",
        domain: "Sector público · Nómina",
        host: "Vercel",
        repo: "evasquez2904/universities",
        url: "https://universities-one.vercel.app",
        urlLabel: "universities-one.vercel.app",
        summary:
          "Padrón de asegurados de las universidades nacionales. Detecta doble asegurabilidad y cierra el período mes a mes.",
        stack: ["Next 16", "tRPC", "Drizzle", "Base UI", "Better Auth", "Postgres"],
        brief: {
          problem: [
            "Cada universidad nacional lleva su propio padrón de asegurados, y la misma persona puede estar dada de alta en dos a la vez sin que ninguna de las dos lo sepa. El Ministerio lo descubre al consolidar, cuando ya se pagó.",
            "SGAU cierra el período institución por institución, detecta la doble asegurabilidad en el momento del alta y emite los reportes de movimientos que el Ministerio recibe.",
          ],
          decision:
            "Sin SMTP en producción el envío lanza una excepción, a propósito: un usuario que no recibe su enlace de activación queda fuera del sistema sin forma de entrar, y eso no puede parecer un éxito. Pero la operación de negocio no se revierte — el usuario queda creado, la interfaz avisa de que el correo no salió y el fallo queda en la auditoría.",
        },
        demo: {
          email: "[CORREO DEMO RRHH]",
          password: "[CONTRASEÑA DEMO]",
          note: "Rol de RRHH, con alcance limitado a sus universidades.",
        },
      },
      {
        slug: "terremoto",
        index: "02",
        name: "Terremoto",
        domain: "Respuesta a desastres",
        host: "Hetzner · Dokploy",
        repo: "evasquez2904/terremoto",
        url: "https://188.34.162.40.nip.io",
        urlLabel: "188.34.162.40.nip.io",
        summary:
          "Fuente única de verdad para identificar personas tras un desastre: ingesta multi-fuente, deduplicación y búsqueda facial en campo.",
        stack: ["Next 15", "tRPC", "pgvector", "BullMQ", "Redis", "Python", "Docker"],
        brief: {
          problem: [
            "Tras un desastre, quién está dónde llega por cinco canales a la vez: brigadas en campo, call center, hospitales, registros oficiales y avisos ciudadanos. Cada canal crea su propia ficha de la misma persona, y nadie sabe cuál es la buena.",
            "Terremoto es la fuente única: ingesta lo que llega, deduplica por identidad y por rostro, y deja que brigada, moderación y call center trabajen sobre el mismo caso sin pisarse.",
          ],
          decision:
            "El end-to-end no corre contra el servidor de desarrollo: corre contra el mismo server.js standalone que arranca el contenedor en producción. Y los 68 procedures del router están atados a su guard en una tabla que se compara contra la superficie real — un procedure nuevo sin guard rompe la compuerta antes de llegar a revisión.",
        },
        demo: {
          email: "moderador@demo.terremoto.local",
          password: "Demo2026!",
          note: "Rol acotado, sin administración. La base se resiembra cada noche.",
        },
      },
      {
        slug: "jobs-and-tools",
        index: "03",
        name: "Jobs & Tools",
        domain: "Construcción · Offline",
        host: "EAS Hosting",
        repo: "evasquez2904/kasaprop-expo-showcase",
        url: "[URL DE PRODUCCIÓN]",
        urlLabel: "[URL DE PRODUCCIÓN]",
        summary:
          "Activos y herramienta en obra, sin cobertura. El teléfono es la fuente de la verdad hasta que el servidor la confirme.",
        stack: ["Expo 57", "SQLite", "Neon", "tRPC", "Drizzle", "EAS"],
        brief: {
          problem: [
            "Son las 7:02. Luis baja al sótano a fichar y el móvil tiene una raya que se va. A las 9:38 pasa la sierra a un subcontratista. A las 11:20 sube seis fotos del parte. A las 13:00 sale y por fin le entra red.",
            "Una app normal falla tres veces esa mañana: enseña un spinner al fichar, dice «enviando» cuando no hay a dónde enviar, y pierde las fotos al cerrarse. Ésta contesta las tres igual — la cola vive en SQLite en el teléfono y el botón dice Guardar, no Enviar, porque guardar es lo que hace.",
          ],
          decision:
            "El fichaje sin red es dinero, así que no se puede confiar en Date.now(): un móvil con la hora cambiada son horas cobradas de más. El reloj del dispositivo se contrasta contra una referencia monótona y el servidor sella la hora al confirmar.",
        },
        demo: {
          email: "[CORREO DEMO]",
          password: "[CONTRASEÑA DEMO]",
          note: "Empresa de demostración con catálogo sembrado.",
        },
      },
    ],
  },

  // ─── Método ─────────────────────────────────────────────────────────────
  method: {
    label: "02 / Método",
    items: [
      {
        title: "El estado del teléfono manda",
        body: "En obra no hay cobertura. La cola vive en SQLite local y el servidor confirma después. La app nunca dice una palabra que no sea cierta.",
      },
      {
        title: "Una compuerta que no se salta",
        body: "Once comprobaciones encadenadas antes de cada despliegue. Un procedure nuevo sin su guard rompe la compuerta y no entra.",
      },
      {
        title: "El fallo se ve, no se traga",
        body: "Si el correo no sale, la operación no se revierte: el usuario lo ve, puede reenviarlo, y el fallo queda en la auditoría.",
      },
    ],
  },

  // ─── Contacto ───────────────────────────────────────────────────────────
  contact: {
    title: "¿Quieres leer el código?",
    body: "Acceso de solo lectura a los tres repos. Lo concedo el mismo día y lo revoco cuando cierres el proceso.",
    cta: "Solicitar acceso",
  },

  // ─── Pie ────────────────────────────────────────────────────────────────
  footer: {
    copyright: "© 2026",
    colophon: "Next.js — Motion — Vercel",
  },

  // ─── Ficha de proyecto ──────────────────────────────────────────────────
  dialog: {
    close: "Cerrar ficha",
    escHint: "Esc para cerrar",
    problemLabel: "El problema",
    decisionLabel: "La decisión que no se ve",
    demoLabel: "Demo en vivo",
    credentialsLabel: "Credenciales",
    stackLabel: "Stack",
    copyEmail: "Copiar correo",
    copyPassword: "Copiar contraseña",
    copied: "Copiado",
    cta: "Pedir acceso al repo",
  },

  // ─── Formulario de acceso ───────────────────────────────────────────────
  access: {
    kicker: "Acceso a los repos",
    title: "Dime quién eres",
    body: "Una solicitud, los tres repos. Necesito tu usuario de GitHub para invitarte como colaborador — lectura, el mismo día.",
    close: "Cerrar formulario",
    includedLabel: "Te doy acceso a",
    fields: {
      name: { label: "Nombre y apellido", placeholder: "Ana Ruiz" },
      email: { label: "Correo de empresa", placeholder: "ana@empresa.com" },
      github: { label: "Usuario de GitHub", placeholder: "anaruiz" },
      company: { label: "Empresa y rol", placeholder: "Acme — Tech lead" },
      message: {
        label: "Mensaje — opcional",
        placeholder: "Qué puesto es, o qué te gustaría que te enseñe en la llamada.",
      },
    },
    submit: "Enviar solicitud",
    submitting: "Enviando…",
    legal:
      "Solo uso tus datos para darte acceso. El permiso es de lectura y lo revoco cuando cierres el proceso.",
    errors: {
      name: "Escribe tu nombre.",
      email: "Ese correo no parece válido.",
      github: "Hace falta tu usuario de GitHub para poder invitarte.",
      company: "Dime de dónde vienes.",
      failed: "No se pudo enviar. Escríbeme directo mientras lo reviso.",
    },
  },

  // ─── Confirmación ───────────────────────────────────────────────────────
  sent: {
    kicker: "Recibido",
    titleLines: ["Solicitud", "enviada"],
    // {email} se reemplaza por el correo que escribió el solicitante.
    body: "Te llegan las invitaciones de GitHub a {email} hoy mismo. Si no aparecen, mira en spam o escríbeme directo.",
    requestedLabel: "Acceso a",
    back: "Volver",
  },
} satisfies Site;

// ─────────────────────────────────────────────────────────────────────────
// La forma. Editar arriba; esto solo comprueba que no falte nada.
// ─────────────────────────────────────────────────────────────────────────

export interface Project {
  slug: string;
  index: string;
  name: string;
  domain: string;
  host: string;
  repo: string;
  url: string;
  urlLabel: string;
  summary: string;
  stack: readonly string[];
  brief: { problem: readonly string[]; decision: string };
  demo: { email: string; password: string; note: string };
}

interface Labelled {
  label: string;
}

interface Site {
  identity: Record<"name" | "role" | "city" | "email" | "github" | "linkedin", string>;
  meta: Record<"title" | "description" | "url" | "locale", string>;
  nav: { links: readonly { label: string; href: string }[]; cta: string };
  hero: Record<
    "eyebrow" | "body" | "ctaPrimary" | "ctaSecondary" | "titleHighlight",
    string
  > & { titleLines: readonly string[] };
  marquee: readonly string[];
  projects: Labelled & { hint: string; liveLabel: string; items: readonly Project[] };
  method: Labelled & { items: readonly { title: string; body: string }[] };
  contact: Record<"title" | "body" | "cta", string>;
  footer: Record<"copyright" | "colophon", string>;
  dialog: Record<
    | "close"
    | "escHint"
    | "problemLabel"
    | "decisionLabel"
    | "demoLabel"
    | "credentialsLabel"
    | "stackLabel"
    | "copyEmail"
    | "copyPassword"
    | "copied"
    | "cta",
    string
  >;
  access: {
    kicker: string;
    title: string;
    body: string;
    close: string;
    includedLabel: string;
    fields: {
      name: Field;
      email: Field;
      github: Field;
      company: Field;
      message: Field;
    };
    submit: string;
    submitting: string;
    legal: string;
    errors: Record<"name" | "email" | "github" | "company" | "failed", string>;
  };
  sent: Record<"kicker" | "body" | "requestedLabel" | "back", string> & {
    titleLines: readonly string[];
  };
}

interface Field {
  label: string;
  placeholder: string;
}
