# Conteos carácter por carácter

Los **conteos** son la parte más importante de los exámenes de archivos: vocales, consonantes, dígitos, mayúsculas, espacios, por línea y en total. Todos se hacen igual: recorrer cada carácter y preguntar **a qué grupo pertenece**.

## Las preguntas que puedes hacerle a un carácter

| Pregunta | Da True para | Ojo |
| --- | --- | --- |
| `c.isalpha()` | letras, con tilde y ñ | no cuenta dígitos ni signos |
| `c.isdigit()` | `0` a `9` | |
| `c.isupper()` / `c.islower()` | mayúsculas / minúsculas | `'ñ'.islower()` es True; `'3'.isupper()` es False |
| `c == ' '` | el espacio | `c.isspace()` también cuenta `\n` y tabulador |
| `c in 'aeiou'` | lo que esté en el texto | aquí **tú** decides qué cuenta |

Para las vocales, la clave es decidir qué incluyes. Con `c.lower() in 'aeiouáéíóúü'` cuentas mayúsculas, minúsculas y con tilde de una vez. Las **consonantes** son las letras que no son vocales: `c.isalpha()` y no vocal. Así la ñ cuenta como consonante sin escribirla aparte.

## Clasificar cada carácter

Sigue el recorrido. Amarillo: el carácter que se revisa. Verde: los ya contados.

```pasos
A ñ o ␣ 2 , ␣ m í ! |  | Recorremos "Año 2, mí!" carácter por carácter (␣ es un espacio).
A ñ o ␣ 2 , ␣ m í ! | c0 | 'A' está en las vocales (con tilde también). (vocales 1, consonantes 0, dígitos 0, espacios 0, otros 0)
A ñ o ␣ 2 , ␣ m í ! | o0 c1 | 'ñ' es letra y no es vocal: consonante. (vocales 1, consonantes 1, dígitos 0, espacios 0, otros 0)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 c2 | 'o' está en las vocales (con tilde también). (vocales 2, consonantes 1, dígitos 0, espacios 0, otros 0)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 o2 c3 | un espacio. (vocales 2, consonantes 1, dígitos 0, espacios 1, otros 0)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 o2 o3 c4 | '2'.isdigit() es True. (vocales 2, consonantes 1, dígitos 1, espacios 1, otros 0)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 o2 o3 o4 c5 | ',' no es letra, dígito ni espacio: signo. (vocales 2, consonantes 1, dígitos 1, espacios 1, otros 1)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 o2 o3 o4 o5 c6 | un espacio. (vocales 2, consonantes 1, dígitos 1, espacios 2, otros 1)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 o2 o3 o4 o5 o6 c7 | 'm' es letra y no es vocal: consonante. (vocales 2, consonantes 2, dígitos 1, espacios 2, otros 1)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 o2 o3 o4 o5 o6 o7 c8 | 'í' está en las vocales (con tilde también). (vocales 3, consonantes 2, dígitos 1, espacios 2, otros 1)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 o2 o3 o4 o5 o6 o7 o8 c9 | '!' no es letra, dígito ni espacio: signo. (vocales 3, consonantes 2, dígitos 1, espacios 2, otros 2)
A ñ o ␣ 2 , ␣ m í ! | o0 o1 o2 o3 o4 o5 o6 o7 o8 o9 | Fin: vocales 3, consonantes 2, dígitos 1, espacios 2, otros 2.
```

El orden de los `if` importa: con `if` / `elif` cada carácter cae en **un solo** grupo. Si los grupos se pueden repetir (por ejemplo "mayúscula" y "vocal" a la vez), usa `if` separados.

```python
texto = 'Año 2, mí!'
vocales = 0
consonantes = 0
digitos = 0
espacios = 0
otros = 0
for c in texto:
    if c.lower() in 'aeiouáéíóúü':
        vocales = vocales + 1
    elif c.isalpha():
        consonantes = consonantes + 1
    elif c.isdigit():
        digitos = digitos + 1
    elif c == ' ':
        espacios = espacios + 1
    else:
        otros = otros + 1
print(vocales, consonantes, digitos, espacios, otros)
```

## Por línea y en total

En los exámenes casi siempre se pide **por cada línea** y además el **total del archivo**. El truco: contadores de la línea que se reinician al empezar cada línea, y contadores totales que no.

```python
with open('texto.txt', 'w', encoding='utf-8') as f:
    f.write('Hola Mundo\nTengo 2 gatos\n\nÁRBOL y ñandú\n')

total_v = 0
total_d = 0
n = 0
with open('texto.txt', 'r', encoding='utf-8') as f:
    for linea in f:
        linea = linea.rstrip('\n')
        n = n + 1
        v = 0
        d = 0
        for c in linea:
            if c.lower() in 'aeiouáéíóúü':
                v = v + 1
            elif c.isdigit():
                d = d + 1
        print(f'Línea {n}: vocales {v}, dígitos {d}')
        total_v = total_v + v
        total_d = total_d + d
print(f'Total: vocales {total_v}, dígitos {total_d}')
```

Error común: poner `v = 0` antes del `for linea`. Entonces la línea 2 muestra la suma de la 1 y la 2.

## Mayúsculas, minúsculas y espacios

Como en tu práctica de archivos:

```python
linea = 'El Ñandú Corre RÁPIDO.'
may = 0
mins = 0
esp = 0
for c in linea:
    if c.isupper():
        may = may + 1
    elif c.islower():
        mins = mins + 1
    elif c == ' ':
        esp = esp + 1
print(may, mins, esp)   # 9 9 3
```

## Una tabla de contadores

Cuando hay muchos grupos (por ejemplo, cuántas veces aparece cada dígito), en vez de 10 variables usa un **vector de contadores** de tamaño fijo, como el counting sort de M6:

```python
texto = 'Tel. 5521-0098, ext. 12'
cuenta = [0] * 10
for c in texto:
    if c.isdigit():
        cuenta[int(c)] = cuenta[int(c)] + 1
for d in range(10):
    if cuenta[d] > 0:
        print(f'{d}: {cuenta[d]}')
```

## Antes de seguir

- Decide qué cuenta en cada grupo y escríbelo como condición.
- `if` / `elif` si cada carácter va a un solo grupo.
- Contadores de línea dentro del `for linea`; totales fuera.
