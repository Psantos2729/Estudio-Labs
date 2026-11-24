# Combinar condiciones: and, or, not

| Operador | Es verdadero cuando… |
| --- | --- |
| `a and b` | **ambas** son verdaderas |
| `a or b` | **al menos una** es verdadera |
| `not a` | `a` es falsa |

```python
edad = 20
tiene_dpi = True
if edad >= 18 and tiene_dpi:
    print("Puede votar")
```

## Rangos

Para saber si un número está entre dos valores:

```python
promedio = 7.8
if promedio >= 7 and promedio < 8.5:
    print("10% de descuento")
```

Python también acepta la forma corta `7 <= promedio < 8.5`, que se lee igual que en matemáticas.

## or para varias respuestas válidas

```python
respuesta = "si"
if respuesta == "Si" or respuesta == "si" or respuesta == "Sí":
    print("Respondiste que sí")
```

Un error típico es escribir `if respuesta == "Si" or "si":`. Eso **siempre** es verdadero, porque `"si"` por sí solo cuenta como verdadero. Cada lado del `or` debe ser una comparación completa.

Una forma más corta: pasar a minúsculas y comparar con una lista de opciones:

```python
respuesta = "SI"
print(respuesta.lower() in ["si", "sí"])
```

## not

```python
terminado = False
if not terminado:
    print("Sigue jugando")
```
