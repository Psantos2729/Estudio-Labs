# Infix, prefix y postfix

Cuando escribes `3 + 4 * 2` sabes que da 11 y no 14, porque la multiplicación va primero. Esa regla la sabes tú, pero una computadora que lee de izquierda a derecha **no**: tendría que adelantarse a ver si viene un `*`. En este módulo vas a ver cómo se resuelve con una pila.

## Tres formas de escribir lo mismo

La diferencia está en **dónde va el operador** respecto a sus dos datos (operandos):

| Notación | Dónde va el operador | `a + b` | `(a + b) * c` |
| --- | --- | --- | --- |
| **infix** | en medio | `a + b` | `(a + b) * c` |
| **prefix** (polaca) | antes | `+ a b` | `* + a b c` |
| **postfix** (polaca inversa) | después | `a b +` | `a b + c *` |

Infix es la de siempre. Su problema: necesita **jerarquía** y **paréntesis** para saber qué se hace primero. En postfix **no hacen falta paréntesis**: el orden de los operadores ya dice qué va primero.

## Leer postfix a mano

Regla única: cada operador se aplica a **los dos datos que tiene justo antes**, y el resultado queda en su lugar.

`3 4 2 * +`

1. Primer operador: `*`, con los dos de antes, `4 2` → 8. Queda `3 8 +`.
2. Siguiente: `+` con `3 8` → 11.

`3 4 + 2 *`

1. `+` con `3 4` → 7. Queda `7 2 *`.
2. `*` con `7 2` → 14.

Las mismas cifras, otro orden de operadores, otro resultado. Sin un solo paréntesis.

## Pasar de infix a postfix a mano

Un truco para revisar tus respuestas:

1. Pon paréntesis a **cada** operación, respetando la jerarquía: `3 + 4 * 2` → `(3 + (4 * 2))`.
2. Mueve cada operador justo **antes de su paréntesis de cierre**: `(3 (4 2 *) +)`.
3. Borra los paréntesis: `3 4 2 * +`.

Otro ejemplo: `(a + b) * (c - d)` → `((a + b) * (c - d))` → `((a b +) (c d -) *)` → `a b + c d - *`.

Fíjate en algo que sirve para todo el módulo: **los operandos quedan en el mismo orden** (a, b, c, d) en las dos notaciones. Solo se mueven los operadores.

## ¿Y prefix?

Es el espejo: el operador va **antes** de su paréntesis de apertura. `(3 + (4 * 2))` → `+ 3 * 4 2`. En el curso se usa sobre todo postfix; prefix aparece en uno de los retos.

## El plan del módulo

1. **Evaluar** postfix con una pila (es lo más fácil).
2. Entender la **jerarquía** de operadores.
3. **Convertir** infix a postfix con una pila (tu `infix_a_postfix.py`).
4. Números de varias cifras, negativos, errores.
5. Expresiones con **x**: evaluarlas y despejar x en una ecuación.

Con 1 y 3 juntos tienes una calculadora: infix → postfix → resultado. Es el jefe del módulo.
