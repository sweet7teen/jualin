# Known Issues

## Environment Constraints
- **Prisma generate requires network**: Run `pnpm db:generate` after first install in an environment with internet access. Blocked in sandbox.
- **Google Fonts blocked in sandbox**: Frontend uses system font stack. Can switch to `next/font/google` when deploying.

## Prisma
- **`package.json#prisma` deprecated**: Prisma 6 warns about `prisma.seed` in package.json. Migrate to `prisma.config.ts` when upgrading to Prisma 7.

## Build
- **`pnpm approve-builds` required**: First install requires approving build scripts for `@prisma/client`, `sharp`, `unrs-resolver`, `@scarf/scarf`. Use `pnpm approve-builds <pkg>` before install.
