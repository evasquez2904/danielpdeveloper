<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# Convenciones de este repo

Una landing de una página. Next 16 · React 19 · Tailwind 4 · pnpm · Vercel.

## Las tres reglas que no se negocian

1. **Ningún componente escribe una cadena visible.** Todo el texto está en
   `src/content/site.ts`. Si hace falta una palabra nueva, va ahí primero.
2. **Ningún componente escribe un color.** `globals.css` vacía la paleta de
   Tailwind (`@theme { --color-*: initial }`), así que `bg-red-500` ni siquiera
   compila. `bg-[#hex]` sí compila y por eso está prohibido a mano.
3. **Solo se animan `transform` y `opacity`.** Las duraciones y los easings
   viven en `src/lib/motion.ts` y en ningún otro sitio.

## Forma

- Ficheros en kebab-case, export nombrado, `interface XProps`.
- `cn()` como último argumento de `className`, para que quien llama pueda pisar.
- Comentarios pocos y solo donde la razón no se lee en el código. Nada de
  narrar historia: eso envejece en el fichero que hay que releer.

## Compuertas, en este orden

```bash
pnpm lint && pnpm typecheck && pnpm build
```

`build` usa un comprobador de tipos indulgente y puede pasar con errores
reales, así que nunca va primero.
