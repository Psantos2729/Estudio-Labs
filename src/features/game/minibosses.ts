import type { SpriteName } from '@/ui/sprites';

/** Mini jefe del examen de cada módulo (M00 = 0) y lo que enseña. */
export const MINI_BOSSES: { sprite: SpriteName; name: string; meaning: string }[] = [
  { sprite: 'piedra', name: 'Piedra Eco', meaning: 'Repite exactamente lo que le dices, ni más ni menos. Así es la computadora: hace lo que escribiste, no lo que quisiste decir.' },
  { sprite: 'esfinge', name: 'Esfinge del Cruce', meaning: 'Te hace una pregunta de sí o no y, según tu respuesta, abre un camino u otro. Es un if/else.' },
  { sprite: 'uroboros', name: 'Uróboros', meaning: 'La serpiente que se muerde la cola. Si tu ciclo nunca cambia su condición, da vueltas para siempre.' },
  { sprite: 'termita', name: 'Termita del Residuo', meaning: 'Desarma los números mordida a mordida: cada % 10 se lleva un dígito y // 10 deja el resto.' },
  { sprite: 'ermitano', name: 'Cangrejo Ermitaño', meaning: 'Cambia de concha pero sigue siendo el mismo cangrejo. Así es una función: la misma receta con parámetros distintos.' },
  { sprite: 'cardumen', name: 'Cardumen Indexado', meaning: 'Los peces nadan en una fila fija que empieza en 0. Si pides un pez que no existe, te muerde (fuera de rango).' },
  { sprite: 'burbuja', name: 'Pez Burbuja', meaning: 'Las burbujas grandes suben una por una hasta el final, como en el ordenamiento burbuja.' },
  { sprite: 'muralla', name: 'Muralla Viviente', meaning: 'Hecha de ladrillos en filas y columnas. Solo la vences recorriéndola fila por fila con dos ciclos anidados.' },
  { sprite: 'libro', name: 'Libro Mordelón', meaning: 'Si lo abres y no lo cierras, te muerde. Por eso existe with open(...).' },
  { sprite: 'mimico', name: 'Mímico del Cofre', meaning: 'Parece un cofre normal, pero adentro solo hay bytes. Solo lo lees si sabes el formato exacto de cada registro.' },
  { sprite: 'nubarron', name: 'Nubarrón Apilado', meaning: 'Una torre de nubes de la que solo puedes tomar la de arriba: lo último que entra es lo primero que sale.' },
  { sprite: 'cuervo', name: 'Cuervo Postfijo', meaning: 'Repite las cuentas al revés: primero los números y después el signo (3 4 +).' },
  { sprite: 'panda', name: 'Panda de Trueno', meaning: 'Se come tablas enteras de datos de un bocado, como pandas con un DataFrame.' },
];
