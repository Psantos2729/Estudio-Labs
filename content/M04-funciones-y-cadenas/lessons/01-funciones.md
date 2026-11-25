# Funciones: def, parámetros y return

Hasta ahora tus programas eran una sola lista de instrucciones de arriba hacia abajo. Cuando un programa crece aparecen pedazos que se repiten o que tienen un trabajo muy claro: "calcular el mayor", "saber si un texto es palíndromo", "convertir un número a romano". Una **función** le pone nombre a uno de esos pedazos para usarlo cuantas veces quieras.

Ya usaste muchas funciones que trae Python: `print`, `input`, `int`, `len`, `abs`. Ahora vas a escribir las tuyas.

## Definir y llamar

```python
def saludar(nombre):
    print(f'Hola, {nombre}')

saludar('Paolo')
saludar('Ana')
```

- `def` dice "aquí defino una función". Después va el **nombre**, los **parámetros** entre paréntesis y dos puntos.
- El cuerpo va **con sangría**, igual que en un `if` o un `for`.
- Definir la función **no la ejecuta**. Se ejecuta cuando la **llamas**: `saludar('Paolo')`.
- `nombre` es un **parámetro**: una variable que recibe el valor que le mandas al llamarla (el **argumento**). En la primera llamada vale `'Paolo'`, en la segunda `'Ana'`.

La función tiene que estar definida **antes** de la línea que la llama. Por eso se acostumbra poner todas las funciones arriba y el programa principal abajo.

## return: devolver un resultado

`print` muestra algo en pantalla, pero el resultado se pierde: no lo puedes guardar ni usar en una cuenta. `return` en cambio **devuelve** un valor a quien llamó la función, y ese valor se puede guardar en una variable, sumar, comparar o imprimir.

```python
def mayor(a, b):
    if a > b:
        return a
    return b

m = mayor(7, 12)
print(m)                 # 12
print(mayor(3, 1) * 10)  # 30
```

Cuando Python llega a un `return`, **la función termina en ese momento**, aunque queden líneas abajo. Por eso el segundo `return b` no necesita `else`: si `a > b`, la función ya se fue con `a`.

Compara con una versión que imprime en vez de devolver:

```python
def mayor_imprime(a, b):
    if a > b:
        print(a)
    else:
        print(b)

x = mayor_imprime(7, 12)   # imprime 12
print(x)                   # None
```

`x` vale `None`, que en Python significa "nada": la función no devolvió ningún valor. **Regla práctica:** si el resultado se va a usar en otra cuenta, la función hace `return`; el programa principal decide qué imprimir.

## Varios parámetros y varios resultados

Una función puede recibir los parámetros que necesite, separados por comas, y el orden importa: el primer argumento va al primer parámetro.

```python
def area_rectangulo(base, altura):
    return base * altura

print(area_rectangulo(4, 3))   # 12
```

También puede devolver **dos o más valores** separados por comas, y quien llama los recibe en dos variables. Así lo hiciste en `Encontrar.py` con `mayor_menor(vector)`:

```python
def division(a, b):
    return a // b, a % b

c, r = division(17, 5)
print(c, r)   # 3 2
```

## Variables locales

Las variables que se crean dentro de una función (incluidos sus parámetros) son **locales**: solo existen mientras la función corre, y no chocan con variables de afuera que se llamen igual.

```python
def doble(n):
    resultado = n * 2
    return resultado

n = 5
print(doble(10))   # 20
print(n)           # 5: el n de afuera no cambió
```

Esto es lo que hace útiles a las funciones: puedes leer una sin preocuparte del resto del programa. Todo lo que necesita entra por los parámetros y todo lo que produce sale por el `return`.

## Funciones que usan otras funciones

Una función puede llamar a otra. Así se arma un programa grande con piezas pequeñas:

```python
def mayor(a, b):
    if a > b:
        return a
    return b

def mayor_de_tres(a, b, c):
    return mayor(mayor(a, b), c)

print(mayor_de_tres(4, 9, 2))   # 9
```

Lee `mayor(mayor(a, b), c)` de adentro hacia afuera: primero el mayor entre `a` y `b` (9), luego el mayor entre ese y `c`.

## Funciones que devuelven True o False

Muchas funciones responden una pregunta de sí o no. Se acostumbra que su nombre empiece con `es_` y que devuelvan un booleano:

```python
def es_par(n):
    return n % 2 == 0

for k in range(1, 6):
    if es_par(k):
        print(k, 'es par')
```

`n % 2 == 0` ya es `True` o `False`, así que se devuelve directo. No hace falta `if ...: return True else: return False`.

## Reto: una función que se llama a sí misma

Una función **recursiva** se llama a sí misma con un problema más pequeño, hasta llegar a un caso tan simple que se responde directo (el **caso base**). El factorial es el ejemplo clásico: 5! = 5 × 4! y 0! = 1.

```python
def factorial(n):
    if n == 0:
        return 1                  # caso base: aquí se detiene
    return n * factorial(n - 1)   # el mismo problema, más pequeño

print(factorial(5))   # 120
```

`factorial(5)` pide `factorial(4)`, que pide `factorial(3)`… hasta `factorial(0)`, que devuelve 1 sin llamar a nadie. Luego las respuestas regresan multiplicándose: 1, 1, 2, 6, 24, 120. Sin caso base la función se llamaría para siempre y Python la detendría con un error. Tu `haino.py` (torres de Hanói) usa esta misma idea.

## Antes de seguir

- `def nombre(parámetros):` define; `nombre(argumentos)` ejecuta.
- `return` devuelve un valor y termina la función; `print` solo muestra.
- Lo que pasa dentro de una función se queda adentro: entra por parámetros, sale por `return`.
- Una función puede devolver varios valores y llamar a otras funciones.
