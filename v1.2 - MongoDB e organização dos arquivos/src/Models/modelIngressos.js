
// Importar o Mongoose
const mongoose = require('mongoose');

// Cria um esquema para os Ingressos
const esquemaIngresso = new mongoose.Schema({
    ID_evento: { type: String, required: true },
    nomeUtilizador: { type: String, required: true },
    idade: { type: Number, required: true },
    tipo: { type: String, required: true },
});

// Cria a entidade Ingressos
const Ingresso = mongoose.model('Ingresso', esquemaIngresso);

// Exporta a entidade Ingressos
module.exports = Ingresso;