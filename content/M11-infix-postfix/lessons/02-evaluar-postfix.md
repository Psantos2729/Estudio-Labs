# Evaluar postfix con una pila

Es tu `Final_2-3.py`. La regla de la lección anterior ("cada operador usa los dos datos de antes") se vuelve un algoritmo con una pila:

1. Recorre la expresión de izquierda a derecha.
2. Si es un **número**: `push`.
3. Si es un **operador**: `pop` dos veces. El **primero** que sale es el dato de la **derecha** (`b`) y el segundo el de la **izquierda** (`a`). Calcula `a operador b` y haz `push` del resultado.
4. Al final debe quedar **exactamente un** dato en la pila: el resultado.

Sigue `6 2 3 + *`. Morado: lo que entra; amarillo: lo que sale para operar; verde: el resultado.

```pasos
6 | k0 | 6 es número → push.
6 2 | k1 | 2 → push.
6 2 3 | k2 | 3 → push.
6 2 3 | c1 c2 | + : b = pop() = 3, a = pop() = 2.
6 5 | k1 | a + b = 5 → push.
6 5 | c0 c1 | * : b = 5, a = 6.
30 | o0 | 6 * 5 = 30 → push. Fin: queda un solo dato, el resultado es 30.
```

## El orden importa

Con `+` y `*` da igual, pero con `-`, `/` y `^` no. En `8 2 -`:

- sale primero `2` → es `b`;
- luego `8` → es `a`;
- el resultado es `a - b = 8 - 2 = 6`, **no** `2 - 8`.

Tu `prueba_2_stacks.py` lo hace bien: `operador(b, a)` con los nombres al revés. Es fácil equivocarse; usa siempre `b = pop()` primero y `a = pop()` después, y calcula `a op b`.

## Un carácter por dato

Como en tu `Final_2-3.py`, si cada número es **una sola cifra**, se recorre carácter por carácter:

```python
def operar(a, op, b):
    if op == '+':
        return a + b
    if op == '-':
        return a - b
    if op == '*':
        return a * b
    if op == '/':
        return a / b
    return a ** b


expr = '23+4*'
pila = [None] * len(expr)
p = 0
for c in expr:
    if c.isdigit():
        pila[p] = int(c)
        p = p + 1
    else:
        p = p - 1
        b = pila[p]
        p = p - 1
        a = pila[p]
        pila[p] = operar(a, c, b)
        p = p + 1
print(pila[0])
```

El curso usa `^` para la potencia; en Python es `**`. Por eso `operar` traduce.

## Varias cifras: separar con espacios

`12 3 /` no se puede leer carácter por carácter: ¿es 12 o es 1 y 2? En postfix con números grandes, los datos van **separados por espacios**, y `split()` los separa:

```python
print('12 3 / 4 +'.split())
```

Cada pedazo es un **token** (un número o un operador). El algoritmo es igual, pero recorre `expr.split()` en vez de los caracteres.

## Cuándo una expresión no se puede evaluar

| Expresión | Qué pasa | Por qué |
| --- | --- | --- |
| `3 +` | al llegar `+` solo hay un dato | **faltan operandos** |
| `3 4 5 +` | al final quedan dos datos (3 y 9) | **sobran operandos** (falta un operador) |
| `4 0 /` | b vale 0 | **división entre 0** |

Antes de cada `pop`, revisa que haya datos suficientes; al final, que quede exactamente uno.

## Mostrar el resultado

Con `/` el resultado puede tener decimales: `7 2 /` da `3.5`, pero `6 2 /` da `3.0`. En los ejercicios se usa esta regla: **si es entero se muestra sin decimales; si no, con 2 decimales**.

```python
def mostrar(v):
    v = round(v, 6)  # en la lección 5 verás por qué
    if v == int(v):
        return str(int(v))
    return f'{v:.2f}'


print(mostrar(6 / 2), mostrar(7 / 2), mostrar(2 / 3), mostrar(-4.0))
```
