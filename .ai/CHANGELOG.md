# Changelog

## [0.3.0] - 2026-07-17

### Added
- Typed configuration layer (`apps/backend/src/config/`):
  - `app.config.ts` — PORT, FRONTEND_URL, NODE_ENV, API_VERSION
  - `jwt.config.ts` — JWT_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRY, JWT_REFRESH_EXPIRY
  - `auth.config.ts` — BCRYPT_ROUNDS
  - `swagger.config.ts` — SWAGGER_TITLE, SWAGGER_DESCRIPTION, SWAGGER_VERSION
  - `cors.config.ts` — CORS_ORIGIN, CORS_CREDENTIALS
  - `pagination.config.ts` — PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT
  - `storage.config.ts` — MINIO_ENDPOINT, MINIO_PORT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_BUCKET, MINIO_USE_SSL
  - `redis.config.ts` — REDIS_HOST, REDIS_PORT
  - `index.ts` — barrel export for all configs

### Changed
- JWT expiry values now stored as seconds (numeric) instead of strings
- `auth.service.ts` refresh token expiry now reads from config
- All `configService.get()` calls use typed namespaced keys (e.g. `jwt.secret`)
- `.env.example` updated with all env vars and documentation

## [0.2.1] - 2026-07-17

### Fixed
- Established `lf` line ending policy in `.prettierrc` (`endOfLine: "lf"`)
- Removed `endOfLine: "auto"` override from ESLint config
- Added explicit TypeScript types to decorators, guards, and main.ts
- Fixed `require-await` lint error in `JwtStrategy`
- Fixed floating promise in `main.ts`

## [0.2.0] - 2026-07-16

### Added
- Auth module (`apps/backend/src/modules/auth/`)
- JWT strategy, JwtAuthGuard, RolesGuard, @Roles, @CurrentUser
- PrismaService global DI wrapper
- RefreshToken model in Prisma schema
- `@belidisini/database` workspace dependency in backend
- `exports` field in `packages/database/package.json`

## [0.1.1] - 2026-07-16

### Fixed
- Monorepo violations, duplicate configs, scaffold cleanup
- Prisma schema, lint scripts, e2e test, globals.css

## [0.1.0] - 2026-07-16

### Added
- pnpm monorepo, NestJS backend, Next.js frontend
- Prisma schema, Docker Compose, shared packages
