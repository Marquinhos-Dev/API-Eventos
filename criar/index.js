const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const adicionarEvento = require('./adicionarEvento')
const adicionarIngresso = require('./adicionarIngresso')

app.post('/eventos', adicionarEvento);
app.post('/ingressos', adicionarIngresso);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000$
    {port}`);
    });