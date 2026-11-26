# Dígitos en pseudocódigo

Separar un número en dígitos es el mismo truco que en Python, solo cambian los nombres: **`mod 10`** da el último dígito y **`div 10`** lo quita.

| Python | Pseudocódigo |
| --- | --- |
| `n % 10` | `n mod 10` |
| `n // 10` | `n div 10` |

```pseudo
// entrada: 472
Begin
    read n
    while n > 0
        digito ← n mod 10
        write "dígito: ", digito
        n ← n div 10
    end while
End
```

Prueba con `472`: salen 2, 7 y 4, del último al primero.

## Sumar los dígitos

```pseudo
// entrada: 472
Begin
    read n
    suma ← 0
    while n > 0
        suma ← suma + n mod 10
        n ← n div 10
    end while
    write "Suma: ", suma
End
```

`mod` y `div` tienen la misma prioridad que `*` y `/`, por eso `suma + n mod 10` primero saca el dígito y luego lo suma.

## Armar un número al revés

Para construir un número dígito por dígito se multiplica por 10 y se suma el dígito nuevo:

```pseudo
// entrada: 1234
Begin
    read n
    invertido ← 0
    while n > 0
        invertido ← invertido * 10 + n mod 10
        n ← n div 10
    end while
    write invertido
End
```

## Así va en tu entrega

En el análisis describes el proceso con palabras ("se saca el último dígito con mod 10…") y el pseudocódigo lo dice paso a paso. No pongas detalles de Python como `int(input())`: en pseudocódigo basta `read n`.
