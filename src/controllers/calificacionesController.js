const { getData, sendData, getID } = require('../helpers/dbhelper.js');

const getCalificaciones = (req, res) => {
    getData('calificaciones', res);
}

const createCalificacion = (req, res) => {
    const { estudiante_matricula, maestro_correo, materia_nombre, calificacion, create_user } = req.body;

    if(!estudiante_matricula || !maestro_correo || !materia_nombre || !calificacion || !create_user) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    if(isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
        return res.status(400).json({ error: "La calificación debe ser un número entre 0 y 100" });
    }

    Promise.allSettled([
        getID('estudiantes', 'matricula', estudiante_matricula),
        getID('maestros', 'correo', maestro_correo),
        getID('materias', 'nombre', materia_nombre)
    ]).then((results) => {
        const errors = results
            .filter(result => result.status === 'rejected')
            .map(result => result.reason.message);

        if (errors.length > 0) {
            return res.status(400).json({ error: errors });
        }

        const [estudiante_id, maestro_id, materia_id] = results.map(result => result.value);
        const create_date = new Date().toISOString().slice(0,19).replace('T', ' ');

        const query = 'INSERT INTO calificaciones (estudiante_id, maestro_id, materia_id, calificacion, create_user, create_date) VALUES (?,?,?,?,?,?)';
        const values = [estudiante_id, maestro_id, materia_id, calificacion, create_user, create_date];

        sendData(query, values, res);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

module.exports = { getCalificaciones, createCalificacion };