# Sacar los dígitos de un número con un ciclo

En M0 viste que `n % 10` da el **último dígito** de un número y que `n // 10` lo **quita**. Con un solo número de tres cifras eso alcanza. Pero ¿qué pasa si no sabes cuántas cifras tiene? Ahí entra el `while`.

```python
n = 4071
while n > 0:
    print(n % 10)
    n = n // 10
```

Imprime `1`, `7`, `0` y `4`, uno por línea: los dígitos **de derecha a izquierda**. Mira cómo cambia `n` en cada vuelta:

| Vuelta | `n` al empezar | `n % 10` (se imprime) | `n // 10` (nuevo `n`) |
| --- | --- | --- | --- |
| 1 | 4071 | 1 | 407 |
| 2 | 407 | 7 | 40 |
| 3 | 40 | 0 | 4 |
| 4 | 4 | 4 | 0 |

Cuando `n` llega a 0 ya no quedan dígitos y el ciclo termina. ¿Por qué funciona? Porque nuestro sistema es **en base 10**: dividir entre 10 corre todo una posición a la derecha, y el residuo es justo lo que "se cae" por la orilla.

## Tres patrones con el mismo ciclo

Casi todos los ejercicios de dígitos son este ciclo más un acumulador o un contador de M2.

**Contar los dígitos** (un contador):

```python
n = 4071
cifras = 0
while n > 0:
    cifras = cifras + 1
    n = n // 10
print(cifras)   # 4
```

**Sumar los dígitos** (un acumulador):

```python
n = 4071
suma = 0
while n > 0:
    suma = suma + n % 10
    n = n // 10
print(suma)   # 12, porque 4 + 0 + 7 + 1 = 12
```

**Darle la vuelta al número**: cada dígito que sale se pega a la derecha del número nuevo. "Pegar a la derecha" es multiplicar por 10 y sumar.

```python
n = 4071
reves = 0
while n > 0:
    reves = reves * 10 + n % 10
    n = n // 10
print(reves)   # 1704
```

`reves` va valiendo 1, luego 17, luego 170 y al final 1704. Fíjate que el resultado es un **número**: si el original termina en ceros (como 120) el revés es 21, no "021".

Un número es **capicúa** (o palíndromo) si se lee igual al derecho y al revés: 121, 4334, 7. Para saberlo, guarda una copia del original **antes** del ciclo, porque el ciclo lo deja en 0:

```python
// entrada: 12321
n = int(input())
original = n
reves = 0
while n > 0:
    reves = reves * 10 + n % 10
    n = n // 10
print(original == reves)
```

## El caso del cero

Si `n` vale 0, el ciclo `while n > 0` no da ni una vuelta. Para contar cifras eso da 0, pero el número 0 tiene **una** cifra. Cuando el 0 sea una entrada posible, trátalo aparte con un `if` o cuenta "al menos 1".

Con negativos pasa algo parecido: `while n > 0` no entra. Si el ejercicio los permite, trabaja con `abs(n)`, que es el valor sin signo: `abs(-52)` da `52`.

## Reto: números de Armstrong

Un número de **Armstrong** es igual a la suma de sus dígitos elevados a la cantidad de cifras que tiene. Por ejemplo, 153 tiene 3 cifras y 1³ + 5³ + 3³ = 1 + 125 + 27 = 153. En Python la potencia se escribe `**`: `5 ** 3` da `125`.

Necesitas **dos** ciclos sobre el mismo número: uno para contar las cifras y otro para sumar las potencias. Como el primero deja el número en 0, cada ciclo trabaja sobre su propia copia.

## Reto: máximo común divisor (Euclides)

El **MCD** de dos números es el mayor entero que divide a los dos: el MCD de 48 y 18 es 6. Hace más de 2000 años Euclides notó que el MCD de `a` y `b` es el mismo que el de `b` y `a % b`. Se repite hasta que el residuo es 0:

| `a` | `b` | `a % b` |
| --- | --- | --- |
| 48 | 18 | 12 |
| 18 | 12 | 6 |
| 12 | 6 | 0 |
| 6 | 0 | — |

Cuando `b` llega a 0, la respuesta es `a`. En código, con la asignación doble de Python que cambia los dos valores a la vez:

```python
a, b = 48, 18
while b != 0:
    a, b = b, a % b
print(a)   # 6
```

`a, b = b, a % b` calcula **primero** los dos valores de la derecha con los `a` y `b` viejos, y después los guarda. Si lo escribieras en dos líneas separadas, la segunda usaría el `a` ya cambiado.

## Antes de seguir

- `n % 10` da el último dígito; `n // 10` lo quita.
- `while n > 0` recorre los dígitos de derecha a izquierda.
- Guarda una copia del número si lo vas a necesitar después del ciclo.
- El 0 y los negativos no entran al ciclo: piensa qué debe pasar con ellos.
