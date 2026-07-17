# Current State

## Project: Belidisini
**Status**: Phase 6 — Super Admin (checkpoint 1-2 complete: seed + user management)

## What's Done
- All Buyer Experience modules completed
- **Admin seed** (`packages/database/prisma/seed.ts`) — SUPER_ADMIN user created from env vars
- **Admin module** (`apps/backend/src/modules/admin/`) with user management
- **User management** — list, detail, update (role, isActive, name, email)

## Admin Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/admin/users` | SUPER_ADMIN | List users (paginated, filterable by role) |
| `GET` | `/api/v1/admin/users/:id` | SUPER_ADMIN | Get user detail |
| `PATCH` | `/api/v1/admin/users/:id` | SUPER_ADMIN | Update user (self-demote/deactivate blocked) |

## Business Rules
- Admin cannot change own role → 403
- Admin cannot deactivate own account → 403
- Admin can update any other user freely
- Email uniqueness enforced on update

## Blockers
- `node_modules` corrupted in sandbox — build/tooling unavailable.
- Seed script requires network + MySQL.
