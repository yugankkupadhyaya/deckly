# Deckly

Deckly is a Next.js (App Router) web app for creating and editing presentation-style slide decks. It combines an authenticated dashboard with a slide editor, AI-assisted outline/layout generation, and subscription gating via Lemon Squeezy.

## 🚀 Project overview

**What you can do in the app (from the code):**
- **Authenticate** with Clerk and access protected routes via middleware + a protected layout.
- **Create and manage projects** stored in Postgres (via Prisma): list all projects, view recent projects, soft-delete to trash, recover, and update slide JSON.
- **Generate presentation outlines and slide layouts with AI** using OpenRouter (via the `openai` SDK configured with an OpenRouter base URL).
- **Edit decks in a drag-and-drop editor** (React DnD) with theme support.
- **Upload images into slides** via Uploadcare’s uploader component.
- **Subscribe** via Lemon Squeezy checkout; the app processes a webhook and marks the user as subscribed in the database.

**What is not present in this repository:**
- **No websocket / realtime server** (no `WebSocket`, `socket.io`, etc. found).
- **No cron/scheduler** jobs found.
- **No REST API surface beyond the webhook**; most app “API” calls are implemented as **Next Server Actions**.

## 🧱 Architecture

Deckly is a **single Next.js application** that contains both the frontend UI and server-side logic (Server Actions + route handlers).

### Request/data flow

- **Browser → Next.js routes (UI)**
  - Pages live under `src/app/` (App Router).
  - Clerk middleware in `src/middleware.ts` protects all routes except a small public allowlist.

- **UI → Server Actions (internal API)**
  - UI components/pages import Server Actions from `src/app/actions/*.ts`.
  - Server Actions run on the server, authenticate via Clerk (`currentUser()`), then read/write data via Prisma.

- **Server Actions / Route Handlers → Prisma → Postgres**
  - Prisma schema: `prisma/schema.prisma`
  - Prisma client singleton: `src/lib/prisma.ts`

- **External integrations**
  - **AI**: OpenRouter via `openai` SDK (`src/app/actions/ai.actions.ts`)
  - **Payments**: Lemon Squeezy API + webhook (`src/app/actions/lemonSqueezy.ts`, `src/app/api/webhook/subscription/route.ts`)
  - **Uploads**: Uploadcare uploader (`src/components/global/editor/components/UploadImage.tsx`)

## ⚙️ Tech stack (from `package.json`)

### App/runtime
- **Next.js** `16.1.6` (App Router, Turbopack for dev/build)
- **React** `19.2.4`
- **TypeScript** `^5.9.3`

### Auth
- **Clerk**: `@clerk/nextjs`, `@clerk/themes`

### Database
- **PostgreSQL** (via Prisma)
- **Prisma**: `prisma` + `@prisma/client`

### UI & state
- **Tailwind CSS** `^4.1.18`
- **Radix UI** components (`@radix-ui/*`, `radix-ui`)
- **Zustand** for state (`zustand`)
- **Framer Motion / Motion**
- **React DnD** (`react-dnd`, `react-dnd-html5-backend`)

### AI
- **OpenAI SDK** (`openai`) configured for **OpenRouter**
- `uuid` for IDs

### Uploads
- **Uploadcare**: `@uploadcare/react-uploader`

### Testing & linting
- **Vitest** + coverage (`vitest`, `@vitest/coverage-v8`)
- **Testing Library** (`@testing-library/react`, `@testing-library/jest-dom`)
- **ESLint** `^9.39.2` + `eslint-config-next`

## 📁 Folder structure

```text
.
├─ src/
│  ├─ app/
│  │  ├─ (auth)/                 # Clerk sign-in/up + callback routes
│  │  ├─ (protected)/            # Authenticated app routes (dashboard/editor/etc.)
│  │  ├─ actions/                # Next Server Actions (DB, AI, payments)
│  │  └─ api/
│  │     └─ webhook/subscription # Lemon Squeezy webhook route handler
│  ├─ components/                # UI components (includes editor + Uploadcare integration)
│  └─ lib/                       # Prisma client, axios client, types, constants, utilities
├─ prisma/
│  ├─ schema.prisma              # DB schema (User, Project, PurchasedProject)
│  └─ migrations/                # Prisma migrations
├─ public/                       # Static assets
├─ next.config.ts                # Next config (`images.unoptimized = true`)
└─ Dockerfile                    # Container build/run instructions
```

## 🔐 Environment variables (extracted from code)

These are the env vars referenced directly by this codebase:

### Database
- **`DATABASE_URL`**: Prisma datasource (`prisma/schema.prisma`)

### AI (OpenRouter)
- **`OPEN_ROUTER_API_KEY`** or **`OPENROUTER_API_KEY`**: OpenRouter auth (`src/app/actions/ai.actions.ts`)

