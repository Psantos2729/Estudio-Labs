-- GENERADO por tools/seed-catalog.mjs. No editar a mano.
insert into public.modules (id, position, slug, title, summary, prerequisites, pass_score, review_days)
values
  ('M00', 0, 'primeros-pasos', 'Primeros pasos', 'Qué es un programa, variables, tipos, entrada y salida, operadores aritméticos.', array[]::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M01', 1, 'decisiones', 'Decisiones', 'Condicionales if/elif/else, operadores lógicos y porcentajes.', array['M00']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M02', 2, 'ciclos', 'Ciclos', 'Ciclos for y while, acumuladores, contadores y simulaciones.', array['M01']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M03', 3, 'numeros-y-digitos', 'Números y dígitos', 'División entera, módulo, descomponer números y cambiar de base.', array['M02']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M04', 4, 'funciones-y-cadenas', 'Funciones y cadenas', 'Funciones con parámetros y retorno, recorrido de cadenas y tablas de conversión.', array['M03']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M05', 5, 'vectores', 'Vectores', 'Listas como vectores: crear, recorrer, buscar, mayor y menor, operar.', array['M04']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M06', 6, 'ordenar-y-buscar', 'Ordenamiento y búsqueda', 'Selección, burbuja, inserción, conteo y búsqueda binaria, con medición de costo.', array['M05']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M07', 7, 'matrices', 'Matrices', 'Listas de listas: crear, recorrer, sumar, multiplicar y trasponer.', array['M06']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M08', 8, 'archivos-de-texto', 'Archivos de texto', 'Leer y escribir archivos secuenciales, analizar línea por línea.', array['M07']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M09', 9, 'registros-binarios', 'Registros y archivos binarios', 'Registros de tamaño fijo, acceso directo y rutinas de ingreso, consulta y modificación.', array['M08']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M10', 10, 'stacks', 'Stacks', 'La pila como estructura: push, pop, top, empty, sus usos y salir de un laberinto.', array['M09']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M11', 11, 'infix-postfix', 'Infix y postfix', 'Convertir y evaluar expresiones con jerarquía de operadores, evaluar con x y despejar x.', array['M10']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M12', 12, 'datos-con-pandas', 'Datos con pandas', 'numpy, Series, DataFrame, filtros, read_csv, groupby y regex con pandas.', array['M11']::text[], 85, array[3, 7, 21, 60]::smallint[])
on conflict (id) do update set
  position = excluded.position, slug = excluded.slug, title = excluded.title,
  summary = excluded.summary, prerequisites = excluded.prerequisites,
  pass_score = excluded.pass_score, review_days = excluded.review_days;

-- Da a las cuentas existentes las filas de los módulos que falten (migración 007).
select public.fill_missing_mastery();

-- Cosméticos del taller: qué espacio ocupan y cómo se ganan (migración 019).
insert into public.gear_items (id, slot, rule, need, position)
values
  ('hoja', 'cabeza', 'jefe', 'M03', 0),
  ('rama', 'mano', 'jefe', 'M03', 1),
  ('marinero', 'cabeza', 'jefe', 'M06', 2),
  ('bufanda', 'cuerpo', 'jefe', 'M06', 3),
  ('lentes', 'cara', 'jefe', 'M09', 4),
  ('pergamino', 'mano', 'jefe', 'M09', 5),
  ('gafas', 'cara', 'jefe', 'M12', 6),
  ('capa', 'cuerpo', 'jefe', 'M12', 7),
  ('visor', 'cara', 'nivel', '2', 8),
  ('crack', 'cara', 'nivel', '3', 9),
  ('audifonos', 'cabeza', 'nivel', '4', 10),
  ('estelar', 'cabeza', 'nivel', '6', 11),
  ('corona', 'cabeza', 'nivel', '8', 12),
  ('llave', 'mano', 'ejercicios', '25', 13),
  ('fernan', 'cabeza', 'ejercicios', '50', 14),
  ('espada_diamante', 'mano', 'ejercicios', '100', 15),
  ('mascara', 'cara', 'repasos', '3', 16),
  ('escudo', 'brazo', 'islas', '2', 17),
  ('espada_maestra', 'mano', 'islas', '4', 18),
  ('casco_cuero', 'cabeza', 'modulos', '1', 19),
  ('peto_cuero', 'cuerpo', 'modulos', '1', 20),
  ('casco_malla', 'cabeza', 'modulos', '3', 21),
  ('peto_malla', 'cuerpo', 'modulos', '3', 22),
  ('casco_hierro', 'cabeza', 'modulos', '5', 23),
  ('peto_hierro', 'cuerpo', 'modulos', '5', 24),
  ('casco_oro', 'cabeza', 'modulos', '7', 25),
  ('peto_oro', 'cuerpo', 'modulos', '7', 26),
  ('casco_diamante', 'cabeza', 'modulos', '10', 27),
  ('peto_diamante', 'cuerpo', 'modulos', '10', 28),
  ('casco_amatista', 'cabeza', 'modulos', '13', 29),
  ('peto_amatista', 'cuerpo', 'modulos', '13', 30)
on conflict (id) do update set
  slot = excluded.slot, rule = excluded.rule, need = excluded.need, position = excluded.position;
delete from public.gear_items where id not in ('hoja', 'rama', 'marinero', 'bufanda', 'lentes', 'pergamino', 'gafas', 'capa', 'visor', 'crack', 'audifonos', 'estelar', 'corona', 'llave', 'fernan', 'espada_diamante', 'mascara', 'escudo', 'espada_maestra', 'casco_cuero', 'peto_cuero', 'casco_malla', 'peto_malla', 'casco_hierro', 'peto_hierro', 'casco_oro', 'peto_oro', 'casco_diamante', 'peto_diamante', 'casco_amatista', 'peto_amatista');
