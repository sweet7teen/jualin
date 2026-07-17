# Project Roadmap

## Phase 1: Foundation ✅
- [x] pnpm monorepo setup
- [x] NestJS backend scaffold
- [x] Next.js frontend scaffold
- [x] Prisma schema (User, Store, Product, Order, Subscription, Wishlist)
- [x] Docker Compose (MySQL, Redis, MinIO)
- [x] Shared packages (types, config)

## Phase 2: Authentication & Authorization ✅
- [x] JWT auth (register, login, refresh)
- [x] RBAC guards and decorators
- [x] Protected routes
- [x] User profile endpoint

## Phase 3: Store Management ✅
- [x] Store CRUD (create, update, slug routing)
- [x] Store listing page (public)
- [x] Store detail page (public, with products)
- [x] Ownership enforcement

## Phase 4: Product Management
- [ ] Product CRUD with images (MinIO)
- [ ] Product listing with search & filters
- [ ] Product detail page
- [ ] Stock management

## Phase 5: Buyer Experience
- [ ] Shopping cart
- [ ] Checkout with QRIS payment
- [ ] Order history
- [ ] Wishlist

## Phase 6: Super Admin
- [ ] Admin dashboard
- [ ] User management
- [ ] Seller management
- [ ] System configuration

## Phase 7: PWA & Polish
- [ ] Service worker
- [ ] Manifest + icons
- [ ] Offline support
- [ ] Push notifications
- [ ] Theme persistence (light/dark)
