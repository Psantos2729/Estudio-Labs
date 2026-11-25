# Tableros: ajedrez, vecinos y tres en raya

Muchos problemas usan una matriz como **tablero**: cada casilla guarda lo que hay en ella. Lo importante es convertir entre la casilla que ve el usuario ("C5") y los índices de la matriz.

## El tablero de ajedrez

En tu tarea `ajedrez.py` el color de cada casilla sale de `(i + j) % 2`: si la suma de fila y columna es par, es blanca (0); si es impar, negra (1). Así los colores se alternan solos, en filas y en columnas.

```python
t = [None] * 8
for i in range(8):
    t[i] = [0] * 8
    for j in range(8):
        t[i][j] = (i + j) % 2
for i in range(8):
    for j in range(8):
        print('N' if t[i][j] == 1 else 'B', end=' ')
    print()
```

## De "C5" a índices

Si las filas se llaman con letras (A a H) y las columnas con números (1 a 8), como en tu tarea:

```python
letras = 'ABCDEFGH'
casilla = 'C5'
i = letras.index(casilla[0])   # 'C' → 2
j = int(casilla[1]) - 1        # '5' → 4
print(i, j, (i + j) % 2)       # 2 4 0 → blanca
```

El `- 1` es porque el usuario cuenta desde 1 y la matriz desde 0. Es el error más común en tableros.

## Los vecinos de una casilla

Los 8 vecinos de `(i, j)` están en las filas `i - 1` a `i + 1` y columnas `j - 1` a `j + 1`, **sin contar la casilla misma**. En los bordes algunos vecinos no existen, así que hay que revisar que el índice esté dentro: `0 <= f < filas` y `0 <= c < cols`.

```python
t = ['.*..', '...*', '*...']
filas = len(t)
cols = len(t[0])
i = 1
j = 1
minas = 0
for f in range(i - 1, i + 2):
    for c in range(j - 1, j + 2):
        if 0 <= f < filas and 0 <= c < cols and (f != i or c != j):
            if t[f][c] == '*':
                minas = minas + 1
print(minas)   # 2
```

```matriz
. * . . / . . . * / * . . . | k1.1 | Casilla (1, 1). Sus vecinos están en las filas 0 a 2 y columnas 0 a 2.
. * . . / . . . * / * . . . | k1.1 c0.0 | Vecino (0, 0): libre. Minas: 0
. * . . / . . . * / * . . . | k1.1 i0.1 | Vecino (0, 1): mina. Minas: 1
. * . . / . . . * / * . . . | k1.1 c0.2 | Vecino (0, 2): libre. Minas: 1
. * . . / . . . * / * . . . | k1.1 c1.0 | Vecino (1, 0): libre. Minas: 1
. * . . / . . . * / * . . . | k1.1 c1.2 | Vecino (1, 2): libre. Minas: 1
. * . . / . . . * / * . . . | k1.1 i2.0 | Vecino (2, 0): mina. Minas: 2
. * . . / . . . * / * . . . | k1.1 c2.1 | Vecino (2, 1): libre. Minas: 2
. * . . / . . . * / * . . . | k1.1 c2.2 | Vecino (2, 2): libre. Minas: 2
. * . . / . . . * / * . . . | k1.1 | La casilla (1, 1) tiene 2 minas alrededor.
```

Ojo con los índices negativos: en Python `t[-1]` no da error, da la **última** fila. Por eso la revisión `0 <= f` es obligatoria; sin ella, la casilla de la esquina "ve" vecinos del otro lado del tablero.

## Tres en raya: ¿quién ganó?

Un tablero de 3 × 3 con `X`, `O` y `.`. Gana quien tenga tres iguales en una **fila**, una **columna** o una de las dos **diagonales**: justo los recorridos de la lección 2.

```python
t = [['X', 'O', '.'],
     ['X', 'X', 'O'],
     ['O', 'O', 'X']]

def gana(t, s):
    for i in range(3):
        if t[i][0] == s and t[i][1] == s and t[i][2] == s:
            return True
        if t[0][i] == s and t[1][i] == s and t[2][i] == s:
            return True
    if t[0][0] == s and t[1][1] == s and t[2][2] == s:
        return True
    return t[0][2] == s and t[1][1] == s and t[2][0] == s

print(gana(t, 'X'), gana(t, 'O'))   # True False
```

## Resumen del módulo

- La matriz es una lista de listas: `m[fila][columna]`, cada fila creada por separado.
- Filas afuera para sumar filas; columnas afuera para sumar columnas.
- Suma: mismo tamaño. Multiplicación: columnas de A = filas de B, resultado F1 × C2, tres ciclos.
- Traspuesta: C × F con `T[j][i] = A[i][j]`.
- Tableros: convierte lo que ve el usuario a índices (`- 1`) y revisa los bordes.
