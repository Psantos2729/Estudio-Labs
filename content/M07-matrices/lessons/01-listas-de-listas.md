# Listas de listas: la matriz

Un vector guarda una fila de datos. Una **matriz** guarda una tabla: filas y columnas. En Python una matriz es una **lista de listas**: cada posición de la lista de afuera es una fila, y cada fila es un vector.

```python
m = [[4, 7, 1],
     [9, 2, 6]]
print(len(m))       # 2 filas
print(len(m[0]))    # 3 columnas (lo que mide una fila)
print(m[1])         # la fila 1 completa
print(m[1][2])      # fila 1, columna 2 → 6
```

Siempre se nombra **primero la fila y luego la columna**: `m[fila][columna]`. Como en los vectores, las posiciones empiezan en 0, así que una matriz de 2 × 3 tiene filas 0 y 1, y columnas 0, 1 y 2.

## Crear una matriz de tamaño fijo

Igual que con los vectores, en el laboratorio la matriz se crea **del tamaño exacto** y luego se llena (nada de `append`). Es lo que hiciste en `crear_matriz` de tu tarea de matrices: primero la lista de filas, y después cada fila con su tamaño.

```python
filas = 2
cols = 3
m = [None] * filas
for i in range(filas):
    m[i] = [0] * cols
print(m)
```

## La trampa de `[[0] * 3] * 2`

Parece lo mismo, pero no lo es:

```python
m = [[0] * 3] * 2
m[0][0] = 5
print(m)   # ¡las dos filas cambiaron!
```

`[[0] * 3] * 2` crea **una sola fila** y pone dos veces la misma en la lista de afuera. Al cambiar la fila 0 también "cambia" la fila 1, porque son la misma lista. Por eso cada fila se crea por separado dentro del `for`, con su propio `[0] * cols`.

## Leer una matriz por teclado

En los ejercicios de este módulo la entrada viene así: primero el número de filas, luego el de columnas, y después **una línea por fila** con los valores separados por espacios. Por ejemplo, `2`, `3`, `4 7 1` y `9 2 6`.

Para partir la línea se usa `split()`, que ya conoces de M4: `"4 7 1".split()` da `['4', '7', '1']`, tres textos que hay que convertir con `int`.

```text
def leer_matriz():
    filas = int(input())
    cols = int(input())
    m = [None] * filas
    for i in range(filas):
        partes = input().split()
        m[i] = [0] * cols
        for j in range(cols):
            m[i][j] = int(partes[j])
    return m
```

Así se llena, paso a paso:

```matriz
m: · · · / · · · |  | m = [None] * 2 y cada fila con [0] * 3 (aquí · = todavía vacío).
m: · · · / · · · | c0.0 c0.1 c0.2 | input() lee la fila 0: "4 7 1". Se parte con split().
m: 4 · · / · · · | i0.0 | m[0][0] = int(partes[0]) → 4
m: 4 7 · / · · · | i0.1 | m[0][1] = int(partes[1]) → 7
m: 4 7 1 / · · · | i0.2 | m[0][2] = int(partes[2]) → 1
m: 4 7 1 / · · · | c1.0 c1.1 c1.2 | input() lee la fila 1: "9 2 6". Se parte con split().
m: 4 7 1 / 9 · · | i1.0 | m[1][0] = int(partes[0]) → 9
m: 4 7 1 / 9 2 · | i1.1 | m[1][1] = int(partes[1]) → 2
m: 4 7 1 / 9 2 6 | i1.2 | m[1][2] = int(partes[2]) → 6
m: 4 7 1 / 9 2 6 | o0.0 o0.1 o0.2 o1.0 o1.1 o1.2 | Matriz llena: 2 filas × 3 columnas.
```

## Imprimir como tabla

Para que se vea como tabla: un `for` por las filas, y adentro uno por las columnas que imprime con `end=' '`. Al terminar cada fila, un `print()` vacío baja de línea.

```python
def mostrar(m):
    for i in range(len(m)):
        for j in range(len(m[i])):
            print(m[i][j], end=' ')
        print()

mostrar([[4, 7, 1], [9, 2, 6]])
```

Fíjate en los dos `range`: el de afuera usa `len(m)` (filas) y el de adentro `len(m[i])` (columnas). Si los cambias, con una matriz que no es cuadrada te sales de la lista.

## Antes de seguir

- `m[i][j]`: fila `i`, columna `j`.
- Cada fila se crea por separado: `m[i] = [0] * cols`.
- Dos ciclos anidados: el de afuera recorre filas y el de adentro columnas.
