# Leer archivos CSV y resumir

En tu `Tarea4csv.py` los datos venían de un archivo, `Hospital.txt`:

```text
Sexo,Presión,PPM
Hombre, 119, 59
Mujer, 99, 89
Hombre, 102, 107
```

Eso es un **CSV** (*comma-separated values*): la primera línea tiene los nombres de las columnas y cada línea siguiente es una fila, con los valores separados por comas. Es un archivo de texto (M8), pero pandas lo convierte en tabla con **una** línea.

## `read_csv`

En los ejercicios el archivo ya está en la carpeta (lo ves en el panel de archivos). Aquí primero lo creamos para poder probar:

```python
import pandas as pd

with open('Hospital.txt', 'w', encoding='utf-8') as f:
    f.write('Sexo,Presión,PPM\nHombre, 119, 59\nMujer, 99, 89\nHombre, 102, 107\nHombre, 78, 76\nMujer, 78, 91\n')

datos = pd.read_csv('Hospital.txt', skipinitialspace=True)
print(datos)
print(list(datos.columns), len(datos))
print(datos['Presión'].mean())
```

- `read_csv('archivo')` devuelve un DataFrame. No importa que se llame `.txt`: lo que importa es el formato.
- Los números se convierten **solos** a números (en tu tarea hacías `int(n)` a mano porque venían con espacio).
- `skipinitialspace=True` ignora el espacio después de cada coma (`, 119`). Sin eso, `' 119'` podría quedar como texto. Si tu archivo no tiene esos espacios, no hace daño ponerlo.
- Si el archivo usa otro separador, como `;`, se indica con `sep=';'`.

## Resumir por grupo: `groupby`

"El promedio de presión de los hombres y el de las mujeres" se puede hacer con dos filtros… o con **una** línea que agrupa:

```python
import pandas as pd

with open('Hospital.txt', 'w', encoding='utf-8') as f:
    f.write('Sexo,Presión,PPM\nHombre, 119, 59\nMujer, 99, 89\nHombre, 102, 107\nHombre, 78, 76\nMujer, 78, 91\n')
datos = pd.read_csv('Hospital.txt', skipinitialspace=True)

prom = datos.groupby('Sexo')['PPM'].mean()
for sexo, valor in prom.items():
    print(f'{sexo}: {valor:.2f}')
print(datos['Sexo'].value_counts().to_dict())
print(datos.groupby('Sexo')['Presión'].max().to_dict())
```

`groupby('Sexo')` separa las filas en grupos por el valor de esa columna; luego `['PPM'].mean()` calcula el promedio **de cada grupo**. El resultado es una Series cuyo índice son los grupos, **ordenados alfabéticamente** (Hombre antes que Mujer). Sirve con `mean`, `sum`, `max`, `min` y `count`.

## Las estadísticas de siempre

| Pregunta | Código |
| --- | --- |
| ¿cuántos pacientes? | `len(datos)` |
| promedio de una columna | `datos['PPM'].mean()` |
| mediana (el del medio) | `datos['PPM'].median()` |
| mayor y quién | `datos['PPM'].max()`, `datos.loc[datos['PPM'].idxmax()]` |
| cuántos cumplen algo | `len(datos[datos['Presión'] > 90])` o `(datos['Presión'] > 90).sum()` |
| cuántos de cada valor | `datos['Sexo'].value_counts()` |

## La posición dentro de un filtro

Tu tarea comparaba "la mujer en la posición 2" con "la mujer en la posición 5". Después de filtrar, el **índice** conserva el número de la fila original, así que para "la primera mujer" se usa la **posición** con `iloc`:

```python
import pandas as pd

with open('Hospital.txt', 'w', encoding='utf-8') as f:
    f.write('Sexo,Presión,PPM\nHombre, 119, 59\nMujer, 99, 89\nHombre, 102, 107\nHombre, 78, 76\nMujer, 78, 91\n')
datos = pd.read_csv('Hospital.txt', skipinitialspace=True)

mujeres = datos[datos['Sexo'] == 'Mujer']
print(mujeres.index.tolist())                  # [1, 4]: filas originales
print(mujeres['Presión'].iloc[0], mujeres['Presión'].iloc[1])
import math
print(round(math.sqrt(datos['Presión'].iloc[3]), 3))   # raíz de la presión del cuarto paciente
```

## Escribir un CSV

Al revés también es una línea: `df.to_csv('salida.csv', index=False)` guarda la tabla (sin la columna del índice). Después la puedes abrir como cualquier archivo de texto.

```python
import pandas as pd

t = pd.DataFrame({'Nombre': ['Ana', 'Luis'], 'Nota': [90, 75]})
t.to_csv('notas.csv', index=False)
with open('notas.csv', encoding='utf-8') as f:
    print(f.read())
```
