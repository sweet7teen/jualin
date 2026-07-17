# Current State

## Project: Belidisini
**Status**: Phase 2 — Authentication & Authorization (completed, audited, config hardened)

## What's Done
- pnpm monorepo workspace configured (single lockfile at root, no rogue files)
- NestJS backend (`apps/backend`) — ConfigModule, Swagger at `/api/docs`, ValidationPipe, global prefix `/api/v1`
- Next.js frontend (`apps/web`) — Tailwind CSS v4, App Router, system font stack
- Prisma schema (`packages/database`) — User, BuyerProfile, Store, Subscription, Product, Order, OrderItem, Wishlist, RefreshToken + 4 enums
- Docker Compose — MySQL 8, Redis 7, MinIO
- Shared packages: `@belidisini/types`, `@belidisini/config`
- Root `.gitignore` covers all apps, no per-app duplicates
- Formatting policy: `endOfLine: "lf"` enforced via `.prettierrc`, ESLint inherits from it
- Auth module (`apps/backend/src/modules/auth/`) — register, login, refresh, getProfile
- Common guards/decorators (`apps/backend/src/common/`) — JwtAuthGuard, RolesGuard, @Roles, @CurrentUser, JwtStrategy
- PrismaService (`apps/backend/src/prisma/`) — global DI wrapper
- Typed configuration layer (`apps/backend/src/config/`) — app, jwt, auth, swagger, cors, pagination, storage, redis
- Backend imports use `@belidisini/database` (workspace package), not `@prisma/client` directly
- Both apps build successfully, lint passes clean

## Architecture
```
belidisini/
  apps/
    backend/          NestJS API server (port 3001)
    web/              Next.js frontend (port 3000)
  packages/
    database/         Prisma schema + client (source-consumed)
    types/            Shared TypeScript types
    config/           Shared constants (plans, API prefix)
  docker-compose.yml  MySQL, Redis, MinIO
```

## Configuration Layer
```
apps/backend/src/config/
  app.config.ts       PORT, FRONTEND_URL, NODE_ENV, API_VERSION
  jwt.config.ts       JWT_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRY, JWT_REFRESH_EXPIRY
  auth.config.ts      BCRYPT_ROUNDS
  swagger.config.ts   SWAGGER_TITLE, SWAGGER_DESCRIPTION, SWAGGER_VERSION
  cors.config.ts      CORS_ORIGIN, CORS_CREDENTIALS
  pagination.config.ts PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT
  storage.config.ts   MINIO_ENDPOINT, MINIO_PORT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_BUCKET, MINIO_USE_SSL
  redis.config.ts     REDIS_HOST, REDIS_PORT
  index.ts            barrel export
```

## Build Commands
- `pnpm install` — install all deps
- `pnpm db:generate` — generate Prisma client (requires network)
- `pnpm db:migrate` — run Prisma migrations (requires MySQL)
- `pnpm dev` — run backend + frontend in parallel

## Blockers
- Prisma migrations require MySQL connection. Run `pnpm db:migrate` outside sandbox.
- Frontend uses system font stack (Google Fonts blocked in sandbox).
