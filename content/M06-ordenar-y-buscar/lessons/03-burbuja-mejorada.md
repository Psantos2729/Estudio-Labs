# Burbuja mejorada y cómo medir el costo

En la lección anterior viste que la burbuja normal sigue comparando aunque el vector ya esté ordenado. La **burbuja mejorada** (ejercicio 37 del PDF) agrega una **bandera**: si en una pasada completa **no hubo ningún intercambio**, todos los vecinos están en orden, así que el vector ya está ordenado y se puede parar.

## La bandera

Es la bandera de M2 dentro de la burbuja: antes de cada pasada se baja (`False`), y se sube (`True`) si hay al menos un intercambio. Al terminar la pasada, si sigue abajo, se termina.

```python
def burbuja_mejorada(v):
    n = len(v)
    for i in range(n - 1):
        hubo_cambio = False
        for j in range(n - 1 - i):
            if v[j] > v[j + 1]:
                v[j], v[j + 1] = v[j + 1], v[j]
                hubo_cambio = True
        if not hubo_cambio:
            break

datos = [5, 1, 4, 2, 8]
burbuja_mejorada(datos)
print(datos)
```

Ojo con dónde va cada cosa: `hubo_cambio = False` va **dentro** del `for i` (se reinicia en cada pasada) pero **fuera** del `for j`. Si la pones fuera de los dos ciclos, después del primer intercambio queda en `True` para siempre y nunca se detiene antes.

## El mismo vector, con bandera

Compara con el recorrido de la lección anterior. La pasada 3 no intercambia nada, así que la pasada 4 ya no se hace:

```pasos
5 1 4 2 8 |  | Lista original. Cada pasada lleva el mayor que queda hasta el final.
5 1 4 2 8 | c0 c1 | Pasada 1: ¿5 > 1? Sí, hay que cambiarlos. (comparaciones: 1)
1 5 4 2 8 | i0 i1 | Se intercambian: ahora 1 va antes que 5. (intercambios: 1)
1 5 4 2 8 | c1 c2 | Pasada 1: ¿5 > 4? Sí, hay que cambiarlos. (comparaciones: 2)
1 4 5 2 8 | i1 i2 | Se intercambian: ahora 4 va antes que 5. (intercambios: 2)
1 4 5 2 8 | c2 c3 | Pasada 1: ¿5 > 2? Sí, hay que cambiarlos. (comparaciones: 3)
1 4 2 5 8 | i2 i3 | Se intercambian: ahora 2 va antes que 5. (intercambios: 3)
1 4 2 5 8 | c3 c4 | Pasada 1: ¿5 > 8? No, se quedan. (comparaciones: 4)
1 4 2 5 8 | o4 | Fin de la pasada 1: el 8 ya quedó en su lugar.
1 4 2 5 8 | c0 c1 o4 | Pasada 2: ¿1 > 4? No, se quedan. (comparaciones: 5)
1 4 2 5 8 | c1 c2 o4 | Pasada 2: ¿4 > 2? Sí, hay que cambiarlos. (comparaciones: 6)
1 2 4 5 8 | i1 i2 o4 | Se intercambian: ahora 2 va antes que 4. (intercambios: 4)
1 2 4 5 8 | c2 c3 o4 | Pasada 2: ¿4 > 5? No, se quedan. (comparaciones: 7)
1 2 4 5 8 | o3 o4 | Fin de la pasada 2: el 5 ya quedó en su lugar.
1 2 4 5 8 | c0 c1 o3 o4 | Pasada 3: ¿1 > 2? No, se quedan. (comparaciones: 8)
1 2 4 5 8 | c1 c2 o3 o4 | Pasada 3: ¿2 > 4? No, se quedan. (comparaciones: 9)
1 2 4 5 8 | o0 o1 o2 o3 o4 | En la pasada 3 no hubo ningún intercambio: la bandera sigue en False y el ciclo se detiene. Total: 9 comparaciones, 4 intercambios.
```

Se ahorra una comparación. Parece poco, pero la ventaja crece cuando el vector viene **casi ordenado**. Mira este, donde solo hay una pareja fuera de lugar:

