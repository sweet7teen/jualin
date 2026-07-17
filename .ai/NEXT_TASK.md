# Next Task

## Phase 4: Product Management

### Scope
Backend — Product CRUD with image upload support via MinIO/S3.

### Endpoints
- `POST /api/v1/stores/:storeId/products` — create product (store owner only)
- `GET /api/v1/stores/:storeId/products` — list products for a store (public, paginated)
- `GET /api/v1/products/:slug` — get product by slug (public)
- `PATCH /api/v1/products/:id` — update product (store owner only)
- `DELETE /api/v1/products/:id` — deactivate product (store owner only)

### Requirements
- Product has: name, slug, description, price, stock, images, status
- Only seller with active subscription can create ACTIVE products
- Images stored in MinIO, URLs stored as JSON array in DB
- Product visibility controlled by subscription status
- Slug uniqueness enforced per store (slug + storeId unique)
- Pagination via config layer

### Validation
- `nest build` — pass
- `eslint src/` — pass
- Swagger shows all 5 endpoints
- Ownership enforced
- Subscription check on create
