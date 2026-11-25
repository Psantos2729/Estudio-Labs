# Banderas, break y continue

## Banderas: recordar si algo pasó

Una **bandera** es una variable `True`/`False` que empieza con un valor y cambia cuando ocurre algo dentro del ciclo. Después del ciclo, la revisas para decidir.

El ejemplo clásico: ¿un número es **primo**? Un primo es un entero mayor que 1 que solo es divisible entre 1 y entre sí mismo (2, 3, 5, 7, 11…).

```python
n = 21
es_primo = True            # suponemos que sí…
for d in range(2, n):
    if n % d == 0:
        es_primo = False   # …hasta encontrar un divisor
if es_primo:
    print(n, "es primo")
else:
    print(n, "no es primo")
```

Imprime `21 no es primo`, porque 21 % 3 == 0.

La idea es: **suponer** algo al principio y **cambiar de opinión** si aparece una prueba en contra. Un solo divisor basta para que no sea primo; para que sí lo sea, hay que revisarlos todos.

Cuidado con los casos especiales: 0 y 1 **no** son primos, pero con `range(2, n)` el ciclo no da ninguna vuelta y la bandera se queda en `True`. Hay que revisarlos aparte, por ejemplo empezando con `es_primo = n > 1`.

## Contador o bandera

- Un **contador** responde "¿cuántas veces?".
- Una **bandera** responde "¿pasó al menos una vez?" (o "¿pasó siempre?").

Si solo necesitas saber si pasó, una bandera es más clara que un contador.

## break: salir del ciclo ya

En el ejemplo del primo, cuando encontramos el 3 ya sabemos la respuesta: no tiene sentido seguir probando 4, 5, 6… `break` sale del ciclo inmediatamente:

```python
for d in range(2, n):
    if n % d == 0:
        es_primo = False
        break
```

Lo que está después del `break` dentro del ciclo ya no se ejecuta, y el programa sigue en la primera línea **después** del ciclo.

`break` también es útil con `while True`, un ciclo que "nunca termina" salvo que lo cortes:

```python
while True:
    r = input()
    if r == "Fin":
        break
    print("Escribiste:", r)
```

## continue: saltar a la siguiente vuelta

`continue` no sale del ciclo: se salta **el resto de esta vuelta** y pasa a la siguiente.

```python
for i in range(1, 8):
    if i % 3 == 0:
        continue
    print(i)
```

Imprime 1, 2, 4, 5, 7: los múltiplos de 3 se saltan.

Casi siempre se puede escribir lo mismo con un `if` sin `continue`; úsalo cuando haga el código más fácil de leer.

## Probar menos divisores

No hace falta probar hasta `n − 1`: si `n` tiene un divisor, tiene uno menor o igual a su raíz cuadrada. Por eso se suele escribir `while d * d <= n`. Para los ejercicios de esta plataforma, `range(2, n)` es suficientemente rápido.
