# Multiplicación de matrices

Es el jefe del módulo (tu tarea `matrices.py`) y la operación que más se equivoca, porque **no** es casilla por casilla.

## La regla

Para multiplicar A × B, las **columnas de A** deben ser iguales a las **filas de B**. Si A es F1 × C1 y B es F2 × C2, se necesita `C1 == F2`, y el resultado es de **F1 × C2**.

| A | B | ¿Se puede? | Resultado |
| --- | --- | --- | --- |
| 2 × 3 | 3 × 2 | sí | 2 × 2 |
| 2 × 3 | 3 × 4 | sí | 2 × 4 |
| 2 × 3 | 2 × 3 | no (3 ≠ 2) | — |
| 1 × 3 | 3 × 1 | sí | 1 × 1 |

Ojo: A × B y B × A casi nunca dan lo mismo, y a veces una se puede y la otra no.

## Cada casilla es fila por columna

La casilla `C[i][j]` sale de la **fila i de A** y la **columna j de B**: se multiplican en parejas y se suman.

```text
C[i][j] = A[i][0]·B[0][j] + A[i][1]·B[1][j] + ... + A[i][C1-1]·B[C1-1][j]
```

Por eso hacen falta **tres** ciclos: `i` recorre las filas de A, `j` las columnas de B, y `k` recorre la fila de A y la columna de B al mismo tiempo.

```python
A = [[1, 2, 3], [4, 5, 6]]
B = [[7, 8], [9, 10], [11, 12]]
F1 = len(A)
C1 = len(A[0])
C2 = len(B[0])
C = [None] * F1
for i in range(F1):
    C[i] = [0] * C2
    for j in range(C2):
        suma = 0
        for k in range(C1):
            suma = suma + A[i][k] * B[k][j]
        C[i][j] = suma
print(C)   # [[58, 64], [139, 154]]
```

Sigue cada multiplicación. Amarillo: las dos casillas que se multiplican. Rojo: la casilla de C que se está calculando.

```matriz
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: · · / · · |  | A es 2 × 3 y B es 3 × 2: 3 columnas = 3 filas, se puede. C será 2 × 2.
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 7 · / · · | c0:0.0 c1:0.0 i2:0.0 | C[0][0], k = 0: suma += A[0][0] · B[0][0] → 1·7 = 7
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 25 · / · · | c0:0.1 c1:1.0 i2:0.0 | C[0][0], k = 1: suma += A[0][1] · B[1][0] → 1·7 + 2·9 = 25
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 · / · · | c0:0.2 c1:2.0 i2:0.0 | C[0][0], k = 2: suma += A[0][2] · B[2][0] → 1·7 + 2·9 + 3·11 = 58
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 · / · · | k2:0.0 | C[0][0] = 58: fila 0 de A por columna 0 de B.
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 8 / · · | c0:0.0 c1:0.1 i2:0.1 | C[0][1], k = 0: suma += A[0][0] · B[0][1] → 1·8 = 8
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 28 / · · | c0:0.1 c1:1.1 i2:0.1 | C[0][1], k = 1: suma += A[0][1] · B[1][1] → 1·8 + 2·10 = 28
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / · · | c0:0.2 c1:2.1 i2:0.1 | C[0][1], k = 2: suma += A[0][2] · B[2][1] → 1·8 + 2·10 + 3·12 = 64
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / · · | k2:0.1 | C[0][1] = 64: fila 0 de A por columna 1 de B.
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / 28 · | c0:1.0 c1:0.0 i2:1.0 | C[1][0], k = 0: suma += A[1][0] · B[0][0] → 4·7 = 28
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / 73 · | c0:1.1 c1:1.0 i2:1.0 | C[1][0], k = 1: suma += A[1][1] · B[1][0] → 4·7 + 5·9 = 73
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / 139 · | c0:1.2 c1:2.0 i2:1.0 | C[1][0], k = 2: suma += A[1][2] · B[2][0] → 4·7 + 5·9 + 6·11 = 139
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / 139 · | k2:1.0 | C[1][0] = 139: fila 1 de A por columna 0 de B.
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / 139 32 | c0:1.0 c1:0.1 i2:1.1 | C[1][1], k = 0: suma += A[1][0] · B[0][1] → 4·8 = 32
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / 139 82 | c0:1.1 c1:1.1 i2:1.1 | C[1][1], k = 1: suma += A[1][1] · B[1][1] → 4·8 + 5·10 = 82
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / 139 154 | c0:1.2 c1:2.1 i2:1.1 | C[1][1], k = 2: suma += A[1][2] · B[2][1] → 4·8 + 5·10 + 6·12 = 154
A: 1 2 3 / 4 5 6 || B: 7 8 / 9 10 / 11 12 || C: 58 64 / 139 154 | k2:1.1 | C[1][1] = 154: fila 1 de A por columna 1 de B.
```

## Con validación

Así queda el programa completo del laboratorio: validar **antes** de crear el resultado.

```python
def multiplicar(A, B):
    if len(A[0]) != len(B):
        print('Error: las columnas de A deben ser iguales a las filas de B')
        return None
    C = [None] * len(A)
    for i in range(len(A)):
        C[i] = [0] * len(B[0])
        for j in range(len(B[0])):
            for k in range(len(B)):
                C[i][j] = C[i][j] + A[i][k] * B[k][j]
    return C

print(multiplicar([[1, 2]], [[3], [4]]))      # [[11]]
print(multiplicar([[1, 2]], [[3, 4]]))        # error y None
```

## Errores comunes

1. Validar `len(A) != len(B)` (filas con filas): esa es la regla de la **suma**, no de la multiplicación.
2. Poner `suma = 0` fuera del ciclo de `j`: cada casilla de C necesita su propia suma.
3. Crear C del tamaño de A: el resultado tiene las filas de A pero las **columnas de B**.
4. Usar `A[i][j] * B[i][j]`: eso es multiplicar casilla por casilla, que no es la multiplicación de matrices.
