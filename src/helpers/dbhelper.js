const con = require('../config/database.js');

const getData = (tabla, res) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM ??';
        con.query(query, [tabla], (err, results) => {
            if(err) {
                console.log("Ejecución fallida del query: ", err);
                reject(err);
            }
            resolve(results);
        });
    });
}

const sendData = (query, values, res) => {
    return new Promise((resolve, reject) => {
        con.query(query, values, (err, results) => {
            if(err) {
                console.error("Error en sendData:", err);
                reject(err);
            }
            resolve(results);
        });
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

const checkExists = (tabla, campo, valor) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) as count FROM ${tabla} WHERE ${campo} = ?`;
        
        con.query(query, [valor], (error, results) => {
            if (error) {
                reject(new Error(`Error al verificar ${campo} en ${tabla}`));
            }
            resolve(results[0].count > 0);
        });
    });
}

module.exports = { getData, sendData, getID, checkExists };