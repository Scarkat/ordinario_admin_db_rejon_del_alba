const con = require('../config/database.js');

const getData = (tabla, res) => {
    const query = 'SELECT * FROM ??' // Medida de seguridad. Reemplaza el ?? por los valores de la tabla.
    con.query(query, [tabla], (err, results) => {
        if(err)
        {
            console.log("Ejecución fallida del query: ", err);
            return res.status(500).json({error: 'query a la database fallida.'}) // Error de servidor HTTP.
        }

        return res.json(results); // No hace falta especificar el status porque por defecto es satisfactorio.
    });
}

const sendData = (query, values, res) => {
    con.query(query, values, (err, results) => {
        if(err)
        {
            return res.status(500).json({error: err.message});
        }

        res.status(201).json({message: 'Elemento creado. ', id:results.id}) // Se creó según el procolo 201.
    });
}

const getID = (table, field, value) => {
    return new Promise( (resolve, reject) => {
        const query = 'SELECT id FROM ?? WHERE ?? = ? LIMIT 1';

        con.query(query, [table, field, value], (err, results) => {
            if(err) 
            {
                return reject(new Error('Query no completado.'));
            }
            
            if(results.length == 0)
            {
                return reject(new Error('No hay registros con esos datos.'))
            }
            
            resolve(results[0].id);
        })
    });
}

module.exports = { getData, sendData, getID };