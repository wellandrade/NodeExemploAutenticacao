var mongoClient = require('mongodb').MongoClient;
var conexao = null;
var db = null;

function conectar(callback) { 

    if (conexao) return callback(null, db);

    mongoClient.connect(process.env.MONGO_CONNECTION, (erro, conn) => {

        if(erro) return callback(erro, null);

        conexao = conn;
        db =  conn.db(process.env.DATA_BASE);
        return callback(null, db);
    });
}

function desconectar(callback) {

    if(!conexao) return true;

    conexao.close();
    conexao = null;
    return true;
 }

module.exports = { conectar, desconectar };
