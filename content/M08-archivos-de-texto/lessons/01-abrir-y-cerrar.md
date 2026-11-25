# Abrir y cerrar archivos

Hasta ahora todo lo que el programa sabía se perdía al terminar. Un **archivo de texto** guarda los datos en el disco: otro programa (o el mismo, otro día) puede volver a leerlos. En el laboratorio casi siempre te dan un archivo (`datos1.txt`, `entrada.txt`) y tu programa lo lee, lo analiza y a veces escribe otro.

Se llaman **secuenciales** porque se leen en orden, de principio a fin, como una cinta: para llegar a la línea 10 hay que pasar por las 9 anteriores.

## open: el archivo y el modo

```text
archivo = open('datos1.txt', 'r', encoding='utf-8')
contenido = archivo.read()
archivo.close()
```

El segundo dato es el **modo**:

| Modo | Para | Si el archivo no existe | Si ya existe |
| --- | --- | --- | --- |
| `'r'` | leer | error `FileNotFoundError` | lo lee desde el principio |
| `'w'` | escribir | lo crea | **lo borra** y empieza vacío |
| `'a'` | agregar al final | lo crea | escribe después de lo que había |

`encoding='utf-8'` hace que las tildes y la ñ se lean bien. Úsalo siempre, como en tus tareas.

## with: se cierra solo

Si olvidas `close()`, lo escrito puede no guardarse. Con `with` el archivo se cierra solo al salir del bloque, aunque haya un error. Es la forma que vas a usar siempre:

```python
with open('saludo.txt', 'w', encoding='utf-8') as f:
    f.write('Hola, archivo\n')

with open('saludo.txt', 'r', encoding='utf-8') as f:
    print(f.read())
```

Corre el ejemplo: debajo de la salida aparece **saludo.txt** con lo que quedó adentro. En esta guía cada vez que presionas Correr tu programa empieza en una carpeta vacía, con los archivos que da el ejercicio (los ves y puedes cambiarlos arriba de los botones).

## Cuando el archivo no existe

Abrir para leer un archivo que no está da `FileNotFoundError`. Puedes revisarlo antes con `os.path.exists`, o atrapar el error:

```python
import os

if os.path.exists('notas.txt'):
    print('sí está')
else:
    print('no existe notas.txt')

try:
    with open('notas.txt', 'r', encoding='utf-8') as f:
        print(f.read())
except FileNotFoundError:
    print('No se encontró el archivo')
```

## El fin de línea

Un archivo de texto es una sola tira de caracteres; lo que lo parte en líneas es el carácter **`\n`** (salto de línea). Cuando escribes, tú pones los `\n`. Cuando lees, cada línea **trae** su `\n` al final, y casi siempre hay que quitarlo. Lo verás en las dos lecciones siguientes.

```python
with open('dos.txt', 'w', encoding='utf-8') as f:
    f.write('uno\ndos\n')
with open('dos.txt', 'r', encoding='utf-8') as f:
    print(repr(f.read()))   # repr muestra los \n
```

## Antes de seguir

- `'r'` lee, `'w'` borra y escribe, `'a'` agrega al final.
- Siempre `with open(nombre, modo, encoding='utf-8') as f:`.
- Las líneas se separan con `\n`.
