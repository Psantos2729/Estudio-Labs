# Mostrar resultados con f-strings

Una **f-string** es un texto con una `f` antes de las comillas. Lo que pongas entre llaves `{}` se reemplaza por su valor:

```python
nombre = "Ana"
edad = 19
print(f"{nombre} tiene {edad} años")
```

Sin la `f`, Python imprime las llaves tal cual:

```python
nombre = "Ana"
print("{nombre}")
```

## Dentro de las llaves puede ir una cuenta

```python
precio = 120
print(f"Con IVA: {precio * 1.16}")
```

## Controlar los decimales

`{valor:.2f}` muestra el número con exactamente 2 decimales (redondeando):

```python
promedio = 8.666666
print(f"Promedio: {promedio:.2f}")
print(f"Promedio: {promedio:.1f}")
print(f"Promedio: {promedio:.0f}")
```

Esto solo cambia cómo se **muestra**; la variable sigue valiendo `8.666666`.

## print con comas vs. f-string

`print(a, b)` separa los valores con un espacio. Una f-string te deja decidir exactamente qué sale, sin espacios de más:

```python
total = 50
print("Total:", total, "pesos")
print(f"Total: ${total} pesos")
```

En los ejercicios la salida se compara letra por letra, así que una f-string suele ser la forma más segura.