### Uploads (client-side)
- **`NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY`**: Uploadcare uploader public key (`src/components/global/editor/components/UploadImage.tsx`)

### Lemon Squeezy (subscriptions)
- **`LEMON_SQUEEZY_API_KEY`**: API token used to create checkouts (`src/app/actions/lemonSqueezy.ts`)
- **`LEMON_SQUEEZY_STORE_ID`**: store relationship id for checkout creation (`src/app/actions/lemonSqueezy.ts`)
- **`LEMON_SQUEEZY_VARIANT_ID`**: variant relationship id for checkout creation (`src/app/actions/lemonSqueezy.ts`)
- **`LEMON_SQUEEZY_WEBHOOK_SECRET`**: HMAC secret for verifying webhook signature (`src/app/api/webhook/subscription/route.ts`)
- **`NEXT_PUBLIC_HOST_URL`**: used as checkout `redirect_url` base (`src/app/actions/lemonSqueezy.ts`)

### Clerk
Clerk is used throughout the app, but this repository does not reference the Clerk env var names directly via `process.env`. Configure Clerk according to Clerk’s Next.js setup for your environment.

## 📡 API endpoints

This repo defines one HTTP API route handler under `src/app/api/`:

### `POST /api/webhook/subscription`

**Purpose:** Lemon Squeezy webhook to mark a user as subscribed.

**Implementation details (from code):**
- Reads the raw request body and parses JSON.
- Extracts `buyerUserId` from `body.meta.custom_data`.
- Verifies the `X-Signature` header using HMAC SHA-256 with `LEMON_SQUEEZY_WEBHOOK_SECRET`.
- On success, updates `User.subscription = true` for that user id.

> Note: Most application operations (project CRUD, AI generation) are implemented as **Server Actions** under `src/app/actions/` rather than REST endpoints.

## 🧪 Local setup

### Prerequisites
- Node.js 20+ recommended (Dockerfile uses Node 20)
- A Postgres database (local or hosted)

### Install

The repo uses `pnpm` in Docker, but you can run the scripts with your preferred package manager.

```bash
pnpm install
```

### Configure environment

Create `.env` (or `.env.local`) and set the env vars listed in the **Environment variables** section above (at minimum `DATABASE_URL` and Clerk credentials).

### Database

Prisma client generation runs on install via:
- `postinstall`: `prisma generate`

To apply migrations locally (migrations exist under `prisma/migrations/`):

```bash
pnpm prisma migrate dev
```

### Run

```bash
pnpm dev
```

### Tests

```bash
pnpm test
```

### Lint

```bash
pnpm lint
```

## 🌍 Deployment

### Docker (included)

Build and run:

```bash
docker build -t deckly .
docker run --rm -p 3000:3000 --env-file .env deckly
```

**Production notes:**
- Ensure **all required env vars** are set for runtime (DB, Clerk, OpenRouter, Lemon Squeezy, Uploadcare).
- Run Prisma migrations against your production database as part of your release process (this repo ships migrations under `prisma/migrations/`).
- `next.config.ts` sets `images.unoptimized = true`, which affects Next’s image optimization pipeline.

## 🧠 Key engineering decisions (observed)

- **Server Actions over REST**: The app uses Server Actions (`src/app/actions/*`) as the primary server-side interface for authenticated operations.
- **Auth at the edge + server**: Clerk middleware protects routes early; `src/app/(protected)/layout.tsx` also enforces authentication before rendering protected pages.
- **Prisma client singleton**: `src/lib/prisma.ts` uses a `globalThis.prisma` singleton pattern to avoid creating too many connections during dev/hot reload.
- **Subscription flagging via webhook**: Lemon Squeezy webhook updates a boolean `subscription` on `User`.

## 🚀 Future improvements (based on current code)

- **Webhook payload robustness**: webhook handler assumes `body.meta.custom_data` shape; add stronger validation and better error responses.
- **Fix signature comparison**: current code compares hex digest bytes to header bytes; consider validating against the expected encoding/format from Lemon Squeezy to avoid false negatives/positives.
- **Reduce sensitive logging**: `buySubscription` logs store/variant ids and emits console logs in server code; consider structured logging with redaction.
- **API surface clarity**: if external clients are expected, add dedicated route handlers (or document server actions as internal-only).
- **Type safety & cleanup**: `src/app/actions/project.ts` contains unused/incorrect imports (e.g., `redirect` from `next/dist/server/api-utils`, `use` from `react`, `fs` import) that can be removed to reduce confusion.

## License

This repository does not include a license file. Add one (e.g. MIT/Apache-2.0) if you intend to open-source it.
