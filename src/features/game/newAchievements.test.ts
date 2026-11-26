import { beforeEach, describe, expect, it } from 'vitest';
import { markSeen, newAchievements } from './newAchievements';

const store = new Map<string, string>();
beforeEach(() => {
  store.clear();
  globalThis.localStorage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) } as Storage;
});

describe('logros nuevos', () => {
  it('la primera vez no avisa de lo que ya tenía', () => {
    expect(newAchievements('u', ['visor', 'hoja'])).toEqual([]);
    expect(newAchievements('u', ['visor', 'hoja', 'fueguito'])).toEqual(['fueguito']);
  });

  it('después de mostrarlo ya no avisa', () => {
    markSeen('u', ['visor']);
    expect(newAchievements('u', ['visor', 'crack'])).toEqual(['crack']);
    markSeen('u', ['visor', 'crack']);
    expect(newAchievements('u', ['visor', 'crack'])).toEqual([]);
  });
});
