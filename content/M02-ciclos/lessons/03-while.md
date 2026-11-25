# Repetir mientras algo sea cierto: while

`for` sirve cuando sabes **cuántas veces** repetir. Pero a veces no lo sabes: "pide números hasta que escriban 0", "divide entre 2 hasta llegar a 1". Para eso está `while`:

```python
n = 1
while n < 100:
    print(n)
    n = n * 2
```

Imprime `1 2 4 8 16 32 64` (uno por línea). Funciona así:

1. Revisa la condición (`n < 100`).
2. Si es verdadera, ejecuta el bloque y **vuelve al paso 1**.
3. Si es falsa, sale del ciclo y sigue con lo que hay después.

Fíjate que la condición se revisa **antes** de cada vuelta. Si desde el principio es falsa, el bloque no se ejecuta ni una vez.

## El ciclo infinito

Si nada dentro del bloque cambia la condición, el ciclo nunca termina:

```text
n = 1
while n < 100:
    print(n)  # n nunca cambia: se repite para siempre
```

Regla: dentro de un `while` siempre debe haber algo que **acerque** la condición a ser falsa. En la plataforma, si tu programa tarda demasiado, se detiene y te avisa; casi siempre es un ciclo infinito.

## Centinela: leer hasta una señal

Un **valor centinela** es una entrada especial que indica "ya terminé". Por ejemplo, sumar números hasta que se ingrese 0:

```python
suma = 0
n = int(input())
while n != 0:
    suma = suma + n
    n = int(input())
print("Suma:", suma)
```

Fíjate en el orden: se lee **un** número antes del ciclo y otra vez **al final** de cada vuelta. Así el 0 nunca se suma, y si el primer número ya es 0 la suma queda en 0.

## for o while

| Usa… | cuando… | Ejemplo |
| --- | --- | --- |
| `for` | sabes cuántas vueltas hay | leer 20 números, sumar de 1 a 100 |
| `while` | depende de lo que pase dentro | centinela, Collatz, adivinar un número |

Todo `for` se puede escribir con `while` (con un contador a mano), pero `for` es más corto y no se olvida de avanzar.

```python
i = 1
while i <= 5:   # lo mismo que for i in range(1, 6)
    print(i)
    i = i + 1
```
