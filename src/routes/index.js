const express = require('express');
const router = express.Router();

const estudiantesRutas = require('./estudiantesRutas');
const calificacionesRutas = require('./calificacionesRutas');
const maestrosRutas = require('./maestrosRutas.js');
const materiasRutas = require('./materiasRutas');

router.use('/estudiantes', estudiantesRutas);
router.use('/calificaciones', calificacionesRutas);
router.use('/maestros', maestrosRutas);
router.use('/materias', materiasRutas);

module.exports = router;