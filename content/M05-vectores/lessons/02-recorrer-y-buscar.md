# Recorrer un vector: sumar, el mayor y buscar

Casi todo lo que se hace con un vector es un **recorrido**: pasar por cada posición una vez y hacer algo con el valor. Son los acumuladores, contadores y banderas de M2, ahora sobre las posiciones de una lista.

## Suma y promedio

```python
v = [72, 85, 61, 90, 48]
suma = 0
for i in range(len(v)):
    suma = suma + v[i]
promedio = suma / len(v)
print(suma)               # 356
print(f'{promedio:.2f}')  # 71.20
```

El promedio usa `/` (división con decimales) y se divide entre la **cantidad** de elementos, `len(v)`. Con `:.2f` se muestra con dos decimales.

Contar cuántos cumplen una condición es lo mismo con un contador:

```python
v = [72, 85, 61, 90, 48]
aprobados = 0
for i in range(len(v)):
    if v[i] >= 61:
        aprobados = aprobados + 1
print(aprobados)   # 4
```

## El mayor y su posición

Es lo que hiciste en `Encontrar.py` y en la prueba corta (`Parcial_21`). La idea: **supón que el primero es el mayor** y revisa los demás; cada vez que aparece uno más grande, se vuelve el nuevo mayor.

```python
v = [48, 72, 61, 90, 85]
mayor = v[0]
pos = 0
for i in range(1, len(v)):
    if v[i] > mayor:
        mayor = v[i]
        pos = i
print(mayor, pos)   # 90 3
```

Mira el recorrido. La casilla morada es el mayor hasta ese momento:

```pasos
48 72 61 90 85 | k0 | Se supone que el primero (48) es el mayor: mayor = 48, pos = 0.
48 72 61 90 85 | k1 | ¿72 > 48? Sí: mayor = 72, pos = 1.
48 72 61 90 85 | k1 c2 | ¿61 > 72? No: el mayor sigue siendo 72.
48 72 61 90 85 | k3 | ¿90 > 72? Sí: mayor = 90, pos = 3.
48 72 61 90 85 | k3 c4 | ¿85 > 90? No: el mayor sigue siendo 90.
48 72 61 90 85 | k3 | Terminó el recorrido: el mayor es 90, en la posición 3.
```

Tres detalles importantes:

- Se empieza con `v[0]`, **no con 0**. Si todos los valores fueran negativos, empezar con 0 daría un mayor que ni siquiera está en el vector.
- Con `>` (estricto), si el mayor se repite se queda **la primera** posición donde aparece. Con `>=` se quedaría la última.
- Para el menor es igual, con `<`. Se pueden buscar los dos en el mismo ciclo.

## Búsqueda lineal

Para saber si un valor está en el vector, se revisa **una por una** desde la posición 0. Es la búsqueda más simple y funciona aunque el vector esté desordenado.

```pasos
48 72 61 90 85 |  | Se busca el 61 revisando una por una, desde la posición 0.
48 72 61 90 85 | c0 | ¿v[0] == 61? No (48). Sigue con la siguiente.
48 72 61 90 85 | c1 x0 | ¿v[1] == 61? No (72). Sigue con la siguiente.
48 72 61 90 85 | k2 x0 x1 | ¿v[2] == 61? Sí: encontrado en la posición 2.
```

En código se usa una bandera, como en M2:

```python
v = [48, 72, 61, 90, 85]
x = 61
encontrado = False
for i in range(len(v)):
    if v[i] == x:
        encontrado = True
        print('Está en la posición', i)
        break
if not encontrado:
    print('No está')
```

El `break` corta en cuanto lo encuentra. Si quieres **todas** las posiciones donde aparece (puede repetirse), quita el `break` y deja que recorra todo.

¿Cuántas comparaciones hace? Si el valor está al final o no está, revisa los `n` elementos. Con 1,000,000 de datos, un millón de comparaciones. En M6 vas a ver la búsqueda binaria, que con un vector **ordenado** lo hace en unas 20.

## Recorridos con dos posiciones

A veces cada paso necesita el valor de al lado. Por ejemplo, revisar si un vector está ordenado de menor a mayor: cada valor debe ser menor o igual que el siguiente.

```python
v = [3, 8, 8, 12, 20]
ordenado = True
for i in range(len(v) - 1):
    if v[i] > v[i + 1]:
        ordenado = False
print(ordenado)   # True
```

El ciclo llega hasta `len(v) - 2` (por eso `range(len(v) - 1)`): en la última vuelta compara `v[n - 2]` con `v[n - 1]`. Si fuera `range(len(v))`, la última vuelta pediría `v[n]` y daría `IndexError`.

## Antes de seguir

- Acumuladores y contadores funcionan igual sobre las posiciones del vector.
- El mayor empieza en `v[0]` (no en 0); con `>` se queda la primera posición.
- Búsqueda lineal: revisar una por una, con bandera; hasta `n` comparaciones.
- Si usas `v[i + 1]`, el ciclo va hasta `len(v) - 1`.
