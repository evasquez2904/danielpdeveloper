# danielpdeveloper

Landing de una página: tres sistemas en producción, sus credenciales de demo y
un formulario para que un entrevistador pida acceso a los repos privados.

```bash
pnpm install
pnpm dev
```

Queda en http://localhost:3000. Sin `.env` funciona todo: la solicitud de
acceso se imprime por consola en vez de enviarse.

## Cambiar un texto

**Todo el texto vive en [`src/content/site.ts`](src/content/site.ts).** Ningún
componente escribe una cadena. Los marcadores pendientes están entre corchetes
al principio del fichero — `[CIUDAD]`, `[TU CORREO]`, las credenciales de demo.

Cada proyecto es un objeto que alimenta tres vistas a la vez: la fila, la ficha
y la casilla del formulario. Añadir un cuarto proyecto es añadir un objeto; no
se toca ningún componente.

## Color

Los tokens de [`globals.css`](src/app/globals.css) son los únicos colores que
compilan: `@theme { --color-*: initial }` vacía la paleta de Tailwind, así que
`bg-red-500` no existe. Lo que esa línea no cubre es `bg-[#hex]`.

Contraste verificado sobre el fondo: hueso 17,7:1 · gris-2 7,8:1 · gris-3
5,5:1 · bermellón 5,6:1 · ácido 16,4:1. Sobre bermellón el texto es siempre
tinta.

## Movimiento

La tabla entera está en [`src/lib/motion.ts`](src/lib/motion.ts) y solo ahí.
`src/components/motion-primitives.tsx` decide en un único sitio qué pasa con
`prefers-reduced-motion`. Se animan `transform` y `opacity`; nada más.

## Compuertas

En este orden, porque `build` usa un comprobador de tipos indulgente:

```bash
pnpm verify
```

## Entorno

`RESEND_API_KEY` y `ACCESS_REQUEST_TO`, descritas en
[`.env.example`](.env.example).

## Pendiente

- Sin tests. Es el hueco conocido, no un descuido.
- La fila 03 lleva `[URL DE PRODUCCIÓN]`: Jobs & Tools aún no responde.
- Terremoto enseña una IP con `nip.io` en vez de un subdominio con TLS propio.
