# numpy: operar con todo el vector a la vez

Hasta ahora, para sumar 10 a cada nota de un vector escribías un `for`. Las librerías de datos de Python dejan hacerlo **de un solo golpe**: `notas + 10`. Este módulo es sobre esas librerías, que son las que se usan para analizar datos de verdad (tus tareas `DataFrame.py` y `Tarea4csv.py`).

La primera es **numpy**. La segunda, **pandas**, está construida encima de ella.

## Importar

```python
import numpy as np

notas = np.array([70, 45, 88, 61, 93])
print(notas)
print(type(notas))
```

`import numpy as np` trae la librería con un nombre corto. Todos la escriben `np`; tú también.

La primera vez que corras código con `numpy` o `pandas` en esta página tarda unos segundos más: el navegador descarga la librería. Después ya queda cargada.

## Un arreglo es un vector de tamaño fijo

`np.array(lista)` crea un **arreglo**: como los vectores de M5, de tamaño fijo y todos los datos del mismo tipo. Se indexa igual: `notas[0]`, `notas[-1]`, `len(notas)`.

```python
import numpy as np

v = np.zeros(4)            # como [0] * 4, pero con decimales
print(v)
v[2] = 7
print(v, len(v))
print(np.arange(1, 6))     # como range(1, 6), pero ya es un arreglo
```

## Operar con todo el arreglo

Aquí está la gracia: una operación entre un arreglo y un número se aplica a **cada** casilla, y entre dos arreglos del mismo tamaño se hace **casilla por casilla**.

```python
import numpy as np

notas = np.array([70, 45, 88, 61, 93])
print(notas + 10)
print(notas * 2)
a = np.array([1, 2, 3])
b = np.array([10, 20, 30])
print(a + b)
print(b - a)
print(a * b)
```

`a + b` es el `C = A + B` del ejercicio 31 del PDF, sin ningún `for`. Ojo: con **listas** normales, `+` **pega** las listas (`[1, 2] + [3]` da `[1, 2, 3]`). Con arreglos, suma.

## Estadísticas en una línea

```python
import numpy as np

notas = np.array([70, 45, 88, 61, 93])
print(notas.sum(), notas.mean(), notas.max(), notas.min())
print(notas.argmax(), notas.argmin())
print(round(notas.std(), 2))
```

| Método | Qué da |
| --- | --- |
| `sum()` | la suma |
| `mean()` | el promedio |
| `max()`, `min()` | el mayor y el menor |
| `argmax()`, `argmin()` | la **posición** del mayor y del menor |
| `std()` | la desviación estándar (qué tan dispersos están) |

## Comparar todo el arreglo: máscaras

Una comparación también se hace casilla por casilla y da un arreglo de `True` y `False`. A eso se le llama **máscara**:

```python
import numpy as np

notas = np.array([70, 45, 88, 61, 93])
aprobado = notas >= 61
print(aprobado)
print(notas[aprobado])          # solo las casillas con True
print(aprobado.sum())           # True cuenta como 1: cuántos aprobaron
print(notas[notas < 61].mean())
```

`notas[notas >= 61]` se lee "las notas donde la nota es al menos 61". Esa misma idea, los **filtros**, es lo más usado de pandas (lección 4).

## Mostrar números de numpy

Los números que salen de numpy son de tipos de numpy (`np.int64`, `np.float64`). Con `print` se ven bien, pero dentro de listas se ven raros. En los ejercicios **siempre** se imprime con f-strings y formato:

```python
import numpy as np

notas = np.array([70, 45, 88, 61, 93])
print(f'Promedio: {notas.mean():.2f}')
print(f'Mejor: {notas.max()} en la posición {notas.argmax()}')
print('Aprobadas:', ' '.join(str(x) for x in notas[notas >= 61]))
```
