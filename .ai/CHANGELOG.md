# Changelog

## [0.8.0] - 2026-07-17

### Added
- Orders module (`apps/backend/src/modules/orders/`):
  - `GET /orders` — list user orders (paginated, with items + payment status)
  - `GET /orders/:id` — order detail with items, payment, product images
  - Ownership enforced via `order.userId !== userId`
- Wishlist module (`apps/backend/src/modules/wishlist/`):
  - `GET /wishlist` — list wishlist items with product info
  - `POST /wishlist/items` — add product (duplicate prevention via unique constraint)
  - `DELETE /wishlist/items/:id` — remove item (hard delete, ownership enforced)
  - Buyer lookup from User.id → BuyerProfile.id

## [0.7.1] - 2026-07-17

### Changed
- Stock concurrency: guarded `updateMany` with `WHERE stock >= qty`

## [0.7.0] - 2026-07-17

### Added
- QRIS payment provider, Checkout module

## Earlier
- Cart, Payment abstraction, schema, Store, Product, Auth, foundation
