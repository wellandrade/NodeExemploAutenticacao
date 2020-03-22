const test = require('tape');
const server = require('./server');

function apiMock() {
    console.log('Api mock');
}

function executarTestes(){

    test('Servidor - Start', (t) => {
        server.start(apiMock, null, (erro, sucesso) => {
            if(!erro && sucesso, 'Servidor - start');
            t.end();
        })
    });

    test('Servidor - Stop', (t) => {
        t.assert(server.stop(), 'Servidor - stop');
        t.end();
    });
}

module.exports = { executarTestes }