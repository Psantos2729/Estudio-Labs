# Escribir archivos

## write

`f.write(texto)` escribe exactamente el texto que le das: **no** agrega el salto de línea. Si quieres una línea por dato, el `\n` lo pones tú.

```python
with open('numeros.txt', 'w', encoding='utf-8') as f:
    for i in range(1, 4):
        f.write(f'{i}\n')
```

Sin el `\n` quedaría `123` en una sola línea. `write` solo acepta texto: para escribir un número, conviértelo con `str()` o usa un f-string.

## print con file=

`print` también puede escribir en un archivo; igual que en pantalla, agrega el `\n` y separa con espacios:

```python
with open('tabla.txt', 'w', encoding='utf-8') as f:
    for i in range(1, 4):
        print(i, i * i, file=f)
```

## Grabar lo que escribe el usuario (PDF #21)

El ejercicio 21 del PDF: leer frases hasta que el usuario escriba `Fin`, guardarlas en `frases.txt` y **no** guardar la palabra `Fin`. Es un ciclo con centinela, como en M2:

```text
with open('frases.txt', 'w', encoding='utf-8') as f:
    frase = input()
    while frase != 'Fin':
        f.write(frase + '\n')
        frase = input()
```

El orden importa: se lee, se compara y **después** se escribe. Si escribieras antes de comparar, `Fin` quedaría en el archivo.

## Agregar sin borrar: modo 'a'

Con `'w'` el archivo empieza vacío cada vez. Con `'a'` lo nuevo va al final:

```python
with open('bitacora.txt', 'w', encoding='utf-8') as f:
    f.write('lunes\n')
with open('bitacora.txt', 'a', encoding='utf-8') as f:
    f.write('martes\n')
with open('bitacora.txt', 'r', encoding='utf-8') as f:
    print(f.read())
```

Cambia el `'a'` por `'w'` y vuelve a correr: el lunes desaparece.

## Comprobar lo que escribiste

Lo que tu programa escribe en un archivo no sale en pantalla. Por eso en los ejercicios de este módulo, después de escribir, se pide **volver a abrir** el archivo y mostrarlo: así compruebas (y la guía califica) que quedó bien. Es también lo que hace el botón "Revisión" del ejercicio 23 del PDF.

```python
with open('salida.txt', 'w', encoding='utf-8') as f:
    f.write('A: 3\nB: 1\n')

print('--- salida.txt ---')
with open('salida.txt', 'r', encoding='utf-8') as f:
    print(f.read(), end='')
```

El `end=''` evita una línea en blanco extra, porque el archivo ya termina en `\n`.
