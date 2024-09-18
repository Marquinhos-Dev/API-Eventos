async function adicionarEvento(NomeEvento, Artista, Data, Horario) {
    try {
    const novoEvento= new Evento({ NomeEvento, Artista, Data, Horario });
    return await novoEvento.save();
    } catch (erro) {
    console.error("Erro ao adicionar Evento:", erro);
    throw erro;
    }
    }

    module.exports = adicionarEvento