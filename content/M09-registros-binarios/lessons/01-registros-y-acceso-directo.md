# Registros y acceso directo

En M8 los archivos eran **secuenciales**: para llegar a la línea 500 había que leer las 499 anteriores, porque cada línea mide distinto. En una agenda o una planilla eso es lento: si quieres el empleado número 500, quieres ir **directo** a él.

La idea de este módulo es simple: si todos los datos guardados miden **exactamente lo mismo**, se puede calcular dónde empieza cada uno.

## Registro y campo

Un **registro** es el grupo de datos de una cosa: un contacto, un empleado, un producto. Cada dato es un **campo**:

| Campo | Ejemplo | Tipo |
| --- | --- | --- |
| código | 1024 | entero |
| nombre | Lápiz | texto |
| precio | 2.50 | decimal |

En un archivo de texto escribirías `1024;Lápiz;2.50`, y el siguiente producto podría ocupar más o menos caracteres. En un archivo de registros cada campo tiene un **tamaño fijo** en bytes: el código siempre 4, el nombre siempre 20 (aunque `Lápiz` use menos), el precio siempre 8. Así **cada registro mide 32 bytes**, sea cual sea el producto.

## La cuenta del acceso directo

Si cada registro mide `TAM` bytes y los numeramos desde 1, el registro número `n` empieza en el byte:

```text
posición = (n - 1) * TAM
```

Con `TAM = 32`: el registro 1 empieza en el byte 0, el 2 en el 32, el 3 en el 64, el 10 en el 288. Sin leer nada antes. Es la misma idea que los vectores: `v[i]` no recorre el vector, va directo a la casilla.

```pasos
R1 R2 R3 R4 R5 |  | Un archivo con 5 registros de 32 bytes: 160 bytes en total.
R1 R2 R3 R4 R5 | k2 | ¿Dónde está el registro 3? (3 - 1) × 32 = byte 64.
R1 R2 R3 R4 R5 | x0 x1 k2 | Se salta directo al byte 64: R1 y R2 ni se leen.
R1 R2 R3 R4 R5 | k4 | ¿Y el registro 5? (5 - 1) × 32 = byte 128.
R1 R2 R3 R4 R5 |  | ¿Cuántos registros hay? tamaño del archivo ÷ TAM = 160 ÷ 32 = 5.
```

Y al revés: **cuántos registros hay** sale de dividir el tamaño del archivo entre `TAM`. Por eso el número de contacto puede ser el número de registro (como pide el ejercicio 27 del PDF): el contacto 7 está en la posición 7 del archivo.

## ¿Por qué "binario"?

Para que cada campo mida siempre lo mismo, no se guarda como texto (`'1024'` son 4 caracteres pero `'7'` es 1). Se guarda como **bytes**: el entero en 4 bytes siempre, el decimal en 8 siempre. Un archivo así no se lee bien con el Bloc de notas, por eso se llama **binario**. En Python se abre con una `b` en el modo (`'wb'`, `'rb'`) y se arma con el módulo `struct`, que es la siguiente lección.

## Lo que vas a hacer en este módulo

1. Convertir un registro a bytes y de vuelta (`struct.pack` y `struct.unpack`).
2. Escribir registros al final del archivo (ingreso).
3. Leerlos todos en orden (consulta general).
4. Saltar directo a uno con `seek` (consulta individual).
5. Sobrescribir uno sin tocar los demás (modificación).

Son las "rutinas básicas" de los ejercicios 27, 28 y 29 del PDF.
