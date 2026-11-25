# Operar vectores y llenarlos al azar

En tu tarea `Vectores.py` sumaste vectores y calculaste el producto escalar y el vectorial. Son operaciones **posición por posición**: el resultado en la posición `i` sale de `A[i]` y `B[i]`. Por eso los dos vectores deben tener **el mismo tamaño**.

## Suma y resta: un vector nuevo

El resultado es otro vector del mismo tamaño, creado antes de llenarlo:

```python
A = [3, -1, 4]
B = [2, 5, -6]
n = len(A)
C = [0] * n
for i in range(n):
    C[i] = A[i] + B[i]
print(C)   # [5, 4, -2]
```

```text
A:   3   -1    4
B:   2    5   -6
     +    +    +
C:   5    4   -2
```

Para `C = B − A` solo cambia la línea de adentro: `C[i] = B[i] - A[i]`. El orden importa: `B − A` no es lo mismo que `A − B`.

## Producto escalar: un solo número

El producto escalar multiplica posición por posición y **suma todo**. El resultado no es un vector, es un acumulador:

```python
A = [3, -1, 4]
B = [2, 5, -6]
p = 0
for i in range(len(A)):
    p = p + A[i] * B[i]
print(p)   # 3·2 + (-1)·5 + 4·(-6) = 6 - 5 - 24 = -23
```

## Reto: producto vectorial

Solo existe para vectores de **3** componentes (como revisabas en tu tarea con `self.largo != 3`). Cada componente usa las **otras dos** posiciones:

```python
A = [1, 2, 3]
B = [4, 5, 6]
C = [0] * 3
C[0] = A[1] * B[2] - A[2] * B[1]
C[1] = A[2] * B[0] - A[0] * B[2]
C[2] = A[0] * B[1] - A[1] * B[0]
print(C)   # [-3, 6, -3]
```

## Números aleatorios con random

El ejercicio 31 del PDF pide llenar los vectores **al azar** entre −500 y 500. Para eso está el módulo `random`:

```python
import random
n = 6
v = [0] * n
for i in range(n):
    v[i] = random.randint(-500, 500)
print(v)
```

`random.randint(a, b)` da un entero al azar entre `a` y `b`, **incluyendo los dos extremos**. Corre el código varias veces: cada vez sale otro vector.

### La semilla

Los números "al azar" de una computadora salen de una fórmula que parte de un valor inicial, la **semilla**. Si fijas la semilla con `random.seed(...)`, la secuencia es siempre la misma:

```python
import random
random.seed(7)
print(random.randint(1, 100), random.randint(1, 100), random.randint(1, 100))
random.seed(7)
print(random.randint(1, 100), random.randint(1, 100), random.randint(1, 100))
```

Las dos líneas imprimen los mismos tres números. Esto se usa para **repetir un experimento** o para **probar** un programa con datos aleatorios, y es justo lo que hacen los ejercicios de esta plataforma: leen la semilla, llaman `random.seed(semilla)` una vez al inicio y después piden los números en el orden que dice el enunciado. Si pides los números en otro orden (por ejemplo, primero todo B y luego A), te salen otros vectores.

## Antes de seguir

- Suma y resta: vector nuevo `[0] * n`, posición por posición.
- Producto escalar: un acumulador de `A[i] * B[i]`.
- Los dos vectores deben tener el mismo tamaño (y 3 para el vectorial).
- `random.randint(a, b)` incluye los extremos; `random.seed(s)` hace que la secuencia se repita.
