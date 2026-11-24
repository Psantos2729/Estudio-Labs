# Operadores aritméticos

| Operador | Qué hace | Ejemplo | Resultado |
| --- | --- | --- | --- |
| `+` | suma | `7 + 2` | `9` |
| `-` | resta | `7 - 2` | `5` |
| `*` | multiplicación | `7 * 2` | `14` |
| `/` | división | `7 / 2` | `3.5` |
| `//` | división entera | `7 // 2` | `3` |
| `%` | residuo (módulo) | `7 % 2` | `1` |
| `**` | potencia | `7 ** 2` | `49` |

```python
print(7 / 2)
print(7 // 2)
print(7 % 2)
```

`/` **siempre** da `float`, incluso `6 / 2` da `3.0`. `//` se queda con la parte entera y `%` con lo que sobra.

`//` y `%` son tan importantes que tienen su propia lección: la siguiente.

## Orden de las operaciones

Igual que en matemáticas: primero `**`, luego `*`, `/`, `//`, `%`, y al final `+` y `-`. Los paréntesis mandan sobre todo.

```python
print(2 + 3 * 4)
print((2 + 3) * 4)
```

Un error clásico al promediar:

```python
a = 8
b = 6
print(a + b / 2)
print((a + b) / 2)
```

La primera línea divide solo `b`. Cuando dudes, pon paréntesis.
