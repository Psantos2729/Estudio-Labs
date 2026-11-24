/**
 * Deja solo el origen de la Project URL de Supabase.
 * El panel a veces muestra `https://x.supabase.co/rest/v1/`; con ese sufijo el login
 * arma rutas como `/rest/v1/auth/v1/authorize` y Supabase responde "No API key found".
 */
export function normalizeSupabaseUrl(raw: string | undefined): string | undefined {
  const value = raw?.trim();
  if (!value) return undefined;
  try {
    return new URL(value).origin;
  } catch {
    return undefined;
  }
}
