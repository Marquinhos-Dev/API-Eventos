
// Importar o Express e o Controller, e inicializar o Router
const express = require('express');
const router = express.Router();
const controllerEventos = require('../Controllers/controllerEventos');

// Direcionar para as funções de cada método
router.post('/',controllerEventos.criarEvento);
router.get('/',controllerEventos.listarEventos);
router.put('/',controllerEventos.atualizarEvento);
router.delete('/',controllerEventos.deletarEvento);

// Exportar o Router
module.exports = router;