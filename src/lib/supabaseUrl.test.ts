import { describe, expect, it } from 'vitest';
import { normalizeSupabaseUrl } from './supabaseUrl';

describe('normalizeSupabaseUrl', () => {
  it('quita /rest/v1/ y la barra final', () => {
    expect(normalizeSupabaseUrl('https://abcd.supabase.co/rest/v1/')).toBe('https://abcd.supabase.co');
    expect(normalizeSupabaseUrl('https://abcd.supabase.co/')).toBe('https://abcd.supabase.co');
  });

  it('quita espacios', () => {
    expect(normalizeSupabaseUrl('  https://abcd.supabase.co  ')).toBe('https://abcd.supabase.co');
  });

  it('devuelve undefined si falta o no es una URL', () => {
    expect(normalizeSupabaseUrl(undefined)).toBeUndefined();
    expect(normalizeSupabaseUrl('')).toBeUndefined();
    expect(normalizeSupabaseUrl('abcd.supabase.co')).toBeUndefined();
  });
});
