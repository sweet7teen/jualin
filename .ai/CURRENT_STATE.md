# Current State

## Project: Belidisini
**Status**: Phase 5 — Buyer Experience (complete)

## What's Done
- pnpm monorepo workspace configured
- NestJS backend with ConfigModule, typed config layer, Swagger, ValidationPipe, global prefix `/api/v1`
- Next.js frontend with Tailwind CSS v4, App Router, system font stack
- Docker Compose — MySQL 8, Redis 7, MinIO
- Shared packages: `@belidisini/types`, `@belidisini/config`
- Auth, Store, Product, Cart, Payment, Checkout, Orders, Wishlist modules
- **Schema**: All required models with indexes and referential actions

## Buyer Endpoints
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/cart` | Buyer | List cart items |
| `POST` | `/api/v1/cart/items` | Buyer | Add item (upsert) |
| `PATCH` | `/api/v1/cart/items/:id` | Buyer | Update quantity |
| `DELETE` | `/api/v1/cart/items/:id` | Buyer | Remove item |
| `POST` | `/api/v1/checkout` | Buyer | Create order from cart, initiate payment |
| `GET` | `/api/v1/orders` | Buyer | List orders (paginated) |
| `GET` | `/api/v1/orders/:id` | Buyer | Get order detail |
| `GET` | `/api/v1/wishlist` | Buyer | List wishlist items |
| `POST` | `/api/v1/wishlist/items` | Buyer | Add product to wishlist |
| `DELETE` | `/api/v1/wishlist/items/:id` | Buyer | Remove from wishlist (hard delete) |

## Backlog
See `.ai/BACKLOG.md`.

## Blockers
- Prisma migrations require MySQL connection.
- Frontend uses system font stack.
