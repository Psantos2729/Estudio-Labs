# Tu primer pseudocódigo

En cada laboratorio entregas, además del `.py`, el **pseudocódigo**: el programa escrito en un lenguaje más simple, **en inglés**, que se enfoca en lo importante (qué se lee, qué se calcula y qué se muestra) sin pelear con detalles de Python. Desde este módulo vas a practicarlo junto con Python. Todas las reglas están en la [guía de pseudocódigo](../pseudocodigo).

## Begin y End

Todo programa empieza con `Begin` y termina con `End`, pegados al margen. Lo que va en medio es el programa, una instrucción por línea y **con una sangría** (un Tab o 4 espacios). La sangría es obligatoria: pylab la revisa.

```pseudo
Begin
    write "Hola, mundo"
End
```

Los ejemplos de pseudocódigo también se corren: pylab los traduce a Python. Abre **ver en Python** debajo del ejemplo para comparar.

## read y write

| Python | Pseudocódigo |
| --- | --- |
| `nombre = input()` | `read nombre` |
| `n = int(input())` | `read n` |
| `print("Hola,", nombre)` | `write "Hola, ", nombre` |

En pseudocódigo **no conviertes tipos**: `read n` ya sabe que lo que escribiste es un número. Y `write` pega sus partes sin espacio, así que el espacio lo pones dentro de las comillas.

La caja de entrada ya trae un nombre: cámbialo y vuelve a correr.

```pseudo
// entrada: Ana
Begin
    read nombre
    write "Hola, ", nombre, "!"
End
```

## Asignar con la flecha ←

En pseudocódigo se guarda un valor con **`←`** (se lee "recibe"). El `=` queda **solo para comparar**, como en matemáticas. En el editor puedes escribir `<-` y se convierte en `←`.

```pseudo
// entrada: 4 5
Begin
    read base
    read altura
    area ← base * altura
    write "Área: ", area
End
```

Prueba con `4 5` en la entrada.

## Operaciones

`+ - * /` son iguales que en Python. Para la división entera y el residuo se usan palabras:

| Python | Pseudocódigo |
| --- | --- |
| `a // b` | `a div b` |
| `a % b` | `a mod b` |
| `a ** 2` | `a ^ 2` |

```pseudo
// entrada: 200
Begin
    read segundos
    minutos ← segundos div 60
    resto ← segundos mod 60
    write minutos, " min ", resto, " s"
End
```

## Lo que pylab te marca

Si escribes Python dentro del pseudocódigo, pylab te dice qué cambiar: `print(` → `write`, `input()` → `read`, `x = 5` → `x ← 5`. Y si falta el `End`, también te avisa con el número de línea.
