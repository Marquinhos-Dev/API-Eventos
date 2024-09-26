
// Inicializar o Express e o APP
const express = require('express');
const app = express();
app.use(express.json());

// Importar as rotas
const routerEventos = require('./Routers/routerEventos');
const routerIngressos = require('./Routers/routerIngressos');

// Direcionar para as rotas
app.use('/eventos',routerEventos);
app.use('/ingressos',routerIngressos);

// Exportar o APP
module.exports = app;
