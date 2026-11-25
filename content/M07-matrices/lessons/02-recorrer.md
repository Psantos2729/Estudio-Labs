# Recorrer por filas y por columnas

Casi todo lo que se pide con matrices es un **recorrido**: pasar por cada casilla en algún orden y acumular algo. Lo que cambia es qué ciclo va afuera.

## Suma de cada fila

El ciclo de afuera recorre las filas. Para cada fila la suma empieza en 0, y el de adentro pasa por sus columnas:

```python
m = [[3, 8, 1], [6, 0, 7], [2, 4, 9]]
for i in range(len(m)):
    suma = 0
    for j in range(len(m[i])):
        suma = suma + m[i][j]
    print(f'Fila {i}: {suma}')
```

```matriz
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 3 / 0 / 0 | c0:0.0 i1:0.0 | Fila 0, columna 0: suma = suma + m[0][0] = 3
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 / 0 / 0 | c0:0.1 i1:0.0 | Fila 0, columna 1: suma = suma + m[0][1] = 11
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 0 / 0 | c0:0.2 i1:0.0 | Fila 0, columna 2: suma = suma + m[0][2] = 12
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 0 / 0 | o1:0.0 | Fin de la fila 0: su suma es 12.
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 6 / 0 | c0:1.0 i1:1.0 | Fila 1, columna 0: suma = suma + m[1][0] = 6
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 6 / 0 | c0:1.1 i1:1.0 | Fila 1, columna 1: suma = suma + m[1][1] = 6
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 13 / 0 | c0:1.2 i1:1.0 | Fila 1, columna 2: suma = suma + m[1][2] = 13
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 13 / 0 | o1:1.0 | Fin de la fila 1: su suma es 13.
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 13 / 2 | c0:2.0 i1:2.0 | Fila 2, columna 0: suma = suma + m[2][0] = 2
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 13 / 6 | c0:2.1 i1:2.0 | Fila 2, columna 1: suma = suma + m[2][1] = 6
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 13 / 15 | c0:2.2 i1:2.0 | Fila 2, columna 2: suma = suma + m[2][2] = 15
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 12 / 13 / 15 | o1:2.0 | Fin de la fila 2: su suma es 15.
```

## Suma de cada columna

Ahora el de **afuera** recorre las columnas y el de adentro baja por las filas. El índice sigue siendo `m[i][j]` (fila, columna); lo único que cambia es el orden de los ciclos.

```python
m = [[3, 8, 1], [6, 0, 7], [2, 4, 9]]
for j in range(len(m[0])):
    suma = 0
    for i in range(len(m)):
        suma = suma + m[i][j]
    print(f'Columna {j}: {suma}')
```

```matriz
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 3 0 0 | c0:0.0 i1:0.0 | Columna 0, fila 0: suma = suma + m[0][0] = 3
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 9 0 0 | c0:1.0 i1:0.0 | Columna 0, fila 1: suma = suma + m[1][0] = 9
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 0 0 | c0:2.0 i1:0.0 | Columna 0, fila 2: suma = suma + m[2][0] = 11
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 0 0 | o1:0.0 | Fin de la columna 0: su suma es 11.
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 8 0 | c0:0.1 i1:0.1 | Columna 1, fila 0: suma = suma + m[0][1] = 8
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 8 0 | c0:1.1 i1:0.1 | Columna 1, fila 1: suma = suma + m[1][1] = 8
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 12 0 | c0:2.1 i1:0.1 | Columna 1, fila 2: suma = suma + m[2][1] = 12
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 12 0 | o1:0.1 | Fin de la columna 1: su suma es 12.
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 12 1 | c0:0.2 i1:0.2 | Columna 2, fila 0: suma = suma + m[0][2] = 1
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 12 8 | c0:1.2 i1:0.2 | Columna 2, fila 1: suma = suma + m[1][2] = 8
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 12 17 | c0:2.2 i1:0.2 | Columna 2, fila 2: suma = suma + m[2][2] = 17
m: 3 8 1 / 6 0 7 / 2 4 9 || suma: 11 12 17 | o1:0.2 | Fin de la columna 2: su suma es 17.
```

Error común: dejar `suma = 0` **antes** de los dos ciclos. Entonces la suma de la fila 1 arrastra la de la fila 0. El acumulador se reinicia donde empieza cada fila (o columna).

## El mayor y dónde está

Como en vectores: se empieza con la primera casilla y se compara con todas. Para la posición se guardan **dos** índices.

```python
m = [[3, 8, 1], [5, 9, 7], [9, 4, 6]]
mayor = m[0][0]
fm = 0
cm = 0
for i in range(len(m)):
    for j in range(len(m[i])):
        if m[i][j] > mayor:
            mayor = m[i][j]
            fm = i
            cm = j
print(f'Mayor: {mayor} en fila {fm}, columna {cm}')
```

Con `>` se queda la **primera** vez que aparece (recorriendo fila por fila): el 9 de la fila 1, no el de la fila 2. Con `>=` se quedaría la última.

## Diagonales (solo matrices cuadradas)

En una matriz de N × N:

- La **diagonal principal** son las casillas donde la fila es igual a la columna: `m[i][i]`.
- La **diagonal secundaria** va de la esquina de arriba a la derecha a la de abajo a la izquierda: `m[i][n - 1 - i]`.

```python
m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
n = len(m)
for i in range(n):
    print(m[i][i], end=' ')       # 1 5 9
print()
for i in range(n):
    print(m[i][n - 1 - i], end=' ')   # 3 5 7
print()
```

Basta **un** ciclo: no hace falta recorrer toda la matriz para llegar a la diagonal. Y las partes de arriba y abajo de la diagonal se reconocen con `j > i` (arriba) y `j < i` (abajo).

## Contar con condiciones

Los conteos funcionan igual que en vectores, con un `if` dentro de los dos ciclos:

```python
m = [[3, -8, 0], [5, 0, -7]]
pos = 0
neg = 0
ceros = 0
for i in range(len(m)):
    for j in range(len(m[i])):
        if m[i][j] > 0:
            pos = pos + 1
        elif m[i][j] < 0:
            neg = neg + 1
        else:
            ceros = ceros + 1
print(pos, neg, ceros)   # 2 2 2
```
