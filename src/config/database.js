const mysql = require('mysql2'); // Por compatibilidad.

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
});

con.connect((err) => {
    if(err)
    {
        console.error("Conexión fallida: ", err.stack);
        process.exit(1);
    }

    console.log("Conexión exitosa.");
});

module.exports = con;