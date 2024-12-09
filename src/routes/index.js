const express = require('express');
const router = express.Router();

const estudiantesRutas = require('./estudiantesRutas');
const calificacionesRutas = require('./calificacionesRutas');

router.use('/estudiantes', estudiantesRutas);
router.use('/calificaciones', calificacionesRutas);

module.exports = router;