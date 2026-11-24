# División entera (//) y residuo (%)

Imagina que repartes **17 dulces entre 5 amigos**, sin partir ningún dulce:

- A cada amigo le tocan **3** dulces. Eso es `17 // 5`.
- Sobran **2** dulces. Eso es `17 % 5`.

```python
dulces = 17
amigos = 5
print("a cada uno:", dulces // amigos)
print("sobran:", dulces % amigos)
```

`//` responde **"¿cuántas veces cabe completo?"** y `%` responde **"¿cuánto sobra?"**. Es la división que hacías a mano en la primaria, con cociente y residuo.

## La regla que siempre se cumple

Para cualquier par de enteros `a` y `b` (con `b` distinto de cero):

```
a == (a // b) * b + (a % b)
```

Con los dulces: `3 * 5 + 2 = 17`. Úsala para comprobar tus cuentas:

```python
a = 47
b = 6
print(a // b, a % b)
print((a // b) * b + a % b == a)
```

## El residuo siempre es menor que el divisor

`a % b` solo puede dar valores de `0` a `b - 1`. Mira cómo `% 3` da vueltas en un ciclo:

```python
print(0 % 3, 1 % 3, 2 % 3, 3 % 3, 4 % 3, 5 % 3, 6 % 3, 7 % 3)
```

Un caso que confunde: si el número es **más chico** que el divisor, no cabe ni una vez. El cociente es 0 y sobra el número completo:

```python
print(2 // 5)
print(2 % 5)
```

## Usos que vas a ver en los laboratorios

### ¿Es par? ¿Es múltiplo?

Un número es múltiplo de `k` cuando al dividirlo entre `k` no sobra nada:

```python
n = 18
print(n % 2 == 0)   # ¿es par?
print(n % 3 == 0)   # ¿es múltiplo de 3?
print(n % 5 == 0)   # ¿es múltiplo de 5?
```

### Separar los dígitos de un número

Dividir entre 10 "corre" el número un lugar. `% 10` se queda con el **último dígito** y `// 10` lo **quita**:

```python
n = 4728
print(n % 10)    # 8, el último dígito
print(n // 10)   # 472, el número sin el último dígito
```

Para un número de 3 dígitos, como en el ejercicio 16 del PDF:

```python
n = 365
centenas = n // 100
decenas = n // 10 % 10
unidades = n % 10
print(centenas, decenas, unidades)
```

Sigue `decenas` paso a paso: `365 // 10` da `36`, y `36 % 10` da `6`.

### Repartir en unidades más grandes

Tiempo, dinero o distancias: primero cuántas unidades grandes caben (`//`) y luego qué sobra (`%`) para repartirlo en las más chicas.

```python
total = 1586
billetes_50 = total // 50
resto = total % 50
print(billetes_50, "billetes de 50, sobran", resto)
```

Es el arranque del ejercicio 14 del PDF (billetes). Con `resto` repites lo mismo para los billetes de 20, de 10, y así.

### Dar la vuelta en un ciclo

Si hoy es día 5 de la semana (0 = lunes … 6 = domingo), ¿qué día será dentro de 10 días? `%` hace que, después del 6, se regrese al 0:

```python
hoy = 5
print((hoy + 10) % 7)
```

### divmod: las dos cosas de una vez

```python
horas, minutos = divmod(135, 60)
print(horas, minutos)
```

`divmod(a, b)` devuelve `a // b` y `a % b` juntos.

## Trampas

**Con negativos, `//` redondea hacia abajo**, no hacia el cero:

```python
print(7 // 2, -7 // 2)
print(7 % 2, -7 % 2)
```

`-7 // 2` da `-4` (porque -3.5 hacia abajo es -4), y el residuo es `1` para que la regla `(-4) * 2 + 1 == -7` se siga cumpliendo. En los laboratorios casi siempre trabajarás con positivos, pero si aparece un negativo, recuerda esto.

**Con decimales también funciona**, pero el resultado es `float`:

```python
print(7.5 // 2, 7.5 % 2)
```

**Dividir entre cero** con `//` o `%` da el mismo error que con `/`: `ZeroDivisionError`.

## Antes de seguir

Predice y luego comprueba: ¿qué imprime cada línea?

```python
print(100 // 7, 100 % 7)
print(9 % 10, 10 % 10, 11 % 10)
print(59 // 60, 60 // 60, 61 // 60)
```
