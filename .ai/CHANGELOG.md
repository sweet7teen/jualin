# Changelog

## [1.5.0] - 2026-07-17

### Added
- Backlog & Polish (Phase 8, Checkpoint 6):
  - PolicyService (`apps/backend/src/common/policy/`) — reusable ownership checks
    - `ensureStoreOwner()`, `ensureProductOwner()`, `ensureOrderBuyer()`
    - Eliminates repeated `findUnique` + `userId` check in controllers
    - PolicyModule registered as global
  - Slug validation — `@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)` on Store and Product create DTOs
  - OrderItem snapshot (`productName`, `productImage`) — captured at checkout time

### Changed
- Prisma schema: removed redundant `user`/`userId` from CartItem; added `productName`/`productImage` to OrderItem
- CheckoutService: snapshots product name and first image into OrderItem on order creation
