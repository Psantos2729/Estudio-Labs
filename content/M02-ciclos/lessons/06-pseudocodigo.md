# Ciclos en pseudocódigo

## for: de un número a otro

```text
for variable ← inicio to final step n
    acciones
end for
```

El `for` del pseudocódigo **incluye el final**: `for i ← 1 to 5` da 1, 2, 3, 4 y 5. En Python sería `range(1, 6)`. `step` es opcional y dice de cuánto en cuánto avanza (puede ser negativo). En lugar de `←` también puedes escribir `=`.

| Python | Pseudocódigo |
| --- | --- |
| `for i in range(1, 6):` | `for i ← 1 to 5` |
| `for i in range(0, n):` | `for i ← 0 to n - 1` |
| `for i in range(10, 0, -2):` | `for i ← 10 to 2 step -2` |

```pseudo
// entrada: 5
Begin
    read n
    suma ← 0
    for i ← 1 to n
        suma ← suma + i
    end for
    write "Suma de 1 a ", n, ": ", suma
End
```

Ojo: dentro de un `for` **no sumes tú** `i ← i + 1`; el `for` ya avanza solo.

## while: mientras se cumpla

```pseudo
// entrada: 3
Begin
    read n
    while n > 0
        write n
        n ← n - 1
    end while
    write "¡Despegue!"
End
```

En el `while` sí tienes que cambiar la variable tú: si no, el ciclo nunca termina. En algunos labs verás `begin` después del `while`: es opcional.

## Contadores y acumuladores

Un **contador** suma 1 cada vez; un **acumulador** suma un valor. Así se lee una lista de números hasta que llegue un 0:

```pseudo
// entrada: 5 3 8 0
Begin
    total ← 0
    cuantos ← 0
    read x
    while x != 0
        total ← total + x
        cuantos ← cuantos + 1
        read x
    end while
    write cuantos, " números, total ", total
End
```

Prueba con `5 3 8 0` en la entrada.

## Ciclos anidados

Cada ciclo se cierra con su propio `end for` o `end while`, en orden inverso al que se abrieron:

```pseudo
Begin
    for fila ← 1 to 3
        linea ← ""
        for col ← 1 to fila
            linea ← linea + "*"
        end for
        write linea
    end for
End
```
