# Ordenar y buscar en pseudocódigo

Los algoritmos de ordenamiento son donde más se nota el pseudocódigo: sin detalles de Python, se ve solo la idea.

## Burbuja

Compara vecinos y los intercambia si están al revés. Para intercambiar se usa una variable auxiliar:

```pseudo
// entrada: 5 4 1 5 2 3
Begin
    read n
    v ← new Array(n)
    for i ← 0 to n - 1
        read v[i]
    end for
    for pasada ← 1 to n - 1
        for j ← 0 to n - 1 - pasada
            if v[j] > v[j + 1]
                aux ← v[j]
                v[j] ← v[j + 1]
                v[j + 1] ← aux
            end if
        end for
    end for
    write v
End
```

Prueba con `5 4 1 5 2 3`.

## Selección

Busca el menor de lo que falta y lo pone al frente:

```pseudo
Function seleccion(v)
    n ← len(v)
    for i ← 0 to n - 2
        pos_menor ← i
        for j ← i + 1 to n - 1
            if v[j] < v[pos_menor]
                pos_menor ← j
            end if
        end for
        aux ← v[i]
        v[i] ← v[pos_menor]
        v[pos_menor] ← aux
    end for
    return v
End function

Begin
    v ← new Array(4)
    v[0] ← 9
    v[1] ← 2
    v[2] ← 7
    v[3] ← 1
    write seleccion(v)
End
```

## Búsqueda binaria

Solo sirve con el vector **ordenado**. Se mira el centro y se descarta la mitad que no puede tenerlo:

```pseudo
Function binaria(v, dato)
    izq ← 0
    der ← len(v) - 1
    while izq <= der
        medio ← (izq + der) div 2
        if v[medio] = dato
            return medio
        else if v[medio] < dato
            izq ← medio + 1
        else
            der ← medio - 1
        end if
    end while
    return -1
End function

Begin
    v ← new Array(6)
    for i ← 0 to 5
        v[i] ← i * 10
    end for
    write binaria(v, 30)
    write binaria(v, 35)
End
```

Fíjate en `(izq + der) div 2`: en pseudocódigo la división entera se escribe `div`.
