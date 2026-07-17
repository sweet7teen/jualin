import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const THROTTLE_TTL_KEY = 'throttle:ttl';
const THROTTLE_LIMIT_KEY = 'throttle:limit';

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}, 60_000);

@Injectable()
export class ThrottlerGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ttlMs =
      this.reflector.get<number>(THROTTLE_TTL_KEY, context.getHandler()) ?? 60_000;
    const limit =
      this.reflector.get<number>(THROTTLE_LIMIT_KEY, context.getHandler()) ?? 20;

    const request = context.switchToHttp().getRequest();
    const key = request.ip ?? 'unknown';
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
      store.set(key, { count: 1, resetAt: now + ttlMs });
      return true;
    }

    if (entry.count >= limit) {
      return false;
    }

    entry.count++;
    return true;
  }
}

export const Throttle = (limit: number, ttlSec: number) => {
  return (target: object, key?: unknown, descriptor?: PropertyDescriptor) => {
    if (descriptor) {
      Reflect.defineMetadata(THROTTLE_LIMIT_KEY, limit, descriptor.value);
      Reflect.defineMetadata(THROTTLE_TTL_KEY, ttlSec * 1000, descriptor.value);
    }
    return descriptor;
  };
};
