# Mint

B2B tech bidding platform for Mexico. Companies post technology projects (RFPs / *licitaciones*), validated suppliers apply, the company picks one. A conversational AI turns "describe your project" into a structured RFP.

Product and architecture docs live in the Agentic-Docs repo under `Mint/`. This README is the codebase entry point.

## Stack

React 18 + Vite 5 + TypeScript, Tailwind 3, React Router. Phosphor icons, Motion for reveals. Supabase client is wired and ready (auth + tables land next). Per the team playbook: Supabase for data/auth/storage, Railway for hosting, Claude for the agent.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

The app runs on **mock data** out of the box (see `src/data/mock.ts`). To connect Supabase, copy `.env.example` to `.env.local` and fill in the keys.

## What's built (this pass)

UI + routing for the two marketplace flows, on mock data. No auth yet.

```
/                  landing (hero, two-audience split, closing CTA)
/cliente           RFP-builder chat (scripted mock of the Claude agent)
/cliente/registro  company onboarding
/cliente/panel     client dashboard: my RFP + interested suppliers
/proveedor         supplier onboarding (company + specialties)
/proveedor/panel   supplier dashboard: matched RFPs + apply flow
```

## Structure

```
src/
├── pages/            route-level screens (client/, supplier/)
├── components/
│   ├── ui/           Button, Badge, Field (Mint-themed primitives)
│   ├── site/         Navbar, Footer, Logo, AppShell
│   ├── landing/      Hero, TwoAudiences, ClosingCta, Reveal
│   ├── client/       RfpBuilderChat, ProposalCard
│   └── RfpCard.tsx   shared: hero visual + supplier dashboard
├── lib/              utils (cn, formatMXN), types, supabase client
└── data/             mock fixtures
```

Component → hook → service → Supabase is the target data path (services layer lands with auth). For now pages read from `src/data`.

## Design

Light, editorial. White canvas, navy ink, the green→navy gradient reserved for the hero card, closing CTA, and footer. Mint green is the client world, navy/indigo is the supplier world, and they never mix inside the same interactive component. On white, accents use the darker `mint-ink` / `supplier` so they stay legible; the lighter variants only appear on the dark gradient surfaces. The hero visual is the RFP-papers illustration (`src/assets/rfp-papers.avif`), which sits on the dark card because it's white-on-transparent. Tokens live in `tailwind.config.ts`, fonts are Sora (display) + DM Sans (body).

## Next

1. Supabase Auth + `companies`/`profiles` tables with RLS for marketplace visibility
2. Services layer, swap mock data for real queries
3. The `rfp-builder` Edge Function (Claude Sonnet 4.6) behind the chat
4. Deploy to Railway