```pasos
2 1 3 4 5 6 |  | Lista original. Cada pasada lleva el mayor que queda hasta el final.
2 1 3 4 5 6 | c0 c1 | Pasada 1: ¿2 > 1? Sí, hay que cambiarlos. (comparaciones: 1)
1 2 3 4 5 6 | i0 i1 | Se intercambian: ahora 1 va antes que 2. (intercambios: 1)
1 2 3 4 5 6 | c1 c2 | Pasada 1: ¿2 > 3? No, se quedan. (comparaciones: 2)
1 2 3 4 5 6 | c2 c3 | Pasada 1: ¿3 > 4? No, se quedan. (comparaciones: 3)
1 2 3 4 5 6 | c3 c4 | Pasada 1: ¿4 > 5? No, se quedan. (comparaciones: 4)
1 2 3 4 5 6 | c4 c5 | Pasada 1: ¿5 > 6? No, se quedan. (comparaciones: 5)
1 2 3 4 5 6 | o5 | Fin de la pasada 1: el 6 ya quedó en su lugar.
1 2 3 4 5 6 | c0 c1 o5 | Pasada 2: ¿1 > 2? No, se quedan. (comparaciones: 6)
1 2 3 4 5 6 | c1 c2 o5 | Pasada 2: ¿2 > 3? No, se quedan. (comparaciones: 7)
1 2 3 4 5 6 | c2 c3 o5 | Pasada 2: ¿3 > 4? No, se quedan. (comparaciones: 8)
1 2 3 4 5 6 | c3 c4 o5 | Pasada 2: ¿4 > 5? No, se quedan. (comparaciones: 9)
1 2 3 4 5 6 | o0 o1 o2 o3 o4 o5 | En la pasada 2 no hubo ningún intercambio: la bandera sigue en False y el ciclo se detiene. Total: 9 comparaciones, 1 intercambio.
```

La burbuja normal haría 5 + 4 + 3 + 2 + 1 = 15 comparaciones con este vector. La mejorada hace 9.

## Normal contra mejorada

| Cómo viene el vector | Burbuja normal | Burbuja mejorada |
| --- | --- | --- |
| Ya ordenado | `n(n − 1) / 2` comparaciones | `n − 1` (una pasada sin cambios) |
| Casi ordenado | `n(n − 1) / 2` | pocas pasadas |
| Al revés | `n(n − 1) / 2` | `n(n − 1) / 2` (no ahorra nada) |

¿Y los intercambios? **Son exactamente los mismos** en las dos versiones. La bandera solo se salta las pasadas en las que no hay nada que intercambiar, así que los intercambios que sí se hacen son idénticos. Cuando el ejercicio 37 pregunta "cuántos intercambios menos hizo", la respuesta correcta es 0, y vale la pena explicarlo en tu análisis.

## Contar en la mejorada

Los contadores van igual que en la normal. Las comparaciones de la pasada sin cambios **sí cuentan**: hubo que hacerlas para darse cuenta de que no había nada que cambiar.

```python
def mejorada_contando(v):
    n = len(v)
    comp = 0
    inter = 0
    for i in range(n - 1):
        hubo_cambio = False
        for j in range(n - 1 - i):
            comp = comp + 1
            if v[j] > v[j + 1]:
                v[j], v[j + 1] = v[j + 1], v[j]
                inter = inter + 1
                hubo_cambio = True
        if not hubo_cambio:
            break
    return comp, inter

print(mejorada_contando([2, 1, 3, 4, 5, 6]))   # (9, 1)
print(mejorada_contando([1, 2, 3, 4, 5, 6]))   # (5, 0)
print(mejorada_contando([6, 5, 4, 3, 2, 1]))   # (15, 15)
```

## Medir el tiempo

El PDF también pide "cuánto tiempo se ahorró". Como en tu `Sort_De_Inserción.py`, se usa `time.perf_counter()`, que da un instante en segundos con muchos decimales. Se toma antes y después, y la resta es lo que tardó:

```python
import random
import time

def burbuja(v):
    n = len(v)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if v[j] > v[j + 1]:
                v[j], v[j + 1] = v[j + 1], v[j]

original = [0] * 2000
for i in range(2000):
    original[i] = random.randint(1, 10000)

copia = list(original)        # para no desordenar el original
inicio = time.perf_counter()
burbuja(copia)
fin = time.perf_counter()
print(f'Tardó {(fin - inicio) * 1000:.1f} ms')
```

- Multiplicar por 1000 pasa de segundos a **milisegundos**.
- Cada método debe ordenar **su propia copia del mismo original**. Si no, el segundo recibe un vector ya ordenado.
- El tiempo **cambia en cada corrida** (depende de la computadora y de lo que esté haciendo en ese momento). Por eso en esta plataforma se califican las comparaciones y los intercambios, que siempre dan lo mismo, y el tiempo solo se muestra. Corre el código varias veces y verás que el número baila.

## Antes de seguir

- La mejorada para en cuanto una pasada termina sin intercambios.
- La bandera se baja al inicio de cada pasada, dentro del `for i`.
- Ahorra comparaciones (mucho si el vector está casi ordenado), pero hace los mismos intercambios.
- El tiempo se mide con `time.perf_counter()` sobre copias del mismo original; cambia en cada corrida.
