# Current State

## Project: Belidisini
**Status**: Foundation bootstrapped

## What's Done
- pnpm monorepo workspace configured
- NestJS backend (`apps/backend`) scaffolded with ConfigModule, Swagger, ValidationPipe, global prefix `/api/v1`
- Next.js frontend (`apps/web`) scaffolded with Tailwind CSS, App Router
- Prisma schema (`packages/database`) with full ERD: User, BuyerProfile, Store, Subscription, Product, Order, OrderItem, Wishlist + enums
- Docker Compose for MySQL 8, Redis 7, MinIO (S3-compatible)
- Shared packages: `@belidisini/types`, `@belidisini/config`
- Both apps build successfully

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
- Prisma client generation requires network (blocked in sandbox). Run `pnpm db:generate` after first install.
- Google Fonts blocked in sandbox. Layout uses system font stack.
