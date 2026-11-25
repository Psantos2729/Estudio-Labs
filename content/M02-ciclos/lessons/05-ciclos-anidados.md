# Ciclos anidados

Un ciclo puede ir **dentro** de otro. Por cada vuelta del ciclo de afuera, el de adentro da **todas** sus vueltas.

```python
for fila in range(1, 4):
    for col in range(1, 3):
        print(fila, col)
```

Imprime:

```
1 1
1 2
2 1
2 2
3 1
3 2
```

El ciclo de afuera da 3 vueltas y el de adentro 2 por cada una: **3 × 2 = 6** líneas en total.

## Como un odómetro

Piensa en el contador de kilómetros de un carro: la rueda de la derecha gira completa antes de que la de la izquierda avance un número. Con ciclos anidados pasa lo mismo: la variable del ciclo **más interno** cambia más rápido.

## Tablas de multiplicar

```python
for a in range(1, 4):
    for b in range(1, 4):
        print(f"{a} x {b} = {a * b}")
    print("---")
```

El `print("---")` tiene la sangría del ciclo de afuera: se ejecuta **una vez por tabla**, no en cada multiplicación. Igual que siempre, la sangría decide a qué ciclo pertenece cada línea.

## Figuras con asteriscos

`"*" * 4` da `****`. Pero para practicar anidados, armemos cada fila a mano:

```python
n = 4
for fila in range(1, n + 1):
    linea = ""
    for k in range(fila):
        linea = linea + "*"
    print(linea)
```

```
*
**
***
****
```

El ciclo interno depende de la variable del externo (`range(fila)`): la fila 1 tiene un asterisco, la 2 dos, y así.

## Rellenar con ceros

Para relojes y fechas se escriben los números con dos dígitos: `05` en lugar de `5`. Con f-strings se usa `:02d` ("entero, ancho 2, rellena con 0"):

```python
h, m = 7, 5
print(f"{h}:{m:02d}")  # 7:05
```

## ¿Cuántas vueltas?

Antes de correr un ciclo anidado, multiplica las vueltas de cada nivel. Tres ciclos de 24, 60 y 60 vueltas dan 86 400 iteraciones: muchas, pero para una computadora es poco. Si cuentas millones, piensa si de verdad necesitas los tres niveles.
