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

app.put("/ingressos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { ID_evento, nomeUtilizador, idade, tipo } = req.body;
      const ingressoAtualizado = await atualizarIngresso(id,ID_evento,nomeUtilizador,idade,tipo);
      if (ingressoAtualizado) {
        res.status(200).json({mensagem: "Ingresso atualizado com sucesso",atualizado: ingressoAtualizado,});
      } else {
        res.status(404).json({ mensagem: "Ingresso não encontrado" });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao atualizar ingresso", erro: erro.message });
    }
});

app.put("/eventos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nomeEvento, artista, data, horario } = req.body;
      const eventoAtualizado = await atualizarEvento(id,nomeEvento, artista, data, horario);
      if (eventoAtualizado) {
        res.status(200).json({mensagem: "Evento atualizado com sucesso",atualizado: eventoAtualizado,});
      } else {
        res.status(404).json({ mensagem: "Evento não encontrado" });
      }
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao atualizar evento", erro: erro.message });
    }
});

async function atualizarIngresso(id,ID_evento,nomeUtilizador,idade,tipo) {
    try {
      const ingressoAtualizado = await Ingresso.findByIdAndUpdate(
        id,
        { ID_evento, nomeUtilizador, idade, tipo },
        { new: true, runValidators: true }
      );
      return ingressoAtualizado;
    } catch (erro) {
      console.error("Erro ao atualizar ingresso:", erro);
      throw erro;
    }
}

async function atualizarEvento(id,nomeEvento, artista, data, horario) {
    try {
      const eventoAtualizado = await Evento.findByIdAndUpdate(
        id,
        { nomeEvento, artista, data, horario },
        { new: true, runValidators: true }
      );
      return eventoAtualizado;
    } catch (erro) {
      console.error("Erro ao atualizar evento:", erro);
      throw erro;
    }
}

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
