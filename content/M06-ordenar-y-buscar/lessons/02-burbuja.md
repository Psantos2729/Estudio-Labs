# Ordenamiento burbuja

La **burbuja** es el método más conocido y el que más aparece en los laboratorios (ejercicios 30 y 37 del PDF). La idea: recorrer el vector comparando cada pareja de **vecinos**; si están al revés, se intercambian. Al terminar un recorrido completo (una **pasada**), el mayor quedó al final, como una burbuja que sube. Luego se repite con el resto.

## Una pasada

Mira solo la primera pasada sobre `[5, 1, 4, 2, 8]`:

| Compara | ¿Al revés? | Vector después |
| --- | --- | --- |
| 5 y 1 | sí, se cambian | 1 5 4 2 8 |
| 5 y 4 | sí, se cambian | 1 4 5 2 8 |
| 5 y 2 | sí, se cambian | 1 4 2 5 8 |
| 5 y 8 | no | 1 4 2 5 8 |

El 5 fue "subiendo" mientras encontraba vecinos más chicos, y se detuvo al toparse con el 8. Y el 8, el mayor de todos, quedó al final. **En cada pasada el mayor que queda llega a su lugar**, sin importar dónde empezó.

## El recorrido completo

Usa **siguiente** para ver cada comparación. Amarillo: la pareja que se compara. Rojo: se intercambiaron. Verde: ya en su lugar. Debajo de la nota llevas la cuenta de comparaciones e intercambios:

```pasos
5 1 4 2 8 |  | Lista original. Cada pasada lleva el mayor que queda hasta el final.
5 1 4 2 8 | c0 c1 | Pasada 1: ¿5 > 1? Sí, hay que cambiarlos. (comparaciones: 1)
1 5 4 2 8 | i0 i1 | Se intercambian: ahora 1 va antes que 5. (intercambios: 1)
1 5 4 2 8 | c1 c2 | Pasada 1: ¿5 > 4? Sí, hay que cambiarlos. (comparaciones: 2)
1 4 5 2 8 | i1 i2 | Se intercambian: ahora 4 va antes que 5. (intercambios: 2)
1 4 5 2 8 | c2 c3 | Pasada 1: ¿5 > 2? Sí, hay que cambiarlos. (comparaciones: 3)
1 4 2 5 8 | i2 i3 | Se intercambian: ahora 2 va antes que 5. (intercambios: 3)
1 4 2 5 8 | c3 c4 | Pasada 1: ¿5 > 8? No, se quedan. (comparaciones: 4)
1 4 2 5 8 | o4 | Fin de la pasada 1: el 8 ya quedó en su lugar.
1 4 2 5 8 | c0 c1 o4 | Pasada 2: ¿1 > 4? No, se quedan. (comparaciones: 5)
1 4 2 5 8 | c1 c2 o4 | Pasada 2: ¿4 > 2? Sí, hay que cambiarlos. (comparaciones: 6)
1 2 4 5 8 | i1 i2 o4 | Se intercambian: ahora 2 va antes que 4. (intercambios: 4)
1 2 4 5 8 | c2 c3 o4 | Pasada 2: ¿4 > 5? No, se quedan. (comparaciones: 7)
1 2 4 5 8 | o3 o4 | Fin de la pasada 2: el 5 ya quedó en su lugar.
1 2 4 5 8 | c0 c1 o3 o4 | Pasada 3: ¿1 > 2? No, se quedan. (comparaciones: 8)
1 2 4 5 8 | c1 c2 o3 o4 | Pasada 3: ¿2 > 4? No, se quedan. (comparaciones: 9)
1 2 4 5 8 | o2 o3 o4 | Fin de la pasada 3: el 4 ya quedó en su lugar.
1 2 4 5 8 | c0 c1 o2 o3 o4 | Pasada 4: ¿1 > 2? No, se quedan. (comparaciones: 10)
1 2 4 5 8 | o1 o2 o3 o4 | Fin de la pasada 4: el 2 ya quedó en su lugar.
1 2 4 5 8 | o0 o1 o2 o3 o4 | Lista ordenada. Total: 10 comparaciones y 4 intercambios.
```

