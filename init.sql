SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

CREATE TABLE `estudiantes` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `apellidos` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `matricula` VARCHAR(100) NOT NULL,
  `edad` INTEGER NOT NULL,
  `semestre` VARCHAR(255) NOT NULL,
  `usuario_creacion` VARCHAR(100) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL
);

INSERT INTO `estudiantes` (nombre, apellidos, email, matricula, edad, semestre, usuario_creacion, fecha_creacion) VALUES
('Juan', 'Perez Lopez', 'juan.perez@mail.com', 'A001', 20, 'Tercer Semestre', 'admin', '2024-01-15 12:00:00'),
('Maria', 'Gomez Ruiz', 'maria.gomez@mail.com', 'A002', 21, 'Cuarto Semestre', 'admin', '2024-01-15 12:00:00'),
('Luis', 'Hernandez Diaz', 'luis.hernandez@mail.com', 'A003', 19, 'Segundo Semestre', 'admin', '2024-01-15 12:00:00'),
('Ana', 'Martinez Ortiz', 'ana.martinez@mail.com', 'A004', 22, 'Quinto Semestre', 'admin', '2024-01-15 12:00:00'),
('Carlos', 'Lopez Fernandez', 'carlos.lopez@mail.com', 'A005', 23, 'Sexto Semestre', 'admin', '2024-01-15 12:00:00');

CREATE TABLE `maestros` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `edad` INTEGER NOT NULL,
  `telefono` BIGINT NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `usuario_creacion` VARCHAR(100) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL
);

INSERT INTO `maestros` (nombre, edad, telefono, correo, usuario_creacion, fecha_creacion) VALUES
('Pedro Garcia', 45, 5544332211, 'pedro.garcia@mail.com', 'admin', '2024-01-15 12:00:00'),
('Laura Sanchez', 38, 5522113344, 'laura.sanchez@mail.com', 'admin', '2024-01-15 12:00:00'),
('Miguel Ramirez', 50, 5533224455, 'miguel.ramirez@mail.com', 'admin', '2024-01-15 12:00:00'),
('Sandra Flores', 42, 5511223344, 'sandra.flores@mail.com', 'admin', '2024-01-15 12:00:00'),
('Jose Torres', 36, 5566778899, 'jose.torres@mail.com', 'admin', '2024-01-15 12:00:00');

CREATE TABLE `materias` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `profesor_id` INTEGER NOT NULL,
  `create_user` VARCHAR(100) NOT NULL,
  `create_date` DATETIME NOT NULL
);

INSERT INTO `materias` (nombre, profesor_id, create_user, create_date) VALUES
('Matematicas', 1, 'admin', '2024-01-15 12:00:00'),
('Fisica', 2, 'admin', '2024-01-15 12:00:00'),
('Historia', 3, 'admin', '2024-01-15 12:00:00'),
('Literatura', 4, 'admin', '2024-01-15 12:00:00'),
('Quimica', 5, 'admin', '2024-01-15 12:00:00');

CREATE TABLE `calificaciones` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `estudiante_id` INTEGER NOT NULL,
  `maestro_id` INTEGER NOT NULL,
  `materia_id` INTEGER NOT NULL,
  `calificacion` DECIMAL(5,2) NOT NULL,
  `create_user` VARCHAR(100) NOT NULL,
  `create_date` DATETIME NOT NULL
);

INSERT INTO `calificaciones` (estudiante_id, maestro_id, materia_id, calificacion, create_user, create_date) VALUES
(1, 1, 1, 85.5, 'admin', '2024-01-15 12:00:00'),
(2, 2, 2, 90.0, 'admin', '2024-01-15 12:00:00'),
(3, 3, 3, 78.5, 'admin', '2024-01-15 12:00:00'),
(4, 4, 4, 95.0, 'admin', '2024-01-15 12:00:00'),
(5, 5, 5, 88.5, 'admin', '2024-01-15 12:00:00');

-- cONEXIONES.
ALTER TABLE `calificaciones` ADD FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`);
ALTER TABLE `calificaciones` ADD FOREIGN KEY (`maestro_id`) REFERENCES `maestros` (`id`);
ALTER TABLE `calificaciones` ADD FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);
