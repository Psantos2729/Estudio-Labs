# Tomar decisiones con if y else

Hasta ahora, todos los programas corrían todas sus líneas. Con `if` el programa **elige** qué hacer:

```python
edad = 17
if edad >= 18:
    print("Puedes votar")
else:
    print("Todavía no puedes votar")
print("Fin")
```

Cambia `edad` a 20 y vuelve a correrlo. La última línea (`Fin`) se imprime siempre, porque no está dentro del `if`.

## La sangría es parte del código

Las líneas que pertenecen al `if` van **sangradas** (4 espacios). Así sabe Python dónde empieza y dónde termina cada bloque. No olvides los dos puntos `:` al final del `if` y del `else`.

## Comparaciones

| Operador | Significa | Ejemplo verdadero |
| --- | --- | --- |
| `==` | igual a | `5 == 5` |
| `!=` | distinto de | `5 != 3` |
| `>` | mayor que | `5 > 3` |
| `<` | menor que | `3 < 5` |
| `>=` | mayor o igual | `5 >= 5` |
| `<=` | menor o igual | `3 <= 5` |

Ojo: `=` **guarda** un valor y `==` **compara**. Confundirlos es el error más común del módulo.

Una comparación da `True` (verdadero) o `False` (falso). Puedes verlo:

```python
print(5 > 3)
print(5 == 3)
print("hola" == "Hola")
```

La última da `False`: en el texto, mayúsculas y minúsculas cuentan.

## Cuidado con los tipos

`input()` devuelve texto, y el texto `"10"` no es el número `10`:

```python
print("10" == 10)
print(int("10") == 10)
```

Si vas a comparar números que leíste, conviértelos primero con `int()` o `float()`.
