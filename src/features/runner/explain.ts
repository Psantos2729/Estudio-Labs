/** Explicación en español de un error de Python: qué significa, en qué línea y por dónde buscar. */
export interface ErrorHelp {
  name: string; // NameError, TypeError…
  line?: number; // línea de programa.py donde ocurrió
  what: string; // qué pasó, en palabras simples
  hint: string; // por dónde buscar, sin dar la solución
}

interface Rule { name: string; msg?: RegExp; what: (m: RegExpMatchArray) => string; hint: string }

// Orden importa: la primera regla que coincide gana; las de mensaje específico van antes que la general.
const RULES: Rule[] = [
  { name: 'IndentationError', msg: /expected an indented block/, what: () => 'Después de una línea que termina en «:» (if, for, while, def…) falta el bloque con sangría.', hint: 'Mueve hacia la derecha (4 espacios) las líneas que van dentro de ese bloque.' },
  { name: 'IndentationError', msg: /unexpected indent/, what: () => 'Esta línea tiene sangría pero no está dentro de ningún bloque.', hint: 'Revisa si sobran espacios al inicio de la línea o si le falta el «:» a la línea de arriba.' },
  { name: 'IndentationError', msg: /unindent does not match/, what: () => 'La sangría de esta línea no coincide con la de ningún bloque de arriba.', hint: 'Las líneas del mismo bloque deben empezar exactamente en la misma columna. Cuenta los espacios.' },
  { name: 'IndentationError', what: () => 'La sangría (los espacios al inicio de la línea) no está bien.', hint: 'Usa 4 espacios por nivel y que las líneas de un mismo bloque empiecen a la misma altura.' },
  { name: 'TabError', what: () => 'Mezclaste tabulaciones y espacios para la sangría.', hint: 'Usa solo espacios. Borra la sangría de esas líneas y vuelve a escribirla.' },
  { name: 'SyntaxError', msg: /expected ':'/, what: () => 'Falta el «:» al final de la línea.', hint: 'if, elif, else, for, while y def siempre terminan en dos puntos.' },
  { name: 'SyntaxError', msg: /'(.)' was never closed/, what: (m) => `Abriste «${m[1]}» y nunca lo cerraste.`, hint: 'Cuenta los paréntesis o corchetes que abres y los que cierras en esa línea (o en la anterior).' },
  { name: 'SyntaxError', msg: /unmatched '(.)'/, what: (m) => `Hay un «${m[1]}» que cierra algo que nunca se abrió.`, hint: 'Cuenta los paréntesis o corchetes que abres y los que cierras.' },
  { name: 'SyntaxError', msg: /unterminated (triple-quoted )?string/, what: () => 'Un texto empieza con comillas pero no las cierra.', hint: 'Revisa que cada texto abra y cierre con el mismo tipo de comillas.' },
  { name: 'SyntaxError', msg: /Maybe you meant '==' /, what: () => 'Usaste «=» donde Python esperaba una comparación.', hint: '«=» guarda un valor en una variable; para comparar se usa «==».' },
  { name: 'SyntaxError', msg: /cannot assign to/, what: () => 'A la izquierda del «=» hay algo que no es una variable.', hint: 'El nombre de la variable va a la izquierda y el valor a la derecha. Si querías comparar, usa «==».' },
  { name: 'SyntaxError', msg: /invalid character/, what: () => 'Hay un símbolo que Python no reconoce (por ejemplo comillas “curvas” o una letra rara).', hint: 'Vuelve a escribir las comillas y los símbolos de esa línea con el teclado.' },
  { name: 'SyntaxError', msg: /Perhaps you forgot a comma/, what: () => 'Faltan comas entre valores.', hint: 'Separa con comas los valores dentro de print(), listas o llamadas a funciones.' },
  { name: 'SyntaxError', what: () => 'Python no entiende cómo está escrita esta línea.', hint: 'Busca un «:» faltante, paréntesis o comillas sin cerrar, o una palabra mal escrita. A veces el error está en la línea de arriba.' },
  { name: 'UnboundLocalError', msg: /'(\w+)'/, what: (m) => `Usaste la variable «${m[1]}» dentro de una función antes de darle un valor ahí.`, hint: 'Asígnale un valor dentro de la función antes de usarla, o pásala como parámetro.' },
  { name: 'NameError', msg: /name '(\w+)' is not defined/, what: (m) => `Python no conoce ningún «${m[1]}».`, hint: 'Revisa que esté bien escrito (mayúsculas incluidas), que le diste valor antes de esta línea, o si era un texto que le faltan comillas.' },
  { name: 'NameError', what: () => 'Usaste un nombre que Python no conoce.', hint: 'Revisa cómo está escrito y que exista antes de esta línea.' },
  { name: 'TypeError', msg: /can only concatenate str \(not "(\w+)"\) to str/, what: (m) => `Intentaste unir con «+» un texto y un ${tipo(m[1])}.`, hint: '«+» une textos o suma números, pero no mezcla los dos. Convierte uno de los dos o separa con comas en print().' },
  { name: 'TypeError', msg: /unsupported operand type\(s\) for (\S+): '(\w+)' and '(\w+)'/, what: (m) => `No se puede usar «${m[1]}» entre un ${tipo(m[2])} y un ${tipo(m[3])}.`, hint: 'Recuerda que input() siempre devuelve texto: para hacer cuentas hay que convertirlo con int() o float().' },
  { name: 'TypeError', msg: /'(.+)' not supported between instances of '(\w+)' and '(\w+)'/, what: (m) => `No se puede comparar con «${m[1]}» un ${tipo(m[2])} y un ${tipo(m[3])}.`, hint: 'Compara valores del mismo tipo. input() devuelve texto aunque escribas un número.' },
  { name: 'TypeError', msg: /can't multiply sequence by non-int of type '(\w+)'/, what: (m) => `Multiplicaste un texto o lista por un ${tipo(m[1])}.`, hint: 'Si querías una cuenta, revisa que los dos valores sean números (input() devuelve texto).' },
  { name: 'TypeError', msg: /(\w+)\(\) takes (\d+) positional arguments? but (\d+) (were|was) given/, what: (m) => `La función ${m[1]}() recibe ${m[2]} valor(es) pero le pasaste ${m[3]}.`, hint: 'Compara cuántos parámetros tiene el def con cuántos valores mandas al llamarla.' },
  { name: 'TypeError', msg: /missing (\d+) required positional argument/, what: (m) => `Al llamar la función faltan ${m[1]} valor(es).`, hint: 'Compara cuántos parámetros tiene el def con cuántos valores mandas al llamarla.' },
  { name: 'TypeError', msg: /'(\w+)' object is not callable/, what: (m) => `Pusiste paréntesis después de un ${tipo(m[1])}, como si fuera una función.`, hint: 'Revisa si una variable tiene el mismo nombre que una función, o si falta un operador (por ejemplo 2(x) en vez de 2*x).' },
  { name: 'TypeError', msg: /'(\w+)' object is not subscriptable/, what: (m) => `Usaste corchetes [ ] sobre un ${tipo(m[1])}, que no tiene posiciones.`, hint: 'Solo textos, listas y diccionarios se leen con [ ]. Revisa qué hay guardado en esa variable.' },
  { name: 'TypeError', msg: /'str' object does not support item assignment/, what: () => 'Intentaste cambiar una letra de un texto, y los textos no se pueden modificar.', hint: 'Arma un texto nuevo en otra variable en vez de cambiar el original.' },
  { name: 'TypeError', msg: /'float' object cannot be interpreted as an integer/, what: () => 'Usaste un número decimal donde se necesita un entero (por ejemplo en range()).', hint: '«/» siempre da decimal; «//» da la división entera.' },
  { name: 'TypeError', msg: /object of type '(\w+)' has no len/, what: (m) => `len() no funciona con un ${tipo(m[1])}.`, hint: 'len() cuenta elementos de textos y listas. Revisa qué hay guardado en esa variable.' },
  { name: 'TypeError', what: () => 'Usaste un valor de un tipo que no sirve para esa operación.', hint: 'Revisa el tipo de cada valor de la línea (texto, entero, decimal, lista). input() siempre devuelve texto.' },
  { name: 'ValueError', msg: /invalid literal for int\(\) with base 10: (.*)/, what: (m) => `int() no puede convertir ${m[1]} en un número entero.`, hint: 'Revisa qué escribiste en la entrada. Si el valor trae punto decimal, int() no lo acepta directamente.' },
  { name: 'ValueError', msg: /could not convert string to float: (.*)/, what: (m) => `float() no puede convertir ${m[1]} en un número.`, hint: 'Revisa qué escribiste en la entrada: debe ser un número, con punto (no coma) para los decimales.' },
  { name: 'ValueError', msg: /not enough values to unpack/, what: () => 'Hay más variables a la izquierda del «=» que valores a la derecha.', hint: 'Cuenta las variables y los valores, por ejemplo los que da split().' },
  { name: 'ValueError', msg: /too many values to unpack/, what: () => 'Hay más valores a la derecha del «=» que variables a la izquierda.', hint: 'Cuenta las variables y los valores, por ejemplo los que da split().' },
  { name: 'ValueError', msg: /math domain error/, what: () => 'Una función matemática recibió un valor que no admite (por ejemplo la raíz de un negativo).', hint: 'Revisa el valor que le pasas a la función de math en esa línea.' },
  { name: 'ValueError', what: () => 'El tipo del valor es correcto, pero su contenido no sirve para esa operación.', hint: 'Revisa el valor que llega a esa línea, sobre todo lo que viene de la entrada.' },
  { name: 'ZeroDivisionError', what: () => 'Dividiste entre cero (con /, // o %).', hint: 'Revisa qué valor tiene el divisor cuando llega a esa línea.' },
  { name: 'IndexError', msg: /string index out of range/, what: () => 'Pediste una posición del texto que no existe.', hint: 'Las posiciones van de 0 a len(texto) - 1. Revisa los límites de tu ciclo.' },
  { name: 'IndexError', what: () => 'Pediste una posición de la lista que no existe.', hint: 'Las posiciones van de 0 a len(lista) - 1. Revisa los límites de tu ciclo.' },
  { name: 'KeyError', msg: /(.+)/, what: (m) => `El diccionario no tiene la llave ${m[1]}.`, hint: 'Revisa cómo está escrita la llave o comprueba con «in» si existe antes de leerla.' },
  { name: 'AttributeError', msg: /'(\w+)' object has no attribute '(\w+)'/, what: (m) => `Un ${tipo(m[1])} no tiene «.${m[2]}».`, hint: 'Revisa que el método esté bien escrito y que la variable tenga el tipo que crees.' },
  { name: 'AttributeError', what: () => 'Usaste un método o atributo que ese valor no tiene.', hint: 'Revisa que el nombre después del punto esté bien escrito.' },
  { name: 'EOFError', what: () => 'Tu programa llamó a input() más veces de las líneas que hay en la entrada.', hint: 'Agrega más líneas en la caja de entrada o revisa cuántas veces llamas a input().' },
  { name: 'RecursionError', what: () => 'Una función se llamó a sí misma demasiadas veces.', hint: 'Revisa que la función tenga un caso base que la detenga y que cada llamada se acerque a él.' },
  { name: 'FileNotFoundError', msg: /'([^']+)'/, what: (m) => `No existe el archivo «${m[1]}».`, hint: 'Revisa el nombre exacto del archivo (mayúsculas y extensión incluidas).' },
  { name: 'ModuleNotFoundError', msg: /'([^']+)'/, what: (m) => `No existe el módulo «${m[1]}».`, hint: 'Revisa cómo está escrito el nombre después de import.' },
  { name: 'OverflowError', what: () => 'El resultado es un número demasiado grande.', hint: 'Revisa si una cuenta crece sin control, por ejemplo dentro de un ciclo.' },
];

const TYPES: Record<string, string> = { str: 'texto (str)', int: 'entero (int)', float: 'decimal (float)', list: 'lista (list)', NoneType: 'None', bool: 'booleano (bool)', dict: 'diccionario (dict)', tuple: 'tupla (tuple)', function: 'función', builtin_function_or_method: 'función' };
const tipo = (t: string) => TYPES[t] ?? t;

/** null si el texto no es un error de Python que conozcamos (por ejemplo el aviso de tiempo agotado). */
export function explainError(traceback: string): ErrorHelp | null {
  const lines = traceback.trimEnd().split('\n');
  const head = lines.at(-1)?.match(/^(\w+(?:Error|Exception)?): ?(.*)$/);
  if (!head) return null;
  const [, name, message] = head;
  for (const r of RULES) {
    if (r.name !== name) continue;
    const m = r.msg ? message.match(r.msg) : ([message] as RegExpMatchArray);
    if (!m) continue;
    const at = [...traceback.matchAll(/"programa\.py", line (\d+)/g)].at(-1);
    return { name, line: at ? Number(at[1]) : undefined, what: r.what(m), hint: r.hint };
  }
  return null;
}
