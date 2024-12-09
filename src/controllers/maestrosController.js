const { getData, sendData, checkExists } = require('../helpers/dbhelper.js');

const getMaestros = (req, res) => {
    getData('maestros', res);
}

const createMaestro = (req, res) => {
    const { nombre, edad, telefono, correo, usuario_creacion } = req.body;
    
    if(!nombre || !edad || !telefono || !correo || !usuario_creacion) {
        return res.status(400).json({ error: 'Datos faltantes' });
    }

    if(isNaN(edad) || isNaN(telefono)) {
        return res.status(400).json({ error: 'Edad y teléfono deben ser números' });
    }

    // Verificar que no exista un maestro con el mismo correo
    Promise.allSettled([
        checkExists('maestros', 'correo', correo)
    ]).then((results) => {
        const [existeCorreo] = results.map(result => result.value);

        if (existeCorreo) {
            return res.status(400).json({ error: 'Ya existe un maestro con ese correo' });
        }

        const fecha_creacion = new Date().toISOString().slice(0,19).replace('T', ' ');
        const query = 'INSERT INTO maestros (nombre, edad, telefono, correo, usuario_creacion, fecha_creacion) VALUES (?,?,?,?,?,?)';
        const values = [ nombre, edad, telefono, correo, usuario_creacion, fecha_creacion ];

        sendData(query, values, res);
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
}

module.exports = { getMaestros, createMaestro };