# Backlog

Items intentionally deferred from earlier phases. May be picked up in future phases or dedicated refactoring passes.

---

## Store
- Add strict slug validation (regex / slug format).
- Consider automatic slug generation.
- Consider reserved slug support.

## Authorization
- Introduce a reusable ownership/policy abstraction to avoid repeating ownership checks across future modules.

## Security
- Enforce required JWT secrets in production (no fallback defaults).
- Add authentication rate limiting.
- Add CSRF protection for browser-based flows.

## Performance
- Redis caching for public store listing.
- Optimize public product visibility queries. Current implementation runs separate subscription + product queries. Benchmark before optimizing: single JOIN query, Redis cache, or materialized visibility state.
