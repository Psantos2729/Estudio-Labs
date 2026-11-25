# Palabras y números dentro del texto

Contar caracteres es fácil porque cada uno está solo. Las **palabras** y los **números** son grupos de caracteres seguidos, así que hay que **armarlos** mientras se recorre.

## Palabras con split

Si las palabras están separadas por espacios, `split()` las da listas:

```python
linea = 'El sol   sale hoy'
palabras = linea.split()
print(palabras, len(palabras))
```

Pero los signos se quedan pegados: `'hoy.'.split()` da `['hoy.']`. Para quitarlos de los extremos de cada palabra usa `strip` con los signos:

```python
for p in 'Hola, ¿cómo estás? ¡Bien!'.split():
    print(p.strip('.,;:¿?¡!'), end=' ')
print()
```

## Palabras armadas letra por letra

En tu tarea `Archivos2_21.py` armaste las palabras así: mientras llegan letras se van pegando; cuando llega algo que no es letra, la palabra terminó. Funciona aunque haya signos o dígitos pegados:

```python
linea = 'oso,ana y 3 radar.'
palabra = ''
palabras = 0
for c in linea + ' ':        # el espacio extra cierra la última palabra
    if c.isalpha():
        palabra = palabra + c
    elif palabra != '':
        palabras = palabras + 1
        print('palabra:', palabra)
        palabra = ''
print(palabras)
```

El `+ ' '` es el detalle importante: sin él, si la línea termina en letra, la última palabra nunca se cuenta.

## Palíndromos y la palabra más larga

Con cada palabra armada puedes preguntar lo que quieras: si es palíndromo (M4), si empieza y termina con la misma letra, si es la más larga.

```python
def es_palindromo(p):
    p = p.lower()
    return p == p[::-1]

larga = ''
pal = 0
for p in 'Ana vio un radar en una Oruga'.split():
    if es_palindromo(p):
        pal = pal + 1
    if len(p) > len(larga):
        larga = p
print(pal, larga)   # 2 radar
```

Con `>` se queda la **primera** palabra más larga; con `>=`, la última.

## Números dentro del texto

Lo mismo con dígitos (tu `Práctica_Examen_2-1.py`): se pegan los dígitos seguidos y, al llegar algo que no es dígito, se convierte con `int` y se suma.

```pasos
a 1 2 b 3 ␣ 4 5 |  | Buscamos los números dentro de "a12b3 45". numero = "" y suma = 0.
a 1 2 b 3 ␣ 4 5 | c0 | 'a' no es dígito y no había número armado: no pasa nada.
a 1 2 b 3 ␣ 4 5 | k1 | '1' es dígito: se pega, numero = "1".
a 1 2 b 3 ␣ 4 5 | k2 | '2' es dígito: se pega, numero = "12".
a 1 2 b 3 ␣ 4 5 | c3 | 'b' no es dígito: termina el número 12. suma = 12.
a 1 2 b 3 ␣ 4 5 | k4 | '3' es dígito: se pega, numero = "3".
a 1 2 b 3 ␣ 4 5 | c5 | ' ' no es dígito: termina el número 3. suma = 15.
a 1 2 b 3 ␣ 4 5 | k6 | '4' es dígito: se pega, numero = "4".
a 1 2 b 3 ␣ 4 5 | k7 | '5' es dígito: se pega, numero = "45".
a 1 2 b 3 ␣ 4 5 |  | Fin del texto: termina el número 45. suma = 60.
a 1 2 b 3 ␣ 4 5 |  | Se encontraron 12, 3 y 45. Suma = 60. Al final hay que cerrar el último número.
```

```python
def numeros_de(linea):
    suma = 0
    cuantos = 0
    tres = 0
    numero = ''
    for c in linea + ' ':
        if c.isdigit():
            numero = numero + c
        elif numero != '':
            suma = suma + int(numero)
            cuantos = cuantos + 1
            if len(numero) == 3:
                tres = tres + 1
            numero = ''
    return suma, cuantos, tres

print(numeros_de('Compré 3 libros a 125 y 240 quetzales'))   # (368, 3, 2)
```

Contar "cantidades de 3 dígitos" con `len(numero) == 3` es más claro que `99 < n < 1000`, pero cuidado con los ceros a la izquierda: `'007'` tiene 3 caracteres y vale 7. El enunciado dice cuál cuenta; si no lo dice, pregúntate qué pasa con `007`.

## Comparar con otro archivo

Tu tarea de "dobles agentes" compara los nombres de dos archivos. Primero se leen las dos listas (sin `\n`), y luego, para cada nombre de la primera, se busca en la segunda:

```python
uno = ['Ana', 'Luis', 'Marta']
dos = ['Pedro', 'Marta', 'Ana']
for i in range(len(uno)):
    for j in range(len(dos)):
        if uno[i] == dos[j]:
            print(f'{uno[i]}: posición {i} y {j}')
```
