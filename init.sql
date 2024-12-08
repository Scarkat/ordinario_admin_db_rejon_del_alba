SET NAMES 'utf8mb4';
SET CHARACTER SET utf8mb4;

CREATE TABLE `estudiantes` (
  `id` INTEGER PRIMARY KEY,
  `nombre` VARCHAR(150) NOT NULL,
  `apellidos` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `matricula` VARCHAR(100) NOT NULL,
  `edad` INTEGER NOT NULL,
  `semestre` VARCHAR(255) NOT NULL,
  `usuario_creacion` VARCHAR(100) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL
);

INSERT INTO `estudiantes` VALUES
(1, 'Juan', 'Perez Lopez', 'juan.perez@mail.com', 'A001', 20, 'Tercer Semestre', 'admin', '2024-01-15 12:00:00'),
(2, 'Maria', 'Gomez Ruiz', 'maria.gomez@mail.com', 'A002', 21, 'Cuarto Semestre', 'admin', '2024-01-15 12:00:00'),
(3, 'Luis', 'Hernandez Diaz', 'luis.hernandez@mail.com', 'A003', 19, 'Segundo Semestre', 'admin', '2024-01-15 12:00:00'),
(4, 'Ana', 'Martinez Ortiz', 'ana.martinez@mail.com', 'A004', 22, 'Quinto Semestre', 'admin', '2024-01-15 12:00:00'),
(5, 'Carlos', 'Lopez Fernandez', 'carlos.lopez@mail.com', 'A005', 23, 'Sexto Semestre', 'admin', '2024-01-15 12:00:00');

CREATE TABLE `maestros` (
  `id` INTEGER PRIMARY KEY,
  `nombre` VARCHAR(255) NOT NULL,
  `edad` INTEGER NOT NULL,
  `telefono` BIGINT NOT NULL,
  `correo` VARCHAR(255) NOT NULL,
  `usuario_creacion` VARCHAR(100) NOT NULL,
  `fecha_creacion` DATETIME NOT NULL
);

INSERT INTO `maestros` VALUES
(1, 'Pedro Garcia', 45, 5544332211, 'pedro.garcia@mail.com', 'admin', '2024-01-15 12:00:00'),
(2, 'Laura Sanchez', 38, 5522113344, 'laura.sanchez@mail.com', 'admin', '2024-01-15 12:00:00'),
(3, 'Miguel Ramirez', 50, 5533224455, 'miguel.ramirez@mail.com', 'admin', '2024-01-15 12:00:00'),
(4, 'Sandra Flores', 42, 5511223344, 'sandra.flores@mail.com', 'admin', '2024-01-15 12:00:00'),
(5, 'Jose Torres', 36, 5566778899, 'jose.torres@mail.com', 'admin', '2024-01-15 12:00:00');

CREATE TABLE `materias` (
  `id` INTEGER PRIMARY KEY,
  `nombre` VARCHAR(255) NOT NULL,
  `profesor_id` INTEGER NOT NULL,
  `create_user` VARCHAR(100) NOT NULL,
  `create_date` DATETIME NOT NULL
);

INSERT INTO `materias` VALUES
(1, 'Matematicas', 1, 'admin', '2024-01-15 12:00:00'),
(2, 'Fisica', 2, 'admin', '2024-01-15 12:00:00'),
(3, 'Historia', 3, 'admin', '2024-01-15 12:00:00'),
(4, 'Literatura', 4, 'admin', '2024-01-15 12:00:00'),
(5, 'Quimica', 5, 'admin', '2024-01-15 12:00:00');

CREATE TABLE `calificaciones` (
  `id` INTEGER PRIMARY KEY,
  `estudiante_id` INTEGER NOT NULL,
  `maestro_id` INTEGER NOT NULL,
  `materia_id` INTEGER NOT NULL,
  `create_user` VARCHAR(100) NOT NULL,
  `create_date` DATETIME NOT NULL
);

INSERT INTO `calificaciones` VALUES
(1, 1, 1, 1, 'admin', '2024-01-15 12:00:00'),
(2, 2, 2, 2, 'admin', '2024-01-15 12:00:00'),
(3, 3, 3, 3, 'admin', '2024-01-15 12:00:00'),
(4, 4, 4, 4, 'admin', '2024-01-15 12:00:00'),
(5, 5, 5, 5, 'admin', '2024-01-15 12:00:00');

-- cONEXIONES.
ALTER TABLE `calificaciones` ADD FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`);
ALTER TABLE `calificaciones` ADD FOREIGN KEY (`maestro_id`) REFERENCES `maestros` (`id`);
ALTER TABLE `calificaciones` ADD FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`);
