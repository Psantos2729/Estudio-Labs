# Qué es una pila

Piensa en una pila de platos: el plato nuevo se pone **encima** y, cuando necesitas uno, tomas el de **encima**. Nunca sacas el de abajo sin quitar antes los de arriba.

Una **pila** (en inglés **stack**) guarda datos con esa misma regla: **el último que entra es el primero que sale**. En los libros la verás como **LIFO** (*Last In, First Out*).

## Las cuatro operaciones

| Operación | Qué hace | Ejemplo con la pila `[3, 8]` (8 arriba) |
| --- | --- | --- |
| `push(x)` | pone `x` encima | `push(5)` → `[3, 8, 5]` |
| `pop()` | quita el de encima y lo devuelve | devuelve `8` → `[3]` |
| `top()` | mira el de encima **sin quitarlo** | devuelve `8`, la pila no cambia |
| `empty()` | dice si está vacía | `False` |

Solo se toca **la cima** (el de arriba). No hay "dame el tercero": si lo quieres, hay que sacar los de encima. Esa restricción es justamente lo que la hace útil.

## Míralo paso a paso

Cada casilla es un dato; la de la **derecha** es la cima. Morado: el dato que entra; amarillo: el que se mira con `top`; gris: el que sale.

```pasos
 |  | Pila vacía. empty() → True.
4 | k0 | push(4): el 4 queda en la cima.
4 7 | k1 | push(7): el 7 queda encima del 4.
4 7 2 | k2 | push(2): ahora la cima es el 2.
4 7 2 | c2 | top() → 2. Solo mira, no quita nada.
4 7 2 | x2 | pop() → 2. El último que entró es el primero que sale.
4 7 | k1 | La cima vuelve a ser el 7.
4 7 9 | k2 | push(9).
4 7 9 | x2 | pop() → 9.
4 7 | x1 | pop() → 7.
4 | x0 | pop() → 4.
 |  | Pila vacía otra vez. Un pop() más sería un error: underflow.
```

## Los dos errores de una pila

- **Underflow** (desbordamiento por abajo): hacer `pop()` o `top()` con la pila **vacía**. No hay nada que sacar.
- **Overflow** (desbordamiento por arriba): hacer `push()` cuando la pila **ya está llena**. Pasa porque en el curso la pila se guarda en un **vector de tamaño fijo** (como en M5): si el vector tiene 10 casillas, caben 10 datos.

Un buen programa **revisa** antes de hacer la operación y avisa con un mensaje, en vez de romperse.

## ¿Dónde se usan las pilas?

- **Deshacer** (Ctrl+Z): cada cambio se guarda en una pila; deshacer saca el último.
- El botón **atrás** del navegador.
- Revisar que los **paréntesis** de una expresión estén bien cerrados.
- Convertir y evaluar **expresiones** como `3 + 4 * 2` (todo el módulo 11).
- Salir de un **laberinto** probando caminos y regresando cuando no hay salida.
- Python mismo usa una pila para saber a qué función regresar cuando una termina.

## Lo que vas a hacer en este módulo

1. Aprender qué es una **clase**, porque la pila del curso es una clase (`libstack.py`).
2. Programar la pila con un vector fijo y un **puntero**, con overflow y underflow.
3. Usarla para invertir, cambiar de base y reemplazar datos (ejercicio 32 del PDF).
4. Revisar símbolos balanceados `()`, `[]`, `{}` y `<>`.
5. Salir de un laberinto.
