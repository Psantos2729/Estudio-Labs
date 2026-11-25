# Regex y pandas: de texto suelto a tabla

No todos los archivos son CSV ordenados. En tu `Prueba_Bellaquita_1.py` cada línea traía tres números mezclados con texto, y los sacabas con `re.findall(r'\d+', linea)`. Esta lección junta M8 (regex) con pandas.

## El plan

1. Leer el archivo línea por línea (M8).
2. Sacar los datos de cada línea con una expresión regular.
3. Guardarlos en listas de tamaño fijo, una por columna.
4. Armar el DataFrame y analizar.

```python
import re
import pandas as pd

with open('ventas.txt', 'w', encoding='utf-8') as f:
    f.write('Código 101, precio Q130, cantidad 5\n'
            'Código 205 - precio Q99 - cantidad 12\n'
            'cod 310 precio Q250 cantidad 2\n')

with open('ventas.txt', encoding='utf-8') as f:
    lineas = f.readlines()
n = len(lineas)
codigos = [0] * n
precios = [0] * n
cantidades = [0] * n
for i in range(n):
    c, p, q = re.findall(r'\d+', lineas[i])
    codigos[i] = int(c)
    precios[i] = int(p)
    cantidades[i] = int(q)

df = pd.DataFrame({'Codigo': codigos, 'Precio': precios, 'Cantidad': cantidades})
df['Total'] = df['Precio'] * df['Cantidad']
for _, f in df.iterrows():
    print(f"{f['Codigo']}: {f['Cantidad']} x Q{f['Precio']} = Q{f['Total']}")
print('Gran total:', df['Total'].sum())
print('Menor cantidad:', df.loc[df['Cantidad'].idxmin(), 'Codigo'])
```

`c, p, q = re.findall(...)` funciona porque cada línea trae **exactamente** tres números; si una línea trajera otra cantidad, Python daría error. En un archivo real conviene revisar `len(...) == 3` y saltar las líneas malas.

## Grupos con nombre de columna

Cuando el texto tiene datos de distinto tipo (nombres y números), un patrón con **grupos** saca cada pieza. `re.search` devuelve el primer calce y `.group(1)`, `.group(2)`… cada paréntesis:

```python
import re

linea = 'Ana López sacó 87 en Matemática'
m = re.search(r'^(.+) sacó (\d+) en (\w+)$', linea)
print(m.group(1), '|', m.group(2), '|', m.group(3))
```

Si la línea no calza, `re.search` devuelve `None`: con `if m:` se saltan las líneas que no sirven.

## Promedio por fila

`df.mean()` promedia cada **columna**. Para promediar cada **fila** (por ejemplo, las tres notas de un estudiante) se usa `axis=1`. Es tu botón "Promedio Columnas":

```python
import pandas as pd

notas = pd.DataFrame({'Nombre': ['Ana', 'Luis', 'Sofía'], 'P1': [80, 60, 95], 'P2': [90, 70, 85], 'P3': [70, 65, 100]})
notas['Promedio'] = notas[['P1', 'P2', 'P3']].mean(axis=1)
for _, f in notas.iterrows():
    print(f"{f['Nombre']}: {f['Promedio']:.2f}")
print('Promedio de P2:', notas['P2'].mean())
```

`notas[['P1', 'P2', 'P3']]` (con **doble** corchete) es una tabla con solo esas columnas. `axis=1` quiere decir "a lo largo de la fila"; `axis=0` (lo normal) es "a lo largo de la columna".

## Resumen del módulo

| Quiero | Herramienta |
| --- | --- |
| operar un vector entero | `np.array`, `+ - * /` |
| un vector con etiquetas | `pd.Series(..., index=...)` |
| una tabla | `pd.DataFrame({...})` o `pd.read_csv(...)` |
| filas que cumplen algo | `df[(cond1) & (cond2)]` |
| resumen por grupo | `df.groupby('col')['otra'].mean()` |
| quién tiene el mayor | `df.loc[df['col'].idxmax()]` |
| datos sueltos en texto | `re.findall` / `re.search` y luego DataFrame |
| imprimir | `iterrows()` con f-strings, nunca `print(df)` en una entrega calificada |
