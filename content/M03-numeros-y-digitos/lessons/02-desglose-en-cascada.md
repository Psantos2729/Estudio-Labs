# Desglose en cascada: posiciones y billetes

Hay problemas en los que no recorres todos los dígitos, sino que **repartes** un número en partes de tamaños fijos, de la más grande a la más chica. Es lo que haces al dar vuelto: primero billetes grandes, y lo que sobra con los pequeños.

## Centenas, decenas y unidades

Un número de tres cifras como 742 vale 7 centenas + 4 decenas + 2 unidades. Con `//` y `%` sacas cada parte sin ciclo:

```python
n = 742
centenas = n // 100         # 7
decenas = n // 10 % 10      # 74 % 10 = 4
unidades = n % 10           # 2
print(centenas, decenas, unidades)
```

La línea de las decenas es la más interesante: `n // 10` quita las unidades (queda 74) y `% 10` se queda con la última cifra de eso (4). Python evalúa `//` y `%` de izquierda a derecha, así que `n // 10 % 10` es lo mismo que `(n // 10) % 10`.

Otra forma de verlo es en **cascada**: lo que no cabe en una posición pasa a la siguiente.

```python
n = 742
centenas = n // 100
resto = n % 100       # 42: lo que sobra después de quitar las centenas
decenas = resto // 10
unidades = resto % 10
print(centenas, decenas, unidades)   # 7 4 2
```

Las dos formas dan lo mismo. La cascada es la que vas a usar con los billetes.

Para comprobar tu desglose, vuelve a armar el número: `centenas * 100 + decenas * 10 + unidades` debe dar el original.

## Repartir un monto en billetes

El ejercicio 14 del PDF pide desglosar un monto en billetes de Q50, Q20, Q10, Q5 y Q1, **empezando por el mayor**. Es la misma cascada, con otros tamaños:

```python
monto = 1586
b50 = monto // 50     # 31 billetes de Q50
monto = monto % 50    # sobran Q36
b20 = monto // 20     # 1 billete de Q20
monto = monto % 20    # sobran Q16
b10 = monto // 10     # 1
monto = monto % 10    # 6
b5 = monto // 5       # 1
b1 = monto % 5        # 1
print(b50, b20, b10, b5, b1)   # 31 1 1 1 1
```

En cada paso, `//` dice **cuántos caben** y `%` dice **cuánto sobra** para el siguiente billete. Fíjate que `monto` se va reemplazando por lo que sobra.

Cuando hay muchas denominaciones, en lugar de copiar las dos líneas cinco veces puedes recorrerlas con un `for`:

```python
monto = 1586
for b in (50, 20, 10, 5, 1):
    cuantos = monto // b
    monto = monto % b
    print(f"{cuantos} billete(s) de Q{b}")
```

`(50, 20, 10, 5, 1)` es una **tupla**: una lista fija de valores. El `for` toma cada uno en orden, como hacía con `range`. Verás más de esto en el módulo de vectores; por ahora basta con saber que el `for` la recorre de izquierda a derecha.

## ¿Por qué de mayor a menor?

Si empiezas por los billetes pequeños, todo se paga con billetes de Q1 y nunca usas los grandes. Empezar por el mayor da la **menor cantidad de billetes** posible con estas denominaciones. El orden de las líneas importa tanto como las operaciones.

## La misma idea en otros lados

- Segundos → horas, minutos y segundos (M0): tamaños 3600 y 60.
- Días → semanas y días: tamaño 7.
- Centímetros → metros y centímetros: tamaño 100.

Siempre es igual: `//` para la parte grande y `%` para lo que pasa a la siguiente.

## Antes de seguir

- `n // 100`, `n // 10 % 10` y `n % 10` dan centenas, decenas y unidades.
- En una cascada, `//` cuenta cuántos caben y `%` deja lo que sobra.
- Ve de la denominación mayor a la menor.
- Comprueba armando otra vez el número con lo que obtuviste.
