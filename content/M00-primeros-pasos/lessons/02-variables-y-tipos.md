# Variables y tipos

Una **variable** es un nombre que guarda un valor. Se crea con `=`, que en Python significa *guardar*, no *es igual*:

```python
edad = 19
nombre = "Paolo"
print(nombre)
print(edad)
```

Lee `edad = 19` como "guarda 19 en `edad`". Si después escribes `edad = 20`, el valor anterior se pierde.

## Los tres tipos del módulo

| Tipo | Qué guarda | Ejemplos |
| --- | --- | --- |
| `int` | números enteros | `7`, `-3`, `0` |
| `float` | números con decimales | `3.5`, `-0.25`, `2.0` |
| `str` | texto | `"hola"`, `"7"`, `""` |

`type()` te dice el tipo de un valor:

```python
print(type(7))
print(type(7.0))
print(type("7"))
```

Ojo: `7` y `"7"` **no son lo mismo**. Uno es un número y el otro es texto que se ve como número.

## El orden importa

Python lee de arriba hacia abajo. Antes de usar una variable, tiene que existir:

```python
x = 5
x = x + 1
print(x)
```

Predice antes de correr: ¿imprime 5 o 6? La línea `x = x + 1` toma el valor actual de `x`, le suma 1 y guarda el resultado otra vez en `x`.

## Nombres de variables

- Solo letras, números y `_`, y no pueden empezar con número: `nota1` sí, `1nota` no.
- Distinguen mayúsculas: `Nota` y `nota` son variables distintas.
- Usa nombres que digan qué guardan: `precio_total` se entiende; `pt` no.
