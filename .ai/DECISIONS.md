# Architectural Decisions

## Monorepo Structure
- **Decision**: pnpm workspaces with `apps/` and `packages/` directories
- **Reason**: Native pnpm support, lightweight, no extra tooling
- **Date**: 2026-07-16

## Backend Framework
- **Decision**: NestJS with global prefix `/api/v1`, Swagger docs at `/api/docs`
- **Reason**: API-first design per AGENTS.md, module system supports feature isolation
- **Date**: 2026-07-16

## Frontend Framework
- **Decision**: Next.js App Router with Tailwind CSS v4
- **Reason**: Latest stable, SSR/SSG support, PWA-ready
- **Date**: 2026-07-16

## Database
- **Decision**: MySQL via Prisma ORM, schema in `packages/database`
- **Reason**: Prisma generates types shared across frontend/backend
- **Date**: 2026-07-16

## Prisma Client Consumption
- **Decision**: Backend imports from `@belidisini/database`, never from `@prisma/client` directly
- **Reason**: Single source of truth for database types
- **Date**: 2026-07-16

## Workspace Package Resolution
- **Decision**: `@belidisini/database` listed as `workspace:*` dependency in `@belidisini/backend`
- **Reason**: pnpm requires explicit dependency declaration to create workspace symlinks
- **Date**: 2026-07-16

## Line Ending Policy
- **Decision**: `lf` enforced via `.prettierrc` (`endOfLine: "lf"`), ESLint inherits from it
- **Reason**: Cross-platform consistency
- **Date**: 2026-07-17

## Typed Configuration Layer
- **Decision**: Centralized config modules (`apps/backend/src/config/`) with `registerAs()`, loaded via `ConfigModule.forRoot({ load: configs })`
- **Reason**: Single source of truth for runtime configuration, typed access via `configService.get('namespace.key')`, all env vars documented in `.env.example`
- **Date**: 2026-07-17

## JWT Expiry as Seconds
- **Decision**: JWT expiry values stored as numeric seconds in env vars and config
- **Reason**: `@types/jsonwebtoken` defines `expiresIn` as `StringValue | number`. `StringValue` is a branded template literal from `ms` library, incompatible with raw strings from env vars. Numbers are type-safe and unambiguous.
- **Date**: 2026-07-17

## Product Slug Uniqueness
- **Decision**: Product slugs are unique per store, enforced by Prisma constraint `@@unique([storeId, slug])`. Public product URLs are store-scoped: `GET /api/v1/stores/:storeSlug/products/:productSlug`.
- **Reason**: Flat global slug namespace does not scale to hundreds of thousands of sellers. Per-store scoping gives each seller full control over their product URLs and is consistent with industry standards (Etsy, Shopify). All product endpoints already scope to store via `storeId`.
- **Consequences**: Removed `@unique` from `Product.slug`. No backward compatibility layer needed (unreleased project).
- **Date**: 2026-07-17

## Authentication
- **Decision**: JWT with access + refresh token pair, bcrypt password hashing (configurable cost)
- **Reason**: Stateless auth suitable for API-first architecture; refresh rotation for security
- **Date**: 2026-07-16

## Font Strategy
- **Decision**: System font stack instead of Google Fonts
- **Reason**: Avoids external network dependency, faster loading, no FOUT
- **Date**: 2026-07-16

## Dev Services
- **Decision**: Docker Compose for MySQL, Redis, MinIO
- **Reason**: Local dev parity with production; MinIO for S3-compatible storage
- **Date**: 2026-07-16

## Gitignore Strategy
- **Decision**: Single root `.gitignore`, no per-app duplicates
- **Reason**: Follows pnpm monorepo convention
- **Date**: 2026-07-16

## Wishlist Model
- **Decision**: Wishlist linked to BuyerProfile, not directly to User
- **Reason**: BuyerProfile is the buyer-specific context; avoids redundant FK paths
- **Date**: 2026-07-16
