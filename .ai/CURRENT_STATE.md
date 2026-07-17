# Current State

## Project: Belidisini
**Status**: Phase 3 — Store Management (completed, audited)

## What's Done
- pnpm monorepo workspace configured
- NestJS backend with ConfigModule, typed config layer, Swagger, ValidationPipe, global prefix `/api/v1`
- Next.js frontend with Tailwind CSS v4, App Router, system font stack
- Prisma schema — User, BuyerProfile, Store, Subscription, Product, Order, OrderItem, Wishlist, RefreshToken + enums
- Docker Compose — MySQL 8, Redis 7, MinIO
- Shared packages: `@belidisini/types`, `@belidisini/config`
- Auth module — register, login, refresh, getProfile (JWT, bcrypt, RBAC)
- Common guards/decorators — JwtAuthGuard, RolesGuard, @Roles, @CurrentUser, JwtStrategy
- **Store module** — CRUD with slug-based routing, ownership enforcement, seller-only creation

## Store Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/stores` | `@Roles(SELLER)` | Create store |
| `GET` | `/api/v1/stores` | Public | List active stores |
| `GET` | `/api/v1/stores/:slug` | Public | Get store by slug |
| `PATCH` | `/api/v1/stores/:id` | Owner only | Update store |
| `DELETE` | `/api/v1/stores/:id` | Owner only | Deactivate store |

## Architecture
```
belidisini/
  apps/
    backend/          NestJS API server (port 3001)
    web/              Next.js frontend (port 3000)
  packages/
    database/         Prisma schema + client
    types/            Shared TypeScript types
    config/           Shared constants
  docker-compose.yml  MySQL, Redis, MinIO
```

## Configuration Layer
```
apps/backend/src/config/
  app.config.ts, jwt.config.ts, auth.config.ts, swagger.config.ts,
  cors.config.ts, pagination.config.ts, storage.config.ts, redis.config.ts
```

## Backlog
See `.ai/BACKLOG.md` for deferred improvements (slug validation, ownership abstraction, rate limiting, Redis caching, etc.).

## Blockers
- Prisma migrations require MySQL connection. Run `pnpm db:migrate` outside sandbox.
- Frontend uses system font stack (Google Fonts blocked in sandbox).
