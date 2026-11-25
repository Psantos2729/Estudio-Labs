# seek: consulta individual y modificación

## Saltar a un registro

`f.seek(posición)` mueve el cursor a ese byte. Con la cuenta de la lección 1, ir al registro `n` (contando desde 1) es:

```text
f.seek((n - 1) * TAM)
datos = f.read(TAM)
```

```python
import struct

FORMATO = '<i20sd'
TAM = struct.calcsize(FORMATO)
with open('productos.dat', 'wb') as f:
    for c, n, p in [(10, 'Lápiz', 2.5), (20, 'Cuaderno', 15.75), (30, 'Borrador', 1.0), (40, 'Regla', 4.25)]:
        f.write(struct.pack(FORMATO, c, n.encode('utf-8'), p))

with open('productos.dat', 'rb') as f:
    for n in [3, 1, 4]:
        f.seek((n - 1) * TAM)
        c, nom, p = struct.unpack(FORMATO, f.read(TAM))
        print(n, '→', c, nom.rstrip(b'\x00').decode('utf-8'), p)
```

```pasos
10 20 30 40 |  | productos.dat: 4 registros de 32 bytes.
10 20 30 40 | k2 | Registro 3: seek((3 - 1) × 32) = seek(64), y read(32) lee el código 30.
10 20 30 40 | k0 | Registro 1: seek(0). El orden en que se consultan no importa.
10 20 30 40 | k3 | Registro 4: seek(96).
10 20 30 40 |  | Registro 5: seek(128) es el final del archivo; read da b'' y unpack fallaría. Hay que validar antes.
```

## Validar que el registro existe

Pedir un registro que no existe es el error más común. `read` devuelve `b''` (o menos de `TAM` bytes) y `unpack` falla. Por eso, **antes** de saltar, se compara con la cantidad de registros:

```python
import os
import struct

FORMATO = '<i20sd'
TAM = struct.calcsize(FORMATO)
with open('productos.dat', 'wb') as f:
    f.write(struct.pack(FORMATO, 10, b'Lapiz', 2.5))

def consultar(n):
    total = os.path.getsize('productos.dat') // TAM
    if n < 1 or n > total:
        print(f'No existe el registro {n}')
        return
    with open('productos.dat', 'rb') as f:
        f.seek((n - 1) * TAM)
        c, nom, p = struct.unpack(FORMATO, f.read(TAM))
    print(c, nom.rstrip(b'\x00').decode('utf-8'), p)

consultar(1)
consultar(2)
consultar(0)
```

## Buscar por un campo

Si te piden el producto con **código** 30 (y no el registro 3), no sabes dónde está: hay que recorrer los registros hasta encontrarlo, como la búsqueda secuencial de M5. El acceso directo solo sirve cuando conoces el número de registro.

## Modificar un registro

Para cambiar el precio del registro 2 sin tocar los demás: abrir con **`'r+b'`**, leer el registro, cambiar el campo, **volver** al inicio del registro y escribirlo completo.

```python
import struct

FORMATO = '<i20sd'
TAM = struct.calcsize(FORMATO)
with open('productos.dat', 'wb') as f:
    for c, n, p in [(10, 'Lápiz', 2.5), (20, 'Cuaderno', 15.75), (30, 'Borrador', 1.0)]:
        f.write(struct.pack(FORMATO, c, n.encode('utf-8'), p))

n = 2
with open('productos.dat', 'r+b') as f:
    f.seek((n - 1) * TAM)
    c, nom, p = struct.unpack(FORMATO, f.read(TAM))
    p = 18.0
    f.seek((n - 1) * TAM)          # read movió el cursor: hay que regresar
    f.write(struct.pack(FORMATO, c, nom, p))

with open('productos.dat', 'rb') as f:
    datos = f.read(TAM)
    while datos:
        c, nom, p = struct.unpack(FORMATO, datos)
        print(c, nom.rstrip(b'\x00').decode('utf-8'), p)
        datos = f.read(TAM)
```

El segundo `seek` es la clave: después del `read`, el cursor quedó al **final** del registro 2. Si escribes ahí, pisas el registro 3. Quita esa línea y corre otra vez para verlo.

Fíjate también que `nom` se vuelve a empacar tal cual (ya son bytes): no hace falta decodificarlo y codificarlo otra vez.

## Antes de seguir

- `seek((n - 1) * TAM)` va al registro `n`.
- Valida `1 <= n <= total` antes de leer.
- Modificar: `'r+b'`, leer, cambiar, **seek otra vez**, escribir.
