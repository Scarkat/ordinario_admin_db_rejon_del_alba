const { getData, sendData } = require('../helpers/dbhelper.js');

const getEstudiantes = async (req, res) => {
    try {
        const results = await getData('estudiantes');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener estudiantes', details: error.message });
    }
}

const createEstudiante = async (req, res) => {
    try {
        const { nombre, apellidos, email, matricula, edad, semestre, usuario_creacion } = req.body;
        
        // Validación de campos requeridos
        const camposRequeridos = { nombre, apellidos, email, matricula, edad, semestre, usuario_creacion };
        const camposFaltantes = Object.entries(camposRequeridos)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (camposFaltantes.length > 0) {
            return res.status(400).json({ 
                error: 'Datos faltantes',
                camposFaltantes: camposFaltantes 
            });
        }

        // Validación de edad
        if (isNaN(edad) || edad < 0) {
            return res.status(400).json({ error: 'Edad debe ser un número válido' });
        }

        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email inválido' });
        }

        const fecha_creacion = new Date().toISOString().slice(0,19).replace('T', ' ');

        const query = `
            INSERT INTO estudiantes 
            (nombre, apellidos, email, matricula, edad, semestre, usuario_creacion, fecha_creacion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [nombre, apellidos, email, matricula, edad, semestre, usuario_creacion, fecha_creacion];

        const result = await sendData(query, values);
        res.status(201).json({
            message: 'Estudiante creado exitosamente',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear estudiante', details: error.message });
    }
}

module.exports = { getEstudiantes, createEstudiante };