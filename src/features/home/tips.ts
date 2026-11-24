// Consejos generales; la portada muestra tres distintos cada día.
export const TIPS = [
  'Predice antes de correr: si tu predicción falla, ahí está lo que todavía no entiendes.',
  'Lee el error de abajo hacia arriba: la última línea dice qué pasó y la de arriba, en qué línea.',
  'Prueba los bordes: 0, negativos, el número justo del límite (3 camisas, 40 horas, 8.5).',
  'Escribe el análisis antes del código. Un buen análisis hace que el código salga casi solo.',
  'Si te atoras más de 15 minutos, pide una pista. Usar pistas en práctica no es trampa; en el examen no habrá.',
  'Repasa un poco cada día: 20 minutos diarios rinden más que 3 horas un domingo.',
  'Cuando algo funcione, explícatelo en voz alta. Si no puedes explicarlo, todavía no lo dominas.',
  'Cambia un ejemplo de la lección y predice qué pasará. Romper cosas a propósito enseña mucho.',
  'Nombra bien tus variables: precio_total se entiende solo; x no.',
  'Antes de entregar un laboratorio, corre tu programa con los ejemplos del enunciado, letra por letra.',
];

export function tipsOfTheDay(date: Date, count = 3): string[] {
  const day = Math.floor(date.getTime() / 86_400_000);
  return Array.from({ length: count }, (_, i) => TIPS[(day * count + i) % TIPS.length]);
}
