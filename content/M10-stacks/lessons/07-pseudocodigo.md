# Stacks en pseudocódigo

En pseudocódigo un stack se crea con `new Stack()` y se usa con sus operaciones, sin pensar en cómo está hecho por dentro:

| Operación | Pseudocódigo | Python (con lista) |
| --- | --- | --- |
| crear | `p ← new Stack()` | `p = []` |
| meter arriba | `p.push(x)` | `p.append(x)` |
| sacar de arriba | `x ← p.pop()` | `x = p.pop()` |
| ver el de arriba | `p.top()` | `p[-1]` |
| ¿está vacío? | `p.empty()` | `len(p) == 0` |

```pseudo
Begin
    p ← new Stack()
    p.push(1)
    p.push(2)
    p.push(3)
    write "arriba: ", p.top()
    while not p.empty()
        write p.pop()
    end while
End
```

Sale 3, 2, 1: el último que entra es el primero que sale.

## Invertir un texto

```pseudo
// entrada: hola
Begin
    read palabra
    p ← new Stack()
    for i ← 0 to len(palabra) - 1
        p.push(palabra[i])
    end for
    al_reves ← ""
    while not p.empty()
        al_reves ← al_reves + p.pop()
    end while
    write al_reves
End
```

## Paréntesis balanceados

Cada `(` entra al stack y cada `)` saca uno. Si al final queda vacío y nunca faltó, está balanceado:

```pseudo
// entrada: (a+(b*c))
Function balanceado(s)
    p ← new Stack()
    for i ← 0 to len(s) - 1
        if s[i] = "("
            p.push(s[i])
        else if s[i] = ")"
            if p.empty()
                return False
            end if
            p.pop()
        end if
    end for
    return p.empty()
End function

Begin
    read expresion
    if balanceado(expresion)
        write "balanceado"
    else
        write "no balanceado"
    end if
End
```

Prueba con `(a+(b*c))` y con `(a+b))`.
