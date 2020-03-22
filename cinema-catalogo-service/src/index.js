require('dotenv-safe').config();

const cinemaCatalogo = require('./api/cinema-catalogo');
const server = require('./server/server');
const repository = require('./repository/repository');

server.start(cinemaCatalogo, repository, (erro, app) => {
    console.log('start');
});
