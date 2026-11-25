# Suma de matrices y traspuesta

## Sumar dos matrices

Dos matrices se suman **casilla por casilla**: `C[i][j] = A[i][j] + B[i][j]`. Por eso solo se pueden sumar si tienen **el mismo tamaño** (mismas filas y mismas columnas). Antes de sumar, se valida:

```python
A = [[1, 2, 3], [4, 5, 6]]
B = [[10, 20, 30], [40, 50, 60]]
if len(A) != len(B) or len(A[0]) != len(B[0]):
    print('Error: las matrices deben tener el mismo tamaño')
else:
    C = [None] * len(A)
    for i in range(len(A)):
        C[i] = [0] * len(A[0])
        for j in range(len(A[0])):
            C[i][j] = A[i][j] + B[i][j]
    print(C)
```

Fíjate en el `or`: basta que **una** de las dos medidas sea distinta para que no se pueda.

## Error común: el orden de los argumentos

Supón una función `crear_matriz(ancho, alto)` (primero columnas, luego filas). Si al crear la matriz del resultado la llamas como `crear_matriz(filas, columnas)`, con una matriz cuadrada no pasa nada, pero con una de 2 × 3 creas una de 3 × 2 y el programa se cae con `IndexError` al escribir `C[0][2]`.

```python
def crear_matriz(ancho, alto):
    m = [None] * alto
    for i in range(alto):
        m[i] = [0] * ancho
    return m

filas = 2
cols = 3
C = crear_matriz(filas, cols)   # ¡al revés! debería ser crear_matriz(cols, filas)
print(len(C), 'filas y', len(C[0]), 'columnas')
```

Por eso conviene probar siempre con una matriz **que no sea cuadrada**: los errores de fila y columna cambiadas se esconden en las cuadradas.

## La traspuesta

La **traspuesta** cambia filas por columnas: la fila 0 se vuelve la columna 0. Si A es de F × C, su traspuesta T es de **C × F**, y `T[j][i] = A[i][j]`.

```python
A = [[1, 2, 3], [4, 5, 6]]
F = len(A)
C = len(A[0])
T = [None] * C
for j in range(C):
    T[j] = [0] * F
for i in range(F):
    for j in range(C):
        T[j][i] = A[i][j]
print(T)   # [[1, 4], [2, 5], [3, 6]]
```

```matriz
A: 1 2 3 / 4 5 6 || T: · · / · · / · · |  | A es 2 × 3, así que T es 3 × 2.
A: 1 2 3 / 4 5 6 || T: 1 · / · · / · · | c0:0.0 i1:0.0 | T[0][0] = A[0][0] = 1: fila y columna se cambian.
A: 1 2 3 / 4 5 6 || T: 1 · / 2 · / · · | c0:0.1 i1:1.0 | T[1][0] = A[0][1] = 2: fila y columna se cambian.
A: 1 2 3 / 4 5 6 || T: 1 · / 2 · / 3 · | c0:0.2 i1:2.0 | T[2][0] = A[0][2] = 3: fila y columna se cambian.
A: 1 2 3 / 4 5 6 || T: 1 4 / 2 · / 3 · | c0:1.0 i1:0.1 | T[0][1] = A[1][0] = 4: fila y columna se cambian.
A: 1 2 3 / 4 5 6 || T: 1 4 / 2 5 / 3 · | c0:1.1 i1:1.1 | T[1][1] = A[1][1] = 5: fila y columna se cambian.
A: 1 2 3 / 4 5 6 || T: 1 4 / 2 5 / 3 6 | c0:1.2 i1:2.1 | T[2][1] = A[1][2] = 6: fila y columna se cambian.
A: 1 2 3 / 4 5 6 || T: 1 4 / 2 5 / 3 6 | o1:0.0 o1:1.0 o1:2.0 o1:0.1 o1:1.1 o1:2.1 | La fila 0 de A (1 2 3) es ahora la columna 0 de T.
```

Una matriz cuadrada es **simétrica** si es igual a su traspuesta: `m[i][j] == m[j][i]` para todas las casillas.

## Multiplicar por un número

Multiplicar una matriz por un número (un **escalar**) es multiplicar cada casilla: `m[i][j] = m[i][j] * k`. No necesita validación.

```python
m = [[1, 2], [3, 4]]
for i in range(len(m)):
    for j in range(len(m[i])):
        m[i][j] = m[i][j] * 3
print(m)   # [[3, 6], [9, 12]]
```
