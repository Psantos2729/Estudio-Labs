# Expresiones regulares (1): patrones

Una **expresión regular** (regex) es un patrón que describe "qué forma tiene" un texto: "uno o más dígitos", "una palabra que empieza con mayúscula", "4 dígitos, un guion y 4 dígitos". Con un patrón, una sola línea hace lo que antes era un ciclo armando palabras o números.

Es un tema que cuesta, así que esta lección va despacio: cada símbolo con su ejemplo. Corre todo y cambia los patrones.

## re.findall: todas las coincidencias

```python
import re

texto = 'Compré 3 libros a 125 y 240 quetzales'
print(re.findall(r'\d+', texto))   # ['3', '125', '240']
```

`re.findall(patrón, texto)` devuelve una **lista** con cada pedazo del texto que cumple el patrón, de izquierda a derecha. Para **contar**, basta `len(...)`. Para sumar, conviertes cada uno con `int`.

La `r` antes de las comillas (`r'\d+'`) es un **texto crudo**: le dice a Python que no interprete la `\`. Úsala siempre en los patrones.

## Los símbolos básicos

| Símbolo | Significa | Ejemplo | Encuentra en `'Año 2026, sí!'` |
| --- | --- | --- | --- |
| `\d` | un dígito | `\d` | `2`, `0`, `2`, `6` |
| `\w` | una letra, dígito o `_` (incluye tildes y ñ) | `\w` | `A`, `ñ`, `o`, `2`… |
| `\s` | un espacio, tabulador o `\n` | `\s` | los dos espacios |
| `.` | cualquier carácter (menos `\n`) | `.` | todos |
| `[abc]` | uno de esos | `[aeiou]` | `o`, `í` no (tiene tilde) |
| `[a-z]` | uno del rango | `[0-5]` | `2`, `0`, `2` |
| `[^abc]` | uno que **no** sea de esos | `[^\w\s]` | `,`, `!` |

```python
import re

t = 'Año 2026, sí!'
print(re.findall(r'\d', t))
print(re.findall(r'\s', t))
print(re.findall(r'[^\w\s]', t))      # signos
print(re.findall(r'[aeiouáéíóú]', t))
```

## Cuántas veces: cuantificadores

Se escriben **después** de lo que repiten:

| Cuantificador | Significa | Ejemplo | Encuentra |
| --- | --- | --- | --- |
| `+` | 1 o más | `\d+` | números completos: `2026` |
| `*` | 0 o más | `ab*` | `a`, `ab`, `abbb` |
| `?` | 0 o 1 (opcional) | `colou?r` | `color` y `colour` |
| `{n}` | exactamente n | `\d{4}` | 4 dígitos seguidos |
| `{n,m}` | de n a m | `\d{2,3}` | 2 o 3 dígitos |

```python
import re

t = 'Los años 7, 42, 365 y 2026'
print(re.findall(r'\d', t))       # cada dígito por separado
print(re.findall(r'\d+', t))      # cada número
print(re.findall(r'\d{3}', t))    # pedazos de 3 dígitos: ¡'202' también!
print(re.findall(r'\b\d{3}\b', t))  # números de exactamente 3 dígitos
```

El tercero sorprende: `\d{3}` encuentra `365` y también `202` dentro de `2026`. Para pedir "un número de 3 dígitos completo" se usa `\b`, el **borde de palabra**: el punto entre algo que es `\w` y algo que no lo es.

## Palabras

Una palabra es "una o más letras". `\w+` sirve, pero también toma dígitos. Para solo letras (con tildes y ñ) usa una clase:

```python
import re

t = 'El niño tiene 3 años; Ana, 25.'
print(re.findall(r'\w+', t))
print(re.findall(r'[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+', t))
print(len(re.findall(r'[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+', t)), 'palabras')
```

## Contar con regex

Todos los conteos de la lección 4 salen en una línea cada uno. `re.IGNORECASE` (o `re.I`) hace que mayúsculas y minúsculas sean iguales:

```python
import re

linea = 'Árbol de 3 ramas, 12 hojas y 1 nido!'
vocales = len(re.findall(r'[aeiouáéíóúü]', linea, re.I))
consonantes = len(re.findall(r'[b-df-hj-np-tv-zñ]', linea, re.I))
digitos = len(re.findall(r'\d', linea))
numeros = len(re.findall(r'\d+', linea))
espacios = len(re.findall(r' ', linea))
signos = len(re.findall(r'[^\w\s]', linea))
print(vocales, consonantes, digitos, numeros, espacios, signos)
```

Lee la clase de consonantes con calma: `b-d` (b, c, d), `f-h`, `j-n`, `p-t`, `v-z` y `ñ`. Son todas las letras menos las vocales.

## Errores comunes

1. **Olvidar la `r`:** `'\b'` sin `r` es un carácter especial de Python (retroceso), no el borde de palabra.
2. **`\d` en vez de `\d+`:** cuenta dígitos, no números.
3. **El punto sin escapar:** `.` es "cualquier carácter". Para un punto de verdad: `\.`. Igual `\*`, `\+`, `\?`, `\(`.
4. **Las tildes:** `[a-z]` no incluye `á` ni `ñ`. Agrégalas a la clase.
