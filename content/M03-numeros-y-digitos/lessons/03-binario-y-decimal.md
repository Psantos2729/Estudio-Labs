# Binario y decimal

Las computadoras guardan todo con dos símbolos: 0 y 1. Un número escrito así está en **base 2** o **binario**. El ejercicio 17 del PDF pide pasar de binario a decimal y al revés.

## Qué significa cada posición

En decimal, cada posición vale 10 veces la de su derecha: unidades, decenas, centenas… En binario cada posición vale **el doble**:

| Posición (desde la derecha) | 4 | 3 | 2 | 1 | 0 |
| --- | --- | --- | --- | --- | --- |
| Valor | 16 | 8 | 4 | 2 | 1 |
| Dígito de `10110` | 1 | 0 | 1 | 1 | 0 |

Entonces `10110` en binario es 16 + 4 + 2 = **22** en decimal. Solo suman las posiciones que tienen 1.

## De decimal a binario: dividir entre 2

Es el mismo ciclo de la lección 1, pero dividiendo entre **2** en lugar de 10. Los residuos son los dígitos binarios, de derecha a izquierda:

| `n` | `n % 2` | `n // 2` |
| --- | --- | --- |
| 22 | 0 | 11 |
| 11 | 1 | 5 |
| 5 | 1 | 2 |
| 2 | 0 | 1 |
| 1 | 1 | 0 |

Leídos de abajo hacia arriba, los residuos dan `10110`. Como salen al revés, hay que ir pegando cada residuo **a la izquierda** de lo que ya llevas. Lo más fácil es armar un texto:

```python
n = 22
bits = ""
while n > 0:
    bits = str(n % 2) + bits   # el nuevo va adelante
    n = n // 2
print(bits)   # 10110
```

`str(n % 2) + bits` pone el residuo nuevo **delante**. Si escribieras `bits + str(n % 2)` te quedaría `01101`, al revés.

Otra vez cuidado con el **0**: el ciclo no entra y `bits` queda vacío. El binario de 0 es `0`, así que trátalo aparte.

## De binario a decimal: dos formas

Leer el binario como texto te deja recorrer sus caracteres con `for`:

```python
bits = "10110"
valor = 0
for c in bits:
    valor = valor * 2 + int(c)
print(valor)   # 22
```

Es el mismo truco de "darle la vuelta" de la lección 1, pero en base 2: cada dígito nuevo multiplica por 2 lo acumulado y se suma. `valor` va valiendo 1, 2, 5, 11 y 22.

La otra forma usa las potencias directamente, recorriendo el número desde la derecha con `% 10` y `// 10` (si lo leíste como entero) y sumando `digito * 2 ** posicion`. Las dos son correctas; la primera es más corta.

## Validar la entrada

Un número binario solo tiene 0 y 1. Con `for c in bits:` puedes revisar cada carácter y usar una **bandera** (M2) para recordar si apareció algo distinto:

```python
bits = "10120"
valido = True
for c in bits:
    if c != "0" and c != "1":
        valido = False
print(valido)   # False
```

## Lo que Python ya trae

Python sabe hacer estas conversiones solo: `bin(22)` da `'0b10110'` y `int("10110", 2)` da `22`. En el laboratorio te van a pedir el **algoritmo**, así que en los ejercicios escríbelo tú. Puedes usar estas funciones para **comprobar** tus resultados.

## Reto: otras bases

Nada de esto es exclusivo del 2. Dividir entre 8 da **octal** y entre 16 da **hexadecimal**. En hexadecimal hay 16 dígitos, así que después del 9 se usan letras: A = 10, B = 11, … F = 15. Para convertir un residuo en su símbolo sirve un texto con todos los dígitos:

```python
DIGITOS = "0123456789ABCDEF"
print(DIGITOS[11])   # B
```

`DIGITOS[11]` toma el carácter en la posición 11 del texto (contando desde 0). Así 255 en hexadecimal es `FF` y en octal es `377`.

## Antes de seguir

- En binario cada posición vale el doble de la anterior: 1, 2, 4, 8, 16…
- Decimal → binario: `% 2` da el dígito, `// 2` avanza, y el dígito nuevo va **a la izquierda**.
- Binario → decimal: `valor = valor * 2 + digito`, de izquierda a derecha.
- El 0 no entra al ciclo: su binario es `0`.
