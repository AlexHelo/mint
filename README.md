# Mint

Licitaciones B2B en orden, hechas en México. Una empresa describe lo que necesita comprar, el Asistente Mint lo convierte en una licitación formal de 11 secciones, sus proveedores aplican con un link y todas las propuestas caen en un tablero comparable.

Dos caras, dos colores: verde mint para las empresas que licitan, índigo para los proveedores. Solo se juntan cuando hay trato cerrado (el gradiente en una propuesta aceptada).

## Estado actual

Mockup clickeable de alta fidelidad, funcional de punta a punta sobre datos demo en MXN (localStorage, sin backend todavía): crear licitación con el asistente, publicar, aplicar como proveedor y mover propuestas en el kanban. El asistente hoy es un guion de 10 preguntas; el real usará el API de Claude (ver roadmap).

## Los docs que importan

Todo el pensamiento del producto vive en `docs/`:

- [`docs/resumen-para-mike.md`](docs/resumen-para-mike.md) - las decisiones en 12 bullets, empieza aquí
- [`docs/estrategia-mexico.md`](docs/estrategia-mexico.md) - wedge, confianza, monetización, plan 90 días
- [`docs/producto-roadmap.md`](docs/producto-roadmap.md) - P0/P1/P2 con implementación concreta y esquema de datos
- [`docs/marca.md`](docs/marca.md) - personalidad, voz es-MX, el sello de folio, el gradiente del trato
- [`docs/landing-brief.md`](docs/landing-brief.md) - el brief con el que se construyó la landing

## Correrlo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + build de producción
```

Corre sobre datos demo sin configurar nada. Para conectar Supabase (fase siguiente): copiar `.env.example` a `.env.local`.

## Rutas

```
/                landing
/app             dashboard de licitaciones (lado empresa)
/tenders/new     crear licitación con el Asistente Mint
/tenders/:id     detalle: kanban de propuestas + documento
/suppliers       portal de proveedores (licitaciones abiertas)
/suppliers/:id   leer el documento y enviar propuesta
```

## Estructura

```
src/
├── pages/
│   ├── Landing.tsx   landing de marketing
│   └── os/           Dashboard, TenderBuilder, TenderDetail, Portal, Apply
├── components/
│   ├── brand/        Folio (el sello de folio, SVG)
│   ├── os/           Shell (sidebar navy)
│   ├── landing/      Reveal
│   └── ui/           Button, Badge, Field
└── lib/              tenders (modelo + seeds), store (estado + localStorage), supabase, utils
```

Stack: React 18 + Vite + TypeScript, Tailwind, React Router, Phosphor. Tokens del sistema en `tailwind.config.ts` (navy #0A1628, mint #00C07A, índigo #2D4CC8, Sora + DM Sans). El store de localStorage se reemplaza por Supabase manteniendo la misma interfaz.

## Siguiente (P0 del roadmap)

1. Supabase: auth con magic link, organizaciones multi-tenant con RLS, migrar el store
2. Asistente real con el API de Claude (tool use que llena las 11 secciones)
3. Invitaciones a proveedores por correo/link y notificaciones (Resend)
4. Export a PDF del documento y cierre automático por fecha

## Pendientes antes de cualquier deploy

El footer de la landing trae `[Razón social pendiente]` y `[correo pendiente]` a propósito: faltan los datos legales reales. Aviso de privacidad y términos también están marcados "en camino".
