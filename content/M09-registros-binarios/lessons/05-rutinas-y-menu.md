# Las rutinas: ingreso, consultas y modificación

Los ejercicios 27, 28 y 29 del PDF piden lo mismo con distintos campos: un programa con **menú** que hace las rutinas básicas sobre un archivo de registros. Aquí está armado completo, para que lo reconozcas y luego lo adaptes.

## El archivo existe o no (PDF #27)

Antes del menú, el ejercicio 27 pide revisar si el archivo existe y, si no, preguntar si se quiere crear:

```text
import os

nombre = input('Nombre del archivo: ')
if not os.path.exists(nombre):
    resp = input(f'El archivo {nombre} no existe. ¿Crearlo? (s/n) ')
    if resp == 's':
        open(nombre, 'wb').close()      # crea un archivo vacío
    else:
        nombre = ''                      # no hay archivo: el programa termina
```

## El programa completo

Un registro de estudiante con carné, nombre y una nota; el promedio se calcula, no se ingresa. Lee el código con calma: cada rutina es una función corta que usa lo de las lecciones anteriores.

```text
import os
import struct

ARCHIVO = 'notas.dat'
FORMATO = '<i30sd'          # carné, nombre, nota
TAM = struct.calcsize(FORMATO)

def total():
    return os.path.getsize(ARCHIVO) // TAM

def mostrar(n, datos):
    carne, nombre, nota = struct.unpack(FORMATO, datos)
    nombre = nombre.rstrip(b'\x00').decode('utf-8')
    print(f'{n}. {carne} | {nombre} | {nota:.2f}')

def ingresar():
    carne = int(input())
    nombre = input()
    nota = float(input())
    with open(ARCHIVO, 'ab') as f:
        f.write(struct.pack(FORMATO, carne, nombre.encode('utf-8'), nota))
    print(f'Registro {total()} guardado')

def consulta_general():
    with open(ARCHIVO, 'rb') as f:
        for n in range(1, total() + 1):
            mostrar(n, f.read(TAM))

def consulta_individual():
    n = int(input())
    if n < 1 or n > total():
        print(f'No existe el registro {n}')
        return
    with open(ARCHIVO, 'rb') as f:
        f.seek((n - 1) * TAM)
        mostrar(n, f.read(TAM))

def modificar():
    n = int(input())
    if n < 1 or n > total():
        print(f'No existe el registro {n}')
        return
    nota = float(input())
    with open(ARCHIVO, 'r+b') as f:
        f.seek((n - 1) * TAM)
        carne, nombre, _ = struct.unpack(FORMATO, f.read(TAM))
        f.seek((n - 1) * TAM)
        f.write(struct.pack(FORMATO, carne, nombre, nota))
    print(f'Registro {n} modificado')

open(ARCHIVO, 'wb').close()      # empieza vacío
opcion = input()
while opcion != '0':
    if opcion == '1':
        ingresar()
    elif opcion == '2':
        consulta_general()
    elif opcion == '3':
        consulta_individual()
    elif opcion == '4':
        modificar()
    else:
        print('Opción inválida')
    opcion = input()
```

Pruébalo en la versión corta de abajo: la entrada simula lo que escribiría el usuario (opción, datos, opción, datos…).

```python
import os
import struct

ARCHIVO = 'notas.dat'
FORMATO = '<i30sd'
TAM = struct.calcsize(FORMATO)
open(ARCHIVO, 'wb').close()

def total():
    return os.path.getsize(ARCHIVO) // TAM

for carne, nombre, nota in [(2026001, 'Ana López', 85.5), (2026002, 'Luis Pérez', 70.0)]:
    with open(ARCHIVO, 'ab') as f:
        f.write(struct.pack(FORMATO, carne, nombre.encode('utf-8'), nota))
print('Registros:', total())

with open(ARCHIVO, 'r+b') as f:      # modificar la nota del registro 2
    f.seek(1 * TAM)
    carne, nombre, _ = struct.unpack(FORMATO, f.read(TAM))
    f.seek(1 * TAM)
    f.write(struct.pack(FORMATO, carne, nombre, 92.0))

with open(ARCHIVO, 'rb') as f:
    for n in range(1, total() + 1):
        carne, nombre, nota = struct.unpack(FORMATO, f.read(TAM))
        print(n, carne, nombre.rstrip(b'\x00').decode('utf-8'), nota)
```

## Campos calculados (PDF #28 y #29)

En la planilla (#28) y las notas (#29), parte de los campos **se calculan** a partir de los ingresados: sueldo bruto, IGSS, promedio, tipo de promedio. Hay dos reglas:

1. Se calculan **al ingresar** y se guardan en el registro junto con los demás (el PDF lo pide así: "grabar todos los datos ingresados y los calculados").
2. Si se **modifica** un dato del que depende un cálculo (una nota), hay que **recalcular** y guardar también lo calculado. Si no, el promedio guardado queda viejo.

```python
def tipo(promedio):
    if promedio < 60:
        return 'BAJO'
    elif promedio < 80:
        return 'ACEPTABLE'
    elif promedio < 90:
        return 'BUENO'
    return 'EXCELENTE'

notas = [85, 90, 78, 92, 88]
p = sum(notas) / len(notas)
print(f'{p:.2f}', tipo(p))
notas[2] = 40                    # modificación
p = sum(notas) / len(notas)      # recalcular
print(f'{p:.2f}', tipo(p))
```

El tipo de promedio es texto: va en un campo `s` de tamaño fijo, por ejemplo `10s` (`EXCELENTE` tiene 9 letras).

## Baja lógica

Borrar un registro del medio obligaría a mover todos los siguientes (y cambiarían sus números). Lo usual es una **baja lógica**: un campo `?` (activo) que se pone en `False`, y las consultas se saltan los inactivos. El registro sigue ocupando su lugar, así los números no cambian. Está como reto en este módulo.

## Resumen del módulo

- Registro de tamaño fijo: `FORMATO` con `<`, `TAM = struct.calcsize(FORMATO)`.
- Texto ↔ bytes: `encode('utf-8')` al empacar, `rstrip(b'\x00').decode('utf-8')` al desempacar.
- `'ab'` para ingresar, `'rb'` para consultar, `'r+b'` para modificar.
- Registro `n`: `seek((n - 1) * TAM)`. Cuántos hay: `os.path.getsize(...) // TAM`. Siempre valida `1 <= n <= total`.
- Lo calculado se guarda y se recalcula al modificar.
