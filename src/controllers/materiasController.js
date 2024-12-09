const { getData, sendData, getID } = require('../helpers/dbhelper.js');

const getMaterias = (req, res) => {
    getData('materias', res);
}

const createMateria = (req, res) => {
    const { nombre, maestro_correo, create_user } = req.body;
    
    if(!nombre || !maestro_correo || !create_user) {
        return res.status(400).json({ error: 'Datos faltantes' });
    }

    Promise.allSettled([
        getID('maestros', 'correo', maestro_correo)
    ]).then((results) => {
        const errors = results
            .filter(result => result.status === 'rejected')
            .map(result => result.reason.message);

        if (errors.length > 0) {
            return res.status(400).json({ error: errors });
        }

        const [maestro_id] = results.map(result => result.value);
        const create_date = new Date().toISOString().slice(0,19).replace('T', ' ');

        const query = 'INSERT INTO materias (nombre, profesor_id, create_user, create_date) VALUES (?,?,?,?)';
        const values = [ nombre, maestro_id, create_user, create_date ];

        sendData(query, values, res);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

module.exports = { getMaterias, createMateria };