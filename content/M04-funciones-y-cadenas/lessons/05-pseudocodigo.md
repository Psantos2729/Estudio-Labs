# Funciones y textos en pseudocódigo

## Function … End function

Una función en pseudocódigo empieza con `Function nombre(parámetros)` y termina con `End function` (o solo `End`). Regresa su resultado con `return`.

| Python | Pseudocódigo |
| --- | --- |
| `def area(b, h):` | `Function area(b, h)` |
| `    return b * h` | `    return b * h` |
| (la sangría termina) | `End function` |

El programa principal va aparte, en su `Begin` … `End`, y llama a la función:

```pseudo
// entrada: 4 5
Function area(b, h)
    return b * h
End function

Begin
    read base
    read altura
    write "Área: ", area(base, altura)
End
```

En tus labs a veces la entrega es solo la función (por ejemplo `Function crear_vector(largo)`): también vale empezar directamente con `Function`.

## Varias respuestas

Una función puede regresar varios valores separados por comas, y quien la llama los recibe igual:

```pseudo
Function division(a, b)
    return a div b, a mod b
End function

Begin
    cociente, residuo ← division(17, 5)
    write cociente, " y sobran ", residuo
End
```

## Textos

Un texto se recorre como en Python: `len(s)` es su largo y `s[i]` la letra en la posición `i`, desde 0. Para preguntar si una letra es vocal sirve `in`:

```pseudo
// entrada: murcielago
Function contar_vocales(s)
    cuenta ← 0
    for i ← 0 to len(s) - 1
        if s[i] in "aeiouAEIOU"
            cuenta ← cuenta + 1
        end if
    end for
    return cuenta
End function

Begin
    read palabra
    write "Vocales: ", contar_vocales(palabra)
End
```

Los textos se pegan con `+`: `linea ← linea + "*"`.
