# Varias cifras, negativos y errores

Hasta ahora cada operando era una letra o una cifra. Una calculadora de verdad tiene que aguantar `12 * (3 - 45)`, `-5 + 2` y avisar cuando le escriben `3 + * 4`. Son tres pasos: **separar en tokens**, **validar** y después convertir y evaluar como ya sabes.

## 1. Separar en tokens

Un **token** es una pieza con sentido: un número completo, un operador o un paréntesis. Se recorre carácter por carácter y las cifras seguidas se **juntan**:

```python
def tokens(expr):
    lista = [None] * len(expr)
    n = 0
    i = 0
    while i < len(expr):
        c = expr[i]
        if c.isdigit():
            num = ''
            while i < len(expr) and expr[i].isdigit():
                num = num + expr[i]
                i = i + 1
            lista[n] = num
            n = n + 1
            continue
        if c in '+-*/^()':
            lista[n] = c
            n = n + 1
        elif c != ' ':
            raise ValueError(f'carácter {c}')
        i = i + 1
    return lista[:n]


print(tokens('12*(3 - 45)'))
print(tokens('7+100^2'))
```

- El vector `lista` es de tamaño fijo (`len(expr)` siempre alcanza) y al final se devuelve solo lo usado con `lista[:n]`.
- El `continue` salta el `i = i + 1` de abajo, porque el `while` de adentro ya avanzó.
- Un carácter que no es cifra, operador, paréntesis ni espacio **lanza** un error con `raise`, como la pila de M10.

## 2. El menos que no resta

En `-5 + 2` o `3 * (-2)`, el `-` no resta dos cosas: **cambia el signo** de lo que viene. Se llama **menos unario**. Para no confundirlo, se cambia por otro símbolo, `~` (como en tu `Final_2-3.py`).

¿Cómo se sabe cuál es? Por **lo que se esperaba**: si se esperaba un operando (al inicio, después de `(` o después de otro operador), el `-` es unario.

| Expresión | Tokens |
| --- | --- |
| `-5+2` | `~ 5 + 2` |
| `3*-2` | `3 * ~ 2` |
| `4-(-1)` | `4 - ( ~ 1 )` |
| `-2^2` | `~ 2 ^ 2` (vale -4: primero la potencia) |

En la pila de conversión, `~` tiene jerarquía **entre** `*` y `^`, y como no tiene dato a su izquierda, al entrar **nunca saca** a nadie. Al evaluar postfix, `~` hace **un solo** `pop` y mete el negativo.

## 3. Validar antes de convertir

Con una sola variable, `espera` (¿toca un operando?), se detectan casi todos los errores al recorrer los tokens:

| Token | Si `espera` es verdadero | Si `espera` es falso | Después |
| --- | --- | --- | --- |
| número | bien | **falta un operador** (`3 4`) | `espera = False` |
| `(` | bien | **falta un operador** (`3(4)`) | `espera = True` |
| `)` | **falta un operando** (`(3+)`) | bien | `espera = False` |
| `-` | es unario: `~` | es resta | `espera = True` |
| `+ * / ^` | **falta un operando** (`*3`) | bien | `espera = True` |

Además se cuentan los paréntesis abiertos: un `)` con 0 abiertos es **paréntesis sin abrir** (se revisa antes que lo demás). Al terminar: si `espera` sigue verdadero, **falta un operando** (`3+`); si quedan abiertos, **paréntesis sin cerrar**.

```python
def validar(toks):
    espera = True
    abiertos = 0
    for i in range(len(toks)):
        t = toks[i]
        if t.isdigit():
            if not espera:
                raise ValueError('falta un operador')
            espera = False
        elif t == '(':
            if not espera:
                raise ValueError('falta un operador')
            abiertos = abiertos + 1
        elif t == ')':
            if abiertos == 0:
                raise ValueError('paréntesis sin abrir')
            if espera:
                raise ValueError('falta un operando')
            abiertos = abiertos - 1
        elif t == '-' and espera:
            toks[i] = '~'
        else:
            if espera:
                raise ValueError('falta un operando')
            espera = True
    if espera:
        raise ValueError('falta un operando')
    if abiertos > 0:
        raise ValueError('paréntesis sin cerrar')
    return toks


for e in [['3', '+', '4'], ['-', '5'], ['3', '4'], ['(', '3', '+', ')'], ['3', '+'], ['(', '3'], [')']]:
    try:
        print(e, '→', validar(e))
    except ValueError as err:
        print(e, '→ Inválida:', err)
```

Fíjate que la validación también **cambia** los `-` unarios por `~`. Así, después de validar, la expresión está lista para convertir.

## 4. Dividir entre 0

Ese error no se ve hasta **evaluar**: `4 / (2 - 2)` es una expresión bien escrita. Python lanza `ZeroDivisionError` y se atrapa con `try` / `except`:

```python
try:
    print(4 / (2 - 2))
except ZeroDivisionError:
    print('Error: división entre 0')
```

## 5. Decimales que casi son enteros

Las computadoras guardan los decimales con un error chiquito: `0.1 + 0.2` no da exactamente `0.3`.

```python
print(0.1 + 0.2)
print(round(0.1 + 0.2, 6))
```

Por eso en este módulo el resultado se muestra con esta función, que primero redondea a 6 decimales y luego decide:

```python
def mostrar(v):
    v = round(v, 6)
    if v == int(v):
        return str(int(v))
    return f'{v:.2f}'


print(mostrar(0.1 + 0.2), mostrar(10 / 4), mostrar(3 * (1 / 3)), mostrar(-0.0))
```

## Todo junto

La calculadora del jefe es: `tokens` → `validar` → `a_postfix` (con `~` en la tabla) → evaluar postfix. Cada paso es una función corta que ya conoces; el único `try` va afuera de todo, atrapando `ValueError` (expresión inválida) y `ZeroDivisionError`.
