# Current State

## Project: Belidisini
**Status**: Phase 4 — Product Management (completed, audited)

## What's Done
- pnpm monorepo workspace configured
- NestJS backend with ConfigModule, typed config layer, Swagger, ValidationPipe, global prefix `/api/v1`
- Next.js frontend with Tailwind CSS v4, App Router, system font stack
- Docker Compose — MySQL 8, Redis 7, MinIO
- Shared packages: `@belidisini/types`, `@belidisini/config`
- Auth module — register, login, refresh, getProfile (JWT, bcrypt, RBAC)
- Common guards/decorators — JwtAuthGuard, RolesGuard, @Roles, @CurrentUser, JwtStrategy
- Store module — CRUD with slug-based routing, ownership enforcement, seller-only creation
- **Product module** — CRUD with per-store slug uniqueness, subscription gating, image JSON storage, runtime subscription visibility

## Product Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/stores/:storeId/products` | Owner | Create product |
| `GET` | `/api/v1/stores/:storeId/products` | Public | List active products (visibility gated by subscription) |
| `GET` | `/api/v1/stores/:storeSlug/products/:productSlug` | Public | Get product by slugs (visibility gated by subscription) |
| `PATCH` | `/api/v1/products/:id` | Owner | Update product |
| `DELETE` | `/api/v1/products/:id` | Owner | Archive product |

## Subscription Visibility Rule
Public product visibility requires BOTH conditions:
- `Product.status === 'ACTIVE'`
- Store subscription `status === 'ACTIVE'` AND `endDate > now`

If subscription is expired/inactive:
- Collection endpoints return empty `data: []`
- Single-product endpoints return 404

Product status (DRAFT/ACTIVE/ARCHIVED) is independent of subscription lifecycle.

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
See `.ai/BACKLOG.md` for deferred improvements.

## Blockers
- Prisma migrations require MySQL connection. Run `pnpm db:migrate` outside sandbox.
- Frontend uses system font stack (Google Fonts blocked in sandbox).
