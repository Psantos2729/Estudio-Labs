# Jerarquía de operadores

Para convertir infix a postfix hay que saber **qué operador va primero**. Es lo mismo que aprendiste en matemática, escrito como números para que el programa lo pueda comparar.

## La tabla

| Operador | Significa | Jerarquía | Se agrupa |
| --- | --- | --- | --- |
| `^` | potencia | 3 (la más alta) | de **derecha** a izquierda |
| `*` `/` | multiplicación y división | 2 | de izquierda a derecha |
| `+` `-` | suma y resta | 1 | de izquierda a derecha |

Los **paréntesis** mandan sobre todo: lo de adentro va primero, sea cual sea su jerarquía.

En Python la potencia es `**`; el curso usa `^` en las expresiones. Ojo: en Python `^` existe pero es **otra cosa** (una operación de bits), así que `2 ^ 3` en Python da 1. Dentro de los textos de las expresiones usamos `^`; al calcular, `**`.

## Misma jerarquía: ¿quién va primero?

Si dos operadores tienen la misma jerarquía, la columna "se agrupa" decide:

- `8 - 3 - 2` se agrupa a la **izquierda**: `(8 - 3) - 2 = 3`. Si fuera a la derecha daría `8 - (3 - 2) = 7`, que está mal.
- `16 / 4 / 2` también: `(16 / 4) / 2 = 2`.
- `2 ^ 3 ^ 2` se agrupa a la **derecha**: `2 ^ (3 ^ 2) = 2 ^ 9 = 512`. Así se hace en matemática (la torre de exponentes se lee de arriba hacia abajo) y así lo hace Python con `**`.

```python
print(8 - 3 - 2)
print(16 / 4 / 2)
print(2 ** 3 ** 2)
print((2 ** 3) ** 2)
```

En postfix:

| Infix | Postfix |
| --- | --- |
| `8 - 3 - 2` | `8 3 - 2 -` |
| `2 ^ 3 ^ 2` | `2 3 2 ^ ^` |

Tu `infix_a_postfix.py` trata el `^` igual que los demás (de izquierda a derecha) y daría `2 3 ^ 2 ^`, que vale 64. Algunos profesores aceptan esa versión; en esta guía usamos la de matemática. En la siguiente lección verás que el cambio en el código es una sola condición.

## La jerarquía como función

Con un diccionario la consulta es corta:

```python
JER = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
print(JER['*'] > JER['+'])
print(JER['-'] >= JER['+'])
```

Tu código usaba `signos.index(n) // 2 + 1` con `signos = '+-*/^('`: también funciona, porque cada pareja de operadores queda en la misma "fila". El diccionario se lee más fácil.

## Practica a mano

| Infix | ¿Qué va primero? | Postfix |
| --- | --- | --- |
| `a + b * c` | `b * c` | `a b c * +` |
| `a * b + c` | `a * b` | `a b * c +` |
| `(a + b) * c` | `a + b` (paréntesis) | `a b + c *` |
| `a - b + c` | `a - b` (izquierda) | `a b - c +` |
| `a ^ b * c` | `a ^ b` | `a b ^ c *` |
| `a * b ^ c` | `b ^ c` | `a b c ^ *` |
| `a ^ b ^ c` | `b ^ c` (derecha) | `a b c ^ ^` |

Usa el truco de los paréntesis de la lección 1 para revisar cada fila.
