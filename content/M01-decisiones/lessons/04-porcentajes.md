# Porcentajes y descuentos

El **x %** de una cantidad es `cantidad * x / 100`:

```python
precio = 250
print(precio * 20 / 100)
```

## Aplicar un descuento

Hay dos formas equivalentes:

```python
precio = 250
descuento = precio * 20 / 100
print(precio - descuento)
print(precio * 0.80)
```

Quitar el 20 % es lo mismo que pagar el 80 %. La segunda forma es más corta, pero la primera te deja mostrar cuánto ahorraste.

## Ponderaciones

Cuando una nota final se arma con porcentajes, cada parte se multiplica por su peso y se suman. Los pesos deben sumar 100 %:

```python
parciales = 80
examen = 90
proyecto = 100
final = parciales * 0.50 + examen * 0.30 + proyecto * 0.20
print(final)
```

## Decimales al mostrar

Con dinero casi siempre quieres dos decimales:

```python
total = 250 * 0.9
print(total)
print(f"{total:.2f}")
```

## Decisión + porcentaje

Lo típico en los laboratorios: el porcentaje **depende** de una condición. Primero decide el porcentaje con `if`, y después haz la cuenta una sola vez:

```python
camisas = 4
precio = 75
if camisas >= 3:
    porcentaje = 20
else:
    porcentaje = 10
total = camisas * precio
print(f"Total: {total - total * porcentaje / 100:.2f}")
```
