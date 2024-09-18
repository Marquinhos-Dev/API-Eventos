
// Importar Express e Mongoose
const express = require('express');
const mongoose = require ('mongoose');

// Inicializar app e json
const app = express();
app.use(express.json());

// Conectar com mongoDB
mongoose
.connect('mongodb://localhost:27017/SASSAKI')
.then(()=> console.log('conectado ao MongoDb'))
.catch((erro)=>console.error('erro ao conectar ao MongoDb:', erro));

// Esquema para eventos
const esquemaEvento = new mongoose.Schema({
    nomeEvento: {type: String, required: true},
    artista: {type: String, required: true},
    data: {type: String, required: true},
    horario: {type: String, required: true}
});

// Esquema para ingressos
const esquemaIngresso = new mongoose.Schema({
    ID_evento: {type: String, required: true},
    nomeUtilizador: {type: String, required: true},
    idade: {type: Number, required: true},
    tipo: {type: String, required: true}
});

// Criar eventos e ingressos
const Evento = mongoose.model('Evento', esquemaEvento);
const Ingresso = mongoose.model('Ingresso', esquemaIngresso);

async function listarEventos(){
    try {
        return await Evento.find();
    }catch (erro){
        console.error('erro ao listar eventos:', erro);
        throw erro;
    };
};

app.get ('./eventos', async (req, res)=> {
    try {
        const eventos= await listarEventos();
        res.status(200).json(eventos);
    }catch(erro) {
        res.status(500).json({mensagem: 'erro ao listar eventos:', erro: erro.message});
    };
});

async function listarIngressos(){
    try {
        return await Ingresso.find();
    }catch (erro){
        console.error('erro ao listar ingressos:', erro);
        throw erro;
    };
};

app.get ('./ingressos', async (req, res)=>{
    try{
        const ingressos= await listarIngressos();
        res.status(200).json(ingressos);
    }catch (erro){
        res.status(500).json({mensagem: 'erro ao listar ingressos:', erro: erro.message});
    };
});

app.put("/ingressos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { ID_evento, nomeUtilizador, idade, tipo } = req.body;
      const ingressoAtualizado = await atualizarIngresso(id,ID_evento,nomeUtilizador,idade,tipo);
      if (ingressoAtualizado) {
        res.status(200).json({mensagem: "Ingresso atualizado com sucesso",atualizado: ingressoAtualizado,});
      } else {
        res.status(404).json({ mensagem: "Ingresso não encontrado" });
      };
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao atualizar ingresso", erro: erro.message });
    };
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
      };
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao atualizar evento", erro: erro.message });
    };
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
    };
};

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
    };
};

async function adicionarEvento(nomeEvento, artista, data, horario) {
    try {
        const novoEvento= new Evento({nomeEvento, artista, data, horario});
        return await novoEvento.save();
    } catch (erro) {
        console.error("Erro ao adicionar Evento:", erro);
        throw erro;
    };
};

async function adicionarIngresso(ID_evento,nomeUtilizador,idade,tipo) {
    try {
        const novoIngresso = new Ingresso({ID_evento,nomeUtilizador,idade,tipo});
        return await novoIngresso.save();
    } catch (erro) {
        console.error("Erro ao adicionar Ingresso:", erro);
        throw erro;
    };
};

app.post("/eventos", async (req, res) => {
    try {
      const {nomeEvento, artista, data, horario} = req.body;
      const novoEvento = await adicionarEvento(nomeEvento, artista, data, horario);
      res.status(201).json({ mensagem: "Evento criado com sucesso", criado: novoEvento });
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao criar evento", erro: erro.message });
    };
});

app.post("/ingressos", async (req, res) => {
    try {
      const {ID_evento,nomeUtilizador,idade,tipo} = req.body;
      const novoIngresso = await adicionarIngresso(ID_evento,nomeUtilizador,idade,tipo);
      res.status(201).json({ mensagem: "Ingresso criado com sucesso", criado: novoIngresso });
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao criar evento", erro: erro.message });
    };
});

const port = 3000;

app.listen (port, ()=> {
    console.log(`example app listening on port ${port}`);
});