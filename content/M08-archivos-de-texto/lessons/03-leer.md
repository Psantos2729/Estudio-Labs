# Leer archivos

Hay tres formas de leer, y en el laboratorio se usan las tres.

## read(): todo de una vez

`f.read()` devuelve **todo** el archivo como un solo texto, con sus `\n` adentro. Sirve para contar caracteres o para mostrarlo completo.

## for linea in f: línea por línea

Recorrer el archivo con `for` da una línea por vuelta. Es la forma más usada para analizar línea por línea. Cada línea trae su `\n` al final (menos, a veces, la última), así que se quita con `rstrip('\n')`:

```python
with open('frases.txt', 'w', encoding='utf-8') as f:
    f.write('Hola mundo\nPython es genial\nFin del texto\n')

with open('frases.txt', 'r', encoding='utf-8') as f:
    n = 0
    for linea in f:
        linea = linea.rstrip('\n')
        n = n + 1
        print(f'{n}: {linea} ({len(linea)} caracteres)')
```

Prueba quitar el `rstrip`: `len` cuenta un carácter más, porque cuenta el `\n`.

## readlines(): una lista de líneas

`f.readlines()` devuelve una **lista** con todas las líneas (cada una con su `\n`). Es lo que usas en tus tareas con `for linea in archivo.readlines():`. Sirve cuando necesitas saber cuántas líneas hay **antes** de recorrerlas, por ejemplo para crear un vector de tamaño fijo:

```python
with open('datos.txt', 'w', encoding='utf-8') as f:
    f.write('45 12 98\n1 12 65\n7 15 76\n')

with open('datos.txt', 'r', encoding='utf-8') as f:
    lineas = f.readlines()
sumas = [0] * len(lineas)
for i in range(len(lineas)):
    partes = lineas[i].split()
    for p in partes:
        sumas[i] = sumas[i] + int(p)
print(sumas)   # [155, 78, 98]
```

Ojo: después de un `read()` o `readlines()`, el archivo ya llegó al final. Si quieres leerlo otra vez, ábrelo de nuevo.

## Letras, palabras y líneas (PDF #23)

El ejercicio 23 del PDF pide contar letras, palabras y líneas. Cada cosa se cuenta distinto:

- **Líneas:** una por vuelta del `for`.
- **Palabras:** `len(linea.split())` (split sin argumentos separa por cualquier espacio y no deja vacíos).
- **Letras:** los caracteres con `c.isalpha()` (incluye tildes y ñ; no cuenta espacios, dígitos ni signos).

```python
with open('texto.txt', 'w', encoding='utf-8') as f:
    f.write('El niño comió 3 piñas.\n\nY ya.\n')

lineas = 0
palabras = 0
letras = 0
with open('texto.txt', 'r', encoding='utf-8') as f:
    for linea in f:
        lineas = lineas + 1
        palabras = palabras + len(linea.split())
        for c in linea:
            if c.isalpha():
                letras = letras + 1
print(lineas, palabras, letras)   # 3 7 19
```

La línea vacía del medio cuenta como línea (tiene su `\n`), pero no tiene palabras ni letras.

## Errores comunes

1. Comparar `linea == 'Fin'` sin quitar el `\n`: nunca es igual, porque la línea es `'Fin\n'`.
2. Usar `strip()` cuando los espacios del inicio importan: `strip` quita espacios **y** `\n` de los dos lados; `rstrip('\n')` solo el salto final.
3. `int(linea)` funciona aunque traiga `\n` (`int(' 7\n')` da 7), pero `linea.split(',')` deja el `\n` pegado al último pedazo.
