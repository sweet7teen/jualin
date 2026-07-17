# Known Issues

## Environment Constraints
- **Prisma generate requires network**: Run `pnpm db:generate` after first install in an environment with internet access.
- **Prisma migrations require MySQL**: Run `pnpm db:migrate` with MySQL running.
- **Admin seed requires network + MySQL**: Run `pnpm install && pnpm db:seed` outside sandbox.
- **Google Fonts blocked in sandbox**: Frontend uses system font stack.

## Technical Debt
- **Rate limiter is in-memory**: Resets on server restart. Replace with Redis-backed store for production.
- **Prisma config deprecation**: `package.json#prisma.seed` deprecated in Prisma 6. Migrate to `prisma.config.ts` before Prisma 7.

## Production Hardening Required (Addressed)
- ~~No rate limiting on auth endpoints~~ âœ… **Implemented** (in-memory throttler, 10/5min login, 5/5min register)
- ~~Set JWT_SECRET via env vars~~ âœ… **Validated** (startup fails fast in production if defaults used)
- ~~Add audit logging for auth events~~ âœ… **Implemented** (structured Logger with severity levels)
- Add CSRF protection â€” **Not applicable** (JWT Bearer token auth, no cookies)

## Build
- **`pnpm approve-builds` required**: First install requires approving build scripts for `@prisma/client`, `sharp`, `unrs-resolver`, `@scarf/scarf`, `bcrypt`.
