// Estructura básica.

require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/routes');
const db = require('./src/config/database.js');
const port = 3000;

app.use(express.json())

// Verificar conexión a la base de datos
db.query('SELECT 1')
    .then(() => {
        console.log('Conexión a la base de datos establecida');
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1);  // Detener la aplicación si no hay conexión
    });

// Middleware para logging de requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
})

app.post('/', (req, res) => {
    const {nombre} = req.body
    res.json(nombre);
})

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
  console.log('Variables de entorno cargadas:');
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_USER:', process.env.DB_USER);
})
