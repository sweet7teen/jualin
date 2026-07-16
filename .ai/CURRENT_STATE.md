# Current State

## Project: Belidisini
**Status**: Phase 1 — Foundation (reviewed & hardened)

## What's Done
- pnpm monorepo workspace configured (single lockfile at root, no rogue files)
- NestJS backend (`apps/backend`) — ConfigModule, Swagger at `/api/docs`, ValidationPipe, global prefix `/api/v1`
- Next.js frontend (`apps/web`) — Tailwind CSS v4, App Router, system font stack
- Prisma schema (`packages/database`) — User, BuyerProfile, Store, Subscription, Product, Order, OrderItem, Wishlist + 4 enums
- Docker Compose — MySQL 8, Redis 7, MinIO
- Shared packages: `@belidisini/types`, `@belidisini/config`
- Both apps build successfully
- Root `.gitignore` covers all apps, no per-app duplicates

## Architecture
```
belidisini/
  apps/
    backend/          NestJS API server (port 3001)
    web/              Next.js frontend (port 3000)
  packages/
    database/         Prisma schema + client
    types/            Shared TypeScript types
    config/           Shared constants (plans, API prefix)
  docker-compose.yml  MySQL, Redis, MinIO
```

## Build Commands
- `pnpm install` — install all deps
- `pnpm db:generate` — generate Prisma client (requires network)
- `pnpm db:migrate` — run Prisma migrations
- `pnpm dev` — run backend + frontend in parallel

## Blockers
- Prisma client generation requires network. Run `pnpm db:generate` outside sandbox.
- Frontend uses system font stack (Google Fonts blocked in sandbox).
