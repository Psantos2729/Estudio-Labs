# Listas como vectores de tamaño fijo

Un **vector** (o arreglo) guarda muchos valores del mismo tipo bajo un solo nombre, cada uno en una posición numerada. En Python se hace con una **lista**. Con un vector ya no necesitas `n1`, `n2`, `n3`…: guardas las 30 notas de una sección en `notas` y llegas a cada una por su posición.

## La regla de este curso: tamaño definido

En C++, C# o Java (y en los laboratorios) un arreglo **se crea con su tamaño desde el inicio** y ese tamaño no cambia. Python permite hacer crecer y encoger una lista con `append`, `insert`, `pop` o `remove`, pero **aquí no los vas a usar**. La forma de trabajar es siempre la misma, como en tus tareas `Vectores.py` y `Encontrar.py`:

1. Saber cuántos elementos habrá (`n`).
2. Crear el vector con ese tamaño: `v = [0] * n`.
3. Llenar o cambiar cada posición con `v[i] = ...`.

Así piensas como lo exige un arreglo de verdad: cada posición existe desde el principio y tú decides qué va en ella.

```python
n = 5
v = [0] * n
print(v)        # [0, 0, 0, 0, 0]
print(len(v))   # 5
```

`[0] * n` crea una lista con `n` ceros. El 0 es solo un valor inicial: después cada posición se reemplaza.

## Posiciones (índices)

Las posiciones van de **0** a **n − 1**, igual que en los textos de M4:

```text
v = [ 72,  85,  61,  90,  48 ]
       0    1    2    3    4      ← índice
      -5   -4   -3   -2   -1      ← índice negativo
```

```python
v = [72, 85, 61, 90, 48]
print(v[0])    # 72: el primero
print(v[4])    # 48: el último (n - 1)
print(v[-1])   # 48: también el último
v[2] = 65      # reemplazar el valor de la posición 2
print(v)       # [72, 85, 65, 90, 48]
```

A diferencia de los textos, **las listas sí se pueden modificar** por posición. Pero no puedes escribir en una posición que no existe: en un vector de 5, `v[5] = 10` da `IndexError`. Por eso el tamaño se decide primero.

## Leer un vector

En los ejercicios de este módulo primero se lee **N** y luego los N valores, uno por línea:

```text
n = int(input())
v = [0] * n
for i in range(n):
    v[i] = int(input())
```

`range(n)` recorre justo las posiciones válidas: 0, 1, …, n − 1. Cada vuelta guarda un valor en su lugar.

## Mostrar un vector

`print(v)` muestra los corchetes y las comas: `[72, 85, 61]`. Para mostrarlo separado por espacios, recorre e imprime cada valor con `end=' '`, que cambia el salto de línea por un espacio:

```python
v = [72, 85, 61]
for i in range(len(v)):
    print(v[i], end=' ')
print()   # el salto de línea final
```

Imprime `72 85 61 `. El espacio que sobra al final no importa al calificar.

## Recorrer al revés

Para recorrer de la última posición a la primera, `range` necesita tres datos: desde `n - 1`, hasta `-1` (no incluido) y con paso `-1`:

```python
v = [10, 20, 30, 40]
for i in range(len(v) - 1, -1, -1):
    print(v[i], end=' ')
print()   # 40 30 20 10
```

Es un error común poner `range(len(v) - 1, 0, -1)`: eso se detiene antes de la posición 0 y se salta el primer elemento.

## Copiar un vector

Esto sorprende a casi todos:

```python
a = [1, 2, 3]
b = a
b[0] = 99
print(a)   # [99, 2, 3]
```

`b = a` **no copia**: hace que `b` sea otro nombre para la misma lista. Para tener una copia independiente se crea un vector nuevo del mismo tamaño y se pasa cada valor, o se usa `list(a)` (como hiciste en `Sort_De_Inserción.py` para no desordenar el original):

```python
a = [1, 2, 3]
b = [0] * len(a)
for i in range(len(a)):
    b[i] = a[i]
b[0] = 99
print(a, b)   # [1, 2, 3] [99, 2, 3]
```

## Antes de seguir

- Primero el tamaño: `v = [0] * n`. Nada de `append` ni `pop`.
- Posiciones de 0 a `n - 1`; `v[i] = x` cambia una posición.
- `for i in range(n)` recorre; `range(n - 1, -1, -1)` recorre al revés.
- `b = a` no copia: crea otro nombre para la misma lista.
