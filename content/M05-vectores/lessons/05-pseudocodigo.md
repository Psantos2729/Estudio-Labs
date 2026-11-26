# Vectores en pseudocódigo

En pseudocódigo un arreglo se crea **con su tamaño**, igual que la regla de este curso:

| Python | Pseudocódigo |
| --- | --- |
| `v = [0] * n` | `v ← new Array(n)` |
| `v[i] = 5` | `v[i] ← 5` |
| `len(v)` | `len(v)` |

Las posiciones van de `0` a `n - 1`, así que el recorrido completo es `for i ← 0 to n - 1`.

## Leer y mostrar un vector

Así es el patrón de tu tarea `Vectores`: leer el tamaño, crear el arreglo y llenarlo.

```pseudo
// entrada: 3 10 20 30
Begin
    read n
    v ← new Array(n)
    for i ← 0 to n - 1
        read v[i]
    end for
    for i ← n - 1 to 0 step -1
        write v[i]
    end for
End
```

Prueba con `3 10 20 30`: muestra el vector al revés.

## Suma de vectores

Este es el pseudocódigo de "Suma vectores", con el ciclo como `for`:

```pseudo
Function sumar(a, b)
    r ← new Array(len(a))
    for i ← 0 to len(a) - 1
        r[i] ← a[i] + b[i]
    end for
    return r
End function

Begin
    a ← new Array(3)
    b ← new Array(3)
    for i ← 0 to 2
        a[i] ← i + 1
        b[i] ← 10
    end for
    write sumar(a, b)
End
```

## Buscar un dato (Encontrar)

Recorrer el vector hasta encontrar el dato. Con `while` se puede parar en cuanto aparece:

```pseudo
Function encontrar(v, dato)
    i ← 0
    while i < len(v)
        if v[i] = dato
            return i
        end if
        i ← i + 1
    end while
    return -1
End function

Begin
    v ← new Array(4)
    v[0] ← 8
    v[1] ← 3
    v[2] ← 5
    v[3] ← 3
    write "posición: ", encontrar(v, 5)
    write "posición: ", encontrar(v, 9)
End
```

## Un detalle de tus labs

En `crear_vector` usaste `For i←0 to largo` con `I←i+1` adentro. Con la regla de esta guía, el `for` **incluye el final** y **avanza solo**: escribe `for i ← 0 to largo - 1` y quita el `i ← i + 1`. Si usas `while`, ahí sí necesitas el `i ← i + 1`.

`random(1, 10)` da un entero al azar del 1 al 10 (incluye los dos), pero en los ejercicios calificados no se usa porque cada corrida daría algo distinto.
