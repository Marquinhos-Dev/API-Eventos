
// Inicializar o Express e o APP
const express = require('express');
const app = express();
app.use(json());

// Importar as rotas
const routerEventos = require('./Routers/routerEventos');
const routerIngressos = require('./Routers/routerIngressos');

// Direcionar para as rotas
app.use('/eventos',routerEventos);
app.use('/ingressos',routerIngressos);

// Rota inicial
app.use('/',(req,res)=>{res.send({message:`Seja bem vindo! Utilize '/eventos' e '/ingressos' para interagir com o servidor!`})});

// Exportar o APP
module.exports = app;