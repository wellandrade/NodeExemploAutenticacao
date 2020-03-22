require('dotenv-safe').config(); // carregar variaveis de ambiente

const filmes = require('./api/filme');
const servidor = require('./server/server');
const repositorio = require('./repository/repository');

servidor.start(filmes, repositorio, (erro, app) =>{
    console.log('Servidor up');
});

