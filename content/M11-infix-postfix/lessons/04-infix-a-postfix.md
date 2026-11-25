# De infix a postfix

Es tu `infix_a_postfix.py`. Los **operandos** van directo a la salida (ya viste que no cambian de orden); los **operadores** esperan en una pila hasta que sea su turno.

## Las reglas

Recorre la expresión de izquierda a derecha:

1. **Operando** (letra o número): a la salida.
2. **`(`**: a la pila, siempre.
3. **`)`**: saca de la pila a la salida hasta encontrar el `(`. El `(` se saca y se descarta (los paréntesis nunca van a la salida).
4. **Operador**: mientras en la cima haya un operador (no un `(`) que **le gane**, sácalo a la salida. Después mete el nuevo.
   - "Le gana" si su jerarquía es **mayor**, o si es **igual** y el nuevo se agrupa a la izquierda.
   - Para `^` con `^` en la cima no sale nada: se agrupa a la derecha.
5. Al terminar: todo lo que quede en la pila, a la salida.

La idea de la regla 4: un operador en la pila **ya tiene** su dato izquierdo; si el nuevo operador es más débil (o igual y de izquierda), el de la pila puede terminar ya.

## Míralo con `a+b*c-d`

Arriba la entrada (amarillo: el símbolo que se lee), en medio la pila (rojo: lo que entra) y abajo la salida (morado: lo que acaba de llegar).

```matriz
Entrada: a + b * c - d || Pila: · || Salida: a | c0:0.0 k2:0.0 | a es operando: va directo a la salida.
Entrada: a + b * c - d || Pila: + || Salida: a | c0:0.1 i1:0.0 | +: nada en la pila le gana y + entra a la pila.
Entrada: a + b * c - d || Pila: + || Salida: a b | c0:0.2 k2:0.1 | b es operando: va directo a la salida.
Entrada: a + b * c - d || Pila: + * || Salida: a b | c0:0.3 i1:0.1 | *: nada en la pila le gana y * entra a la pila.
Entrada: a + b * c - d || Pila: + * || Salida: a b c | c0:0.4 k2:0.2 | c es operando: va directo a la salida.
Entrada: a + b * c - d || Pila: - || Salida: a b c * + | c0:0.5 i1:0.0 | -: sale *, + (jerarquía mayor o igual) y - entra a la pila.
Entrada: a + b * c - d || Pila: - || Salida: a b c * + d | c0:0.6 k2:0.5 | d es operando: va directo a la salida.
Entrada: a + b * c - d || Pila: · || Salida: a b c * + d - | o2:0.0 o2:0.1 o2:0.2 o2:0.3 o2:0.4 o2:0.5 o2:0.6 | Fin: se vacía la pila a la salida. Postfix: a b c * + d -
```

En el paso del `-`: el `*` tiene jerarquía mayor y sale; luego el `+` tiene **la misma** y el `-` se agrupa a la izquierda, así que también sale.

## Con paréntesis y potencias: `(a+b)*c^2^d`

```matriz
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: ( || Salida: · | c0:0.0 i1:0.0 | ( siempre entra a la pila.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: ( || Salida: a | c0:0.1 k2:0.0 | a es operando: va directo a la salida.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: ( + || Salida: a | c0:0.2 i1:0.1 | +: nada en la pila le gana y + entra a la pila.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: ( + || Salida: a b | c0:0.3 k2:0.1 | b es operando: va directo a la salida.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: · || Salida: a b + | c0:0.4 | ) saca a la salida todo hasta el ( (+) y el ( se descarta.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: * || Salida: a b + | c0:0.5 i1:0.0 | *: nada en la pila le gana y * entra a la pila.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: * || Salida: a b + c | c0:0.6 k2:0.3 | c es operando: va directo a la salida.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: * ^ || Salida: a b + c | c0:0.7 i1:0.1 | ^: nada en la pila le gana y ^ entra a la pila.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: * ^ || Salida: a b + c 2 | c0:0.8 k2:0.4 | 2 es operando: va directo a la salida.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: * ^ ^ || Salida: a b + c 2 | c0:0.9 i1:0.2 | ^: ^ se agrupa a la derecha: el ^ de la pila se queda y ^ entra a la pila.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: * ^ ^ || Salida: a b + c 2 d | c0:0.10 k2:0.5 | d es operando: va directo a la salida.
Entrada: ( a + b ) * c ^ 2 ^ d || Pila: · || Salida: a b + c 2 d ^ ^ * | o2:0.0 o2:0.1 o2:0.2 o2:0.3 o2:0.4 o2:0.5 o2:0.6 o2:0.7 o2:0.8 | Fin: se vacía la pila a la salida. Postfix: a b + c 2 d ^ ^ *
```

## El programa

```python
JER = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}


def le_gana(cima, nuevo):
    if cima == '(':
        return False
    if JER[cima] > JER[nuevo]:
        return True
    return JER[cima] == JER[nuevo] and nuevo != '^'


def a_postfix(expr):
    pila = [None] * len(expr)
    p = 0
    salida = ''
    for c in expr:
        if c.isalnum():
            salida = salida + c
        elif c == '(':
            pila[p] = c
            p = p + 1
        elif c == ')':
            while pila[p - 1] != '(':
                p = p - 1
                salida = salida + pila[p]
            p = p - 1
        else:
            while p > 0 and le_gana(pila[p - 1], c):
                p = p - 1
                salida = salida + pila[p]
            pila[p] = c
            p = p + 1
    while p > 0:
        p = p - 1
        salida = salida + pila[p]
    return salida


for e in ['a+b*c-d', '(a+b)*c^2^d', 'a-b+c', '2^3^2', '((a))']:
    print(e, '→', a_postfix(e))
```

La pila es un vector de `len(expr)` casillas con su puntero: nunca se llena.

## Diferencias con tu tarea

- Tu `jer()` y el `>=` hacen que `^` se agrupe a la izquierda. Aquí `le_gana` lo corrige con `nuevo != '^'`.
- Tu código ignora espacios porque solo mira `isalnum()` y los signos. Aquí también: un espacio no entra a ningún `if`.
- En tu `)` el `while` revisa `stack_signos[-1]` **antes** de `len(...) > 0`. Si falta el `(`, eso se rompe antes de revisar. En la lección 5 se valida la expresión primero.
