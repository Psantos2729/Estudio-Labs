# Mezclar listas ordenadas y elegir el método

El ejercicio 33 del PDF pide una función `Mezcla2` que reciba dos listas **ya ordenadas** y devuelva una nueva con todos los elementos, también ordenada. Se podría juntar todo y ordenar con burbuja, pero eso desperdicia el trabajo: las dos listas ya vienen en orden.

## Dos índices que avanzan

La idea es la de dos filas de personas ordenadas por estatura que se juntan en una sola: en cada paso se compara a la primera persona que queda en cada fila y pasa la más baja. Se lleva un índice `i` para A, uno `j` para B y uno `k` para el resultado.

```pasos
· · · · · · · |  | A = [1, 4, 9], B = [2, 3, 10, 12]. Se compara el primero que queda de cada una y el menor pasa al resultado.
1 · · · · · · | k0 | A[0] = 1 ≤ B[0] = 2: pasa el 1 de A.
1 2 · · · · · | k1 o0 | A[1] = 4 > B[0] = 2: pasa el 2 de B.
1 2 3 · · · · | k2 o0 o1 | A[1] = 4 > B[1] = 3: pasa el 3 de B.
1 2 3 4 · · · | k3 o0 o1 o2 | A[1] = 4 ≤ B[2] = 10: pasa el 4 de A.
1 2 3 4 9 · · | k4 o0 o1 o2 o3 | A[2] = 9 ≤ B[2] = 10: pasa el 9 de A.
1 2 3 4 9 10 · | k5 o0 o1 o2 o3 o4 | A ya se acabó: pasa el 10 que quedaba en B.
1 2 3 4 9 10 12 | k6 o0 o1 o2 o3 o4 o5 | A ya se acabó: pasa el 12 que quedaba en B.
1 2 3 4 9 10 12 | o0 o1 o2 o3 o4 o5 o6 | Resultado ordenado, sin volver a ordenar nada.
```

Cuando una de las dos listas se acaba, lo que queda de la otra ya está ordenado y mayor que todo lo anterior, así que se copia tal cual.

## En código, con tamaño fijo

El resultado se crea desde el inicio con el tamaño exacto, `len(A) + len(B)`, y se llena por posición (nada de `append`, igual que en M5):

```python
def mezcla2(A, B):
    R = [0] * (len(A) + len(B))
    i = 0
    j = 0
    k = 0
    while i < len(A) and j < len(B):
        if A[i] <= B[j]:
            R[k] = A[i]
            i = i + 1
        else:
            R[k] = B[j]
            j = j + 1
        k = k + 1
    while i < len(A):        # lo que sobró de A
        R[k] = A[i]
        i = i + 1
        k = k + 1
    while j < len(B):        # lo que sobró de B
        R[k] = B[j]
        j = j + 1
        k = k + 1
    return R

print(mezcla2([1, 4, 9], [2, 3, 10, 12]))   # [1, 2, 3, 4, 9, 10, 12]
```

- Solo **uno** de los dos `while` finales copia algo: el primer ciclo terminó porque una de las listas se acabó.
- Con `<=` (y no `<`), si hay un empate pasa primero el de A. El resultado es el mismo, pero así queda definido.
- Cada elemento se mira una sola vez: el trabajo crece con `len(A) + len(B)`, no con su cuadrado.

Esta mezcla es la pieza central de **merge sort**, uno de los métodos rápidos que vas a ver más adelante en la carrera: parte el vector en mitades, las ordena y las mezcla así.

## Lo que pide el ejercicio 33

Con el resultado `R` de largo `n`:

- El dato de la menor posición es `R[0]` y el de la mayor es `R[n - 1]`. Como `R` está ordenado, son el mínimo y el máximo.
- La posición media es `(n - 1) // 2`, igual que en la lección 5, y para ese dato se dice si es par (`% 2 == 0`) o impar.

## ¿Qué método uso?

| Situación | Método |
| --- | --- |
| Pocos datos y quieres el código más simple | burbuja mejorada o inserción |
| Datos casi ordenados | inserción o burbuja mejorada (paran pronto) |
| Mover datos es caro (registros grandes) | selección: como mucho `n − 1` intercambios |
| Enteros en un rango chico (notas, edades) | conteo: sin comparaciones |
| Dos listas que ya vienen ordenadas | mezcla |
| Buscar muchas veces en el mismo vector | ordenar una vez y usar búsqueda binaria |
| Programa real en Python | `sorted(v)` o `v.sort()`, que ya están optimizados |

En los laboratorios lo importante es que puedas **escribir** cada método, **contar** su trabajo y **explicar** por qué uno gana: en tu análisis, la tabla de comparaciones e intercambios vale más que el tiempo, porque no depende de la computadora.

## Reto: radix sort

Tu `Leetcode_1.py` usa **radix sort**, que ordena enteros cifra por cifra: primero todos por las unidades, luego por las decenas, luego por las centenas. En cada ronda se reparten en 10 "cubetas" (una por dígito, de 0 a 9) manteniendo el orden en que llegaron. Después de la ronda de la cifra más alta, el vector queda ordenado. Usa `n // 1, n // 10, n // 100, …` y `% 10` para sacar cada cifra, como en M3.

## Antes de seguir

- Mezcla2: tres índices; pasa el menor de los dos primeros; al final se copia lo que sobra.
- El resultado se crea con el tamaño exacto `len(A) + len(B)`.
- Menor y mayor posición: `R[0]` y `R[n - 1]`; posición media: `(n - 1) // 2`.
- Cada método tiene su caso: sabe elegir y justificar con comparaciones e intercambios.
