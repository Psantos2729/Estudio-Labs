# Recorrer cadenas de texto

Un texto (`str`) es una **secuencia de caracteres**: letras, dígitos, espacios, signos. Cada carácter tiene una **posición** (un índice) que empieza en 0, igual que vas a ver con las listas en M5.

```text
texto = 'python'
         p  y  t  h  o  n
índice:  0  1  2  3  4  5
negativo:-6 -5 -4 -3 -2 -1
```

## Índices y len

```python
texto = 'python'
print(texto[0])     # p: el primero
print(texto[5])     # n: el último
print(len(texto))   # 6 caracteres
print(texto[-1])    # n: -1 es el último
print(texto[-2])    # o: el penúltimo
```

- `len(texto)` da cuántos caracteres hay. El último índice es siempre `len(texto) - 1`.
- Pedir `texto[6]` en un texto de 6 letras da `IndexError`: esa posición no existe.
- Los índices **negativos** cuentan desde el final: `texto[-1]` es lo mismo que `texto[len(texto) - 1]`.

Los textos **no se pueden modificar** por posición: `texto[0] = 'P'` da error. Para "cambiar" un texto se arma uno nuevo.

## Dos formas de recorrer

**Por carácter**, cuando solo te interesa cada letra:

```python
for c in 'hola':
    print(c)
```

**Por índice**, cuando también necesitas la posición (o comparar con otra posición):

```python
texto = 'hola'
for i in range(len(texto)):
    print(i, texto[i])
```

`range(len(texto))` da 0, 1, 2, 3: justo las posiciones válidas.

## Contar y acumular sobre un texto

Son los mismos contadores de M2, ahora sobre caracteres. Contar vocales:

```python
texto = 'Murcielago'
vocales = 0
for c in texto.lower():
    if c in 'aeiouáéíóú':
        vocales = vocales + 1
print(vocales)   # 5
```

- `texto.lower()` da una copia en minúsculas (y `upper()` en mayúsculas). Así `'M'` y `'m'` se tratan igual.
- `c in 'aeiou'` pregunta si el carácter `c` aparece dentro del texto `'aeiou'`.

Otras preguntas útiles sobre un carácter: `c.isalpha()` (¿es letra?), `c.isdigit()` (¿es dígito?), `c == ' '` (¿es espacio?).

## Armar un texto nuevo

Como no se puede modificar un texto, se arma uno nuevo **pegando** pedazos con `+`, empezando desde el texto vacío `''`. Para darle vuelta, cada letra se pega **delante**:

```python
texto = 'hola'
reves = ''
for c in texto:
    reves = c + reves
print(reves)   # aloh
```

| Vuelta | `c` | `reves` |
| --- | --- | --- |
| 1 | h | h |
| 2 | o | oh |
| 3 | l | loh |
| 4 | a | aloh |

Si la pegas **detrás** (`reves = reves + c`) solo copias el texto. Es el mismo truco del binario en M3.

## Rebanadas

`texto[a:b]` da el pedazo desde la posición `a` **hasta antes** de `b`. Si omites `a` empieza desde el inicio; si omites `b`, llega al final.

```python
t = 'programar'
print(t[0:3])   # pro
print(t[3:])    # gramar
print(t[:-1])   # programa: todo menos el último
print(t[::-1])  # ramargorp: con paso -1 se lee al revés
```

`[::-1]` es el atajo de Python para invertir. Es bueno conocerlo, pero en los laboratorios te pueden pedir hacerlo **a mano** con un ciclo, así que practica las dos formas.

## Separar en palabras

`texto.split()` corta el texto en los espacios y da las palabras. `' '.join(palabras)` hace lo contrario.

```python
nombre = 'paolo andres santos'
for p in nombre.split():
    print(p[0].upper())
```

Imprime `P`, `A` y `S`: la primera letra de cada palabra, en mayúscula. `texto.replace(' ', '')` quita todos los espacios, y `texto.strip()` solo los de las orillas.

## Antes de seguir

- Índices de 0 a `len - 1`; los negativos cuentan desde el final.
- `for c in texto` para letras, `for i in range(len(texto))` cuando necesitas la posición.
- Los textos no se modifican: se arma uno nuevo con `+`.
- `lower`, `upper`, `split`, `replace` y `in` resuelven la mitad de los ejercicios de texto.
