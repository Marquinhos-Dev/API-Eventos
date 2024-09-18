const express= require('express')
const mongoose= require ('mongoose')
const { isGeneratorFunction } = require('util/types')

const app= express()
app.use(express.json())

mongoose 
.connect('mongodb://localhost:27017')
.then(()=> console.log('conectado ao MongoDb'))
.catch((erro)=>console.error('erro ao conectar ao MongoDb:', erro))

const esquemaEvento= new mongoose.Schema({
    nomeEvento: {type: String, required: true},
    artista: {type: String, required: true},
    data: {type: String, required: true},
    horario: {type: String, required: true}
})

const esquemaIngresso= new mongoose.Schema({
    ID_evento: {type: String, required: true},
    nomeUtilizador: {type: String, required: true},
    idade: {type: Number, required: true},
    tipo: {type: String, required: true}
})

const Evento= mongoose.model('Evento', esquemaEvento)
const Ingresso= mongoose.model('Ingresso', esquemaIngresso)

async function listarEventos(){
    try {
        return await Evento.find()
    }catch (erro){
        console.error('erro ao listar eventos:', erro)
        throw erro
    }
}

app.get ('./eventos', async (req, res)=> {
    try {
        const eventos= await listarEventos()
        res.status(200).json(eventos)
    }catch(erro) {
        res.status(500).json({mensagem: 'erro ao listar eventos:', erro: erro.message})
    }
})

async function listarIngressos(){
    try {
        return await Ingresso.find()
    }catch (erro){
        console.error('erro ao listar ingressos:', erro)
        throw erro
    }
}

app.get ('./ingressos', async (req, res)=>{
    try{
        const ingressos= await listarIngressos()
        res.status(200).json(ingressos)
    }catch (erro){
        res.status(500).json({mensagem: 'erro ao listar ingressos:', erro: erro.message})
    }
})

const port = 3000
app.listen (port, ()=> {
    console.log(`example app listening on port ${port}`)
})