# Matrices en pseudocódigo

Una matriz se crea con sus dos medidas: **`new Array(filas, columnas)`**. Todas las casillas empiezan en 0 y se usan con `m[i][j]`.

| Python | Pseudocódigo |
| --- | --- |
| `m = [[0] * c for _ in range(f)]` | `m ← new Array(f, c)` |
| `m[i][j] = 5` | `m[i][j] ← 5` |
| `len(m)`, `len(m[0])` | `len(m)`, `len(m[0])` |

## Recorrer una matriz

Dos `for` anidados: el de afuera recorre filas, el de adentro columnas. Cada uno con su `end for`:

```pseudo
// entrada: 2 3
Begin
    read f
    read c
    m ← new Array(f, c)
    for i ← 0 to f - 1
        for j ← 0 to c - 1
            m[i][j] ← i * c + j
        end for
    end for
    for i ← 0 to f - 1
        write m[i]
    end for
End
```

Prueba con `2 3`.

## Sumar matrices (tu lab Matrices)

```pseudo
Function sumar_matriz(a, b)
    r ← new Array(len(a), len(a[0]))
    for i ← 0 to len(a) - 1
        for j ← 0 to len(a[0]) - 1
            r[i][j] ← a[i][j] + b[i][j]
        end for
    end for
    return r
End function

Begin
    a ← new Array(2, 2)
    b ← new Array(2, 2)
    a[0][0] ← 1
    a[1][1] ← 2
    b[0][1] ← 5
    write sumar_matriz(a, b)
End
```

## Multiplicar matrices

El de tu lab, con el `for` que incluye el final (por eso `- 1`):

```pseudo
Function multiplicar_matriz(a, b)
    r ← new Array(len(a), len(b[0]))
    for i ← 0 to len(a) - 1
        for j ← 0 to len(b[0]) - 1
            suma ← 0
            for z ← 0 to len(a[0]) - 1
                suma ← suma + a[i][z] * b[z][j]
            end for
            r[i][j] ← suma
        end for
    end for
    return r
End function

Begin
    a ← new Array(2, 2)
    a[0][0] ← 1
    a[0][1] ← 2
    a[1][0] ← 3
    a[1][1] ← 4
    write multiplicar_matriz(a, a)
End
```

En tu entrega original, `For i ← 0 to len(matriz1)` se pasaría una fila: con esta regla se escribe `to len(matriz1) - 1`.
