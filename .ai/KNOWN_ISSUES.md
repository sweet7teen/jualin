# Known Issues

## Environment Constraints
- **Prisma generate requires network**: Run `pnpm db:generate` after first install in an environment with internet access. Blocked in sandbox.
- **Prisma migrations require MySQL**: Run `pnpm db:migrate` in an environment with MySQL running. Blocked in sandbox.
- **Google Fonts blocked in sandbox**: Frontend uses system font stack. Can switch to `next/font/google` when deploying.

## Technical Debt
- **No rate limiting on auth endpoints**: Add rate limiting before production deployment.
- **Prisma config deprecation**: `package.json#prisma.seed` deprecated in Prisma 6. Migrate to `prisma.config.ts` before Prisma 7.

## Production Hardening Required
- Set `JWT_SECRET` and `JWT_REFRESH_SECRET` via environment variables (never use fallback defaults in production).
- Add rate limiting on `/auth/login` and `/auth/register`.
- Add CSRF protection for browser-based flows.
- Add audit logging for authentication events.

## Build
- **`pnpm approve-builds` required**: First install requires approving build scripts for `@prisma/client`, `sharp`, `unrs-resolver`, `@scarf/scarf`, `bcrypt`. Use `pnpm approve-builds <pkg>` before install.
