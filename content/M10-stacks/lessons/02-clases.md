# Clases desde cero

La pila del curso (`libstack.py`) empieza con `class Stack():`. Antes de programarla hay que entender qué es una **clase**. Es lo único nuevo de Python en este módulo, así que vamos despacio.

## El problema

Una pila necesita **dos datos que van juntos**: el vector donde se guardan los elementos y el puntero que dice cuántos hay. Con lo que sabes, serían dos variables sueltas (`datos` y `puntero`) y funciones que las reciben. Si quieres **dos** pilas, ya son cuatro variables, y es fácil pasar la que no es.

Una **clase** junta los datos y las funciones que los usan en un solo paquete.

## Clase y objeto

- La **clase** es el molde: dice qué datos tiene y qué sabe hacer. Por ejemplo, "una cuenta de banco tiene titular y saldo, y sabe depositar".
- Un **objeto** es una cosa hecha con ese molde: la cuenta de Ana, la cuenta de Luis. Cada una tiene **su propio** saldo.

```python
class Cuenta:
    def __init__(self, titular):
        self.titular = titular
        self.saldo = 0

    def depositar(self, monto):
        self.saldo = self.saldo + monto


ana = Cuenta('Ana')
luis = Cuenta('Luis')
ana.depositar(100)
ana.depositar(50)
luis.depositar(30)
print(ana.titular, ana.saldo)
print(luis.titular, luis.saldo)
```

Pieza por pieza:

- `class Cuenta:` empieza el molde. Por costumbre, el nombre va con mayúscula.
- Las funciones **dentro** de la clase se llaman **métodos**.
- `__init__` (dos guiones bajos a cada lado) es un método especial: Python lo corre **solo** cuando creas el objeto con `Cuenta('Ana')`. Ahí se preparan los datos.
- `self` es **el objeto que se está usando**. En `ana.depositar(100)`, `self` es `ana`; en `luis.depositar(30)`, `self` es `luis`. Python lo pasa solo: tú escribes `ana.depositar(100)` y no `depositar(ana, 100)`.
- `self.saldo` es un **atributo**: una variable que vive dentro del objeto. Por eso `ana` y `luis` tienen cada uno su saldo.

## Un método que devuelve algo

Los métodos son funciones: pueden recibir datos y devolver con `return`.

```python
class Contador:
    def __init__(self, inicio=0):
        self.valor = inicio

    def sumar(self):
        self.valor = self.valor + 1

    def es_par(self):
        return self.valor % 2 == 0


c = Contador()
d = Contador(10)
c.sumar()
c.sumar()
c.sumar()
print(c.valor, c.es_par())
print(d.valor, d.es_par())
```

`inicio=0` es un **valor por defecto**: si no lo das, vale 0. Así `Contador()` empieza en 0 y `Contador(10)` en 10. La pila del curso hace lo mismo con `tamaño=10`.

## Errores típicos

| Error | Qué pasa |
| --- | --- |
| Olvidar `self` en `def sumar():` | Python dice que el método recibió 1 argumento de más (el objeto). |
| Escribir `valor = valor + 1` sin `self.` | Crea una variable local que se pierde; el atributo no cambia. |
| Escribir `Contador` sin paréntesis | No crea un objeto: es el molde mismo. |
| Usar `c.valor` antes de crearlo en `__init__` | `AttributeError`: el atributo no existe. |

## Mirar dentro de un objeto

Un atributo se lee y se cambia desde afuera con el punto, igual que un método:

```python
class Punto:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def mover(self, dx, dy):
        self.x = self.x + dx
        self.y = self.y + dy


p = Punto(2, 3)
p.mover(1, -1)
print(p.x, p.y)
p.x = 10
print(p.x, p.y)
```

En la pila no vamos a cambiar los atributos desde afuera: todo pasa por `push` y `pop`, que revisan que no haya overflow ni underflow. Así la pila nunca queda en un estado raro.
