# Más de dos caminos con elif

Cuando hay varias opciones, encadena condiciones con `elif` ("si no, si…"):

```python
nota = 7.5
if nota >= 9:
    print("Excelente")
elif nota >= 7:
    print("Bien")
elif nota >= 6:
    print("Suficiente")
else:
    print("Reprobado")
```

Python revisa las condiciones **de arriba hacia abajo** y ejecuta **solo la primera** que sea verdadera. Las demás ya no se revisan.

## El orden importa

Mira qué pasa si ponemos las condiciones al revés:

```python
nota = 9.5
if nota >= 6:
    print("Suficiente")
elif nota >= 7:
    print("Bien")
elif nota >= 9:
    print("Excelente")
```

Un 9.5 cumple `nota >= 6`, así que imprime `Suficiente` y nunca llega a `Excelente`. Regla práctica: con rangos de "mayor o igual", empieza por el valor **más alto**.

## else es opcional

Si no necesitas hacer nada cuando ninguna condición se cumple, simplemente no escribas `else`.

## Antes de programar: dibuja los rangos

Para un ejercicio con rangos (descuentos, calificaciones, tarifas), escribe primero en papel qué pasa en **cada** rango, incluidos los bordes: ¿un 8.5 exacto cae en el rango de arriba o en el de abajo? ¿Qué pasa con valores que el enunciado no menciona? Eso es tu análisis de casos especiales.
