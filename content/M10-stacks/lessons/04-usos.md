# Usos: invertir, cambiar de base y reemplazar

Con `push`, `pop`, `top` y `empty` ya se resuelven problemas de verdad. En esta lección la clase `Stack` es la de la lección anterior; en los ejercicios ya viene escrita en el código inicial.

## Invertir

Lo que entra primero sale de último: meter todo y luego sacarlo todo **invierte** el orden.

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

    def empty(self):
        return self.pointer == 0


frase = 'anita lava la tina'
s = Stack(len(frase))
for c in frase:
    s.push(c)
al_reves = ''
while not s.empty():
    al_reves = al_reves + s.pop()
print(al_reves)
print('¿Palíndromo?', frase.replace(' ', '') == al_reves.replace(' ', ''))
```

Fíjate en `Stack(len(frase))`: la pila mide justo lo que necesita.

## Decimal a binario

En M3 sacabas los dígitos con `% 10` y `// 10`. Para pasar a base 2 se hace igual con `% 2` y `// 2`, pero los residuos salen **al revés**: el primero es el último dígito. Una pila los voltea.

Morado: el residuo que entra a la pila; gris: los que salen para formar el número.

```pasos
13 | k0 | 13 % 2 = 1 → push(1). 13 // 2 = 6.
6 | k0 | 6 % 2 = 0 → push(0). 6 // 2 = 3.
3 | k0 | 3 % 2 = 1 → push(1). 3 // 2 = 1.
1 | k0 | 1 % 2 = 1 → push(1). 1 // 2 = 0: se termina.
1 0 1 1 | c3 | En la pila quedó 1 0 1 1 (la cima a la derecha).
1 0 1 1 | x3 x2 x1 x0 | Se sacan de la cima hacia abajo: 1 1 0 1. 13 en binario es 1101.
```

Para cualquier base hasta 16 se usan los dígitos `0123456789ABCDEF`: el residuo 11 se escribe `B`.

```python
DIGITOS = '0123456789ABCDEF'
n = 255
base = 16
pila = [None] * 32
p = 0
while n > 0:
    pila[p] = DIGITOS[n % base]
    p = p + 1
    n = n // base
texto = ''
while p > 0:
    p = p - 1
    texto = texto + pila[p]
print(texto)
```

Aquí la pila está hecha "a mano" con un vector y un puntero, sin clase: es exactamente lo mismo. El 0 es un caso especial: el `while` no entra, así que hay que revisarlo aparte.

## Reemplazar (ejercicio 32 del PDF)

> Una función `Reemplazar` recibe una pila de enteros y dos valores, `nuevo` y `viejo`; si `viejo` aparece en algún lugar de la pila, se cambia por `nuevo`.

El problema: con una pila **solo se ve la cima**. Para llegar a los de abajo hay que sacar los de arriba y, para no perderlos, guardarlos en una **pila auxiliar**. Al final se regresan, y como pasan dos veces por una pila, quedan en el orden original.

Amarillo: lo que sale de una pila; rojo: lo que entra a la otra; verde: el resultado.

```matriz
P: 5 3 8 3 || Aux: · · · · |  | Reemplazar 3 por 9. P tiene 5 3 8 3 (cima a la derecha).
P: 5 3 8 · || Aux: 9 · · · | c0:0.3 i1:0.0 | pop() → 3. Es el viejo: a Aux entra 9.
P: 5 3 · · || Aux: 9 8 · · | c0:0.2 i1:0.1 | pop() → 8. No es el viejo: entra igual.
P: 5 · · · || Aux: 9 8 9 · | c0:0.1 i1:0.2 | pop() → 3 → entra 9.
P: · · · · || Aux: 9 8 9 5 | c0:0.0 i1:0.3 | pop() → 5 → entra 5. P quedó vacía.
P: 5 · · · || Aux: 9 8 9 · | i0:0.0 c1:0.3 | Ahora de regreso: pop de Aux, push a P.
P: 5 9 8 9 || Aux: · · · · | o0:0.0 o0:0.1 o0:0.2 o0:0.3 | P = 5 9 8 9: mismo orden, con los 3 cambiados.
```

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

    def empty(self):
        return self.pointer == 0


def reemplazar(pila, nuevo, viejo):
    aux = Stack(len(pila.data))
    while not pila.empty():
        x = pila.pop()
        if x == viejo:
            x = nuevo
        aux.push(x)
    while not aux.empty():
        pila.push(aux.pop())


p = Stack(4)
for x in [5, 3, 8, 3]:
    p.push(x)
reemplazar(p, 9, 3)
print(p.data[:p.pointer])
```

`print(p.data[:p.pointer])` es solo para revisar: en los ejercicios se muestra la pila con un ciclo, como en la lección anterior.

## El patrón de la pila auxiliar

"Sacar todo a otra pila, hacer algo con cada dato y regresarlo" sirve para mucho: contar cuántas veces aparece un valor, buscar el mayor, copiar una pila, borrar un valor del medio. Siempre son dos `while not ... empty()` seguidos.
