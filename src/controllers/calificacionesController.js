const { getData, sendData, getID } = require('../helpers/dbhelper.js');

const getCalificaciones = async (req, res) => {
    try {
        const results = await getData('calificaciones');
        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al obtener calificaciones', 
            details: error.message 
        });
    }
}

const createCalificacion = async (req, res) => {
    try {
        const { estudiante_matricula, maestro_correo, materia_nombre, calificacion, create_user } = req.body;

        if(!estudiante_matricula || !maestro_correo || !materia_nombre || !calificacion || !create_user) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        if(isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
            return res.status(400).json({ error: "La calificación debe ser un número entre 0 y 100" });
        }

        const [estudiante_id, maestro_id, materia_id] = await Promise.all([
            getID('estudiantes', 'matricula', estudiante_matricula),
            getID('maestros', 'correo', maestro_correo),
            getID('materias', 'nombre', materia_nombre)
        ]);

        const create_date = new Date().toISOString().slice(0,19).replace('T', ' ');
        const query = 'INSERT INTO calificaciones (estudiante_id, maestro_id, materia_id, calificacion, create_user, create_date) VALUES (?,?,?,?,?,?)';
        const values = [estudiante_id, maestro_id, materia_id, calificacion, create_user, create_date];

        const result = await sendData(query, values);
        res.status(201).json({
            message: 'Calificación creada exitosamente',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear calificación', details: error.message });
    }
}

module.exports = { getCalificaciones, createCalificacion };