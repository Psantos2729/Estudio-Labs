# Repetir con for y range

Hasta ahora cada línea de tu programa se ejecutaba **una sola vez**. Un **ciclo** repite un bloque de código varias veces sin que tengas que copiarlo.

```python
for i in range(5):
    print("Hola", i)
```

Imprime:

```
Hola 0
Hola 1
Hola 2
Hola 3
Hola 4
```

Cada vuelta del ciclo se llama **iteración**. En cada una, la variable `i` toma el siguiente valor de `range(5)` y se ejecuta todo el bloque con sangría. Igual que en un `if`, la sangría marca qué está **dentro** del ciclo.

## Los tres usos de range

| Forma | Valores | Ejemplo |
| --- | --- | --- |
| `range(fin)` | de 0 hasta `fin − 1` | `range(4)` → 0, 1, 2, 3 |
| `range(inicio, fin)` | de `inicio` hasta `fin − 1` | `range(1, 6)` → 1, 2, 3, 4, 5 |
| `range(inicio, fin, paso)` | de `inicio` saltando de `paso` en `paso` | `range(2, 11, 2)` → 2, 4, 6, 8, 10 |

**El final nunca se incluye.** Si quieres contar de 1 a 100, escribe `range(1, 101)`. Es el error más común con `range`: quedarse corto por uno.

El paso también puede ser negativo para contar hacia atrás:

```python
for i in range(5, 0, -1):
    print(i)
print("¡Despegue!")
```

## Repetir algo N veces

Muchas veces no te importa el valor de la variable, solo repetir. Por ejemplo, leer 3 números:

```python
// entrada: 3 7 10
for i in range(3):
    n = int(input())
    print("Leí", n)
```

Cada vuelta hace un `input()` nuevo, así que el programa lee tres líneas. Si el problema dice "lee 10 números", el ciclo es `for i in range(10)`.

## Combinar for con if

Dentro de un ciclo puedes poner cualquier cosa, también decisiones:

```python
for i in range(1, 11):
    if i % 3 == 0:
        print(i, "es múltiplo de 3")
```

Aquí el ciclo recorre del 1 al 10 y el `if` decide en cada vuelta si imprime o no.

## Antes de programar: haz la tabla

Para entender un ciclo, escribe en papel una fila por cada vuelta con el valor de cada variable. Es lo que se llama **prueba de escritorio**, y es la mejor forma de encontrar errores en los ciclos antes de correr el programa.
