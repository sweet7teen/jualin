# Changelog

## [0.12.0] - 2026-07-17

### Added
- Animated transitions:
  - `@keyframes fade-in` — opacity 0→1, 0.4s ease-out
  - `@keyframes slide-up` — opacity + translateY(12px)→0, 0.4s ease-out
  - Tailwind theme utilities `animate-fade-in` and `animate-slide-up`
  - `prefers-reduced-motion: reduce` disables all animations

### Changed
- `layout.tsx` — body now has `animate-fade-in` class
- `page.tsx` — main container has `animate-slide-up` class
- `BACKLOG.md` — added PWA Service Worker caching strategy item

## [0.11.0] - 2026-07-17

### Added
- PWA manifest, SVG icons, service worker
- `BACKLOG.md` already updated via previous turn.

## [0.10.0] - 2026-07-17

### Added
- Theme persistence

## Earlier
- Admin modules, Orders, Wishlist, Cart, Checkout, Payment, Product, Store, Auth, foundation
