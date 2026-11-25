# Filtros

Es lo que hacían tus botones "Marca Toyota", "Modelos" y "Estilo": quedarse con **las filas que cumplen algo**. En pandas es una máscara, como en numpy.

## Una condición

```python
import pandas as pd

autos = pd.DataFrame({
    'Marca': ['Mazda', 'Honda', 'Kia', 'Toyota', 'Toyota'],
    'Modelo': [2020, 1998, 2023, 2021, 2015],
    'Estilo': ['Deportivo', 'Sedan', 'Camioneta', 'Sedan', 'Camioneta'],
    'Precio': [125000, 15000, 225000, 135000, 60000],
})
mascara = autos['Marca'] == 'Toyota'
print(mascara.tolist())
toyotas = autos[mascara]
for i, f in toyotas.iterrows():
    print(i, f['Modelo'], f['Precio'])
print('Cuántos Toyota:', len(toyotas))
```

`autos[mascara]` es **otra tabla** con solo esas filas. Fíjate que el índice se conserva (3 y 4): dice de qué fila original vino cada una.

En una línea: `autos[autos['Marca'] == 'Toyota']`. Se lee "autos donde la marca es Toyota".

## Varias condiciones: `&`, `|` y `~`

Para juntar condiciones **no** se usa `and` ni `or` (dan error con Series), sino:

| Python normal | En filtros |
| --- | --- |
| `and` | `&` |
| `or` | `\|` |
| `not` | `~` |

Y **cada condición va entre paréntesis**, porque `&` se calcula antes que `==`.

```python
import pandas as pd

autos = pd.DataFrame({
    'Marca': ['Mazda', 'Honda', 'Kia', 'Toyota', 'Toyota'],
    'Modelo': [2020, 1998, 2023, 2021, 2015],
    'Estilo': ['Deportivo', 'Sedan', 'Camioneta', 'Sedan', 'Camioneta'],
    'Precio': [125000, 15000, 225000, 135000, 60000],
})
nuevos_baratos = autos[(autos['Modelo'] >= 2018) & (autos['Precio'] < 150000)]
print(nuevos_baratos['Marca'].tolist())
sedan_o_kia = autos[(autos['Estilo'] == 'Sedan') | (autos['Marca'] == 'Kia')]
print(sedan_o_kia['Marca'].tolist())
no_toyota = autos[~(autos['Marca'] == 'Toyota')]
print(len(no_toyota))
```

## Filtrar y luego calcular

Lo más común en un examen: "el promedio de X **de los que** cumplen Y".

```python
import pandas as pd

autos = pd.DataFrame({
    'Marca': ['Mazda', 'Honda', 'Kia', 'Toyota', 'Toyota'],
    'Estilo': ['Deportivo', 'Sedan', 'Camioneta', 'Sedan', 'Camioneta'],
    'Precio': [125000, 15000, 225000, 135000, 60000],
})
sedanes = autos[autos['Estilo'] == 'Sedan']
print(f"Precio promedio de sedanes: {sedanes['Precio'].mean():.2f}")
print('Toyota más caro:', autos[autos['Marca'] == 'Toyota']['Precio'].max())
print('Sedán más barato:', sedanes.loc[sedanes['Precio'].idxmin(), 'Marca'])
```

La última línea combina dos cosas: `idxmin()` da el **índice** de la fila del menor precio, y `loc[índice, 'Marca']` lee la marca de esa fila.

## Si el filtro no deja nada

Si ninguna fila cumple, queda una tabla **vacía**: `len(...)` es 0 y `mean()` da `nan` (*not a number*). Revisa antes de imprimir:

```python
import pandas as pd

precios = pd.DataFrame({'Precio': [100, 200]})
caros = precios[precios['Precio'] > 1000]
print(len(caros), caros['Precio'].mean())
if len(caros) == 0:
    print('No hay caros')
```

## Ordenar

```python
import pandas as pd

autos = pd.DataFrame({
    'Marca': ['Mazda', 'Honda', 'Kia', 'Toyota'],
    'Precio': [125000, 15000, 225000, 135000],
})
for i, f in autos.sort_values('Precio', ascending=False).head(2).iterrows():
    print(f['Marca'], f['Precio'])
```

`sort_values('Precio')` ordena las **filas** por esa columna; `head(2)` deja las 2 primeras. "Los 2 más caros" en una línea.
