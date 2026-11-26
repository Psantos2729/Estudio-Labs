# Acumuladores y contadores

Dos patrones aparecen en casi todos los ejercicios con ciclos. Si los dominas, la mitad del laboratorio está hecha.

## Contador: ¿cuántos hay?

Un **contador** es una variable que empieza en 0 y **suma 1** cada vez que pasa algo.

```python
// entrada: 4 -2 0 7 1
positivos = 0
for i in range(5):
    n = int(input())
    if n > 0:
        positivos = positivos + 1
print("Positivos:", positivos)
```

Con las entradas `4`, `-2`, `0`, `7` y `1` imprime `Positivos: 3`.

`positivos = positivos + 1` se lee así: "toma el valor que tenía `positivos`, súmale 1 y guárdalo otra vez en `positivos`". Python tiene una forma corta que hace lo mismo: `positivos += 1`.

Puedes tener **varios contadores** a la vez, uno por cada cosa que quieras contar (positivos, negativos, ceros…). Cada uno empieza en 0 **antes** del ciclo.

## Acumulador: ¿cuánto suman?

Un **acumulador** también empieza antes del ciclo, pero en lugar de sumar 1, suma **un valor**:

```python
total = 0
for i in range(1, 6):
    total = total + i
print(total)
```

Prueba de escritorio:

| Vuelta | `i` | `total` al terminar la vuelta |
| --- | --- | --- |
| 1 | 1 | 1 |
| 2 | 2 | 3 |
| 3 | 3 | 6 |
| 4 | 4 | 10 |
| 5 | 5 | 15 |

Imprime `15`.

## Acumulador de multiplicación

Para multiplicar muchos números (como en el factorial), el acumulador empieza en **1**, no en 0. Si empezara en 0, todo daría 0.

```python
producto = 1
for i in range(1, 5):
    producto = producto * i
print(producto)  # 1 * 2 * 3 * 4 = 24
```

## Acumular texto

También se puede ir armando una cadena de texto:

```python
texto = ""
for i in range(1, 4):
    texto = texto + str(i) + "-"
print(texto)  # 1-2-3-
```

## Los tres errores típicos

1. **Iniciar dentro del ciclo.** Si escribes `total = 0` dentro del `for`, se reinicia en cada vuelta y al final solo tienes el último valor.
2. **Imprimir dentro del ciclo.** Si el `print` tiene sangría, se imprime un resultado parcial en cada vuelta. El resultado final va **después** del ciclo, sin sangría.
3. **Valor inicial equivocado.** Suma y contador empiezan en 0; producto empieza en 1.

## Promedio

Un promedio necesita un acumulador (la suma) y un contador (cuántos valores). Se divide **después** del ciclo: `promedio = suma / cantidad`. Revisa que `cantidad` no sea 0 antes de dividir.
