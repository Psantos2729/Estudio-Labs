# La pila con un vector y un puntero

Así está hecha la pila de tu `libstack.py`: un **vector de tamaño fijo** y un número, el **puntero**, que dice cuántos datos hay. No se usa `append` ni `pop` de las listas: el vector se crea una vez con `[None] * tamaño` y nunca cambia de tamaño.

## La idea

- `data` es el vector: `[None, None, None, None, None]` para una pila de 5.
- `pointer` empieza en 0. Siempre dice **dónde entra el próximo dato** y, a la vez, **cuántos hay**.
- La cima es `data[pointer - 1]`.

Mira el vector completo. Amarillo: la casilla donde apunta el puntero (ahí entra el siguiente). Rojo: la que se escribe. Morado: la que se lee con `pop`.

```pasos
· · · · · | c0 | Pila de 5 vacía: pointer = 0.
4 · · · · | i0 c1 | push(4): data[0] = 4 y pointer pasa a 1.
4 7 · · · | i1 c2 | push(7): data[1] = 7 y pointer pasa a 2.
4 7 2 · · | i2 c3 | push(2): data[2] = 2 y pointer pasa a 3. La cima es data[2].
4 7 2 · · | k2 c2 | pop(): pointer baja a 2 y se devuelve data[2] = 2.
4 7 2 · · | c2 | El 2 sigue escrito en data[2], pero ya no cuenta: el puntero dice que hay 2 datos.
4 7 9 · · | i2 c3 | push(9): se escribe encima del 2 viejo.
4 7 9 5 1 | o0 o1 o2 o3 o4 | Dos push más: pointer = 5 = tamaño. Pila llena.
4 7 9 5 1 | x4 | Otro push sería overflow: no hay casilla data[5].
```

Fíjate en el paso 6: `pop` **no borra** el dato, solo baja el puntero. Lo que está de `pointer` en adelante es basura que se va a sobrescribir.

## El código

```python
class Stack:
    def __init__(self, tamaño=10):
        self.data = [None] * tamaño
        self.pointer = 0

    def push(self, elemento):
        if self.pointer == len(self.data):
            raise OverflowError('Stack Overflow')
        self.data[self.pointer] = elemento
        self.pointer = self.pointer + 1

    def pop(self):
        if self.pointer == 0:
            raise IndexError('Stack Underflow')
        self.pointer = self.pointer - 1
        return self.data[self.pointer]

    def top(self):
        if self.pointer == 0:
            raise IndexError('Stack Underflow')
        return self.data[self.pointer - 1]

    def empty(self):
        return self.pointer == 0


s = Stack(3)
s.push(4)
s.push(7)
print(s.top(), s.pointer)
print(s.pop(), s.pop(), s.empty())
```

Ojo con un detalle de `libstack.py`: ahí `push` pregunta `if self.pointer < 10`, con el 10 fijo. Si creas `Stack(3)`, igual dejaría meter 10 datos y se saldría del vector. Comparar con `len(self.data)` funciona para cualquier tamaño.

## `raise`: avisar que algo salió mal

`raise OverflowError('Stack Overflow')` **lanza un error** a propósito, igual que Python lanza `ZeroDivisionError` cuando divides entre 0. El programa se detiene ahí, a menos que alguien lo **atrape**.

¿Por qué lanzar un error y no hacer `print`? Porque la pila no sabe qué quiere hacer tu programa con el problema: tal vez mostrar un mensaje, tal vez ignorarlo, tal vez otra cosa. Ella avisa; tú decides.

## `try` / `except`: atrapar el error

```python
class Stack:
    def __init__(self, tamaño=10):
        self.data = [None] * tamaño
        self.pointer = 0

    def push(self, elemento):
        if self.pointer == len(self.data):
            raise OverflowError('Stack Overflow')
        self.data[self.pointer] = elemento
        self.pointer = self.pointer + 1

    def pop(self):
        if self.pointer == 0:
            raise IndexError('Stack Underflow')
        self.pointer = self.pointer - 1
        return self.data[self.pointer]


s = Stack(2)
for x in [10, 20, 30]:
    try:
        s.push(x)
        print('Entró', x)
    except OverflowError as e:
        print('No entró', x, '→', e)

for _ in range(3):
    try:
        print('Salió', s.pop())
    except IndexError as e:
        print(e)
```

- Lo que está en `try` se intenta. Si una línea lanza el error, Python **salta** al `except` y las líneas que faltaban del `try` no se corren (por eso no sale `Entró 30`).
- `except OverflowError as e` atrapa **solo** ese tipo de error; `e` es el error y `print(e)` muestra su mensaje.
- Después del `except`, el programa **sigue** normalmente.

También se puede revisar **antes** con `empty()` en vez de atrapar el error. Las dos formas son válidas; en los ejercicios usa la que te resulte más clara.

```python
class Stack:
    def __init__(self, tamaño=10):
        self.data = [None] * tamaño
        self.pointer = 0

    def push(self, elemento):
        self.data[self.pointer] = elemento
        self.pointer = self.pointer + 1

    def pop(self):
        self.pointer = self.pointer - 1
        return self.data[self.pointer]

    def empty(self):
        return self.pointer == 0


s = Stack()
for letra in 'hola':
    s.push(letra)
while not s.empty():
    print(s.pop(), end='')
print()
```

Ese último ejemplo ya es un uso real: **invertir** un texto. Es lo primero de la siguiente lección.

## Mostrar la pila

Para ver qué hay adentro, recorre el vector **solo hasta el puntero** (lo demás es basura):

```python
datos = [4, 7, 9, None, None]
pointer = 3
print('Pila:', ' '.join(str(datos[i]) for i in range(pointer)))
print('De la cima hacia abajo:', ' '.join(str(datos[i]) for i in range(pointer - 1, -1, -1)))
```
