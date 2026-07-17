# Changelog

## [0.4.0] - 2026-07-17

### Added
- Store module (`apps/backend/src/modules/store/`):
  - `POST /api/v1/stores` — create store (SELLER only, slug uniqueness enforced)
  - `GET /api/v1/stores` — list active stores (public, paginated via config)
  - `GET /api/v1/stores/:slug` — get store by slug with active products (public)
  - `PATCH /api/v1/stores/:id` — update store (owner only, slug uniqueness checked)
  - `DELETE /api/v1/stores/:id` — soft-deactivate store (owner only)
  - Ownership check: `store.userId !== userId` → 403 Forbidden
  - Soft delete via `isActive: false`
- StoreModule registered in AppModule

## [0.3.0] - 2026-07-17

### Added
- Typed configuration layer (`apps/backend/src/config/`)
- JWT expiry values as numeric seconds (type-safe)
- All env vars documented in `.env.example`

## [0.2.1] - 2026-07-17

### Fixed
- CRLF/LF line ending policy, type safety, lint errors

## [0.2.0] - 2026-07-16

### Added
- Auth module, JWT strategy, guards, decorators, PrismaService

## [0.1.1] - 2026-07-16

### Fixed
- Monorepo violations, duplicate configs, scaffold cleanup

## [0.1.0] - 2026-07-16

### Added
- pnpm monorepo, NestJS backend, Next.js frontend, Prisma schema, Docker Compose, shared packages
