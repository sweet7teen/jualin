# Architectural Decisions

## Monorepo Structure
- **Decision**: pnpm workspaces with `apps/` and `packages/` directories
- **Reason**: Native pnpm support, lightweight, no extra tooling (Turborepo can be added later)
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
- **Reason**: Prisma generates types shared across frontend/backend; MySQL per AGENTS.md
- **Date**: 2026-07-16

## Prisma Client Consumption
- **Decision**: Backend imports from `@belidisini/database`, never from `@prisma/client` directly
- **Reason**: Single source of truth for database types; workspace package owns schema + generated client
- **Date**: 2026-07-16

## Workspace Package Resolution
- **Decision**: `@belidisini/database` listed as `workspace:*` dependency in `@belidisini/backend`
- **Reason**: pnpm requires explicit dependency declaration to create workspace symlinks
- **Date**: 2026-07-16

## Line Ending Policy
- **Decision**: `lf` enforced via `.prettierrc` (`endOfLine: "lf"`), ESLint inherits from it
- **Reason**: Cross-platform consistency; avoids CRLF/LF mixing on Windows + Unix
- **Date**: 2026-07-17

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
- **Reason**: Follows pnpm monorepo convention; simpler maintenance
- **Date**: 2026-07-16

## Wishlist Model
- **Decision**: Wishlist linked to BuyerProfile, not directly to User
- **Reason**: BuyerProfile is the buyer-specific context; avoids redundant FK paths
- **Date**: 2026-07-16

## Authentication
- **Decision**: JWT with access (15m) + refresh (7d) token pair, bcrypt password hashing (cost 12)
- **Reason**: Stateless auth suitable for API-first architecture; refresh rotation for security
- **Date**: 2026-07-16
