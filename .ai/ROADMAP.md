# Project Roadmap

## Phases 1â€“7: MVP Complete âœ…
All 7 phases delivered: Foundation, Auth, Store, Product, Buyer Experience, Super Admin, PWA & Polish.

---

## Phase 8: Production Hardening (proposed)

### Future Evolution (Post-Phase 8)
- Evolve request logging from plain-text to structured JSON logging (Pino or @nestjs/common Logger with JSON format) for integration with centralized log aggregation and observability platforms (ELK, Grafana Loki, Datadog).


### Why Phase 8 Exists

The MVP delivered 10 backend modules, 30+ endpoints, and a PWA frontend. Before this code reaches real users, it must be hardened against security threats, infrastructure failures, performance bottlenecks, and regressions.

All items below are derived from `.ai/KNOWN_ISSUES.md`, `.ai/BACKLOG.md`, and standard production requirements for a SaaS platform.

---

### Checkpoint 1: Security Hardening

**Rationale:** Highest risk. A breach before deployment is catastrophic.

**Scope:**
- Rate limiting on `/auth/login` and `/auth/register` using `@nestjs/throttler` or equivalent
- JWT secret validation at startup â€” fail fast if `JWT_SECRET` uses the fallback default in a non-development environment
- Audit logging for authentication events (login success/failure, registration, token refresh)

**CSRF clarification:** This project uses **JWT Bearer tokens** sent via `Authorization` header, not session cookies. The backend has no cookie-based authentication. CSRF attacks exploit cookie auto-attachment â€” they are **not applicable** to Bearer-token auth. CSRF protection is deferred unless cookie-based sessions are introduced later.

**Deliverables:**
- Rate limiter module (configurable limits via env vars)
- Environment check on startup (validates required secrets)
- Structured auth event logging

---

### Checkpoint 2: Infrastructure & CI/CD

**Rationale:** Without a repeatable build and deployment pipeline, the project cannot be reliably shipped or rolled back.

**Scope:**
- Production Docker configuration
- CI/CD pipeline
- Health checks
- Environment management

**Deliverables:**
- `Dockerfile` for the backend (multi-stage: build â†’ production image)
- `docker-compose.prod.yml` (backend + MySQL + Redis + MinIO with production settings)
- Health check endpoint (`GET /api/v1/health`) â€” reports DB connection, Redis connection, uptime
- Environment validation script â€” checks required vars, warns about fallback defaults
- CI configuration (GitHub Actions): `pnpm install â†’ lint â†’ build â†’ test â†’ docker build`
- `.env.example` synchronized with all production environment variables

---

### Checkpoint 3: Automated Testing

**Rationale:** The codebase has zero automated tests. Every future change risks regression. Testing is prioritized by value.

**Priority 1 â€” Unit Tests (critical business logic):**
- `AuthService.register()` â€” duplicate email, password hashing, buyer profile creation
- `AuthService.login()` â€” invalid credentials, inactive user, valid login
- `AuthService.refresh()` â€” valid token rotation, expired token rejection
- `CheckoutService.checkout()` â€” empty cart, product unavailable, insufficient stock, store suspended, successful checkout
- `ProductService.isSubscriptionActive()` â€” active subscription, expired, no subscription
- `CartService.add()` â€” out-of-stock, quantity exceeds stock, upsert behavior

**Priority 2 â€” Integration Tests (module boundaries):**
- Checkout flow: cart â†’ order creation â†’ stock decrement â†’ cart clear â†’ payment creation
- Product visibility: subscription expiry hiding products from public endpoints
- Auth flow: register â†’ login â†’ protected route access â†’ refresh â†’ old token rejection

**Priority 3 â€” Critical E2E Tests (API surface):**
- Complete buyer flow: register â†’ login â†’ create store â†’ create product â†’ add to cart â†’ checkout â†’ verify order
- Admin flow: seed admin â†’ login â†’ list users â†’ suspend store â†’ verify products hidden

**Deliverables:**
- Jest configuration with test database (testcontainers or SQLite for Prisma)
- Test factories for User, Store, Product, CartItem, Order
- CI integration: tests run on every PR

---

### Checkpoint 4: Performance & Scalability

**Rationale:** The MVP uses naive queries throughout. At scale, N+1 patterns and missing indexes will cause degradation.

**Scope:**
- Identify and fix N+1 query patterns in read-heavy endpoints
- Profile slow queries with Prisma query logging
- Review and optimize pagination on list endpoints
- Add Redis caching only where profiling shows clear benefit

**Deliverables:**
- Prisma query logging enabled in development (config toggle)
- N+1 audit of `GET /stores/:id/products`, `GET /orders`, `GET /admin/users`
- Pagination audit â€” ensure all list endpoints use configurable `take`/`skip`
- Redis cache layer (`CacheService` with typed config):
  - Public store listing (`GET /stores`)
  - Public product listing (`GET /stores/:id/products`)
  - Cache invalidation on store/product update
  - Configurable TTL per endpoint
- Benchmark report: query count and response time before/after

---

### Checkpoint 5: Observability

**Rationale:** Production incidents cannot be diagnosed without structured logging, request tracing, and monitoring hooks.

**Deliverables:**
- Structured logging with `@nestjs/common` Logger or Pino (JSON format, configurable level)
- Request correlation ID (generated per request, propagated to logs)
- Health check endpoint (`GET /api/v1/health`) covering DB, Redis, uptime
- Request duration logging (interceptor or middleware)
- Ready for Prometheus metrics or external monitoring (documented integration points, not full implementation)

---

### Checkpoint 6: Remaining Backlog

**Rationale:** Quality-of-life improvements that don't block deployment but improve long-term maintainability.

**Deliverables:**
- Ownership abstraction â€” `OwnershipGuard` or `PolicyService` to replace repeated `store.userId !== userId` checks
- Strict slug validation (regex pattern for `^[a-z0-9-]+$` in DTOs)
- `OrderItem` product name/image snapshot on checkout
- PWA service worker caching strategy refinement (network-first for HTML, cache-first for static, offline fallback)

---

### Implementation Order

| # | Checkpoint | Effort | Impact | Dependencies |
|---|---|---|---|---|
| 1 | Security hardening | Medium | Critical | None |
| 2 | Infrastructure & CI/CD | Medium | High | Checkpoint 1 (security before deploy) |
| 3 | Automated testing | Large | High | Checkpoint 2 (CI to run tests) |
| 4 | Performance & Scalability | Medium | Medium | Checkpoint 2 (infra for profiling) |
| 5 | Observability | Medium | Medium | Checkpoint 2 (infra for logging) |
| 6 | Backlog & polish | Medium | Low | None |

**Recommended order:** 1 â†’ 2 â†’ 3 â†’ (4 + 5 parallel) â†’ 6
