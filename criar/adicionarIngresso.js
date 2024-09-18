async function adicionarIngresso(nomeUtilizador, Idade, Tipo,) {
    try {
    const novoIngresso = new Ingresso({ nomeUtilizador, Idade, Tipo });
    return await novoIngresso.save();
    } catch (erro) {
    console.error("Erro ao adicionar Ingresso:", erro);
    throw erro;
    }
    }

    module.exports = adicionarIngresso