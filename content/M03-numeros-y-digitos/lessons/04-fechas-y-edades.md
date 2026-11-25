# Fechas y edades

El ejercicio 9 del PDF pide calcular la edad de una persona con su fecha de nacimiento. Parece una resta, pero tiene una trampa.

## La trampa del cumpleaños

Si naciste en 2005 y estamos en 2026, la resta da 21. Pero solo tienes 21 si **ya cumpliste años** este año. Si tu cumpleaños es en diciembre y hoy es noviembre, todavía tienes 20.

```python
dia_nac, mes_nac, anio_nac = 25, 12, 2005
dia_hoy, mes_hoy, anio_hoy = 24, 11, 2026
edad = anio_hoy - anio_nac
if (mes_hoy, dia_hoy) < (mes_nac, dia_nac):
    edad = edad - 1   # todavía no llega su cumpleaños
print(edad)   # 20
```

`(mes_hoy, dia_hoy) < (mes_nac, dia_nac)` compara **parejas** (tuplas). Python compara primero los meses; solo si son iguales, mira los días. Es como ordenar fechas en un calendario. Lo mismo, sin tuplas, sería:

```text
if mes_hoy < mes_nac or (mes_hoy == mes_nac and dia_hoy < dia_nac):
    edad = edad - 1
```

Si hoy es justo el cumpleaños, las parejas son iguales, `<` da `False` y la edad no baja: ese día ya cumpliste.

## ¿Por qué pedir también la fecha de hoy?

Python puede saber la fecha actual, pero entonces el resultado cambiaría cada día y las pruebas no podrían revisarlo. En estos ejercicios la fecha de hoy **también se lee con `input()`**. Así se prueba con cualquier fecha, incluido un día antes y el día exacto del cumpleaños.

## Leer una fecha en una sola línea

Si la fecha llega como `14/03/2005`, `split("/")` la corta en pedazos de texto y luego conviertes cada uno con `int`:

```python
texto = "14/03/2005"
d, m, a = texto.split("/")      # "14", "03", "2005"
dia, mes, anio = int(d), int(m), int(a)
print(dia, mes, anio)   # 14 3 2005
```

Así `int("03")` da `3`: los ceros a la izquierda no estorban.

## Contar días entre dos fechas

Para "¿cuántos días faltan?" no basta con restar meses: los meses tienen 28, 29, 30 o 31 días. Python trae el módulo `datetime`, que ya sabe todo eso:

```python
from datetime import date

hoy = date(2026, 11, 24)
cumple = date(2026, 12, 25)
print((cumple - hoy).days)   # 31
```

Restar dos `date` da una diferencia, y `.days` es cuántos días hay. Si el cumpleaños de este año ya pasó, el próximo es el del año siguiente: `date(anio_hoy + 1, mes_nac, dia_nac)`.

## Reto: años bisiestos

Un año tiene 366 días (febrero llega a 29) si es **bisiesto**. La regla del calendario que usamos es:

- Es bisiesto si es divisible entre 4,
- **excepto** si es divisible entre 100,
- **salvo** que también sea divisible entre 400.

Así, 2024 sí, 1900 no y 2000 sí. Con `%` y los operadores de M1 se escribe en una línea:

```python
anio = 1900
bisiesto = (anio % 4 == 0 and anio % 100 != 0) or anio % 400 == 0
print(bisiesto)   # False
```

El orden de los paréntesis importa: primero "divisible entre 4 pero no entre 100", y aparte el caso de 400.

## Antes de seguir

- Edad = resta de años, **menos 1** si el cumpleaños de este año todavía no llega.
- `(mes, dia) < (mes2, dia2)` compara fechas del mismo año.
- `split("/")` separa una fecha escrita con barras.
- `date(a, m, d)` y `.days` cuentan los días entre dos fechas.
