# Ordenar: intercambios y el método de selección

Ordenar es una de las tareas más comunes de la programación: notas de menor a mayor, nombres en orden alfabético, precios del más barato al más caro. Y también es la base de otras cosas: la búsqueda binaria (lección 6) **solo funciona** si el vector ya está ordenado.

Python tiene `sorted()` y `.sort()`, pero en los laboratorios te piden **implementar** los métodos a mano, contar cuánto trabajo hacen y compararlos. En este módulo vas a ver cinco: selección, burbuja, burbuja mejorada, inserción y conteo. Cada uno trae un recorrido **paso a paso**: úsalo con calma, porque entender qué pasa en cada paso es lo que hace que el código tenga sentido.

## ¿Está ordenado?

Antes de ordenar, a veces hay que revisar si ya lo está (lo pide el ejercicio 30 del PDF). Un vector está ordenado de menor a mayor si **cada valor es menor o igual que el siguiente**:

```python
v = [12, 25, 25, 40, 38]
ordenado = True
for i in range(len(v) - 1):
    if v[i] > v[i + 1]:
        ordenado = False
print(ordenado)   # False: 40 > 38
```

Basta **una** pareja al revés para que no esté ordenado. Es la misma bandera del palíndromo en M4.

## La pieza básica: intercambiar

Todos los métodos de comparación mueven valores intercambiando dos posiciones. Esto **no funciona**:

```python
v = [5, 9]
v[0] = v[1]
v[1] = v[0]
print(v)   # [9, 9]: el 5 se perdió
```

Al escribir `v[0] = v[1]` el 5 se borra antes de poder copiarlo. La forma clásica (la que se usa en C++ o C#) guarda uno en una variable temporal:

```python
v = [5, 9]
temp = v[0]
v[0] = v[1]
v[1] = temp
print(v)   # [9, 5]
```

Python tiene un atajo que hace lo mismo, y es el que usaste en tus tareas:

```python
v = [5, 9]
v[0], v[1] = v[1], v[0]
print(v)   # [9, 5]
```

Python evalúa **primero** todo lo de la derecha (9 y 5) y después lo guarda a la izquierda.

## Selección: el mayor al final

Así lo hiciste en `Ordenar_Selección.py`: busca el **mayor** de la parte que falta ordenar y lo **intercambia con la última posición** de esa parte. Esa posición ya queda lista y la parte sin ordenar se achica en uno. Se repite hasta que solo queda uno.

Recórrelo paso a paso. Morado es el mayor encontrado hasta ese momento, amarillo el que se está comparando, rojo el intercambio y verde lo que ya quedó en su lugar:

```pasos
29 10 14 37 13 |  | Lista original. Se busca el mayor y se manda al final de la parte sin ordenar.
29 10 14 37 13 | k0 | Buscar el mayor entre las posiciones 0 y 4. Por ahora el mayor es 29 (posición 0).
29 10 14 37 13 | k0 c1 | ¿10 > 29? No, el mayor sigue siendo 29.
29 10 14 37 13 | k0 c2 | ¿14 > 29? No, el mayor sigue siendo 29.
29 10 14 37 13 | k3 | ¿37 > 29? Sí: el nuevo mayor es 37 (posición 3).
29 10 14 37 13 | k3 c4 | ¿13 > 37? No, el mayor sigue siendo 37.
29 10 14 13 37 | i3 i4 | Se intercambian las posiciones 3 y 4: el 37 va al final.
29 10 14 13 37 | k0 o4 | Buscar el mayor entre las posiciones 0 y 3. Por ahora el mayor es 29 (posición 0).
29 10 14 13 37 | k0 c1 o4 | ¿10 > 29? No, el mayor sigue siendo 29.
29 10 14 13 37 | k0 c2 o4 | ¿14 > 29? No, el mayor sigue siendo 29.
29 10 14 13 37 | k0 c3 o4 | ¿13 > 29? No, el mayor sigue siendo 29.
13 10 14 29 37 | i0 i3 o4 | Se intercambian las posiciones 0 y 3: el 29 va al final.
13 10 14 29 37 | k0 o3 o4 | Buscar el mayor entre las posiciones 0 y 2. Por ahora el mayor es 13 (posición 0).
13 10 14 29 37 | k0 c1 o3 o4 | ¿10 > 13? No, el mayor sigue siendo 13.
13 10 14 29 37 | k2 o3 o4 | ¿14 > 13? Sí: el nuevo mayor es 14 (posición 2).
13 10 14 29 37 | k2 o3 o4 | El mayor ya está en la posición 2: no hace falta intercambiar.
13 10 14 29 37 | k0 o2 o3 o4 | Buscar el mayor entre las posiciones 0 y 1. Por ahora el mayor es 13 (posición 0).
13 10 14 29 37 | k0 c1 o2 o3 o4 | ¿10 > 13? No, el mayor sigue siendo 13.
10 13 14 29 37 | i0 i1 o2 o3 o4 | Se intercambian las posiciones 0 y 1: el 13 va al final.
10 13 14 29 37 | o0 o1 o2 o3 o4 | Lista ordenada.
```

En código, con la función que busca el índice del mayor (como tu `indice_mayor`):

```python
def indice_mayor(v, hasta):
    m = 0
    for j in range(1, hasta + 1):
        if v[j] > v[m]:
            m = j
    return m

def seleccion(v):
    for fin in range(len(v) - 1, 0, -1):
        m = indice_mayor(v, fin)
        v[m], v[fin] = v[fin], v[m]

datos = [29, 10, 14, 37, 13]
seleccion(datos)
print(datos)   # [10, 13, 14, 29, 37]
```

- `fin` va de la última posición hasta 1: es el lugar que se está llenando en esta pasada. Cuando solo queda la posición 0, ya está en su lugar.
- `indice_mayor(v, fin)` solo mira de 0 a `fin`. Lo de la derecha de `fin` ya está ordenado y no se vuelve a tocar.
- La función cambia el vector que recibe (M5): no hace falta `return`.

También existe la versión "al revés": buscar el **menor** y mandarlo al **inicio**. Es el mismo método, de izquierda a derecha.

## ¿Cuánto trabajo hace?

En los laboratorios se mide el costo de un ordenamiento contando dos cosas:

- **Comparaciones**: cuántas veces se comparan dos elementos del vector (`v[j] > v[m]`).
- **Intercambios**: cuántas veces se cambian dos posiciones de lugar.

Con 5 elementos, selección compara 4 + 3 + 2 + 1 = 10 veces, **siempre**, esté como esté el vector: aunque ya venga ordenado, tiene que revisar cada parte para estar seguro de cuál es el mayor. Con `n` elementos son `n(n − 1) / 2` comparaciones. En cambio hace pocos intercambios: como mucho `n − 1`, uno por pasada (y ninguno si el mayor ya estaba al final, como en la tercera pasada del recorrido de arriba).

| n | comparaciones de selección |
| --- | --- |
| 5 | 10 |
| 10 | 45 |
| 100 | 4,950 |
| 1,000 | 499,500 |

Si el vector crece 10 veces, el trabajo crece unas **100 veces**. Eso se nota cuando mides el tiempo, como hiciste en `Sort_De_Inserción.py`.

## Antes de seguir

- Ordenado de menor a mayor: cada `v[i] <= v[i + 1]`.
- Intercambio: `v[a], v[b] = v[b], v[a]` (o con una variable temporal).
- Selección: el mayor de la parte sin ordenar va al final de esa parte; la parte se achica en uno.
- Selección hace siempre `n(n − 1) / 2` comparaciones y como mucho `n − 1` intercambios.
