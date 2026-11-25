# Grabar y leer registros

## Los modos binarios

| Modo | Para | Si no existe | Si ya existe |
| --- | --- | --- | --- |
| `'wb'` | escribir desde cero | lo crea | lo borra |
| `'ab'` | agregar registros al final | lo crea | escribe al final |
| `'rb'` | leer | error | lee |
| `'r+b'` | leer **y** sobrescribir | error | no borra nada |

Sin `encoding`: en modo binario se leen y escriben bytes, no texto.

## Ingreso: agregar al final

```python
import struct

FORMATO = '<i20sd'
TAM = struct.calcsize(FORMATO)

def grabar(codigo, nombre, precio):
    with open('productos.dat', 'ab') as f:
        f.write(struct.pack(FORMATO, codigo, nombre.encode('utf-8'), precio))

grabar(10, 'Lápiz', 2.5)
grabar(20, 'Cuaderno', 15.75)
grabar(30, 'Borrador', 1.0)

import os
print(os.path.getsize('productos.dat'), 'bytes')
print(os.path.getsize('productos.dat') // TAM, 'registros')
```

`os.path.getsize` da el tamaño del archivo en bytes. Dividido entre `TAM` da cuántos registros hay: es la forma de saberlo **sin leerlos**.

## Consulta general: leer todos

`f.read(TAM)` lee exactamente `TAM` bytes, un registro. Al llegar al final devuelve `b''` (vacío): esa es la señal para parar.

```python
import struct

FORMATO = '<i20sd'
TAM = struct.calcsize(FORMATO)

with open('productos.dat', 'wb') as f:
    for c, n, p in [(10, 'Lápiz', 2.5), (20, 'Cuaderno', 15.75), (30, 'Borrador', 1.0)]:
        f.write(struct.pack(FORMATO, c, n.encode('utf-8'), p))

with open('productos.dat', 'rb') as f:
    numero = 1
    datos = f.read(TAM)
    while datos:
        c, n, p = struct.unpack(FORMATO, datos)
        nombre = n.rstrip(b'\x00').decode('utf-8')
        print(f'{numero}. {c} | {nombre} | {p:.2f}')
        numero = numero + 1
        datos = f.read(TAM)
```

Es el mismo patrón del centinela: leer, revisar, procesar, leer el siguiente. Otra forma, ya que sabes cuántos hay:

```text
n = os.path.getsize('productos.dat') // TAM
with open('productos.dat', 'rb') as f:
    for k in range(n):
        c, nom, p = struct.unpack(FORMATO, f.read(TAM))
```

## El cursor del archivo

Un archivo abierto tiene un **cursor**: el byte donde va a leer o escribir. Empieza en 0 y cada `read(TAM)` o `write` lo avanza. `f.tell()` dice dónde está.

```python
import struct

with open('n.dat', 'wb') as f:
    for x in [7, 8, 9]:
        f.write(struct.pack('<i', x))
        print('después de escribir', x, 'el cursor está en', f.tell())

with open('n.dat', 'rb') as f:
    print(f.tell(), struct.unpack('<i', f.read(4)))
    print(f.tell(), struct.unpack('<i', f.read(4)))
```

Es este cursor el que la siguiente lección mueve a donde queramos, con `seek`.

## Errores comunes

1. Abrir con `'wb'` para agregar: borra todo lo anterior. Para agregar es `'ab'`.
2. Pasar un `str` a un campo `s`: `struct.pack('<20s', 'Lápiz')` da error; hace falta `.encode('utf-8')`.
3. Olvidar quitar los `\x00`: al comparar nombres, `'Ana\x00\x00…'` no es igual a `'Ana'`.
4. Un formato distinto al leer que al escribir: los bytes se interpretan mal. Ponlo **una vez** en una constante `FORMATO` y úsala en todos lados.
