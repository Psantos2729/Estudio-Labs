# Ordenamiento por inserción

La **inserción** ordena como se ordenan las cartas en la mano: tomas una carta nueva y la **insertas** en su lugar entre las que ya tienes ordenadas, corriendo a la derecha las que son mayores. Es el método del ejercicio 36 del PDF y el de tu `Sort_De_Inserción.py`.

## La idea

El vector se divide en dos partes: a la izquierda lo ya ordenado y a la derecha lo que falta. Al inicio, la parte ordenada es solo la posición 0 (un elemento solo siempre está ordenado). En cada paso:

1. Se toma el primer elemento de la parte sin ordenar: la **clave**.
2. Se compara con los de la parte ordenada, de derecha a izquierda.
3. Cada uno que sea **mayor** que la clave se **corre** una posición a la derecha.
4. Cuando aparece uno menor o igual (o se acaba el vector), la clave se escribe en el hueco.

## Paso a paso

Morado es la clave. Fíjate que al correr un valor se ve **repetido** por un momento (por ejemplo `12 12`): el de la derecha es la copia y el de la izquierda es el hueco donde todavía puede ir la clave. No se pierde nada, porque la clave está guardada aparte en una variable.

```pasos
12 11 13 5 6 | o0 | La posición 0 sola ya es una lista ordenada. Se inserta cada elemento siguiente en la parte ordenada.
12 11 13 5 6 | k1 o0 | Se toma la clave 11 (posición 1).
12 12 13 5 6 | c0 i1 | ¿12 > 11? Sí: el 12 se corre una posición a la derecha.
11 12 13 5 6 | k0 o1 | Se coloca 11 en la posición 0. Las posiciones 0 a 1 ya están ordenadas.
11 12 13 5 6 | k2 o0 o1 | Se toma la clave 13 (posición 2).
11 12 13 5 6 | c1 o0 | ¿12 > 13? No: la clave va justo después, en la posición 2.
11 12 13 5 6 | k2 o0 o1 | Se coloca 13 en la posición 2. Las posiciones 0 a 2 ya están ordenadas.
11 12 13 5 6 | k3 o0 o1 o2 | Se toma la clave 5 (posición 3).
11 12 13 13 6 | c2 i3 o0 o1 | ¿13 > 5? Sí: el 13 se corre una posición a la derecha.
11 12 12 13 6 | c1 i2 o0 | ¿12 > 5? Sí: el 12 se corre una posición a la derecha.
11 11 12 13 6 | c0 i1 | ¿11 > 5? Sí: el 11 se corre una posición a la derecha.
5 11 12 13 6 | k0 o1 o2 o3 | Se coloca 5 en la posición 0. Las posiciones 0 a 3 ya están ordenadas.
5 11 12 13 6 | k4 o0 o1 o2 o3 | Se toma la clave 6 (posición 4).
5 11 12 13 13 | c3 i4 o0 o1 o2 | ¿13 > 6? Sí: el 13 se corre una posición a la derecha.
5 11 12 12 13 | c2 i3 o0 o1 | ¿12 > 6? Sí: el 12 se corre una posición a la derecha.
5 11 11 12 13 | c1 i2 o0 | ¿11 > 6? Sí: el 11 se corre una posición a la derecha.
5 11 11 12 13 | c0 | ¿5 > 6? No: la clave va justo después, en la posición 1.
5 6 11 12 13 | k1 o0 o2 o3 o4 | Se coloca 6 en la posición 1. Las posiciones 0 a 4 ya están ordenadas.
5 6 11 12 13 | o0 o1 o2 o3 o4 | Lista ordenada.
```

## En código

```python
def insercion(v):
    for i in range(1, len(v)):
        clave = v[i]
        j = i - 1
        while j >= 0 and v[j] > clave:
            v[j + 1] = v[j]     # correr a la derecha
            j = j - 1
        v[j + 1] = clave        # escribir la clave en el hueco

datos = [12, 11, 13, 5, 6]
insercion(datos)
print(datos)   # [5, 6, 11, 12, 13]
```

- `for i in range(1, len(v))` empieza en 1: la posición 0 ya es la parte ordenada.
- El `while` tiene **dos** condiciones. `j >= 0` evita salirse del vector por la izquierda (si la clave es la más chica de todas, `j` llega a -1). El orden importa: si `j` es -1, Python ya no evalúa `v[j] > clave`.
- Al salir del `while`, `j` quedó una posición **antes** del hueco. Por eso la clave va en `j + 1`.

## Con intercambios, como en tu tarea

En `Sort_De_Inserción.py` en vez de correr valores intercambiaste la clave con su vecino de la izquierda mientras fuera menor. Ordena igual, pero cada intercambio son tres movimientos de datos en lugar de uno:

```python
def insercion_con_intercambios(v):
    for i in range(1, len(v)):
        j = i
        while j > 0 and v[j] < v[j - 1]:
            v[j], v[j - 1] = v[j - 1], v[j]
            j = j - 1

datos = [12, 11, 13, 5, 6]
insercion_con_intercambios(datos)
print(datos)
```

Las dos versiones son inserción. En los ejercicios de esta plataforma se cuentan **desplazamientos**: cuántas veces se corre un valor a la derecha (o, en tu versión, cuántos intercambios se hacen; dan el mismo número).

## ¿Cuándo conviene?

- Si el vector **ya está ordenado**, cada clave se compara una vez con su vecino y se queda donde está: `n − 1` comparaciones y 0 desplazamientos. Es tan rápida como la burbuja mejorada en su mejor caso.
- Si está **al revés**, cada clave viaja hasta el inicio: `n(n − 1) / 2` desplazamientos, como la burbuja.
- En la práctica (datos al azar) suele ser la más rápida de las tres: corre valores en vez de intercambiar y para en cuanto encuentra su lugar. Es la que usa Python por dentro para listas pequeñas.

| Método | Comparaciones (al azar) | Movimientos | Para antes si ya está ordenado |
| --- | --- | --- | --- |
| Selección | siempre `n(n − 1) / 2` | pocos intercambios (≤ `n − 1`) | no |
| Burbuja normal | siempre `n(n − 1) / 2` | muchos intercambios | no |
| Burbuja mejorada | algo menos | los mismos que la normal | sí |
| Inserción | cerca de la mitad | desplazamientos (1 movimiento cada uno) | sí |

## Errores comunes

- **Olvidar guardar la clave**: si escribes `v[j + 1] = v[j]` sin haber guardado `v[i]`, el primer corrimiento la borra.
- **`while v[j] > clave and j >= 0`**: con `j = -1`, `v[-1]` es el último elemento (¡no da error!) y el algoritmo hace cosas raras. Pon siempre `j >= 0` primero.
- **Escribir la clave en `j`** en vez de `j + 1`.

## Antes de seguir

- Inserción: toma la clave, corre a la derecha los mayores y la escribe en el hueco.
- `while j >= 0 and v[j] > clave`, y al final `v[j + 1] = clave`.
- Mejor caso (ordenado): `n − 1` comparaciones; peor caso (al revés): `n(n − 1) / 2` desplazamientos.
- Con datos al azar suele ganarle a selección y a burbuja.
