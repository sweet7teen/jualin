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

## Font Strategy
- **Decision**: System font stack instead of Google Fonts
- **Reason**: Avoids external network dependency, faster loading, no FOUT
- **Date**: 2026-07-16

## Dev Services
- **Decision**: Docker Compose for MySQL, Redis, MinIO
- **Reason**: Local dev parity with production; MinIO for S3-compatible storage
- **Date**: 2026-07-16
