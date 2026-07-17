# Changelog

## [1.1.0] - 2026-07-17

### Added
- Infrastructure & CI/CD (Phase 8, Checkpoint 2):
  - `Dockerfile` — multi-stage build (node:22-alpine, pnpm, Prisma generate)
  - `docker-compose.prod.yml` — MySQL 8, Redis 7, MinIO, backend with health dependencies
  - `GET /api/v1/health` — returns status, uptime, database connectivity check
  - `HealthModule` + `HealthController` registered in AppModule
  - `scripts/validate-env.js` — validates required env vars (DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET)
  - `.github/workflows/ci.yml` — CI pipeline: lint → type-check → Prisma validate → migrate → build → test
  - Validation rejects fallback defaults (`dev-secret-change-me`, `change-me-in-production`)

### Fixed
- Rate limiter description corrected from "sliding window" to "fixed window" in changelog and known issues
- Added `trust proxy` configuration note to backlog

## [1.0.0] - 2026-07-17

### Added
- Security hardening: rate limiting, JWT validation, audit logging
