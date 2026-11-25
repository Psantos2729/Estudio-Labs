# Búsqueda binaria

La búsqueda lineal de M5 revisa una por una: con un millón de datos puede hacer un millón de comparaciones. Si el vector está **ordenado** hay algo mucho mejor. Piensa en cómo buscas una palabra en el diccionario: abres a la mitad, ves si la palabra va antes o después, y descartas la mitad que no sirve. Repites con la mitad que queda. Eso es la **búsqueda binaria** (ejercicio 36 del PDF).

## La idea

Se llevan dos marcas, `izq` y `der`, con el pedazo del vector donde todavía puede estar el valor. Al inicio es todo el vector: `izq = 0` y `der = n − 1`. En cada paso:

1. Se mira la posición del medio: `medio = (izq + der) // 2`.
2. Si `v[medio]` es el valor buscado, terminó.
3. Si `v[medio]` es **menor**, el valor solo puede estar a la derecha: `izq = medio + 1`.
4. Si es **mayor**, solo puede estar a la izquierda: `der = medio − 1`.
5. Si `izq` pasa a `der`, el pedazo quedó vacío: el valor no está.

## Buscar un valor que sí está

Gris es lo descartado, amarillo la posición del medio que se revisa y morado el encontrado:

```pasos
2 5 8 12 16 23 38 56 72 91 |  | Lista ordenada. Se busca el 23 con izquierda = 0 y derecha = 9.
2 5 8 12 16 23 38 56 72 91 | c4 | medio = (0 + 9) // 2 = 4. v[4] = 16 < 23: se descarta la mitad izquierda, izquierda = 5.
2 5 8 12 16 23 38 56 72 91 | c7 x0 x1 x2 x3 x4 | medio = (5 + 9) // 2 = 7. v[7] = 56 > 23: se descarta la mitad derecha, derecha = 6.
2 5 8 12 16 23 38 56 72 91 | k5 x0 x1 x2 x3 x4 x7 x8 x9 | medio = (5 + 6) // 2 = 5. v[5] = 23: ¡encontrado en la posición 5!
```

Solo 3 comparaciones en un vector de 10. La lineal habría necesitado 6.

## Buscar uno que no está

```pasos
2 5 8 12 16 23 38 56 72 91 |  | Lista ordenada. Se busca el 40 con izquierda = 0 y derecha = 9.
2 5 8 12 16 23 38 56 72 91 | c4 | medio = (0 + 9) // 2 = 4. v[4] = 16 < 40: se descarta la mitad izquierda, izquierda = 5.
2 5 8 12 16 23 38 56 72 91 | c7 x0 x1 x2 x3 x4 | medio = (5 + 9) // 2 = 7. v[7] = 56 > 40: se descarta la mitad derecha, derecha = 6.
2 5 8 12 16 23 38 56 72 91 | c5 x0 x1 x2 x3 x4 x7 x8 x9 | medio = (5 + 6) // 2 = 5. v[5] = 23 < 40: se descarta la mitad izquierda, izquierda = 6.
2 5 8 12 16 23 38 56 72 91 | c6 x0 x1 x2 x3 x4 x5 x7 x8 x9 | medio = (6 + 6) // 2 = 6. v[6] = 38 < 40: se descarta la mitad izquierda, izquierda = 7.
2 5 8 12 16 23 38 56 72 91 | x0 x1 x2 x3 x4 x5 x6 x7 x8 x9 | izquierda (7) pasó a derecha (6): el 40 no está en la lista.
```

En 4 pasos se sabe que no está, sin revisar los 10 valores.

## En código

```python
def busqueda_binaria(v, x):
    izq = 0
    der = len(v) - 1
    while izq <= der:
        medio = (izq + der) // 2
        if v[medio] == x:
            return medio
        if v[medio] < x:
            izq = medio + 1
        else:
            der = medio - 1
    return -1   # -1 significa "no está"

v = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(busqueda_binaria(v, 23))   # 5
print(busqueda_binaria(v, 40))   # -1
```

- La condición es `izq <= der` (con el igual): cuando `izq == der` queda un elemento por revisar.
- `medio + 1` y `medio − 1`, no `medio`: el del medio ya se revisó. Si escribes `izq = medio`, el ciclo puede quedarse dando vueltas para siempre.
- Se devuelve -1 cuando no está, porque -1 nunca es una posición válida contando desde 0.

## ¿Por qué es tan rápida?

Cada paso **parte a la mitad** lo que queda. Con 1,000 datos: 500, 250, 125, 63, 32, 16, 8, 4, 2, 1. En unos 10 pasos se termina.

| n | lineal (peor caso) | binaria (peor caso) |
| --- | --- | --- |
| 10 | 10 | 4 |
| 1,000 | 1,000 | 10 |
| 1,000,000 | 1,000,000 | 20 |

El precio: **el vector tiene que estar ordenado**. Si no lo está, la binaria descarta mitades equivocadas y da respuestas falsas sin ningún error. Por eso el ejercicio 36 primero ordena con inserción y después busca.

## El ejercicio 36

Pide buscar "el valor absoluto del promedio" de los datos. El promedio casi nunca es entero, y la búsqueda necesita un entero: en esta plataforma se usa el **promedio entero**, `suma // n`. Como los datos van de 100 a 999 siempre es positivo, así que `abs()` no lo cambia, pero es bueno escribirlo como lo pide el enunciado: `abs(suma // n)`.

Si el valor aparece repetido, la búsqueda binaria encuentra **una** de sus posiciones (la que caiga primero en un medio), no necesariamente la primera.

## Reto: binaria recursiva

La búsqueda binaria también se puede escribir como una función recursiva (M4): busca en un pedazo y, si no lo encontró, se llama a sí misma con la mitad que queda. El caso base es el pedazo vacío (`izq > der`).

## Antes de seguir

- Solo funciona con el vector **ordenado**.
- `medio = (izq + der) // 2`; luego `izq = medio + 1` o `der = medio − 1`.
- El ciclo sigue mientras `izq <= der`; si termina sin encontrarlo, no está.
- Con un millón de datos, unas 20 comparaciones en vez de un millón.
