
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let Eventos = [{
    nome: 'Humanos Tour',
    artista: 'Oficina G3',
    data: 'Sexta 29/06',
    horario: '19:30',
    ingressos: [{
        nomeUtilizador: 'Marcos',
        idadeUtilizador: 20,
        tipoDeIngresso: 'VIP'
    }]
}]

exibirMenu()

function exibirMenu(){

    console.log(`
    |=============================================|
    |               Sassaki Eventos               |
    |=============================================|
    | 1 - Agendar evento                          |
    | 2 - Listar eventos                          |
    | 3 - Listar dados de eventos                 |
    | 4 - Comprar ingresso                        |
    | 5 - Deletar ingresso                        |
    | 6 - Listar ingressos de evento              |
    | 7 - Cancelar evento                         |
    | 8 - Sair                                    |
    |=============================================|
    `)

    rl.question(`--> Escolha uma opção: `,(opcao)=>{

        console.log()

        switch(opcao){
            case '1':
                agendarEvento()
            break
            case '2':
                listarEventos()
            break
            case '3':
                listarDadosDeEventos()
            break
            case '4':
                comprarIngresso()
            break
            case '5':
                deletarIngresso()
            break
            case '6':
                listarIngressosDeEvento()
            break
            case '7':
                cancelarEvento()
            break
            case '8':
                rl.close()
            break
            default:
                console.log(`--> Opção inválida.`)
                exibirMenu()
            break
        }
    })
}

function agendarEvento() {

    rl.question('Qual o nome do evento? ',(nome)=>{
        rl.question('Qual artista estará presente? ',(artista)=>{
            rl.question('Qual a data do evento? ',(data)=>{
                rl.question('Qual o horario do evento? ',(horario)=>{

                    console.log()

                    Eventos.push({nome:nome,artista:artista,data:data,horario:horario,ingressos:[]})

                    console.log(`--> Evento agendado com sucesso!`)

                    exibirMenu()
    })})})})
}

function listarEventos(){

    if (Eventos.length == 0){

        console.log(`--> Ainda não há eventos agendados!`)

    } else{

        Eventos.forEach((evento, i) =>{
            console.log(`${i+1}º Evento: ${Eventos[i].nome}`)
        })
    }
    exibirMenu()
}

function listarDadosDeEventos(){

    if (Eventos.length == 0){

        console.log(`--> Ainda não há eventos agendados!`)

    } else{

        Eventos.forEach((evento,i)=>{

            console.log(`${Eventos[i].nome} - ${Eventos[i].artista}, ${Eventos[i].data}, ${Eventos[i].horario}`)
        })
    }
    exibirMenu()
}

function comprarIngresso(){

    if (Eventos.length > 0){

        rl.question('Nome do utilizador: ',(nome)=>{
        rl.question('Idade atual: ',(idade)=>{

            console.log()

        Eventos.forEach((evento, i) =>{
            console.log(`${i+1}º Evento: ${Eventos[i].nome}`)
        })

            console.log()

        rl.question('Deseja comprar ingresso para qual evento?(número) ',(evento)=>{
        rl.question('Deseja adquirir qual tipo de ingresso?(Padrão ou VIP) ',(tipoIngresso)=>{

            console.log()

        evento = parseInt(evento)

        if(typeof(evento) === 'number' && evento > 0 && evento <= Eventos.length){

            Eventos[evento -1].ingressos.push({nomeUtilizador:nome,idadeUtilizador:idade,tipoDeIngresso:tipoIngresso})

            console.log(`--> Ingresso confirmado!`)

            exibirMenu()

        } else{

            console.log(`--> Erro.`)

            comprarIngresso()
        }

        })})})})

    } else{

        console.log(`--> Ainda não há eventos agendados!`)

        exibirMenu()
    }
}

function cancelarEvento(){

    Eventos.forEach((evento, i) =>{
        console.log(`${i+1}º Evento: ${Eventos[i].nome}`)
    })

    rl.question('Deseja cancelar qual evento?' ,(evento)=>{

        console.log('\n')

        evento = parseInt(evento)

        if(typeof(evento) === 'number' && evento > 0 && evento <= Eventos.length){

            Eventos.splice(evento - 1,1)

            console.log('--> Evento cancelado com sucesso! Todos os ingressos foram removidos!')

            exibirMenu()

        } else{

            console.log(`Opção inválida.`)

            cancelarEvento()
        }
    })
}

function deletarIngresso(){

    Eventos.forEach((evento, i) =>{
        console.log(`${i+1}º Evento: ${Eventos[i].nome}`)
    })

    console.log()

    rl.question(`Quer deletar o ingresso de qual evento? `,(evento)=>{

        console.log()

        evento = parseInt(evento)

        if(typeof(evento) === 'number' && evento > 0 && evento <= Eventos.length){

            Eventos[evento - 1].ingressos.forEach((ingresso,i)=>{
                console.log(`${i + 1} - ${ingresso.nomeUtilizador}, ${ingresso.idadeUtilizador}`)
            })

            console.log()

            rl.question(`Quer deletar qual ingresso? `,(ingresso)=>{

                console.log()

                ingresso = parseInt(ingresso)

                if(typeof(ingresso) === 'number' && ingresso > 0 && ingresso <= Eventos[evento - 1].ingressos.length){

                    Eventos[evento - 1].ingressos.splice(ingresso - 1,1)

                    console.log(`--> Ingresso deletado com sucesso!`)

                    exibirMenu()

                } else{

                    console.log(`Opção inválida.`)
        
                    deletarIngresso()
                }
            })

        } else{

            console.log(`Opção inválida.`)

            deletarIngresso()
        }
    })
}

function listarIngressosDeEvento(){

    if(Eventos.length > 0){

        Eventos.forEach((evento, i) =>{
            console.log(`${i+1}º Evento: ${Eventos[i].nome}`)
        })

        console.log()

        rl.question(`Quer vizualizar os ingressos de qual evento? `,(evento)=>{

            console.log()

            evento = parseInt(evento)

            if(typeof(evento) === 'number' && evento > 0 && evento <= Eventos.length){

                if(Eventos[evento - 1].ingressos.length > 0){

                    Eventos[evento - 1].ingressos.forEach((ingresso,i)=>{

                        console.log(`${ingresso.nomeUtilizador}, ${ingresso.idadeUtilizador}`)
                    })
                } else{

                    console.log(`Não há ingressos para esse evento!`)
                }
                exibirMenu()

            } else{

                console.log(`Opção inválida.`)

                listarIngressosDeEvento()
            }
        })
    } else{

        console.log(`--> Ainda não há eventos agendados!`)

        exibirMenu()
    }
}

function cancelarEvento(){

    Eventos.forEach((evento, i) =>{
        console.log(`${i+1}º Evento: ${Eventos[i].nome}`)
    })

    console.log()

    rl.question(`Deseja cancelar qual evento? `,(evento)=>{

        evento = parseInt(evento)

        if(typeof(evento) === 'number' && evento > 0 && evento <= Eventos.length){

            Eventos.splice(evento - 1,1)

            exibirMenu()

        } else{

            console.log(`Opção inválida!`)

            cancelarEvento()
        }
    })
}

