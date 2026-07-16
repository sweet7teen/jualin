# Changelog

## [0.1.1] - 2026-07-16

### Fixed
- Removed rogue `pnpm-lock.yaml` and `pnpm-workspace.yaml` from `apps/web` (AGENTS.md monorepo violation)
- Removed `.pnpm-store` directory from repo root
- Removed duplicate `.prettierrc` from `apps/backend` (root config is source of truth)
- Removed scaffold README files, replaced with project-specific ones
- Fixed Prisma `Wishlist` model: removed redundant `user`/`userId` fields (BuyerProfile handles the relation)
- Fixed backend lint script: removed invalid `apps`/`libs` glob patterns
- Fixed backend e2e test: updated to hit `/api/v1` (matches global prefix)
- Fixed `globals.css`: removed undefined `--font-geist-sans`/`--font-geist-mono` theme vars, added system font stack
- Replaced default `page.tsx` scaffold with clean Belidisini placeholder
- Removed scaffold SVGs from `apps/web/public/`
- Merged web `.gitignore` into root, removed per-app duplicate
- Updated root `.gitignore` to cover `.pnpm-store`, IDE files, build artifacts

## [0.1.0] - 2026-07-16

### Added
- pnpm monorepo workspace configuration
- NestJS backend with ConfigModule, Swagger, ValidationPipe
- Next.js frontend with Tailwind CSS v4 and App Router
- Prisma schema with full ERD (User, BuyerProfile, Store, Subscription, Product, Order, OrderItem, Wishlist)
- Docker Compose for MySQL 8, Redis 7, MinIO
- Shared `@belidisini/types` package (API response types, enums)
- Shared `@belidisini/config` package (app constants, subscription plans)
- Both apps build successfully
