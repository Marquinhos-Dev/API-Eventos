
// Importa os módulos Express e Mongoose
const express = require('express');
const mongoose = require('mongoose');

// Inicializa o servidor
const app = express();
app.use(express.json());

// Cria conexão com o MongoDB
mongoose
  .connect('mongodb://localhost:27017/SASSAKI')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((erro) => console.error('Erro ao conectar ao MongoDB:', erro));

// Cria um esquema para os Eventos
const esquemaEvento = new mongoose.Schema({
  nomeEvento: { type: String, required: true },
  artista: { type: String, required: true },
  data: { type: String, required: true },
  horario: { type: String, required: true },
});

// Cria um esquema para os Ingressos
const esquemaIngresso = new mongoose.Schema({
  ID_evento: { type: String, required: true },
  nomeUtilizador: { type: String, required: true },
  idade: { type: Number, required: true },
  tipo: { type: String, required: true },
});

// Cria uma variável para cada criação
const Evento = mongoose.model('Evento', esquemaEvento);
const Ingresso = mongoose.model('Ingresso', esquemaIngresso);

app.get('/eventos', async (req, res) => {
  try {
    const eventos = await listarEventos();
    res.status(200).json(eventos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar eventos:', erro: erro.message });
  };
});

async function listarEventos() {
  try {
    return await Evento.find();
  } catch (erro) {
    console.error('Erro ao listar eventos:', erro);
    throw erro;
  };
};

app.post('/eventos', async (req, res) => {
  try {
    const { nomeEvento, artista, data, horario } = req.body;
    const novoEvento = await criarEvento(nomeEvento, artista, data, horario);
    res.status(201).json({ mensagem: "Evento criado com sucesso", criado: novoEvento });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao criar evento", erro: erro.message });
  };
});

async function criarEvento(nomeEvento, artista, data, horario) {
  try {
    const novoEvento = new Evento({ nomeEvento, artista, data, horario });
    return await novoEvento.save();
  } catch (erro) {
    console.error("Erro ao criar evento:", erro);
    throw erro;
  };
};

app.put('/eventos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeEvento, artista, data, horario } = req.body;
    const eventoAtualizado = await atualizarEvento(id, nomeEvento, artista, data, horario);
    if (eventoAtualizado) {
      res.status(200).json({ mensagem: 'Evento atualizado com sucesso', atualizado: eventoAtualizado });
    } else {
      res.status(404).json({ mensagem: 'Evento não encontrado' });
    };
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar evento', erro: erro.message });
  };
});

async function atualizarEvento(id, nomeEvento, artista, data, horario) {
  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(
      id,
      { nomeEvento, artista, data, horario },
      { new: true, runValidators: true },
    );
    return eventoAtualizado;
  } catch (erro) {
    console.error('Erro ao atualizar evento:', erro);
    throw erro;
  };
};

app.delete("/eventos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eventoDeletado = await deletarEvento(id);
    if (eventoDeletado) {
      res.status(200).json({ mensagem: "Evento deletado com sucesso", deletado: eventoDeletado });
    } else {
      res.status(404).json({ mensagem: "Evento não encontrado" });
    };
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar evento", erro: erro.message });
  };
});

async function deletarEvento(id) {
  try {
    const eventoDeletado = await Evento.findByIdAndDelete(id);
    return eventoDeletado;
  } catch (erro) {
    console.error("Erro ao deletar evento:", erro);
    throw erro;
  };
};

app.get('/ingressos', async (req, res) => {
  try {
    const ingressos = await listarIngressos();
    res.status(200).json(ingressos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar ingressos:', erro: erro.message });
  };
});

async function listarIngressos() {
  try {
    return await Ingresso.find();
  } catch (erro) {
    console.error('Erro ao listar ingressos:', erro);
    throw erro;
  };
};

app.post('/ingressos', async (req, res) => {
  try {
    const { ID_evento, nomeUtilizador, idade, tipo } = req.body;
    const novoIngresso = await criarIngresso(ID_evento, nomeUtilizador, idade, tipo);
    res.status(201).json({ mensagem: "Ingresso criado com sucesso", criado: novoIngresso });
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao criar ingresso", erro: erro.message });
  };
});

async function criarIngresso(ID_evento, nomeUtilizador, idade, tipo) {
  try {
    const novoIngresso = new Ingresso({ ID_evento, nomeUtilizador, idade, tipo });
    return await novoIngresso.save();
  } catch (erro) {
    console.error("Erro ao criar ingresso:", erro);
    throw erro;
  };
};

app.put('/ingressos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { ID_evento, nomeUtilizador, idade, tipo } = req.body;
    const ingressoAtualizado = await atualizarIngresso(id, ID_evento, nomeUtilizador, idade, tipo);
    if (ingressoAtualizado) {
      res.status(200).json({ mensagem: 'Ingresso atualizado com sucesso', atualizado: ingressoAtualizado });
    } else {
      res.status(404).json({ mensagem: 'Ingresso não encontrado' });
    };
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar ingresso', erro: erro.message });
  };
});

async function atualizarIngresso(id, ID_evento, nomeUtilizador, idade, tipo) {
  try {
    const ingressoAtualizado = await Ingresso.findByIdAndUpdate(
      id,
      { ID_evento, nomeUtilizador, idade, tipo },
      { new: true, runValidators: true },
    );
    return ingressoAtualizado;
  } catch (erro) {
    console.error('Erro ao atualizar ingresso:', erro);
    throw erro;
  };
};

app.delete("/ingressos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ingressoDeletado = await deletarIngresso(id);
    if (ingressoDeletado) {
      res.status(200).json({ mensagem: "Ingresso deletado com sucesso", deletado: ingressoDeletado });
    } else {
      res.status(404).json({ mensagem: "Ingresso não encontrado" });
    };
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao deletar ingresso", erro: erro.message });
  };
});

async function deletarIngresso(id) {
  try {
    const ingressoDeletado = await Ingresso.findByIdAndDelete(id);
    return ingressoDeletado;
  } catch (erro) {
    console.error("Erro ao deletar ingresso:", erro);
    throw erro;
  };
};

// Inicializando o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

