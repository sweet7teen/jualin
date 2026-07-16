# Changelog

## [0.2.1] - 2026-07-17

### Fixed
- Established `lf` line ending policy in `.prettierrc` (`endOfLine: "lf"`)
- Removed `endOfLine: "auto"` override from ESLint config (inherits from `.prettierrc`)
- Added explicit TypeScript types to `CurrentUser` decorator (Express Request)
- Added `AuthenticatedRequest` interface to `RolesGuard`
- Removed `async` from `JwtStrategy.validate()` (synchronous)
- Added `void` to `bootstrap()` call in `main.ts` (floating promise)
- Added typed config reads (`get<string>()`, `get<number>()`) in `main.ts`

## [0.2.0] - 2026-07-16

### Added
- Auth module (`apps/backend/src/modules/auth/`)
  - POST `/api/v1/auth/register` — create account (email, password, name)
  - POST `/api/v1/auth/login` — returns access + refresh tokens
  - POST `/api/v1/auth/refresh` — rotate refresh token
  - GET `/api/v1/auth/me` — get current user profile (protected)
- JWT strategy (access + refresh token pair, configurable expiry)
- JwtAuthGuard for protected routes
- RolesGuard + `@Roles()` decorator for RBAC
- `@CurrentUser()` param decorator
- PrismaService — global DI wrapper for PrismaClient
- PrismaModule — global module exporting PrismaService
- RefreshToken model in Prisma schema (indexed on userId, token)
- `@belidisini/database` workspace dependency in backend
- `exports` field in `packages/database/package.json` for TypeScript resolution

### Fixed
- Backend imports changed from `@prisma/client` to `@belidisini/database` (5 files)
- `packages/database` now exports types via `exports` field

## [0.1.1] - 2026-07-16

### Fixed
- Removed rogue `pnpm-lock.yaml` and `pnpm-workspace.yaml` from `apps/web` (AGENTS.md monorepo violation)
- Removed `.pnpm-store` directory from repo root
- Removed duplicate `.prettierrc` from `apps/backend` (root config is source of truth)
- Removed scaffold README files, replaced with project-specific ones
- Fixed Prisma `Wishlist` model: removed redundant `user`/`userId` fields
- Fixed backend lint script: removed invalid `apps`/`libs` glob patterns
- Fixed backend e2e test: updated to hit `/api/v1` (matches global prefix)
- Fixed `globals.css`: removed undefined font theme vars, added system font stack
- Replaced default `page.tsx` scaffold with clean Belidisini placeholder
- Removed scaffold SVGs from `apps/web/public/`
- Merged web `.gitignore` into root, removed per-app duplicate
- Updated root `.gitignore` to cover `.pnpm-store`, IDE files, build artifacts

## [0.1.0] - 2026-07-16

### Added
- pnpm monorepo workspace configuration
- NestJS backend with ConfigModule, Swagger, ValidationPipe
- Next.js frontend with Tailwind CSS v4 and App Router
- Prisma schema with full ERD
- Docker Compose for MySQL 8, Redis 7, MinIO
- Shared `@belidisini/types` and `@belidisini/config` packages
- Both apps build successfully
