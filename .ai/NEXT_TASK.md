# Next Task

## Phase 3: Store Management

### Scope
Backend + minimal frontend — Store CRUD, slug-based routing, seller dashboard skeleton.

### Step 1: Prisma Schema Updates
- Ensure `Store` model has proper indexes on `slug`, `userId`
- Add `StoreModule` service with repository pattern

### Step 2: Store Module (`apps/backend/src/modules/store/`)
Create feature module with:
- `store.module.ts` — register StoreService, StoreController
- `store.controller.ts` — CRUD endpoints
- `store.service.ts` — business logic
- `dto/create-store.dto.ts` — name, slug, description (class-validator)
- `dto/update-store.dto.ts` — partial update

### Endpoints
- `POST /api/v1/stores` — create store (SELLER only, protected)
- `GET /api/v1/stores` — list public stores (public, with pagination)
- `GET /api/v1/stores/:slug` — get store by slug (public)
- `PATCH /api/v1/stores/:id` — update store (owner only, protected)
- `DELETE /api/v1/stores/:id` — deactivate store (owner only, protected)

### Step 3: Validation
- `nest build` must succeed
- `eslint src/` passes clean
- Swagger shows all 5 endpoints
- Create store requires SELLER role
- Update/delete requires store ownership
- Slug uniqueness enforced
