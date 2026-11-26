# Decisiones en pseudocódigo

En pseudocódigo el `if` no lleva dos puntos ni depende de la sangría: **se cierra con `end if`**.

| Python | Pseudocódigo |
| --- | --- |
| `if x > 0:` | `if x > 0` |
| `elif x == 0:` | `else if x = 0` |
| `else:` | `else` |
| (la sangría termina) | `end if` |

## Comparar con =

La diferencia más importante con Python: **se compara con un solo `=`**, porque la asignación usa `←`. `if n = 0` pregunta "¿n es cero?". `!=` es "distinto de".

```pseudo
// entrada: 7
Begin
    read n
    if n mod 2 = 0
        write n, " es par"
    else
        write n, " es impar"
    end if
End
```

## Varias opciones

`else if` va dentro del mismo bloque; un solo `end if` cierra todo:

```pseudo
// entrada: 75
Begin
    read nota
    if nota >= 90
        write "Excelente"
    else if nota >= 61
        write "Aprobado"
    else
        write "Reprobado"
    end if
End
```

## and, or, not

Igual que en Python: `and`, `or` y `not`. `True` y `False` también.

```pseudo
// entrada: 16 1
Begin
    read edad
    read tiene_permiso
    if edad >= 18 or tiene_permiso = 1
        write "Puede entrar"
    else
        write "No puede entrar"
    end if
End
```

## Un if dentro de otro

Cada `if` necesita **su propio** `end if`. El `end if` cierra el `if` abierto más reciente, por eso la sangría ayuda a ver cuál cierras:

```pseudo
// entrada: 3 8
Begin
    read a
    read b
    if a = b
        write "iguales"
    else
        if a > b
            write "mayor: ", a
        else
            write "mayor: ", b
        end if
    end if
End
```

Si te falta un `end if`, pylab te dice de qué línea es el `if` que quedó abierto.
