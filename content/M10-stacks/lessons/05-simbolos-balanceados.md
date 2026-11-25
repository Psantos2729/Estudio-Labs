# Símbolos balanceados

Es el jefe del módulo (tu `Parentesis.py`): revisar que en una expresión como `{[a + (b * c)] - <d>}` cada símbolo que abre tenga su cierre, **del mismo tipo** y **en el orden correcto**.

## Por qué una pila

El último que se abrió es el **primero** que se debe cerrar. En `( [ ] )`, el `[` se abrió de último, así que el siguiente cierre tiene que ser `]`. "El último es el primero": eso es una pila.

## El algoritmo

Recorre la expresión carácter por carácter:

1. Si **abre** (`(`, `[`, `{`, `<`): `push`.
2. Si **cierra** (`)`, `]`, `}`, `>`):
   - si la pila está **vacía**: error, se cerró algo que nunca se abrió;
   - si no, `pop` y revisa que sean pareja. Si no lo son: error.
3. Cualquier otro carácter se ignora.
4. Al terminar, si la pila **no está vacía**: error, quedó algo sin cerrar.

Sigue `{[a+(b)]}`. Morado: lo que entra a la pila; amarillo: un carácter que se ignora; verde: una pareja que se cierra bien; gris: un error.

```pasos
{ | k0 | Carácter 0: { abre → push.
{ [ | k1 | Carácter 1: [ abre → push.
{ [ | c1 | Carácter 2: a no es símbolo, se ignora. Lo mismo con el +.
{ [ ( | k2 | Carácter 4: ( abre → push.
{ [ ( | c2 | Carácter 5: b se ignora.
{ [ ( | o2 | Carácter 6: ) cierra. pop() → ( : son pareja.
{ [ | o1 | Carácter 7: ] cierra. pop() → [ : pareja.
{ | o0 | Carácter 8: } cierra. pop() → { : pareja.
 |  | Fin y la pila quedó vacía: la expresión está bien.
```

## Los tres errores

| Expresión | Qué pasa | Error |
| --- | --- | --- |
| `(a+b))` | el segundo `)` llega con la pila vacía | se cerró sin abrir |
| `[a+b)` | `)` saca un `[` | no coinciden |
| `{(a+b)` | al terminar queda `{` en la pila | falta cerrar |

```pasos
[ | k0 | [a+b) — Carácter 0: [ → push.
[ | x0 | Carácter 4: ) cierra, pop() → [ . No es su pareja: error en la posición 4.
```

## Parejas sin muchos `if`

Tu `Parentesis.py` hace un `if` por cada símbolo y guarda en la pila el **cierre que se espera**. Es una buena idea. Otra forma corta es usar dos textos con los símbolos en el mismo orden: el que abre en la posición `i` de `ABRE` se cierra con el de la posición `i` de `CIERRA`.

```python
ABRE = '([{<'
CIERRA = ')]}>'
print(ABRE.index('['), CIERRA[ABRE.index('[')])
print(CIERRA.index('>'), ABRE[CIERRA.index('>')])
```

## El programa

```python
class Stack:
    def __init__(self, tamaño=10):
        self.data = [None] * tamaño
        self.pointer = 0

    def push(self, x):
        self.data[self.pointer] = x
        self.pointer = self.pointer + 1

    def pop(self):
        self.pointer = self.pointer - 1
        return self.data[self.pointer]

    def empty(self):
        return self.pointer == 0


ABRE = '([{<'
CIERRA = ')]}>'


def balanceada(expr):
    s = Stack(len(expr))
    for c in expr:
        if c in ABRE:
            s.push(c)
        elif c in CIERRA:
            if s.empty():
                return False
            if s.pop() != ABRE[CIERRA.index(c)]:
                return False
    return s.empty()


for e in ['{[a+(b)]}', '(a+b))', '[a+b)', '{(a+b)', '<x>*(y)']:
    print(e, balanceada(e))
```

`Stack(len(expr))` nunca se llena: a lo mucho todos los caracteres abren.

## Decir dónde falla

Para decir **en qué posición** está el error, en la pila se guarda el símbolo **y** su posición, como una pareja `(símbolo, posición)`. Así, si al final sobra algo, sabes dónde se abrió. Recorre con `for i in range(len(expr))` para tener la posición:

```python
expr = '{(a+b)'
pila = [None] * len(expr)
p = 0
for i in range(len(expr)):
    if expr[i] in '([{<':
        pila[p] = (expr[i], i)
        p = p + 1
    elif expr[i] in ')]}>':
        p = p - 1
simbolo, pos = pila[p - 1]
print('Falta cerrar', simbolo, 'abierto en la posición', pos)
```

Una pareja así se llama **tupla**; `simbolo, pos = pila[p - 1]` la separa en dos variables (lo viste con `struct.unpack` en M9).
