const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
var bodyParser = require('body-parser');
var server = null;


function start(api, repositorio, callback) {

    const app = express();
    app.use(morgan('dev')); // Para logar tudo o q acontecer durante o dev
    app.use(helmet()); // Primeiro passo para a seguranca
    app.use(bodyParser.json());
    app.use((erro, req, res, next) => {
        callback(new Error('Ocorreu algum erro', 'Erro: ' + erro), null);
        res.status(500).send('Ocorreu algum erro');
    });

    api(app, repositorio);
    server = app.listen(parseInt(process.env.PORT));
}

function stop() {
    if(server) 
    {
        server.close();
    }

    return true;
}

module.exports = { start, stop }