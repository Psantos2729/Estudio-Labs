# Expresiones con x y despejar x

Ya tienes una calculadora. Con un cambio pequeño acepta una **variable** `x`: la expresión se convierte a postfix **una vez** y se evalúa con el valor de `x` que quieras. Y con un truco, la misma calculadora **despeja x** en una ecuación como `2*(x+3) = 4*x - 2`.

## La x es un operando más

En los tokens, la letra `x` es un operando, igual que un número: va directo a la salida en la conversión. Solo al **evaluar** cambia algo: cuando aparece `x`, se hace `push` de su valor.

```python
def evaluar(postfix, x):
    pila = [None] * len(postfix)
    p = 0
    for t in postfix:
        if t == 'x':
            pila[p] = x
            p = p + 1
        elif t.isdigit():
            pila[p] = int(t)
            p = p + 1
        else:
            p = p - 1
            b = pila[p]
            p = p - 1
            a = pila[p]
            if t == '+':
                pila[p] = a + b
            elif t == '-':
                pila[p] = a - b
            elif t == '*':
                pila[p] = a * b
            elif t == '/':
                pila[p] = a / b
            else:
                pila[p] = a ** b
            p = p + 1
    return pila[0]


f = ['x', '2', '^', '3', 'x', '*', '-']   # x^2 - 3*x
for x in range(-1, 5):
    print(f'x = {x} → {evaluar(f, x)}')
```

Convertir una vez y evaluar muchas es justo para lo que sirve postfix: así funcionan las calculadoras que grafican.

Ojo: `2x` no es válido, porque entre `2` y `x` no hay operador (la validación dice "falta un operador"). Se escribe `2*x`.

## Despejar x en una ecuación lineal

Una ecuación **lineal** es una donde `x` solo se suma, se resta, se multiplica o se divide **por números** (nunca `x*x`, `x^2` ni `1/x`). Por ejemplo:

```text
2*(x+3) = 4*x - 2
```

Todo lo lineal, por enredado que se vea, se puede simplificar a la forma **`a·x + b`**. El truco es no simplificar a mano, sino **preguntarle** a la calculadora:

1. Pasa todo a un lado: `f(x) = izquierda - derecha`. La ecuación es `f(x) = 0`.
2. Evalúa `f(0)`: como `a·0 + b = b`, eso **es** `b`.
3. Evalúa `f(1)`: da `a + b`, así que `a = f(1) - f(0)`.
4. Despeja: `a·x + b = 0` → **`x = -b / a`**.

Con el ejemplo: `f(x) = 2*(x+3) - (4*x - 2)`.

| | Cuenta | Resultado |
| --- | --- | --- |
| `f(0)` | `2*(0+3) - (4*0 - 2) = 6 + 2` | `b = 8` |
| `f(1)` | `2*(1+3) - (4*1 - 2) = 8 - 2` | `6` |
| `a` | `f(1) - f(0) = 6 - 8` | `a = -2` |
| `x` | `-b / a = -8 / -2` | **`x = 4`** |

Comprueba: `2*(4+3) = 14` y `4*4 - 2 = 14`. ✓

## Los casos raros

Si `a = 0`, la `x` desapareció (por ejemplo `2*x + 1 = 2*x + 5`) y no se puede dividir:

| `a` | `b` | Significa | Ejemplo |
| --- | --- | --- | --- |
| ≠ 0 | cualquiera | una solución: `x = -b / a` | `3*x = 12` |
| 0 | ≠ 0 | **sin solución** (`1 = 5` nunca pasa) | `2*x+1 = 2*x+5` |
| 0 | 0 | **infinitas soluciones** (es lo mismo de los dos lados) | `2*(x+1) = 2*x+2` |

Por los decimales de la lección anterior, "es 0" se revisa como `abs(a) < 1e-9` (menor que una milmillonésima).

## ¿Y si no es lineal?

Con `x^2 = 4` el truco da una respuesta falsa, porque `x^2` no es de la forma `a·x + b`. Se puede detectar evaluando un punto más: si es lineal, de `f(1)` a `f(2)` sube **lo mismo** que de `f(0)` a `f(1)`.

```python
def f(x):
    return x ** 2 - 4


print(f(1) - f(0), f(2) - f(1))   # 1 y 3: no sube igual → no es lineal


def g(x):
    return 2 * (x + 3) - (4 * x - 2)


print(g(1) - g(0), g(2) - g(1))   # -2 y -2: lineal
```

## El programa completo

Con las funciones de este módulo (`tokens`, `validar`, `a_postfix`, `evaluar`):

1. Separa la ecuación en dos con `ecuacion.split('=')`.
2. Arma `'(' + izquierda + ')-(' + derecha + ')'` y conviértela a postfix **una sola vez**.
3. Evalúa en 0, 1 y 2, revisa que sea lineal y despeja.

Es el ejercicio "Despejar x" de este módulo, y lo que acabas de aprender es exactamente cómo lo hacen por dentro las calculadoras que "resuelven" ecuaciones lineales.