Fíjate en tres cosas:

1. Cada pasada compara **una pareja menos** que la anterior: 4, 3, 2 y 1. No tiene sentido comparar con lo que ya está verde.
2. Con 5 elementos bastan **4 pasadas** (`n − 1`): cuando 4 están en su lugar, el que queda también.
3. Desde la pasada 3 ya no hubo intercambios: el vector estaba ordenado, pero la burbuja normal **no lo sabe** y sigue comparando. Eso lo arregla la burbuja mejorada (siguiente lección).

## En código

```python
def burbuja(v):
    n = len(v)
    for i in range(n - 1):            # pasadas: 0, 1, ..., n - 2
        for j in range(n - 1 - i):    # parejas (j, j + 1) que faltan
            if v[j] > v[j + 1]:
                v[j], v[j + 1] = v[j + 1], v[j]

datos = [5, 1, 4, 2, 8]
burbuja(datos)
print(datos)   # [1, 2, 4, 5, 8]
```

El `range(n - 1 - i)` es la clave. En la pasada `i` ya hay `i` elementos en su lugar al final, así que `j` llega hasta `n - 2 - i` y la última pareja comparada es `(n - 2 - i, n - 1 - i)`.

| Pasada `i` | `j` toma | Última pareja | Ya en su lugar |
| --- | --- | --- | --- |
| 0 | 0, 1, 2, 3 | (3, 4) | nada |
| 1 | 0, 1, 2 | (2, 3) | posición 4 |
| 2 | 0, 1 | (1, 2) | posiciones 3 y 4 |
| 3 | 0 | (0, 1) | posiciones 2, 3 y 4 |

En tu `OrdenarBurbuja.py` usaste `for i in range(largo)` y `for j in range(largo - 1)`: también ordena, pero en cada pasada vuelve a comparar con lo que ya estaba en su lugar. Con 5 elementos hace 20 comparaciones en vez de 10.

## Contar comparaciones e intercambios

Para medir, se agregan dos contadores. Cada vez que se evalúa `v[j] > v[j + 1]` es una **comparación**; cada vez que se cambian es un **intercambio**:

```python
def burbuja_contando(v):
    n = len(v)
    comp = 0
    inter = 0
    for i in range(n - 1):
        for j in range(n - 1 - i):
            comp = comp + 1
            if v[j] > v[j + 1]:
                v[j], v[j + 1] = v[j + 1], v[j]
                inter = inter + 1
    return comp, inter

datos = [5, 1, 4, 2, 8]
c, t = burbuja_contando(datos)
print(datos, c, t)   # [1, 2, 4, 5, 8] 10 4
```

- `comp = comp + 1` va **antes** del `if`: la comparación se cuenta salga verdadera o falsa.
- `inter = inter + 1` va **dentro** del `if`: solo cuenta cuando sí se intercambia.
- Las comparaciones de la burbuja normal son siempre `n(n − 1) / 2`. Los intercambios dependen de qué tan desordenado esté: 0 si ya estaba ordenado, `n(n − 1) / 2` si estaba al revés.

## Errores comunes

- **`range(n)` en el ciclo de adentro**: en la última vuelta `v[j + 1]` es `v[n]` y da `IndexError`.
- **Contar las comparaciones dentro del `if`**: así cuentas intercambios, no comparaciones.
- **Comparar con `<`** en vez de `>`: ordena de mayor a menor. A veces eso es lo que piden, pero hay que saber cuál usar.
- **Ordenar el original cuando hay que comparar métodos**: si ordenas con burbuja y luego le pasas el mismo vector (ya ordenado) a otro método, el segundo "gana" sin trabajar. Haz una copia antes, como en tu tarea: `copia = list(v)`.

## Antes de seguir

- Burbuja compara vecinos y los intercambia si están al revés; cada pasada deja al mayor al final.
- `for i in range(n - 1)` y adentro `for j in range(n - 1 - i)`.
- Comparaciones: contador antes del `if`. Intercambios: dentro del `if`.
- La burbuja normal hace siempre `n(n − 1) / 2` comparaciones, aunque el vector ya esté ordenado.
