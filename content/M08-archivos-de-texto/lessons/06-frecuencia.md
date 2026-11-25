# Frecuencia de letras (PDF #22)

El ejercicio 22 es un clásico de examen: contar cuántas veces aparece **cada letra** de un archivo y mostrarlo de la A a la Z, con estas reglas:

1. Mayúsculas y minúsculas cuentan igual.
2. `á`, `Á`, `a`, `A` son la misma letra (igual las demás vocales, y la `ü` es `u`).
3. `ñ` y `Ñ` son una letra aparte, que va **después de la N**.
4. Las letras con frecuencia 0 no se muestran.
5. El resultado también se escribe en un archivo de salida.

## El alfabeto como texto

La forma más simple: un texto con las 27 letras en orden, y un vector de 27 contadores. La posición de la letra en ese texto es su contador.

```python
ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
print(len(ALFABETO), ALFABETO.index('Ñ'), ALFABETO.index('O'))   # 27 14 15
```

## Normalizar cada letra

Antes de contar, cada letra se lleva a su forma "base": mayúscula y sin tilde. Para las tildes, un texto con las letras con tilde y otro con su base, en el mismo orden:

```python
CON = 'ÁÉÍÓÚÜ'
SIN = 'AEIOUU'

def base(c):
    c = c.upper()
    if c in CON:
        c = SIN[CON.index(c)]
    return c

for c in 'aÁéñÑü':
    print(base(c), end=' ')
print()
```

Fíjate que `'ñ'.upper()` es `'Ñ'` y la Ñ **no** está en `CON`: se queda como Ñ, que es lo que pide el ejercicio.

## Contar y mostrar

```python
ALFABETO = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
CON = 'ÁÉÍÓÚÜ'
SIN = 'AEIOUU'

with open('entrada.txt', 'w', encoding='utf-8') as f:
    f.write('¡Ñandú, árbol!\nAna y el niño.\n')

cuenta = [0] * len(ALFABETO)
with open('entrada.txt', 'r', encoding='utf-8') as f:
    for c in f.read():
        c = c.upper()
        if c in CON:
            c = SIN[CON.index(c)]
        if c in ALFABETO:
            k = ALFABETO.index(c)
            cuenta[k] = cuenta[k] + 1

with open('salida.txt', 'w', encoding='utf-8') as f:
    for k in range(len(ALFABETO)):
        if cuenta[k] > 0:
            print(f'{ALFABETO[k]}: {cuenta[k]}')
            f.write(f'{ALFABETO[k]}: {cuenta[k]}\n')
```

`if c in ALFABETO` deja fuera espacios, signos, dígitos y `\n` sin tener que nombrarlos. Y como el vector se recorre en el orden del alfabeto, la salida ya sale ordenada: no hace falta ordenar nada.

## Variantes que salen en examen

- **La letra más frecuente:** busca el mayor del vector `cuenta` (M5) y muestra `ALFABETO[k]`.
- **Solo vocales o solo consonantes:** filtra con `ALFABETO[k] in 'AEIOU'`.
- **Porcentaje:** `cuenta[k] * 100 / total`, con `total` = suma del vector, redondeado como diga el enunciado.
- **Por línea:** reinicia el vector (`[0] * 27`) al empezar cada línea.
