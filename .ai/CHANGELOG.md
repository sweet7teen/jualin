# Changelog

## [0.9.0] - 2026-07-17

### Added
- Admin module (`apps/backend/src/modules/admin/`):
  - `AdminUsersService` — list, get, update users with self-demote/deactivate protection
  - `AdminUsersController` — GET users, GET users/:id, PATCH users/:id
  - All endpoints use `@Roles(Role.SUPER_ADMIN)`
  - Email uniqueness checked on PATCH
- `AdminModule` registered in AppModule

## Earlier
- Phase 5, schema changes, Store, Product, Auth, foundation
