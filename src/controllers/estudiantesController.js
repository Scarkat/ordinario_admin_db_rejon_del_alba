const { getData, sendData} = require('../helpers/dbhelper.js');

const getEstudiantes = (req, res) => {
    getData('estudiantes', res);
}

const createEstudiante = (req, res) => {
    const { nombre, apellidos, email, matricula, edad, semestre, usuario_creacion } = req.body;
    if(!nombre || !apellidos || !email || !matricula || !edad || !semestre || !usuario_creacion)
    {
        return res.status(400).json({ error: 'Datos faltantes'});
    }

    if(isNaN(edad))
    {
        return res.status(400).json({ error: 'Edad debe ser número'});
    }

    const fecha_creacion = new Date().toISOString().slice(0,19).replace('T', '');

    const query = 'INSERT INTO estudiantes (nombre, apellidos, email, matricula, edad, semestre, usuario_creacion, fecha_creacion) VALUES (?,?,?,?,?,?,?,?)';

    const values = [ nombre, apellidos, email, matricula, edad, semestre, usuario_creacion, fecha_creacion ];

    sendData(query, values, res);
}

module.exports = {getEstudiantes, createEstudiante};