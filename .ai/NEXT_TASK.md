# Next Task

## Implement Authentication Module (JWT + RBAC)

### Scope
Backend only — NestJS auth module with JWT-based authentication and role-based access control.

### Requirements
1. **AuthModule** with register, login, refresh-token endpoints
2. **JWT strategy** with access + refresh token pair
3. **Password hashing** with bcrypt
4. **RBAC guard** that checks `User.role` against route-level permissions
5. **Roles decorator** for declarative role assignment on controllers
6. **Auth middleware** that validates JWT on protected routes

### Endpoints
- `POST /api/v1/auth/register` — create account (email, password, name)
- `POST /api/v1/auth/login` — returns access + refresh tokens
- `POST /api/v1/auth/refresh` — rotate refresh token
- `GET /api/v1/auth/me` — get current user profile (protected)

### Files to Create/Modify
- `apps/backend/src/modules/auth/` — new feature module
- `apps/backend/src/common/` — guards, decorators, strategies
- `packages/database/prisma/schema.prisma` — add RefreshToken model if needed

### Dependencies to Add
- `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `bcrypt`

### Validation
- Run `nest build` — must succeed
- Manual test with Swagger UI
