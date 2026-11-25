# DataFrame: una tabla

Un **DataFrame** es una tabla: filas y columnas con nombre, como una hoja de Excel. Cada **columna** es una Series. Es lo que usaste en `DataFrame.py` con los autos.

## Crear una tabla desde un diccionario

Cada llave del diccionario es el nombre de una columna y su lista son los valores de arriba hacia abajo:

```python
import pandas as pd

autos = pd.DataFrame({
    'Marca': ['Mazda', 'Honda', 'Kia', 'Toyota'],
    'Modelo': [2020, 1998, 2023, 2021],
    'Estilo': ['Deportivo', 'Sedan', 'Camioneta', 'Sedan'],
    'Precio': [125000, 15000, 225000, 135000],
})
print(autos)
print(autos.shape)
print(list(autos.columns))
```

- A la izquierda sale el **índice** de las filas (0, 1, 2, 3).
- `shape` da `(filas, columnas)`. `len(autos)` da solo las filas.
- `columns` son los nombres de las columnas.

## Una columna, una fila, una casilla

```python
import pandas as pd

autos = pd.DataFrame({
    'Marca': ['Mazda', 'Honda', 'Kia', 'Toyota'],
    'Modelo': [2020, 1998, 2023, 2021],
    'Precio': [125000, 15000, 225000, 135000],
})
print(autos['Precio'].mean())        # una columna es una Series
fila = autos.iloc[2]                 # la tercera fila, también una Series
print(fila['Marca'], fila['Precio'])
print(autos.loc[0, 'Modelo'])        # casilla: fila con índice 0, columna Modelo
print(autos['Marca'].iloc[-1])       # la última marca
```

| Quieres | Escribes |
| --- | --- |
| una columna | `df['Precio']` |
| la fila en la posición i | `df.iloc[i]` |
| una casilla por posición | `df['Precio'].iloc[i]` o `df.iloc[i]['Precio']` |
| una casilla por índice y columna | `df.loc[i, 'Precio']` |

## Columnas calculadas

Como las columnas son Series, se opera con toda la columna. Asignar a una columna que no existe **la crea**:

```python
import pandas as pd

autos = pd.DataFrame({
    'Marca': ['Mazda', 'Honda', 'Kia', 'Toyota'],
    'Precio': [125000, 15000, 225000, 135000],
})
autos['Impuesto'] = autos['Precio'] * 12 / 100
autos['Total'] = autos['Precio'] + autos['Impuesto']
autos['Estado'] = 'Activo'           # el mismo valor en todas las filas
print(autos)
print('Total de impuestos:', autos['Impuesto'].sum())
```

Es tu botón "Impuesto" y tu botón "Estado", sin recorrer nada.

## Recorrer filas

Para imprimir con un formato propio, recorre con `iterrows()`: da el índice y la fila.

```python
import pandas as pd

autos = pd.DataFrame({
    'Marca': ['Mazda', 'Honda', 'Kia'],
    'Precio': [125000, 15000, 225000],
})
for i, fila in autos.iterrows():
    print(f"{i + 1}. {fila['Marca']} | Q{fila['Precio']:,}")
```

`:,` pone comas de miles. Ojo con las comillas: dentro de un f-string con `'...'` las llaves usan `"..."` (o al revés).

## ¿Por qué no `print(df)`?

`print(autos)` sirve para **mirar** mientras programas, pero su formato (anchos, alineación, cuántas filas muestra) cambia según la versión de pandas y el tamaño de la tabla. Por eso en los ejercicios **siempre** se imprime fila por fila con un formato fijo, como en el ejemplo de arriba.

## Agregar filas leídas

En los ejercicios los datos llegan por `input()`. La forma más simple: llena **listas** (de tamaño fijo, como siempre) y al final arma el DataFrame:

```python
import pandas as pd

n = 3
marcas = [None] * n
precios = [0] * n
datos = [('Kia', 225000), ('Honda', 15000), ('Mazda', 125000)]   # aquí irían los input()
for i in range(n):
    marcas[i] = datos[i][0]
    precios[i] = datos[i][1]
autos = pd.DataFrame({'Marca': marcas, 'Precio': precios})
print(autos['Precio'].max())
```
