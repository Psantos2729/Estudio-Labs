# Expresiones regulares (2): separar, validar y reemplazar

## re.split: separadores raros (PDF #26)

En el ejercicio 26 los números del archivo están separados por `*`, pero puede haber espacios y tabuladores alrededor: `8	*525* 15* 20`. Con `split('*')` quedan pedazos con espacios. `re.split` corta donde haya **cualquier** cosa que cumpla el patrón:

```python
import re

linea = '8\t*525* 15* 20'
print(linea.split('*'))
print(re.split(r'\s*\*\s*', linea.strip()))
```

`\s*\*\s*` se lee: "espacios opcionales, un asterisco (escapado), espacios opcionales". Si los separadores pueden ser varios a la vez (`;`, `,` o `*`), usa una clase: `re.split(r'\s*[;,*]\s*', linea)`.

Ojo: si la línea empieza o termina con un separador, `re.split` deja un `''` en los extremos. Filtra los vacíos o usa `re.findall(r'\d+', linea)`, que en este caso hace lo mismo sin ese problema.

## Validar un dato completo: re.fullmatch

`findall` busca **pedazos**. Para preguntar si **todo** el texto tiene una forma, se usa `re.fullmatch`: devuelve algo si el texto completo cumple el patrón, o `None` si no.

```python
import re

def telefono_valido(t):
    return re.fullmatch(r'\d{4}-?\d{4}', t) is not None

for t in ['5555-1234', '55551234', '555-1234', '5555-12345', '5555 1234']:
    print(t, telefono_valido(t))
```

`-?` es "un guion opcional". Sin `fullmatch`, `re.search(r'\d{4}-?\d{4}', '5555-12345')` encontraría `5555-1234` adentro y diría que sí: por eso, para validar, siempre `fullmatch`.

## Patrones de validación típicos

```python
import re

patrones = {
    'carné (8 dígitos)': r'\d{8}',
    'correo': r'[\w.]+@[a-zA-Z]+\.[a-zA-Z]{2,4}',
    'placa (P + 3 dígitos + 3 letras)': r'P\d{3}[A-Z]{3}',
    'fecha dd/mm/aaaa': r'\d{2}/\d{2}/\d{4}',
    'nombre con mayúscula inicial': r'[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+',
}
pruebas = ['20261234', 'ana.lopez@correo.com', 'P123ABC', '25/11/2026', 'María', 'p123abc', 'ana@correo']
for nombre, p in patrones.items():
    buenos = [t for t in pruebas if re.fullmatch(p, t)]
    print(f'{nombre}: {buenos}')
```

Para el correo: `[\w.]+` es "letras, dígitos, `_` o puntos, uno o más", luego `@`, el dominio, un punto **escapado** y de 2 a 4 letras.

## Grupos: sacar partes

Los paréntesis forman un **grupo**: con `findall`, si el patrón tiene grupos, devuelve solo lo que está dentro (una tupla si hay varios).

```python
import re

texto = 'Nacimientos: 03/05/2007, 21/11/2008 y 9/1/2010'
print(re.findall(r'(\d{2})/(\d{2})/(\d{4})', texto))
for d, m, a in re.findall(r'(\d{1,2})/(\d{1,2})/(\d{4})', texto):
    print(f'año {a}, mes {int(m)}, día {int(d)}')
```

## re.sub: reemplazar

`re.sub(patrón, reemplazo, texto)` cambia cada coincidencia. Sirve para limpiar o censurar:

```python
import re

t = 'Llamar al  5555-1234   o al 4444-9876.'
print(re.sub(r'\s+', ' ', t))                 # un solo espacio
print(re.sub(r'\d{4}-\d{4}', '####-####', t))
print(re.sub(r'\bal\b', 'AL', t))
```

## El jefe: decimales a romanos (PDF #26)

Junta todo el módulo: leer cada línea, separar con regex, cargar una matriz (M7), convertir con una función (como en M4) y escribir otro archivo. La función de conversión usa una tabla de valores de mayor a menor, restando mientras quepa:

```python
VALORES = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
LETRAS = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

def a_romano(n):
    r = ''
    for k in range(len(VALORES)):
        while n >= VALORES[k]:
            r = r + LETRAS[k]
            n = n - VALORES[k]
    return r

print(a_romano(1995), a_romano(49), a_romano(8))   # MCMXCV XLIX VIII
```

Y los dos contadores del ejercicio son conteos de las lecciones anteriores: **líneas** (una por vuelta) y **dígitos** del archivo de entrada (`len(re.findall(r'\d', linea))`).

## Resumen del módulo

- `with open(nombre, modo, encoding='utf-8')`: `'r'`, `'w'` (borra), `'a'` (agrega).
- Leer: `read()`, `for linea in f`, `readlines()`; quita el `\n` con `rstrip('\n')`.
- Conteos: recorre cada carácter; contadores de línea adentro, totales afuera.
- Regex: `findall` para encontrar y contar, `split` para separar, `fullmatch` para validar, `sub` para reemplazar. Siempre `r'...'`.
