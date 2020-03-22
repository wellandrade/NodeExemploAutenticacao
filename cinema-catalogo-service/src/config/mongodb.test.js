const test = require('tape'); // para testar 
const mongoDb = require('./mongodb.js'); // com a configuracao do banco 

function executarTestes() {
    // nome do teste 
    test('Conectar ao banco', (t) => {
         mongoDb.conectar((erro, db) => {
            t.assert(!erro && db, 'Conexao funcionou');
            t.end();
         });
    });

    test('Desconectar', (t) =>{
        t.assert(mongoDb.desconectar(), "Desconectado com sucesso");
        t.end();
    });
}

module.exports = { executarTestes };
