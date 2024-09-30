
// Importa o Mongoose e o APP
const mongoose = require('mongoose');
const app = require('./src/app');

// Cria conexão com o MongoDB
mongoose
.connect('mongodb://localhost:27017/SASSAKI')
.then(() => console.log('Conectado ao MongoDB'))
.catch((erro) => console.error('Erro ao conectar ao MongoDB:', erro));

// Inicializando o servidor
const port = 3000;
app.listen(port, () => {console.log(`Servidor rodando em: http://localhost:${port}/`)});
