# Tablas de conversión: romanos y números a letras

Algunos problemas no se resuelven con una fórmula sino con una **tabla**: una lista de valores y lo que le corresponde a cada uno. Los ejercicios 18 y 20 del PDF (número a letras y números romanos) son de este tipo, y los dos combinan lo que ya sabes: la cascada de `//` y `%` de M3, cadenas y funciones.

## Números romanos

Los símbolos romanos son I = 1, V = 5, X = 10, L = 50, C = 100, D = 500 y M = 1000. Se escriben de mayor a menor y se suman: XVI = 10 + 5 + 1 = 16. La excepción: un símbolo menor **a la izquierda** de uno mayor se resta: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.

El truco es meter esas seis restas **en la tabla**, como si fueran símbolos propios. Así ya no hay excepciones: siempre se toma el valor más grande que quepa, igual que con los billetes de M3.

```python
VALORES = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
SIMBOLOS = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

def a_romano(n):
    r = ''
    for i in range(len(VALORES)):
        while n >= VALORES[i]:
            r = r + SIMBOLOS[i]
            n = n - VALORES[i]
    return r

print(a_romano(1994))   # MCMXCIV
print(a_romano(2026))   # MMXXVI
```

Son **dos listas paralelas**: la posición `i` de una corresponde a la posición `i` de la otra. Sigue 1994:

| Valor que cabe | Se pega | Queda |
| --- | --- | --- |
| 1000 | M | 994 |
| 900 | CM | 94 |
| 90 | XC | 4 |
| 4 | IV | 0 |

¿Por qué `while` y no `if`? Porque un mismo símbolo puede repetirse: 3000 es MMM. El `while` pega M mientras quepa. Las reglas del PDF (no más de tres símbolos iguales seguidos, V, L y D nunca restan) se cumplen solas gracias al orden de la tabla. Los romanos solo llegan a 3999 (MMMCMXCIX).

### Reto: de romano a decimal

Al revés se recorre el texto de izquierda a derecha: si un símbolo vale **menos** que el que le sigue, se resta; si no, se suma. En MCMXCIV, la C (100) va antes de M (1000), así que se resta.

## Números a letras

El ejercicio 18 pide escribir en español cualquier número de 1 a 99,999. Parece enorme, pero se arma en capas, cada una con su función.

**Capa 1: de 0 a 29.** Aquí el español es irregular (once, quince, dieciséis, veintidós), así que va en una tabla directa donde la posición es el número:

```python
HASTA_29 = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
            'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete',
            'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidós', 'veintitrés',
            'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve']
print(HASTA_29[16])   # dieciséis
```

**Capa 2: de 30 a 99.** Aquí sí hay patrón: decena + " y " + unidad, menos en las decenas exactas.

```python
DECENAS = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']

def decenas(n):   # n de 30 a 99
    d, u = n // 10, n % 10
    if u == 0:
        return DECENAS[d]
    return DECENAS[d] + ' y ' + ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'][u]

print(decenas(47))   # cuarenta y siete
print(decenas(80))   # ochenta
```

**Capa 3: centenas.** La centena sale con `n // 100` y el resto con `n % 100`, que se resuelve con las capas anteriores. Los casos especiales que avisa el PDF van en su propia tabla: *quinientos*, *setecientos* y *novecientos* no siguen el patrón de *doscientos* o *trescientos*.

```text
CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos',
            'seiscientos', 'setecientos', 'ochocientos', 'novecientos']
```

Y uno más: 100 exacto es **cien**, pero 101 a 199 es **ciento** (ciento uno, ciento cuarenta).

**Capa 4: miles.** Un número hasta 99,999 se parte en miles y resto: 47,315 son 47 miles y 315. Se escribe "cuarenta y siete" + " mil " + "trescientos quince". Tres detalles:

- 1000 es **mil**, no "uno mil".
- Delante de *mil*, el *uno* se acorta: 21,000 es **veintiún mil**, 31,000 es **treinta y un mil**.
- Si el resto es 0, no se agrega nada: 5000 es *cinco mil*, no *cinco mil cero*.

## Cómo pensar un problema por capas

Fíjate en el método, que sirve para mucho más que números:

1. Busca la parte **irregular** y métela en una tabla (aquí, de 0 a 29).
2. Busca el **patrón** que se repite y escríbelo una vez en una función (decenas, centenas).
3. Arma lo grande **llamando** a lo pequeño: los miles usan la misma función que los números de 1 a 999.
4. Prueba los bordes de cada capa: 1, 15, 16, 20, 21, 29, 30, 99, 100, 101, 500, 999, 1000, 1001, 21000, 99999.

## Antes de seguir

- Dos listas paralelas (valores y nombres) convierten una regla con excepciones en una tabla sin excepciones.
- Recorre la tabla de mayor a menor y toma lo que quepa: es la cascada de los billetes.
- Lo irregular va en una tabla; lo regular, en una función.
- Un problema grande se arma por capas, cada una apoyada en la anterior.
