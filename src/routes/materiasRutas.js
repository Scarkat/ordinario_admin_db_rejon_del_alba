const express = require('express');
const router = express.Router();
const { getMaterias, createMateria } = require('../controllers/materiasController');

router.get('/', getMaterias);
router.post('/', createMateria);

module.exports = router;