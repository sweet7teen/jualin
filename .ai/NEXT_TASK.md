# Next Task

## Phase 2: Authentication & Authorization

### Scope
Backend only — NestJS auth module with JWT-based authentication and role-based access control.

### Step 1: Dependencies
Add to `apps/backend`:
- `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `bcrypt`

### Step 2: Prisma Schema
Add `RefreshToken` model to `packages/database/prisma/schema.prisma`:
- id, userId, token, expiresAt, createdAt
- FK to User

### Step 3: Auth Module (`apps/backend/src/modules/auth/`)
Create feature module with:
- `auth.module.ts` — register JWT strategy, AuthController, AuthService
- `auth.controller.ts` — POST register, login, refresh, GET me
- `auth.service.ts` — business logic for register, login, token rotation
- `dto/register.dto.ts` — email, password, name (class-validator)
- `dto/login.dto.ts` — email, password

### Step 4: Common (`apps/backend/src/common/`)
- `guards/jwt-auth.guard.ts` — validates JWT on protected routes
- `guards/roles.guard.ts` — checks User.role against required roles
- `decorators/roles.decorator.ts` — @Roles('SELLER', 'SUPER_ADMIN')
- `decorators/current-user.decorator.ts` — @CurrentUser() param decorator
- `strategies/jwt.strategy.ts` — passport-jwt strategy

### Validation
- `nest build` must succeed
- Swagger UI shows all 4 endpoints
- Register creates user, returns tokens
- Login with valid creds returns tokens
- Refresh rotates token
- /me returns current user (requires Bearer token)
