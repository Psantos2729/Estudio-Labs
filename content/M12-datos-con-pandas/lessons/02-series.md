# Series: un vector con nombres

Una **Series** de pandas es un arreglo de numpy con una etiqueta para cada casilla, el **índice**. En vez de "la casilla 2" puedes decir "el miércoles".

```python
import pandas as pd

ventas = pd.Series([120, 95, 140, 80, 160], index=['lun', 'mar', 'mié', 'jue', 'vie'])
print(ventas)
```

`import pandas as pd` es la costumbre, como `np`. Al imprimir una Series se ve el índice a la izquierda y los valores a la derecha; abajo dice el tipo (`int64`).

## Leer casillas

```python
import pandas as pd

ventas = pd.Series([120, 95, 140, 80, 160], index=['lun', 'mar', 'mié', 'jue', 'vie'])
print(ventas['mié'])        # por etiqueta
print(ventas.iloc[0])       # por posición, como un vector
print(ventas.iloc[-1])
print(len(ventas))
```

- `ventas['mié']`: por **etiqueta** del índice.
- `ventas.iloc[0]`: por **posición** (la **i** de `iloc` es de *integer*, entero). Úsalo siempre que quieras "la primera", "la última" o "la cuarta".

Si no das `index`, el índice es 0, 1, 2…, como un vector.

## Lo mismo que numpy, y más

Todo lo de la lección anterior funciona igual: operaciones con todo, estadísticas y máscaras.

```python
import pandas as pd

ventas = pd.Series([120, 95, 140, 80, 160], index=['lun', 'mar', 'mié', 'jue', 'vie'])
print(ventas.sum(), ventas.mean())
print('Mejor día:', ventas.idxmax(), 'con', ventas.max())
print('Peor día:', ventas.idxmin())
buenos = ventas[ventas > ventas.mean()]
print('Sobre el promedio:', ', '.join(buenos.index))
```

`idxmax()` es como `argmax()`, pero da la **etiqueta** (`'vie'`) en vez de la posición. `buenos.index` son las etiquetas que pasaron el filtro.

## Recorrer una Series

Con `.items()` sale cada pareja (etiqueta, valor), como un diccionario:

```python
import pandas as pd

ventas = pd.Series([120, 95, 140], index=['lun', 'mar', 'mié'])
con_iva = ventas * 1.12
for dia, monto in con_iva.items():
    print(f'{dia}: Q{monto:.2f}')
```

## Ordenar y contar

```python
import pandas as pd

ventas = pd.Series([120, 95, 140, 80, 160], index=['lun', 'mar', 'mié', 'jue', 'vie'])
print(ventas.sort_values(ascending=False).index[:3].tolist())

colores = pd.Series(['rojo', 'azul', 'rojo', 'verde', 'rojo', 'azul'])
cuenta = colores.value_counts()
for color, veces in cuenta.items():
    print(color, veces)
```

- `sort_values()` ordena de menor a mayor; con `ascending=False`, de mayor a menor. El índice viaja con cada valor.
- `value_counts()` cuenta cuántas veces aparece cada valor, del más común al menos común. Es el "frecuencia" de M8 en una línea.
- `.tolist()` convierte a lista normal de Python.
