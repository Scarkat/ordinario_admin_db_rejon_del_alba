const { getData, sendData, getID } = require('../helpers/dbhelper.js');

const getMaterias = async (req, res) => {
    try {
        const results = await getData('materias');
        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al obtener materias', 
            details: error.message 
        });
    }
}

const createMateria = async (req, res) => {
    try {
        const { nombre, maestro_correo, create_user } = req.body;
        
        if(!nombre || !maestro_correo || !create_user) {
            return res.status(400).json({ error: 'Datos faltantes' });
        }

        const maestro_id = await getID('maestros', 'correo', maestro_correo);
        const create_date = new Date().toISOString().slice(0,19).replace('T', ' ');

        const query = 'INSERT INTO materias (nombre, profesor_id, create_user, create_date) VALUES (?,?,?,?)';
        const values = [ nombre, maestro_id, create_user, create_date ];

        const result = await sendData(query, values);
        res.status(201).json({
            message: 'Materia creada exitosamente',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear materia', details: error.message });
    }
}

module.exports = { getMaterias, createMateria };