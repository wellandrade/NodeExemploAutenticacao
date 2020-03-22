const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
var server = null;

function start(api, repositorio) {

    const app = express();
    app.use(morgan('dev')); // Para logar tudo o q acontecer durante o dev
    app.use(helmet()); // Primeiro passo para a seguranca
    // app.use(express.bodyParser());
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