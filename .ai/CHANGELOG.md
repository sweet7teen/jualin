# Changelog

## [0.5.0] - 2026-07-17

### Added
- Product module (`apps/backend/src/modules/product/`):
  - `POST /api/v1/stores/:storeId/products` — create product (owner only, subscription gated)
  - `GET /api/v1/stores/:storeId/products` — list active products (public, paginated)
  - `GET /api/v1/stores/:storeSlug/products/:productSlug` — get product by slugs (public)
  - `PATCH /api/v1/products/:id` — update product (owner only)
  - `DELETE /api/v1/products/:id` — archive product (owner only)
  - Per-store slug uniqueness enforced via `@@unique([storeId, slug])`
  - Creation gating: products default to ACTIVE if subscription active, DRAFT otherwise
  - **Runtime subscription visibility**: public endpoints check subscription at query time
  - Image URLs stored as JSON array in `@db.Text` field
  - Ownership enforced via store.userId check
- `isSubscriptionActive()` private helper in ProductService

### Changed
- Prisma `Product.slug` constraint: `@unique` (global) → `@@unique([storeId, slug])` (per-store)
- `findAll()` — returns empty if subscription expired/inactive
- `findBySlug()` — returns 404 if subscription expired/inactive
- Product status lifecycle separated from subscription lifecycle

## [0.4.0] - 2026-07-17

### Added
- Store module — CRUD, ownership enforcement, slug routing

## [0.3.0] - 2026-07-17

### Added
- Typed configuration layer, JWT expiry as seconds

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
