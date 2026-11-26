# Guía de pseudocódigo

El pseudocódigo de los laboratorios es **otro lenguaje, en inglés**, sin tantas reglas como Python: sirve para escribir la parte más importante del programa antes de programarla. Va en cada entrega (portada, análisis, **pseudocódigo**, diagrama de flujo, pruebas).

Aquí cada ejemplo **se corre**: pylab lo traduce a Python por detrás y te dice en español qué falta. Abre "ver en Python" para comparar los dos lenguajes línea por línea.

## Las reglas en una tabla

| Para… | Pseudocódigo | Python |
| --- | --- | --- |
| empezar y terminar | `Begin` … `End` | (el archivo) |
| una función | `Function suma(a, b)` … `End function` | `def suma(a, b):` |
| pedir un dato | `read n` | `n = int(input())` |
| mostrar | `write "Total: ", total` | `print("Total:", total)` |
| regresar | `return x` | `return x` |
| asignar | `x ← 5` | `x = 5` |
| comparar | `x = 5`, `x != 5`, `<`, `<=`, `>`, `>=` | `x == 5`, `x != 5`… |
| decidir | `if` … `else if` … `else` … `end if` | `if` … `elif` … `else:` |
| repetir contando | `for i ← 0 to n-1` … `end for` | `for i in range(0, n):` |
| repetir mientras | `while x > 0` … `end while` | `while x > 0:` |
| residuo y división entera | `x mod 2`, `x div 2` | `x % 2`, `x // 2` |
| lógica | `and`, `or`, `not`, `True`, `False` | igual |
| vector | `v ← new Array(n)` | `v = [0] * n` |
| matriz | `m ← new Array(filas, columnas)` | `[[0] * c for _ in range(f)]` |
| tamaño | `len(v)` | `len(v)` |
| pila | `p ← new Stack()`, `p.push(x)`, `p.pop()`, `p.top()`, `p.empty()` | una lista con `append` y `pop` |
| comentario | `// esto no se ejecuta` | `# esto no se ejecuta` |

Cosas que pylab acepta porque así se escriben en los labs:

- **Mayúsculas no importan**: `End While` = `end while`, y `Largo` es la misma variable que `largo`.
- `endif`, `endfor`, `endwhile` pegados también valen.
- En el `for` puedes usar `=` o `←`: `for i = 0 to n-1`.
- `begin` después de un `while`, `for` o `if` es opcional (no hace nada).
- `then` después del `if` y `do` después del `while` también son opcionales.
- La flecha `←` se escribe con `<-`: el editor la convierte sola.
- La sangría no cuenta, pero úsala: así se ve qué está dentro de cada bloque.

## Begin, read y write

Todo programa empieza con `Begin` y termina con `End`. `read` guarda lo que escribe el usuario; si es un número, ya queda como número.

```pseudo
// entrada: Ana 17
Begin
    read nombre
    read edad
    write "Hola, ", nombre
    write "En 10 años tendrás ", edad + 10
End
```

`write` pega sus partes **sin espacios**: el espacio lo pones tú dentro de las comillas.

## Asignar con ← y comparar con =

La regla más importante: **`←` guarda un valor, `=` pregunta si son iguales**. `x ← 5` es "x vale 5"; `if x = 5` es "¿x es 5?".

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

## if, else if y else

```pseudo
// entrada: 75
Begin
    read nota
    if nota >= 90
        write "A"
    else if nota >= 70
        write "B"
    else
        write "Reprobado"
    end if
End
```

Un solo `end if` cierra todo el bloque, aunque tenga varios `else if`.

## for: de un número a otro

`for i ← inicio to final` **incluye el final**. Para recorrer un vector de tamaño `n`, ve de `0` a `n-1`. `step` cambia de cuánto en cuánto avanza (puede ser negativo).

```pseudo
Begin
    for i ← 0 to 4
        write i
    end for
    for i ← 10 to 0 step -5
        write "cuenta: ", i
    end for
End
```

## while: mientras se cumpla

```pseudo
// entrada: 4096
Begin
    read n
    digitos ← 0
    while n > 0
        n ← n div 10
        digitos ← digitos + 1
    end while
    write "dígitos: ", digitos
End
```

## Funciones

Una función empieza con `Function nombre(parámetros)` y termina con `End function`. Regresa su resultado con `return`, y puede regresar varios: `return mayor, menor`. El programa principal (`Begin`… `End`) la llama.

```pseudo
Function mayor_menor(v)
    mayor ← v[0]
    menor ← v[0]
    for i ← 1 to len(v) - 1
        if v[i] > mayor
            mayor ← v[i]
        end if
        if v[i] < menor
            menor ← v[i]
        end if
    end for
    return mayor, menor
End function

Begin
    v ← new Array(4)
    v[0] ← 7
    v[1] ← -2
    v[2] ← 15
    v[3] ← 4
    a, b ← mayor_menor(v)
    write "mayor: ", a, ", menor: ", b
End
```

## Vectores y matrices

Un arreglo se crea **con su tamaño**: `new Array(n)`. Todas sus posiciones empiezan en 0 y van de `0` a `n-1`. Una matriz es `new Array(filas, columnas)` y se usa `m[i][j]`.

```pseudo
Begin
    m ← new Array(2, 3)
    for i ← 0 to 1
        for j ← 0 to 2
            m[i][j] ← i * 10 + j
        end for
    end for
    write m
End
```

## Errores comunes (pylab te los marca)

- Escribir Python: `print(`, `input(`, `def`, `elif`, `range(` o dos puntos al final de la línea.
- Asignar con `=` (`x = 5`) o comparar con `==`.
- Olvidar un `end if`, `end for` o `end while`, o cerrarlos en otro orden: el `end` cierra **el bloque abierto más reciente**.
- Escribir algo fuera de `Begin` … `End`.
