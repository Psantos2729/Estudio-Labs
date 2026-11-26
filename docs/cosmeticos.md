# Cómo agregar un cosmético al taller

Todo vive en `content/cosmeticos.json`: una pieza por línea. Para agregar una:

1. Copia una línea parecida y cambia sus datos:

   ```json
   {"id": "gorra_roja", "slot": "cabeza", "name": "Gorra roja", "unlock": ["nivel", 5], "layer": "top", "hidesAntenna": true, "art": [[2, 0.6, 6, 1.4, "#e2453b"]]}
   ```

   | Campo | Qué es |
   |---|---|
   | `id` | Nombre interno, sin espacios ni acentos (`a-z`, `0-9`, `_`). No lo cambies después: es lo que se guarda en cada perfil. |
   | `slot` | Espacio del robot: `cabeza`, `cara`, `cuerpo`, `mano`, `brazo`, `piernas`, `pies`. Un espacio nuevo aparece solo en el taller. |
   | `name` | Lo que se ve en el taller. |
   | `unlock` | Cómo se gana: `["nivel", 5]`, `["ejercicios", 50]`, `["repasos", 3]`, `["modulos", 7]` (dominados), `["islas", 2]` (jefes de isla vencidos) o `["jefe", "M06"]` (aprobar ese examen). Logros (migración 021): `["lecciones", 20]` leídas, `["curso", 100]` (% de lecciones leídas), `["xp", 500]`, `["reintentos", 1]` (exámenes vueltos a presentar), `["perfectos", 1]` (exámenes con 100), `["rapidos", 1]` (aprobados en menos de la mitad del tiempo), `["noche", 1]` (lecciones leídas de 20:00 a 5:59, hora de Guatemala), `["seguidas", 3]` (lecciones leídas en menos de una hora) y `["primero", 1]` (primer lugar del ranking). |
| `desc` | Opcional: texto corto bajo el nombre en el taller. |
   | `layer` | `back` detrás del cuerpo, `face` reemplaza los ojos, `top` encima de todo. |
   | `hidesAntenna` | `true` si tapa la antena (cascos, gorros, máscaras). |
   | `art` | Rectángulos `[x, y, ancho, alto, "#color"]`. Opcional un 6.º número de opacidad. |

2. `npm run seed` y corre `supabase/seed.sql` en el SQL Editor de Supabase. No hace falta migración.
3. `npm test` revisa que la pieza esté bien escrita.

## La cuadrícula del robot

Va de x = 0 a 10.5 y de y = −1 a 11 (los decimales valen).

- Cabeza: x 2–8, y 2–6. Ojos en (3, 3) y (6, 3), boca en y 5. Antena en (4.5, 1).
- Cuerpo: x 3–7, y 6–9. Brazos en x 2 y x 7 (y 6.5–8.5). Pies en y 9–10.
- Mano: alrededor de x 8, y 6–8 (espadas hacia arriba, hasta y 0.5).
- Brazo (escudo): x 0–2.6, y 5.6–9.6.
- Piernas: y 8.8–9.7. Pies: y 8.9–10.3 (los pies del robot están en x 3 y x 6).

Para ver cómo queda, abre `/taller` con `npm run dev`.
Borrar una línea quita la pieza (a quien la tuviera puesta le sigue apareciendo hasta que se cambie).
