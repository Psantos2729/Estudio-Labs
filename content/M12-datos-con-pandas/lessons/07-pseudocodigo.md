# El algoritmo detrás de pandas, en pseudocódigo

pandas hace en una línea lo que en pseudocódigo se escribe con ciclos. En la entrega, el pseudocódigo **explica qué hace** el programa, así que conviene saber escribir esas operaciones a mano. Aquí una tabla son vectores paralelos: `nombres[i]` y `notas[i]` son de la misma persona.

## Promedio de una columna (`df["nota"].mean()`)

```pseudo
// entrada: 4 80 61 95 40
Begin
    read n
    notas ← new Array(n)
    suma ← 0
    for i ← 0 to n - 1
        read notas[i]
        suma ← suma + notas[i]
    end for
    write "Promedio: ", suma / n
End
```

## Filtrar filas (`df[df["nota"] >= 61]`)

```pseudo
// entrada: 3 Ana 80 Luis 50 Eva 61
Begin
    read n
    nombres ← new Array(n)
    notas ← new Array(n)
    for i ← 0 to n - 1
        read nombres[i]
        read notas[i]
    end for
    for i ← 0 to n - 1
        if notas[i] >= 61
            write nombres[i], " ", notas[i]
        end if
    end for
End
```

Prueba con `3 Ana 80 Luis 50 Eva 61`.

## Contar por grupo (`df["seccion"].value_counts()`)

Sin diccionarios: un vector de contadores, uno por grupo.

```pseudo
// entrada: 5 1 3 1 2 1
Begin
    read n
    cuenta ← new Array(3)
    for i ← 0 to n - 1
        read seccion
        cuenta[seccion - 1] ← cuenta[seccion - 1] + 1
    end for
    for s ← 1 to 3
        write "Sección ", s, ": ", cuenta[s - 1]
    end for
End
```

En tu entrega puedes escribir el pseudocódigo así, aunque el `.py` use pandas: el pseudocódigo describe el proceso, el `.py` lo resuelve con la herramienta.
