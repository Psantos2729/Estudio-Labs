# Palíndromos: comparar los extremos

Un **palíndromo** se lee igual de izquierda a derecha que de derecha a izquierda: *reconocer*, *oso*, *anilina*. Con frases se ignoran los espacios y las mayúsculas: *Anita lava la tina*.

Hay dos formas de saberlo. La rápida es invertir y comparar:

```python
palabra = 'reconocer'
print(palabra == palabra[::-1])   # True
```

La que te piden en los laboratorios (y la que usaste en tu `Palindromo.py`) compara **cada letra con su espejo**: la primera con la última, la segunda con la penúltima, y así hasta el centro.

## La letra y su espejo

En un texto de largo `n`, el espejo de la posición `i` es la posición `n - 1 - i`, o con índices negativos, `-(i + 1)`:

| `i` | `n - 1 - i` (con n = 9) | `-(i + 1)` |
| --- | --- | --- |
| 0 | 8 | -1 |
| 1 | 7 | -2 |
| 2 | 6 | -3 |
| 3 | 5 | -4 |

Solo hace falta llegar a la mitad: `range(n // 2)`. Si la palabra tiene largo impar, la letra del centro es su propio espejo y no hay que compararla.

Mira cómo se revisa *reconocer*. Usa **siguiente** o **reproducir**:

```pasos
r e c o n o c e r |  | ¿"reconocer" es palíndromo? Se compara cada letra con su espejo.
r e c o n o c e r | c0 c8 | texto[0] = r y texto[-1] = r: iguales, sigue.
r e c o n o c e r | c1 c7 o0 o8 | texto[1] = e y texto[-2] = e: iguales, sigue.
r e c o n o c e r | c2 c6 o0 o1 o7 o8 | texto[2] = c y texto[-3] = c: iguales, sigue.
r e c o n o c e r | c3 c5 o0 o1 o2 o6 o7 o8 | texto[3] = o y texto[-4] = o: iguales, sigue.
r e c o n o c e r | o0 o1 o2 o3 o4 o5 o6 o7 o8 | Todas las parejas coinciden: sí es palíndromo.
```

Y una que no es palíndromo. En cuanto aparece una pareja distinta ya se sabe la respuesta:

```pasos
r e c o r r e r |  | ¿"recorrer" es palíndromo? Se compara cada letra con su espejo.
r e c o r r e r | c0 c7 | texto[0] = r y texto[-1] = r: iguales, sigue.
r e c o r r e r | c1 c6 o0 o7 | texto[1] = e y texto[-2] = e: iguales, sigue.
r e c o r r e r | i2 i5 o0 o1 o6 o7 | texto[2] = c y texto[-3] = r: distintos. No es palíndromo.
```

## En código, con una bandera

Es el patrón de bandera de M2: se supone que sí es palíndromo y basta **una** pareja distinta para bajar la bandera.

```python
def es_palindromo(texto):
    n = len(texto)
    for i in range(n // 2):
        if texto[i] != texto[n - 1 - i]:
            return False
    return True

print(es_palindromo('reconocer'))   # True
print(es_palindromo('recorrer'))    # False
```

El `return False` dentro del ciclo hace el papel del `break`: en cuanto falla una pareja, la función termina. El `return True` solo se alcanza si el ciclo revisó todas las parejas sin encontrar ninguna distinta.

## Frases: limpiar antes de comparar

Con frases hay que **normalizar** primero: todo en minúsculas y sin espacios. Si no, la `A` de *Anita* no coincide con la `a` final, y los espacios caen en lugares distintos.

```python
def limpiar(frase):
    return frase.lower().replace(' ', '')

def es_palindromo(texto):
    n = len(texto)
    for i in range(n // 2):
        if texto[i] != texto[n - 1 - i]:
            return False
    return True

frase = 'Anita lava la tina'
print(limpiar(frase))                  # anitalavalatina
print(es_palindromo(limpiar(frase)))   # True
```

Fíjate que cada función hace **una** cosa. `es_palindromo` no sabe nada de espacios, y `limpiar` no sabe nada de palíndromos. Así cada una se prueba por separado.

## Errores comunes

- **Recorrer todo el texto** (`range(n)`) en vez de la mitad: funciona, pero compara cada pareja dos veces.
- **Comparar con `texto[n - i]`**: cuando `i` es 0 eso es `texto[n]`, que no existe (`IndexError`). El espejo es `n - 1 - i`.
- **Decidir "sí es" dentro del ciclo**: que la primera pareja coincida no dice nada de las demás. El "sí" solo se sabe al terminar.

## Reto: anagramas

Dos palabras son **anagramas** si tienen exactamente las mismas letras, en otro orden: *amor* y *roma*, *enfriamiento* y *refinamiento*. Una forma simple: ordena las letras de las dos y compara. `sorted('amor')` da la lista `['a', 'm', 'o', 'r']`.

## Reto: cifrado César

Julio César cifraba sus mensajes corriendo cada letra unas posiciones en el alfabeto: con desplazamiento 3, la *a* se vuelve *d* y la *z* da la vuelta hasta la *c*. Para hacerlo, busca la posición de cada letra en un texto con el alfabeto:

```python
ABC = 'abcdefghijklmnopqrstuvwxyz'
p = ABC.index('y')          # 24
print(ABC[(p + 3) % 26])    # b: el % 26 da la vuelta al alfabeto
```

## Antes de seguir

- El espejo de `i` es `n - 1 - i` (o `-(i + 1)`).
- Basta recorrer hasta la mitad: `range(n // 2)`.
- Una pareja distinta basta para decir que no; el sí se sabe al final.
- Con frases, normaliza primero (minúsculas, sin espacios).
