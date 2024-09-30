
// Importa a entidade Eventos
const Evento = require('../Models/modelEventos');

// Função CRIAR
async function criarEvento(req, res){
    try {
        const { nomeEvento, artista, data, horario } = req.body;
        const novoEvento = new Evento({ nomeEvento, artista, data, horario });
        await novoEvento.save();
        res.status(201).json({ mensagem: "Evento criado com sucesso", criado: novoEvento });
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao criar evento", erro: erro.message });
    };
};

// Função LISTAR
async function listarEventos(req,res){
    try {
      const listados = await Evento.find();
      res.status(201).send(listados);
    } catch (erro) {
      console.error('Erro ao listar eventos:', erro);
      throw erro;
    };
};

// Função ATUALIZAR
async function atualizarEvento(req, res){
    try {
      const { id } = req.params;
      const { nomeEvento, artista, data, horario } = req.body;
      const eventoAtualizado = await Evento.findByIdAndUpdate(
        id,
        { nomeEvento, artista, data, horario },
        { new: true, runValidators: true },
      );
      if (eventoAtualizado) {
        res.status(200).json({ mensagem: 'Evento atualizado com sucesso', atualizado: eventoAtualizado });
      } else {
        res.status(404).json({ mensagem: 'Evento não encontrado' });
      };
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro ao atualizar evento', erro: erro.message });
    };
};

// Função DELETAR
async function deletarEvento(req, res){
    try {
      const { id } = req.params;
      const eventoDeletado = await Evento.findByIdAndDelete(id);
      if (eventoDeletado) {
        res.status(200).json({ mensagem: "Evento deletado com sucesso", deletado: eventoDeletado });
      } else {
        res.status(404).json({ mensagem: "Evento não encontrado" });
      };
    } catch (erro) {
      res.status(500).json({ mensagem: "Erro ao deletar evento", erro: erro.message });
    };
};

// Exporta as funções
module.exports = {criarEvento,listarEventos,atualizarEvento,deletarEvento};