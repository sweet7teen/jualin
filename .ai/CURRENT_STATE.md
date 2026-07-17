# Current State

## Project: Belidisini
**Status**: Phase 5 — Buyer Experience (payment abstraction checkpoint complete)

## What's Done
- pnpm monorepo workspace configured
- NestJS backend with ConfigModule, typed config layer, Swagger, ValidationPipe, global prefix `/api/v1`
- Next.js frontend with Tailwind CSS v4, App Router, system font stack
- Docker Compose — MySQL 8, Redis 7, MinIO
- Shared packages: `@belidisini/types`, `@belidisini/config`
- Auth module — register, login, refresh, getProfile (JWT, bcrypt, RBAC)
- Store module, Product module, Cart module
- **Payment abstraction** — `PaymentProvider` interface, `PaymentService`, `PaymentModule` (no concrete provider yet)
- **Schema**: CartItem, Payment, PaymentStatus — with proper indexes and referential actions

## Payment Architecture
```
CheckoutService (future)
  → PaymentService
    → PaymentProvider (interface — defined now)
      → QrisPaymentProvider (concrete — deferred to Checkout checkpoint)
```

- `PAYMENT_PROVIDER` token: injected via `@Inject(PAYMENT_PROVIDER)`
- Provider is `@Optional()` — service works without concrete provider (DB-only operations)
- Concrete provider swaps in via `useFactory` or `useClass` when Checkout adds QRIS

## Cart Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/cart` | Buyer | List cart items |
| `POST` | `/api/v1/cart/items` | Buyer | Add item (upsert) |
| `PATCH` | `/api/v1/cart/items/:id` | Buyer | Update quantity |
| `DELETE` | `/api/v1/cart/items/:id` | Buyer | Remove item |

## Backlog
See `.ai/BACKLOG.md` for deferred improvements.

## Blockers
- Prisma migrations require MySQL connection. Run `pnpm db:migrate` outside sandbox.
- Frontend uses system font stack (Google Fonts blocked in sandbox).
