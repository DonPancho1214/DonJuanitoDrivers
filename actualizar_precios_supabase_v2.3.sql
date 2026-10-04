-- ==============================================================================
-- Script de sincronización para Supabase: Tabla "Precios"
-- Don Juanito Drivers - Tarifas Oficiales v2.3 (Septiembre 2026)
--
-- INSTRUCCIONES:
-- 1. Ve a tu panel de Supabase: https://supabase.com/dashboard/project/lxdhxsxwgoaemjssvkjl
-- 2. Entra en "SQL Editor" en el menú izquierdo.
-- 3. Pega todo este contenido y presiona "Run".
-- ==============================================================================

BEGIN;

-- 1. CEA Diverplaza
UPDATE "Precios" SET precio = 940000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 790000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'A2' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1200000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 950000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1270000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1030000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'C1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1995000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1570000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'A2/B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2000000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1620000, activo = true WHERE sede = 'CEA Diverplaza' AND categoria = 'A2/C1' AND modalidad = 'SIN PRACTICAS';

-- 2. Conductores Bogotá (Chapinero)
UPDATE "Precios" SET precio = 1000000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 910000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'A2' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1200000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1000000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1350000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1020000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'C1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2200000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1910000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'A2/B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2350000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1930000, activo = true WHERE sede = 'Conductores Bogotá' AND categoria = 'A2/C1' AND modalidad = 'SIN PRACTICAS';

-- Habilitar categoría C2 en Conductores Bogotá si no existe
INSERT INTO "Precios" (sede, categoria, modalidad, precio, activo)
SELECT 'Conductores Bogotá', 'C2', 'CON PRACTICAS', 1370000, true
WHERE NOT EXISTS (SELECT 1 FROM "Precios" WHERE sede = 'Conductores Bogotá' AND categoria = 'C2' AND modalidad = 'CON PRACTICAS');

INSERT INTO "Precios" (sede, categoria, modalidad, precio, activo)
SELECT 'Conductores Bogotá', 'C2', 'SIN PRACTICAS', 1080000, true
WHERE NOT EXISTS (SELECT 1 FROM "Precios" WHERE sede = 'Conductores Bogotá' AND categoria = 'C2' AND modalidad = 'SIN PRACTICAS');

-- 3. CEA Velari (Calle 100)
UPDATE "Precios" SET precio = 1000000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 810000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'A2' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1180000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 930000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1310000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1030000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'C1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2180000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1740000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'A2/B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2310000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1840000, activo = true WHERE sede = 'CEA Velari' AND categoria = 'A2/C1' AND modalidad = 'SIN PRACTICAS';

-- 4. El Agente Guerrero / CEA Modelo
UPDATE "Precios" SET precio = 1010000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 930000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'A2' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1290000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1070000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1490000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1030000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'C1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2300000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 2000000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'A2/B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2500000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1960000, activo = true WHERE sede = 'El Agente Guerrero' AND categoria = 'A2/C1' AND modalidad = 'SIN PRACTICAS';

-- 5. CEA Auto Xua (Soacha - CERO Homologaciones)
UPDATE "Precios" SET precio = 1090000, activo = true WHERE sede = 'CEA Auto Xua' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1350000, activo = true WHERE sede = 'CEA Auto Xua' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1490000, activo = true WHERE sede = 'CEA Auto Xua' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 2440000, activo = true WHERE sede = 'CEA Auto Xua' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 2580000, activo = true WHERE sede = 'CEA Auto Xua' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET activo = false WHERE sede = 'CEA Auto Xua' AND modalidad = 'SIN PRACTICAS';

-- 6. CEA Carvajal (Primera de Mayo)
UPDATE "Precios" SET precio = 1200000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1000000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'A2' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1350000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1180000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1480000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1270000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'C1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2450000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 2180000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'A2/B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2650000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 2270000, activo = true WHERE sede = 'CEA Carvajal' AND categoria = 'A2/C1' AND modalidad = 'SIN PRACTICAS';

-- 7. CEA Al Timón / Gran Autos Restrepo
UPDATE "Precios" SET precio = 1000000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 830000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'A2' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1200000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 900000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1390000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1040000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'C1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2200000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1730000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'A2/B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2390000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1870000, activo = true WHERE sede = 'CEA Al Timón' AND categoria = 'A2/C1' AND modalidad = 'SIN PRACTICAS';

-- 8. CEA Valuvial (Ciudad Bolívar)
UPDATE "Precios" SET precio = 1000000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 810000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'A2' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1220000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 930000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1380000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1030000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'C1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2220000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1740000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'A2/B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2380000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1840000, activo = true WHERE sede = 'CEA Valuvial' AND categoria = 'A2/C1' AND modalidad = 'SIN PRACTICAS';

-- 9. CEA Centro Suba (Suba)
UPDATE "Precios" SET precio = 1030000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'A2' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 950000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'A2' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1340000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1030000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 1420000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1060000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'C1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2370000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'A2/B1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 1980000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'A2/B1' AND modalidad = 'SIN PRACTICAS';
UPDATE "Precios" SET precio = 2450000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'A2/C1' AND modalidad = 'CON PRACTICAS';
UPDATE "Precios" SET precio = 2010000, activo = true WHERE sede = 'CEA Centro Suba' AND categoria = 'A2/C1' AND modalidad = 'SIN PRACTICAS';

COMMIT;
