# Salir de un laberinto

Imagina que caminas por un laberinto dejando migas de pan. En cada cruce tomas un camino; si llegas a un callejón sin salida, **regresas** por tus migas hasta el último cruce donde quedó un camino sin probar. Ese "regresar por donde vine" es una pila: el último lugar al que llegaste es el primero al que regresas.

A esta técnica se le llama **backtracking** (vuelta atrás).

## El laberinto como matriz

Como en M7, el laberinto es una matriz de caracteres:

| Carácter | Significa |
| --- | --- |
| `E` | entrada (donde empiezas) |
| `S` | salida |
| `#` | pared |
| `.` | pasillo libre |

Cada casilla se identifica con su `(fila, columna)`. Desde una casilla te puedes mover a sus 4 vecinas: arriba `(f - 1, c)`, derecha `(f, c + 1)`, abajo `(f + 1, c)` e izquierda `(f, c - 1)`. Sin diagonales.

## El algoritmo

1. Marca la entrada como **visitada** y haz `push` de ella.
2. Mientras la pila no esté vacía:
   - mira la cima (`top`): es donde estás parado;
   - si es la salida, **terminaste**: la pila, de abajo hacia arriba, **es el camino**;
   - si no, busca la primera vecina, en el orden **arriba, derecha, abajo, izquierda**, que esté dentro de la matriz, no sea pared y no esté visitada. Márcala y haz `push`;
   - si ninguna sirve, es un callejón: `pop` (regresas un paso).
3. Si la pila se vacía, **no hay salida**.

Las casillas **visitadas** nunca se vuelven a pisar. Sin eso darías vueltas para siempre entre dos casillas.

## Míralo paso a paso

Amarillo: donde estás (la cima). Verde: el camino que llevas en la pila. Gris: callejones de los que ya regresaste.

```matriz
E · · # / · # · # / · # # # / · · · S | c0.0 | Se empieza en E (0, 0): push. Se prueba arriba, derecha, abajo e izquierda, en ese orden.
E · · # / · # · # / · # # # / · · · S | o0.0 c0.1 | Desde (0, 0) se puede ir derecha: push(0, 1).
E · · # / · # · # / · # # # / · · · S | o0.0 o0.1 c0.2 | Desde (0, 1) se puede ir derecha: push(0, 2).
E · · # / · # · # / · # # # / · · · S | o0.0 o0.1 o0.2 c1.2 | Desde (0, 2) se puede ir abajo: push(1, 2).
E · · # / · # · # / · # # # / · · · S | x1.2 o0.0 o0.1 c0.2 | Desde (1, 2) no hay a dónde ir: pop. Se regresa a (0, 2).
E · · # / · # · # / · # # # / · · · S | x0.2 x1.2 o0.0 c0.1 | Desde (0, 2) no hay a dónde ir: pop. Se regresa a (0, 1).
E · · # / · # · # / · # # # / · · · S | x0.1 x0.2 x1.2 c0.0 | Desde (0, 1) no hay a dónde ir: pop. Se regresa a (0, 0).
E · · # / · # · # / · # # # / · · · S | x0.1 x0.2 x1.2 o0.0 c1.0 | Desde (0, 0) se puede ir abajo: push(1, 0).
E · · # / · # · # / · # # # / · · · S | x0.1 x0.2 x1.2 o0.0 o1.0 c2.0 | Desde (1, 0) se puede ir abajo: push(2, 0).
E · · # / · # · # / · # # # / · · · S | x0.1 x0.2 x1.2 o0.0 o1.0 o2.0 c3.0 | Desde (2, 0) se puede ir abajo: push(3, 0).
E · · # / · # · # / · # # # / · · · S | x0.1 x0.2 x1.2 o0.0 o1.0 o2.0 o3.0 c3.1 | Desde (3, 0) se puede ir derecha: push(3, 1).
E · · # / · # · # / · # # # / · · · S | x0.1 x0.2 x1.2 o0.0 o1.0 o2.0 o3.0 o3.1 c3.2 | Desde (3, 1) se puede ir derecha: push(3, 2).
E · · # / · # · # / · # # # / · · · S | x0.1 x0.2 x1.2 o0.0 o1.0 o2.0 o3.0 o3.1 o3.2 c3.3 | Desde (3, 2) se puede ir derecha: push(3, 3). ¡Es la salida!
```

El camino final es lo que quedó en la pila: (0, 0), (1, 0), (2, 0), (3, 0), (3, 1), (3, 2), (3, 3). Fíjate que **no** es necesariamente el más corto: es el primero que se encontró con ese orden de direcciones. Si cambias el orden, puede salir otro.

## El programa

La pila guarda tuplas `(fila, columna)`. Como cada casilla entra a lo mucho una vez, una pila de `F * C` casillas nunca se llena.

```python
class Stack:
    def __init__(self, tamaño=10):
        self.data = [None] * tamaño
        self.pointer = 0

    def push(self, x):
        self.data[self.pointer] = x
        self.pointer = self.pointer + 1

    def pop(self):
        self.pointer = self.pointer - 1
        return self.data[self.pointer]

    def top(self):
        return self.data[self.pointer - 1]

    def empty(self):
        return self.pointer == 0


M = ['E..#', '.#.#', '.###', '...S']
F = len(M)
C = len(M[0])
visto = [None] * F
for f in range(F):
    visto[f] = [False] * C

s = Stack(F * C)
s.push((0, 0))
visto[0][0] = True
while not s.empty():
    f, c = s.top()
    if M[f][c] == 'S':
        break
    avanzo = False
    for df, dc in [(-1, 0), (0, 1), (1, 0), (0, -1)]:
        nf = f + df
        nc = c + dc
        if 0 <= nf < F and 0 <= nc < C and M[nf][nc] != '#' and not visto[nf][nc]:
            visto[nf][nc] = True
            s.push((nf, nc))
            avanzo = True
            break
    if not avanzo:
        s.pop()

if s.empty():
    print('No hay salida')
else:
    print('Camino:', s.data[:s.pointer])
```

## Dibujar el camino

Para mostrar el camino sobre el laberinto, copia cada fila como una lista de caracteres (los textos no se pueden cambiar por posición), pon `*` en las casillas de la pila (menos `E` y `S`) y vuelve a unir cada fila con `''.join(fila)`:

```python
M = ['E..#', '.#.#', '.###', '...S']
camino = [(0, 0), (1, 0), (2, 0), (3, 0), (3, 1), (3, 2), (3, 3)]
dibujo = [None] * len(M)
for f in range(len(M)):
    dibujo[f] = list(M[f])
for f, c in camino:
    if dibujo[f][c] == '.':
        dibujo[f][c] = '*'
for fila in dibujo:
    print(''.join(fila))
```

## Errores típicos

- Revisar `M[nf][nc]` **antes** de saber si `nf` y `nc` están dentro: con `-1` Python no se queja (lee la última fila) y el camino sale mal. Por eso la condición de "dentro" va primero en el `and`.
- No marcar visitada: el programa se queda yendo y viniendo y nunca termina.
- Marcar visitada al hacer `pop` en vez de al hacer `push`: una casilla podría entrar dos veces a la pila.
