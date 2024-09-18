// Importação dos módulos
const express = require('express');
const mongoose = require('mongoose');

// Inicialização do Express, utilização do JSON e criação da porta
const app = express();
app.use(express.json());
const port = 3000;

// Conexão com MongoDB
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((erro) => console.error("Erro ao conectar ao MongoDB:", erro));

// Esquema dos eventos
const esquemaEvento = new mongoose.Schema({
  nomeEvento: { type: String, required: true },
  artista: { type: String, required: true },
  data: { type: String, required: true },
  horario: { type: String, required: true },
});

// Esquema dos ingressos
const esquemaIngresso = new mongoose.Schema({
    ID_evento: { type: String, required: true },
    nomeUtilizador: { type: String, required: true },
    idade: { type: Number, required: true },
    tipo: { type: String, required: true },
});

// Criação dos documentos
const Evento = mongoose.model("Evento", esquemaEvento);
const Ingresso = mongoose.model("Ingresso", esquemaIngresso);

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});