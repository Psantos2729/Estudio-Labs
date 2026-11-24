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
  ('M10', 10, 'stacks', 'Stacks', 'La pila como estructura: push, pop, top, empty y sus usos.', array['M09']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M11', 11, 'infix-postfix', 'Infix y postfix', 'Convertir y evaluar expresiones con jerarquía de operadores.', array['M10']::text[], 85, array[3, 7, 21, 60]::smallint[]),
  ('M12', 12, 'datos-con-pandas', 'Datos con pandas', 'Series, DataFrame, filtros y estadísticas sobre archivos CSV.', array['M11']::text[], 85, array[3, 7, 21, 60]::smallint[])
on conflict (id) do update set
  position = excluded.position, slug = excluded.slug, title = excluded.title,
  summary = excluded.summary, prerequisites = excluded.prerequisites,
  pass_score = excluded.pass_score, review_days = excluded.review_days;

-- Da a las cuentas existentes las filas de los módulos que falten (migración 007).
select public.fill_missing_mastery();
