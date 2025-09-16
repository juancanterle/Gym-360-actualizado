-- Script para insertar usuarios de autenticación con contraseñas encriptadas en Base64
USE gym360_db;

-- Usuarios del sistema
INSERT INTO usuarios_sistema (nombre, apellido, email, password_hash, rol, sucursal_id) VALUES
('Propietario', 'Sistema', 'dueno@gym360.com', 'c3VwZXJhZG1pbjEyMw==', 'super_admin', NULL),
('Carlos', 'Administrador', 'admin.centro@gym360.com', 'YWRtaW4xMjM=', 'admin_sucursal', 1),
('María', 'Gestora', 'admin.norte@gym360.com', 'YWRtaW4xMjM=', 'admin_sucursal', 2),
('Roberto', 'Manager', 'admin.sur@gym360.com', 'YWRtaW4xMjM=', 'admin_sucursal', 3),
('Ana', 'Coordinadora', 'admin.este@gym360.com', 'YWRtaW4xMjM=', 'admin_sucursal', 4)
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    apellido = VALUES(apellido),
    password_hash = VALUES(password_hash),
    rol = VALUES(rol),
    sucursal_id = VALUES(sucursal_id);

-- Usuarios miembros
INSERT INTO usuarios_miembros (miembro_id, email, password_hash) VALUES
(1, 'pedro.gonzalez@email.com', 'Y2xpZW50ZTEyMw=='),
(2, 'lucia.fernandez@email.com', 'Y2xpZW50ZTEyMw=='),
(3, 'miguel.torres@email.com', 'Y2xpZW50ZTEyMw=='),
(4, 'sofia.martinez@email.com', 'Y2xpZW50ZTEyMw=='),
(5, 'carlos.rodriguez@email.com', 'Y2xpZW50ZTEyMw==')
ON DUPLICATE KEY UPDATE
    miembro_id = VALUES(miembro_id),
    password_hash = VALUES(password_hash);

-- Verificación
SELECT 'Usuarios del sistema:' as tipo;
SELECT us.email, us.rol, s.nombre as sucursal 
FROM usuarios_sistema us 
LEFT JOIN sucursales s ON us.sucursal_id = s.id;

SELECT 'Usuarios miembros:' as tipo;
SELECT um.email, m.nombre, m.apellido, m.numero_miembro 
FROM usuarios_miembros um 
JOIN miembros m ON um.miembro_id = m.id;