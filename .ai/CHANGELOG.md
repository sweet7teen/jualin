# Changelog

## [0.6.2] - 2026-07-17

### Added
- Payment abstraction layer (`apps/backend/src/modules/payment/`):
  - `PaymentProvider` interface — `createPayment()`, `verifyPayment()`, `refundPayment()`
  - `PaymentService` — persists Payment records, delegates external calls to provider via DI
  - `PAYMENT_PROVIDER` injection token — registered as `null` by default
  - Provider is `@Optional()` — service works without concrete provider
  - `PaymentModule` registered in AppModule

## [0.6.1] - 2026-07-17

### Added
- Cart module with upsert, product validation, quantity-stock check on add and update

### Fixed
- Cart `add()` now validates `dto.quantity > product.stock` (was missing)

## [0.6.0] - 2026-07-17

### Added
- CartItem, Payment, PaymentStatus schema additions
- BuyerProfile auto-creation on register
- Indexes on CartItem.buyerId, Payment.status, Payment.providerPaymentId

## [0.5.0] - 2026-07-17

### Added
- Product module with subscription gating, runtime visibility, per-store slugs

## [0.4.0] - 2026-07-17

### Added
- Store module — CRUD, ownership enforcement, slug routing

## [0.3.0] - 2026-07-17

### Added
- Typed configuration layer, JWT expiry as seconds

## [0.2.1] - 2026-07-17

### Fixed
- CRLF/LF line ending policy, type safety, lint errors

## [0.2.0] - 2026-07-16

### Added
- Auth module, JWT strategy, guards, decorators, PrismaService

## [0.1.1] - 2026-07-16

### Fixed
- Monorepo violations, duplicate configs, scaffold cleanup

## [0.1.0] - 2026-07-16

### Added
- pnpm monorepo, NestJS backend, Next.js frontend, Prisma schema, Docker Compose, shared packages
