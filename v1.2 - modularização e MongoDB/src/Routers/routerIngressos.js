
// Importar o Express e o Controller, e inicializar o Router
const express = require('express');
const router = express.Router();
const controllerIngressos = require('../Controllers/controllerIngressos');

// Direcionar para as funções de cada método
router.post('/',controllerIngressos.criarIngresso);
router.get('/',controllerIngressos.listarIngressos);
router.put('/',controllerIngressos.atualizarIngressos);
router.delete('/',controllerIngressos.deletarIngressos);

// Exportar o Router
module.exports = router;