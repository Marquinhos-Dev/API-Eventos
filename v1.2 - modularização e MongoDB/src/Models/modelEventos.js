
// Importar o Mongoose
const mongoose = require('mongoose');

// Cria um esquema para os Eventos
const esquemaEvento = new mongoose.Schema({
    nomeEvento: { type: String, required: true },
    artista: { type: String, required: true },
    data: { type: String, required: true },
    horario: { type: String, required: true },
});

// Cria a entidade Ingressos
const Evento = mongoose.model('Evento', esquemaEvento);

// Exporta a entidade Ingressos
module.exports = Evento;