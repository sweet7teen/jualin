import { Injectable } from '@nestjs/common';

export interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

@Injectable()
export class CacheService {
  private store = new Map<string, CacheEntry<unknown>>();

  private readonly defaultTtlMs: number;

  constructor(defaultTtlSec = 300) {
    this.defaultTtlMs = defaultTtlSec * 1000;
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry || entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return null;
    }
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlMs?: number): void {
    this.store.set(key, {
      data,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTtlMs),
    });
  }

  invalidate(pattern?: string): void {
    if (!pattern) {
      this.store.clear();
      return;
    }
    for (const key of this.store.keys()) {
      if (key.startsWith(pattern)) {
        this.store.delete(key);
      }
    }
  }
}
