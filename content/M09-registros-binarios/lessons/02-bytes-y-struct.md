# Bytes y struct

## Texto y bytes

Un **byte** es un número de 0 a 255. Todo lo que guarda un archivo son bytes. Un texto se convierte a bytes con `encode` y de vuelta con `decode`:

```python
b = 'Hola'.encode('utf-8')
print(b, len(b))
print(list(b))          # cada byte es un número
print(b.decode('utf-8'))
```

Las letras sin tilde ocupan 1 byte. **Las tildes y la ñ ocupan 2** en UTF-8. Esto importa cuando un campo tiene tamaño fijo:

```python
for t in ['Lapiz', 'Lápiz', 'Ñandú']:
    print(t, len(t), 'letras,', len(t.encode('utf-8')), 'bytes')
```

## struct: un registro en bytes

`struct.pack(formato, valores...)` arma los bytes de un registro según un **formato**. `struct.unpack(formato, bytes)` hace lo contrario y devuelve una **tupla** con los valores.

| Letra | Tipo | Bytes |
| --- | --- | --- |
| `i` | entero (−2 147 483 648 a 2 147 483 647) | 4 |
| `d` | decimal (`float`) | 8 |
| `20s` | texto de 20 bytes (en bytes, no `str`) | 20 |
| `?` | booleano | 1 |

El formato empieza con **`<`**: así los tamaños son exactamente los de la tabla (sin bytes de relleno que Python agrega a veces). Úsalo siempre.

```python
import struct

FORMATO = '<i20sd'                 # código, nombre, precio
TAM = struct.calcsize(FORMATO)
print('Cada registro mide', TAM, 'bytes')   # 4 + 20 + 8 = 32

datos = struct.pack(FORMATO, 1024, 'Lápiz'.encode('utf-8'), 2.5)
print(len(datos))
print(datos)

codigo, nombre, precio = struct.unpack(FORMATO, datos)
print(codigo, nombre, precio)
```

Fíjate en lo que imprime `datos`: el nombre aparece seguido de muchos `\x00`. Son **bytes en cero** que `pack` agrega para completar los 20 del campo. Al desempacar, el nombre vuelve con esos ceros: hay que quitarlos.

## Leer el texto de vuelta

```python
import struct

datos = struct.pack('<20s', 'Lápiz'.encode('utf-8'))
(nombre,) = struct.unpack('<20s', datos)
print(nombre)
print(nombre.rstrip(b'\x00').decode('utf-8'))
```

`(nombre,) = ...` es porque `unpack` siempre da una tupla, aunque sea de un solo valor. `rstrip(b'\x00')` quita los ceros de la derecha (con `b`, porque son bytes) y `decode` lo vuelve texto.

## Dos funciones que vas a usar siempre

```python
def a_bytes(texto, n):
    """El texto en exactamente n bytes (se corta si no cabe)."""
    return texto.encode('utf-8')[:n]

def a_texto(b):
    """Bytes de un campo de texto, sin los ceros del relleno."""
    return b.rstrip(b'\x00').decode('utf-8', errors='ignore')

print(a_bytes('Pingüino', 5), a_texto(a_bytes('Pingüino', 5)))
```

Si el texto no cabe, `pack` lo corta solo, pero puede cortar una tilde a la mitad (sus 2 bytes quedan separados) y `decode` daría error. Con `errors='ignore'` ese pedazo roto se descarta. En los ejercicios los nombres siempre caben.

## Ver los bytes

Corre esto y mira el panel **archivos que dejó tu programa**: el archivo binario se muestra en hexadecimal, un byte por par de cifras.

```python
import struct

with open('uno.dat', 'wb') as f:
    f.write(struct.pack('<i', 1))
    f.write(struct.pack('<i', 256))
    f.write(struct.pack('<i', -1))
```

`1` queda como `01 00 00 00`: con `<` el byte menos importante va primero. `256` es `00 01 00 00` y `-1` es `ff ff ff ff`. No necesitas leer hexadecimal en el examen; solo ver que **cada entero ocupa 4 bytes**, sea cual sea.
