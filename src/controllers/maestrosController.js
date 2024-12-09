const { getData, sendData, checkExists } = require('../helpers/dbhelper.js');

const getMaestros = async (req, res) => {
    try {
        const results = await getData('maestros');
        res.json(results);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al obtener maestros', 
            details: error.message 
        });
    }
}

const createMaestro = async (req, res) => {
    try {
        const { nombre, edad, telefono, correo, usuario_creacion } = req.body;
        
        if(!nombre || !edad || !telefono || !correo || !usuario_creacion) {
            return res.status(400).json({ error: 'Datos faltantes' });
        }

        if(isNaN(edad) || isNaN(telefono)) {
            return res.status(400).json({ error: 'Edad y teléfono deben ser números' });
        }

        const existeCorreo = await checkExists('maestros', 'correo', correo);
        if (existeCorreo) {
            return res.status(400).json({ error: 'Ya existe un maestro con ese correo' });
        }

        const fecha_creacion = new Date().toISOString().slice(0,19).replace('T', ' ');
        const query = 'INSERT INTO maestros (nombre, edad, telefono, correo, usuario_creacion, fecha_creacion) VALUES (?,?,?,?,?,?)';
        const values = [ nombre, edad, telefono, correo, usuario_creacion, fecha_creacion ];

        const result = await sendData(query, values);
        res.status(201).json({
            message: 'Maestro creado exitosamente',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear maestro', details: error.message });
    }
}

module.exports = { getMaestros, createMaestro };