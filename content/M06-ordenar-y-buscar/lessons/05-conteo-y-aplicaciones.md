# Ordenamiento por conteo y qué hacer con un vector ordenado

Todos los métodos anteriores ordenan **comparando** elementos. El ordenamiento por **conteo** (counting sort, ejercicio 35 del PDF) no compara nada: **cuenta** cuántas veces aparece cada valor y luego los escribe en orden. Funciona cuando los valores son enteros en un rango conocido y no muy grande, como notas de 0 a 100 o dados de 1 a 6.

Ya lo usaste sin saberlo en el reto de la moda de M5: el vector `conteo` donde la **posición** es el valor.

## Paso 1: contar

Se crea un vector de conteo con una posición por cada valor posible (de 0 al máximo) y se recorre el vector original sumando 1 en la casilla de cada valor:

```pasos
0 0 0 0 0 |  | Vector de conteo de 5 posiciones (de 0 a 4), todo en 0. Datos: 3, 1, 4, 1, 2.
0 0 0 1 0 | k3 | Llega el 3: conteo[3] sube a 1.
0 1 0 1 0 | k1 | Llega el 1: conteo[1] sube a 1.
0 1 0 1 1 | k4 | Llega el 4: conteo[4] sube a 1.
0 2 0 1 1 | k1 | Llega el 1: conteo[1] sube a 2.
0 2 1 1 1 | k2 | Llega el 2: conteo[2] sube a 1.
0 2 1 1 1 | o1 o2 o3 o4 | Ya se contaron todos. Ahora se recorre el conteo de 0 en adelante y cada valor se escribe tantas veces como dice su casilla.
```

## Paso 2: reconstruir

Se recorre el conteo de la posición 0 hacia arriba. Cada valor se escribe en el vector **tantas veces como dice su casilla**:

```pasos
· · · · · |  | El vector ordenado empieza vacío (· = posición sin llenar).
1 · · · · | k0 | conteo[1] = 2: se escribe 1 en la posición 0.
1 1 · · · | k1 o0 | conteo[1] = 2: se escribe 1 en la posición 1.
1 1 2 · · | k2 o0 o1 | conteo[2] = 1: se escribe 2 en la posición 2.
1 1 2 3 · | k3 o0 o1 o2 | conteo[3] = 1: se escribe 3 en la posición 3.
1 1 2 3 4 | k4 o0 o1 o2 o3 | conteo[4] = 1: se escribe 4 en la posición 4.
1 1 2 3 4 | o0 o1 o2 o3 o4 | Vector ordenado, sin una sola comparación entre elementos.
```

## En código

```python
def conteo_sort(v, maximo):
    conteo = [0] * (maximo + 1)
    for i in range(len(v)):
        conteo[v[i]] = conteo[v[i]] + 1
    p = 0
    for valor in range(maximo + 1):
        for k in range(conteo[valor]):
            v[p] = valor
            p = p + 1

datos = [3, 1, 4, 1, 2]
conteo_sort(datos, 4)
print(datos)   # [1, 1, 2, 3, 4]
```

- El conteo tiene `maximo + 1` posiciones, para que exista la posición `maximo`.
- `p` dice en qué posición del vector se escribe el siguiente valor.
- El ciclo de adentro corre `conteo[valor]` veces: 0 veces si ese valor no apareció.

## ¿Cuánto cuesta?

El PDF pide las estadísticas del ordenamiento. Counting sort hace **0 comparaciones entre elementos** y **0 intercambios**: solo cuenta y escribe. Recorre el vector dos veces y el conteo una vez, así que su trabajo crece con `n + maximo`, no con `n²`. Con un millón de notas de 0 a 100 es muchísimo más rápido que la burbuja. A cambio:

- Solo sirve con **enteros** (no con decimales ni textos).
- El conteo necesita una casilla por cada valor posible: para valores hasta 1,000,000 serían un millón de casillas aunque solo ordenes 5 números.
- Con negativos hay que correr los valores (por ejemplo, guardar `v[i] + 500` si el mínimo es −500).

## La posición media

El ejercicio 35 pide el dato de la **posición media** del vector ya ordenado. Con la posición inicial en 0, la del medio es `(n − 1) // 2`, la misma cuenta que vas a usar en la búsqueda binaria:

| n | posiciones | `(n − 1) // 2` |
| --- | --- | --- |
| 5 | 0 1 **2** 3 4 | 2 |
| 6 | 0 1 **2** 3 4 5 | 2 (la primera de las dos del centro) |
| 1 | **0** | 0 |

Con el ejemplo del PDF, ordenado `2, 4, 5, 28, 50`, la posición media es 2 y `V[2]` es 5.

Luego hay que decir si ese dato es **primo**, con la prueba de divisores de M2 en una función:

```python
def es_primo(n):
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d = d + 1
    return True

v = [2, 4, 5, 28, 50]
m = (len(v) - 1) // 2
if es_primo(v[m]):
    print(f'El número {v[m]} SI es un número PRIMO')
else:
    print(f'El número {v[m]} NO es un número PRIMO')
```

`d * d <= n` revisa divisores solo hasta la raíz cuadrada: si `n` tuviera un divisor mayor, también tendría uno menor que ya se habría encontrado.

## Aprobados y reprobados (ejercicio 30)

Con las notas ordenadas, contar y promediar por grupos es un recorrido con dos acumuladores y dos contadores. Hay que cuidar el caso en que un grupo queda **vacío**: dividir entre 0 da `ZeroDivisionError`.

```python
notas = [45, 58, 61, 77, 90]
suma_a = 0
cant_a = 0
suma_r = 0
cant_r = 0
for i in range(len(notas)):
    if notas[i] >= 61:
        suma_a = suma_a + notas[i]
        cant_a = cant_a + 1
    else:
        suma_r = suma_r + notas[i]
        cant_r = cant_r + 1
if cant_a > 0:
    print(f'Promedio de aprobados: {suma_a / cant_a:.2f}')
else:
    print('No hay aprobados')
print(cant_a, cant_r)
```

Con el vector ordenado hay un atajo: los reprobados están todos al inicio y los aprobados al final. Basta encontrar la **primera** posición con nota ≥ 61; todo lo que está antes reprobó.

## Antes de seguir

- Counting sort cuenta en un vector donde la posición es el valor, y luego reconstruye.
- 0 comparaciones y 0 intercambios; solo sirve con enteros de un rango pequeño.
- Posición media: `(n − 1) // 2`.
- Antes de dividir para un promedio, revisa que el grupo no esté vacío.
