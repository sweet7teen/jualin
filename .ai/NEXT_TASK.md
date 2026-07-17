# Next Task

## Phase 5: Buyer Experience

### Scope
Backend — Shopping cart, checkout with QRIS payment, order history, wishlist management.

### Endpoints (preliminary)
- Cart: add, remove, list items
- Checkout: create order via QRIS payment (provider interface)
- Orders: list user orders, get order detail
- Wishlist: add, remove, list items

### Requirements
- Payment provider interface (strategy pattern)
- QRIS as the first payment provider implementation
- Order lifecycle management
- Soft delete for wishlist items

### Validation
- `nest build` — pass
- `eslint src/` — pass
- Swagger documents all endpoints
