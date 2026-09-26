import type { PersistStorage, StorageValue } from "zustand/middleware";

/**
 * localStorage adapter for zustand `persist` that never throws.
 * Any read failure (no storage, quota, corrupt JSON) yields empty state.
 */
export function createSafeStorage<S>(): PersistStorage<S> {
  return {
    getItem(name) {
      try {
        const raw = globalThis.localStorage?.getItem(name);
        return raw ? (JSON.parse(raw) as StorageValue<S>) : null;
      } catch {
        return null;
      }
    },
    setItem(name, value) {
      try {
        globalThis.localStorage?.setItem(name, JSON.stringify(value));
      } catch {
        // Storage full or unavailable: keep working in memory.
      }
    },
    removeItem(name) {
      try {
        globalThis.localStorage?.removeItem(name);
      } catch {
        // Ignore.
      }
    },
  };
}
