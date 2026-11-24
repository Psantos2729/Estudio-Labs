# Leer datos con input()

`input()` detiene el programa, espera a que la persona escriba algo y presione Enter, y devuelve lo que escribió:

```
nombre = input("¿Cómo te llamas? ")
print("Hola,", nombre)
```

El texto entre paréntesis es el mensaje que ve la persona. Es opcional.

## input() siempre devuelve texto

Aunque la persona escriba `20`, `input()` devuelve `"20"`, un `str`. Mira qué pasa al sumar textos:

```python
a = "20"
b = "5"
print(a + b)
```

Con texto, `+` **pega** en vez de sumar. Para hacer cuentas hay que convertir:

```python
a = int("20")
b = int("5")
print(a + b)
```

## Convertir entre tipos

| Función | Convierte a | Ejemplo |
| --- | --- | --- |
| `int(x)` | entero | `int("42")` → `42` |
| `float(x)` | decimal | `float("3.5")` → `3.5` |
| `str(x)` | texto | `str(42)` → `"42"` |

Lo normal es convertir en la misma línea en que lees:

```
edad = int(input("Edad: "))
precio = float(input("Precio: "))
```

Si la persona escribe algo que no es número, `int()` falla con `ValueError`. Más adelante aprenderás a validarlo; por ahora, confía en que la entrada es correcta.

## Un input() por cada dato

Cada llamada a `input()` lee **una línea**. Si necesitas dos números, llama a `input()` dos veces. En los ejercicios, la caja "entrada para Correr" lleva un dato por línea.
