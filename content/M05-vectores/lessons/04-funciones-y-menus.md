# Funciones con vectores y programas con menú

Los programas del laboratorio se arman con **funciones** que reciben un vector y hacen una tarea: llenarlo, mostrarlo, sumarlo, buscar. Es lo que hiciste en tus tareas con `crear_vector(n)`, `encontrar(vector, numero)` y `mayor_menor(vector)`.

## Pasar un vector a una función

```python
def suma(v):
    s = 0
    for i in range(len(v)):
        s = s + v[i]
    return s

def mostrar(v):
    for i in range(len(v)):
        print(v[i], end=' ')
    print()

datos = [4, 8, 15, 16, 23, 42]
mostrar(datos)
print(suma(datos))   # 108
```

La función no necesita saber el tamaño de antemano: lo pregunta con `len(v)`.

## Una función puede modificar el vector que recibe

Con números y textos, lo que pasa adentro se queda adentro (M4). Con listas **no**: la función recibe la misma lista, no una copia, así que si cambia una posición, el cambio se ve afuera.

```python
def llenar_con(v, valor):
    for i in range(len(v)):
        v[i] = valor

a = [0] * 4
llenar_con(a, 7)
print(a)   # [7, 7, 7, 7]
```

Esto es útil (una función que llena o que ordena el vector) pero también peligroso: si no quieres tocar el original, trabaja sobre una copia.

## Imprimir al revés desde una posición

El ejercicio 34 del PDF pide una función `imprimir_inverso(v, p)` que imprima los elementos **desde la posición p hasta la 0**, al revés:

```python
def imprimir_inverso(v, p):
    for i in range(p, -1, -1):
        print(v[i], end=' ')
    print()

imprimir_inverso([10, 20, 30, 40, 50], 3)   # 40 30 20 10
```

```pasos
10 20 30 40 50 | k3 | i = 3: se imprime 40.
10 20 30 40 50 | o3 k2 | i = 2: se imprime 30.
10 20 30 40 50 | o3 o2 k1 | i = 1: se imprime 20.
10 20 30 40 50 | o3 o2 o1 k0 | i = 0: se imprime 10. El range llega a -1 (sin incluirlo) y termina.
```

## Un programa con menú

El ejercicio 31 es un **menú**: el programa repite "mostrar opciones, leer una, hacerla" hasta que el usuario elige Salir. Es un `while` con una bandera o con `break`:

```text
n = int(input('Longitud de los vectores: '))
A = [0] * n
B = [0] * n
C = [0] * n
while True:
    op = input('1. Llenar A  2. Llenar B  3. C=A+B  4. C=B-A  5. Mostrar  6. Salir\nOpción: ')
    if op == '1':
        ...
    elif op == '6':
        print('Adiós')
        break
```

Detalles que cuentan:

- Los vectores se crean **una vez, antes del ciclo**, con la longitud que se pidió una sola vez (lo dice el PDF). Las opciones solo cambian sus posiciones.
- El texto del menú va **dentro del `input`**. En esta plataforma los mensajes de `input()` no se califican, así que el menú no estorba en la salida.
- Cada opción llama a una función: `llenar(A)`, `sumar(A, B, C)`, `mostrar(C)`. El `while` queda corto y fácil de leer.
- `op` es un texto: compáralo con `'1'`, no con `1`.

## Antes de seguir

- Las funciones reciben el vector y usan `len(v)` para saber su tamaño.
- Si una función cambia `v[i]`, el cambio se ve afuera.
- `range(p, -1, -1)` recorre de `p` hasta 0.
- Un menú es un `while` que lee la opción en cada vuelta; los vectores se crean antes.
